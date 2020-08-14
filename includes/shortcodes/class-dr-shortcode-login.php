<?php
/**
 * Login Shortcode
 *
 * Used on the login page, the login shortcode displays the login contents and other relevant pieces.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes/shortcodes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Shortcode login class.
 */
class DR_Shortcode_Login {

  /**
   * Output the login shortcode.
   *
   * @since    1.0.0
   * @access   public
   * @param array $atts Shortcode attributes.
   */
  public static function output( $atts ) {
    $customer = DRGC()->shopper->retrieve_shopper();
    $cart = DRGC()->cart->retrieve_cart();

    drgc_get_template(
      'login/login.php',
      compact('customer', 'cart')
    );
  }
}