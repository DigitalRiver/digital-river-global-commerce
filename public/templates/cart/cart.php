<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/templates/parts
 */

$is_auto_renewal = false;
$is_empty_cart = $cart['cart']['totalItemsInCart'] === 0;
$order_number = ( isset( $cart['cart']['id'] ) && ( $cart['cart']['id'] !== 'active' ) ) ? $cart['cart']['id'] : '';
?>

<div class="dr-cart-wrapper" id="dr-cart-page-wrapper">

    <form class="dr-cart-wrapper__content dr-cart">

        <?php if ( ! empty( $order_number ) ): ?>

            <div class="order-number">

                <p><span><?php echo __( 'Order Number:', 'digital-river-global-commerce' ) ?></span> <span><?php echo $order_number ?></span></p>

            </div>

        <?php endif; ?>

        <section class="dr-cart__content dr-loading">

            <div class="dr-cart__products">

                <?php if ( ! $is_empty_cart ): ?>
                    <?php foreach ($cart['cart']['lineItems']['lineItem'] as $line_item): ?>
                        <?php
                            foreach ( $line_item['product']['customAttributes']['attribute'] as $attribute) {
                                if ( $attribute['name'] === 'isAutomatic' && $attribute['value'] === 'true') {
                                    $is_auto_renewal = true;
                                    break;
                                }
                            }
                        ?>
                        <?php include DRGC_PLUGIN_DIR . 'public/templates/cart/cart-product.php'; ?>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p><?php echo __( 'Your cart is empty.', 'digital-river-global-commerce' ); ?></p>
                <?php endif; ?>

            </div>

            <?php if ( ! $is_empty_cart ): ?>

                <div class="dr-cart__estimate" id="cart-estimate">

                    <?php include_once DRGC_PLUGIN_DIR . 'public/templates/cart/cart-summary.php'; ?>

                </div>

            <?php endif; ?>

        </section>

        <?php if ( $is_auto_renewal) : ?>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/cart/cart-auto-renewal-terms.php'; ?>

        <?php endif; ?>

        <section class="dr-cart__actions-bottom">

            <a href="<?php echo drgc_get_continue_shopping_link(); ?>" class="continue-shopping"><?php echo __( 'Continue Shopping', 'digital-river-global-commerce' ); ?></a>

            <?php if ( ! $is_empty_cart && $is_auto_renewal ): ?>

                <a href="<?php echo esc_url( drgc_get_page_link( 'checkout' ) ); ?>" class="proceed-checkout dr-btn" id="dr-checkout-btn"><?php echo __( 'Proceed to checkout', 'digital-river-global-commerce' ) ?></a>

            <?php endif; ?>

        </section>

    </form>

</div>
