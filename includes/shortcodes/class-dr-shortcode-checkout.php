<?php
/**
 * Checkout Shortcode
 *
 * Used on the checkout page, the checkout shortcode displays the checkout contents and other relevant pieces.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes/shortcodes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Shortcode checkout class.
 */
class DR_Shortcode_Checkout {

  /**
   * Output the checkout shortcode.
   *
     * @since    1.0.0
     * @access   public
   * @param array $atts Shortcode attributes.
   */
  public static function output( $atts ) {
    $locales = get_option( 'drgc_store_locales' );
    $current_locale = drgc_get_current_dr_locale();
    $selected_country = substr( $current_locale, strpos( $current_locale, '_') + 1 );
    $address = array(
      'country' => $selected_country
    );
    $tax_schema = DRGC()->cart->get_tax_schema( $address );
    $cart = DRGC()->cart->retrieve_cart();
    $customer = DRGC()->shopper->retrieve_shopper();
    $usa_states = retrieve_usa_states();
    $steps_titles = apply_filters( 'drgc_checkout_titles', array(
      'email'    => __( 'Email', 'digital-river-global-commerce' ),
      'shipping' => __( 'Shipping information', 'digital-river-global-commerce' ),
      'billing'  => __( 'Billing information', 'digital-river-global-commerce' ),
      'tax_id'   => __( 'Tax Identifier', 'digital-river-global-commerce' ),
      'delivery' => __( 'Delivery options', 'digital-river-global-commerce' ),
      'payment'  => __( 'Payment', 'digital-river-global-commerce' ),
    ) );

    drgc_get_template(
      'checkout/checkout.php',
      compact( 'cart', 'customer', 'usa_states', 'locales', 'steps_titles', 'current_locale', 'selected_country', 'tax_schema' )
    );
  }
}
