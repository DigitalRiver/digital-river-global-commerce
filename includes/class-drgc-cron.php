<?php
/**
 * Cron class
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

class DRGC_Cron {

   private $enabled;
   private $utc_time;

  /**
   * DRGC_Cron constructor.
   */
  public function __construct() {
    $option = get_option( 'drgc_cron_handler' );
    $this->enabled = ( is_array( $option ) && '1' == $option['checkbox'] )  ? true : false;
    $this->utc_time = get_option( 'drgc_cron_utc_time' ) ?: '12:00';
    $this->init();
  }

  public function init() {
    if ( ! wp_next_scheduled( 'dr_products_import' ) ) {
      // Schedule start at yesterday to cover time difference
      wp_schedule_event( strtotime( 'yesterday ' . $this->utc_time ), 'twicedaily', 'dr_products_import' );
    }
    add_action( 'dr_products_import', array( $this, 'do_import' ) );
  }

  public function reschedule() {
    wp_clear_scheduled_hook( 'dr_products_import' );
    // Schedule start at yesterday to cover time difference
    wp_reschedule_event( strtotime( 'yesterday ' . $this->utc_time ), 'twicedaily', 'dr_products_import' );
  }

  public function do_import() {
    if ( ! $this->enabled ) return false;

    error_log( '[START] DRGC_Cron->do_import()' );
    $importer = new DRGC_Product_Importer( 'CRON' );
    $importer->import_categories();
    $products_count = $importer->fetch_and_cache_products();
    for ( $i = 0; $i < $products_count; $i++ ) {
      $success = $importer->import_each_product( $i );
      if ( ! $success ) {
        error_log( '[END] DRGC_Cron->do_import() -- failed at index ' . $i );
        break;
      }
    }
    error_log( '[END] DRGC_Cron->do_import() -- success' );
  }

}
