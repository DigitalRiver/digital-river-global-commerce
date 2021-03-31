<?php
/**
 * DRGC Mini-cart Widget
 *
 * The class used to implement a Mini-cart widget.
 *
 * @link       https://www.digitalriver.com
 * @since      2.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes/widgets
 */

class DRGC_Widget_Mini_Cart extends WP_Widget {
 
  /**
  * Sets up a new Mini-cart widget instance.
  *
  * @since 2.0.0
  */
  public function __construct() {
    $widget_ops = array(
      'classname'                   => 'widget_mini_cart',
      'description'                 => __( 'DRGC Mini-cart for mobile viewing.', 'digital-river-global-commerce' ),
      'customize_selective_refresh' => true,
    );

    parent::__construct( 'drgc_widget_mini_cart', __( 'DRGC Mobile Mini-cart', 'digital-river-global-commerce' ), $widget_ops );
  }

  /**
  * Outputs the content for the current Mini-cart widget instance.
  *
  * @since 2.0.0
  *
  * @param array $args     Display arguments including 'before_title', 'after_title',
  *                        'before_widget', and 'after_widget'.
  * @param array $instance Settings for the current Mini-cart widget instance.
  */
  public function widget( $args, $instance ) {
    echo $args['before_widget'];

    ?>
    <?php if ( ( ! is_page( 'cart' ) ) && ( ! is_page( 'checkout' ) ) && ( ! is_page( 'thank-you' ) ) ): ?>
      <div id="dr-mobile-mini-cart" class="dr-mobile-mini-cart">
        <a href="#" class="dr-mobile-mini-cart-toggle dr-minicart-toggle">
          <span class="dr-mobile-mini-cart-qty dr-minicart-count">0</span>
          <span class="dr-mobile-mini-cart-icon"></span>
        </a>
        <div class="dr-minicart-display" style="display: none;">
          <div class="dr-minicart-header">
            <h4 class="dr-minicart-title"><?php _e( 'Shopping Cart', 'digital-river-global-commerce' ); ?></h4>
            <button type="button" class="dr-minicart-close-btn">×</button>
          </div>
        </div>
      </div>
    <?php endif; ?>
    <?php

    echo $args['after_widget'];
  }

  /**
  * Outputs the settings form for the Mini-cart widget.
  *
  * @since 2.0.0
  *
  * @param array $instance Current settings.
  */
  public function form( $instance ) {
    ?>
    <p></p>
    <?php
  }

  /**
  * Handles updating settings for the current Mini-cart widget instance.
  *
  * @since 2.0.0
  *
  * @param array $new_instance New settings for this instance as input by the user via
  *                            WP_Widget::form().
  * @param array $old_instance Old settings for this instance.
  * @return array Updated settings.
  */
  public function update( $new_instance, $old_instance ) {
    $instance = $old_instance;
    return $instance;
  }
}
