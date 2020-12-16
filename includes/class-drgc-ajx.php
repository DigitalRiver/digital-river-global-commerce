<?php
/**
 * Handle ajax calls for large amount of data, preventing timeouts
 *
 * action:  "drgc_ajx_action"
 * step:    "import_categories", "fetch_and_cache_products", or "import_each_product"
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

class DRGC_Ajx {
  /**
   * Initialize the class and set its properties.
   *
   * @since    1.0.0
   */
  public function __construct() {
    if ( is_admin() && defined( 'DOING_AJAX' ) && DOING_AJAX ) {
      add_action( 'wp_ajax_drgc_ajx_action', array( $this, 'ajax_action' )  );
    }
  }

  /**
   * Execute the ajax action
   */
  public function ajax_action() {
    check_ajax_referer( 'drgc_admin_ajax', 'nonce' );
    $step_slug = self::get_post_value( 'step' );

    $steps = new DRGC_Product_Importer( 'AJAX' );

    if ( method_exists( $steps, $step_slug ) ) {
      echo json_encode( $steps->$step_slug() );
    }

    die();
  }

  /**
   * Returns request POST value
   *
   * @param $key
   * @param bool $default
   *
   * @return bool|mixed
   */
  public static function get_post_value( $key, $default = false ) {
    if ( ! isset( $_POST[$key] ) ) {
      return $default;
    }

    if ( is_array( $_POST[$key] ) ) {
      return self::recursive_sanitize_text_field( $_POST[$key] );
    } else {
      return sanitize_text_field( $_POST[$key] );
    }
  }

  /**
   * Recursive sanitation for an array
   *
   * @param $array
   * @return mixed
   */
  private function recursive_sanitize_text_field( $array ) {
    foreach ( $array as $key => &$value ) {
      if ( is_array( $value ) ) {
        $value = self::recursive_sanitize_text_field( $value );
      } else {
        $value = sanitize_text_field( $value );
      }
    }

    return $array;
  }

}
