<?php
/**
 * Account Shortcode
 *
 * Used on the account page, the account shortcode displays the account contents and other relevant pieces.
 *
 * @link       https://www.digitalriver.com
 * @since      1.3.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes/shortcodes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Shortcode account class.
 */
class DR_Shortcode_Account {

  /**
   * Output the account shortcode.
   *
   * @since    1.3.0
   * @access   public
   * @param array $atts Shortcode attributes.
   */
  public static function output( $atts ) {
    $customer = DRGC()->shopper->retrieve_shopper();
    $orders = DRGC()->shopper->retrieve_orders();
    $subscriptions = DRGC()->shopper->retrieve_subscriptions();
    $payments = DRGC()->shopper->retrieve_shopper_payments();
    $locales = get_option( 'drgc_store_locales' );
    $usa_states = retrieve_usa_states();


    drgc_get_template(
      'account/account.php',
      compact( 'customer', 'usa_states', 'orders', 'subscriptions', 'payments', 'locales')
    );
  }
}
