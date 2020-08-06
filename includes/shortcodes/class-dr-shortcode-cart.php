<?php
/**
 * Cart Shortcode
 *
 * Used on the cart page, the cart shortcode displays the cart contents and other relevant pieces.
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
class DR_Shortcode_Cart {

	/**
	 * Output the cart shortcode.
	 *
     * @since    1.0.0
     * @access   public
	 * @param array $atts Shortcode attributes.
	 */
	public static function output( $atts ) {
		$cart = DRGC()->cart->retrieve_cart();
		$customer = DRGC()->shopper->retrieve_shopper();
		$locales = get_option( 'drgc_store_locales' );

		drgc_get_template(
			'cart/cart.php',
			compact('cart', 'customer', 'locales')
		);
	}
}
