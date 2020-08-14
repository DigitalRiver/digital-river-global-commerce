<?php
/**
 * Thank you Shortcode
 *
 * Used on the Thank you page, the Thank you shortcode displays the Thank you contents and other relevant pieces.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes/shortcodes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Shortcode cart class.
 */
class DR_Shortcode_Thank_You {

  /**
   * Output the cart shortcode.
   *
     * @since    1.0.0
     * @access   public
   * @param array $atts Shortcode attributes.
   */
  public static function output( $atts ) {
    $plugin = DRGC();
    $order = $plugin->cart->retrieve_order();
    $customer = $plugin->shopper->get_shopper_data();

    drgc_get_template(
      'thank-you/thank-you.php',
      compact( 'order', 'customer' )
    );
  }
}
