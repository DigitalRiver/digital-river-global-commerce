<?php
/**
 * Fired during plugin activation
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

class DRGC_Activator {

  /**
   * On plugin activated.
   *
   * @since    1.0.0
   */
  public static function activate() {
    self::create_pages();
    new DRGC_Tables();
  }

  /**
   * Create pages that the plugin relies on and stores their ID for reference
   */
  public static function create_pages() {
    $pages = array(
      'cart' => array(
        'post_name'     => __( 'cart', 'digital-river-global-commerce' ),
        'post_title'    => __( 'Cart', 'digital-river-global-commerce' ),
        'post_content'  => '<!-- wp:shortcode -->[dr-cart]<!-- /wp:shortcode -->',
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'post_author'   => 1,
      ),
      'checkout' => array(
        'post_name'     => __( 'checkout', 'digital-river-global-commerce' ),
        'post_title'    => __( 'Checkout', 'digital-river-global-commerce' ),
        'post_content'  => '<!-- wp:shortcode -->[dr-checkout]<!-- /wp:shortcode -->',
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'post_author'   => 1,
      ),
      'login' => array(
        'post_name'     => __( 'login', 'digital-river-global-commerce' ),
        'post_title'    => __( 'Login', 'digital-river-global-commerce' ),
        'post_content'  => '<!-- wp:shortcode -->[dr-login]<!-- /wp:shortcode -->',
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'post_author'   => 1,
      ),
      'account' => array(
        'post_name'     => __( 'account', 'digital-river-global-commerce' ),
        'post_title'    => __( 'My Account', 'digital-river-global-commerce' ),
        'post_content'  => '<!-- wp:shortcode -->[dr-account]<!-- /wp:shortcode -->',
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'post_author'   => 1,
      ),
      'thank-you' => array(
        'post_name'     => __( 'thank-you', 'digital-river-global-commerce' ),
        'post_title'    => __( 'Thank You', 'digital-river-global-commerce' ),
        'post_content'  => '<!-- wp:shortcode -->[dr-thank-you]<!-- /wp:shortcode -->',
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'post_author'   => 1,
      ),
    );

    foreach ( $pages as $key => $page ) {
      drgc_create_page_and_reference( $page, 'drgc_page_id_' . $key );
    }
  }
}
