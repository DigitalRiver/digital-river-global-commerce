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
?>

<div class="dr-cart-wrapper" id="dr-cart-page-wrapper">
    <form class="dr-cart-wrapper__content dr-cart">

        <section class="dr-cart__content dr-loading">

            <div class="dr-cart__products">

                <?php if ( 1 < count($cart['cart']['lineItems'] )) : ?>
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
                    <?php echo __( 'Your cart is empty.', 'digital-river-global-commerce' ); ?>
                <?php endif; ?>

            </div>
            <?php if ( 1 < count($cart['cart']['lineItems'] )) : ?>
            <div class="dr-cart__estimate" id="cart-estimate">

                <?php include_once DRGC_PLUGIN_DIR . 'public/templates/cart/cart-summary.php'; ?>

            </div>
            <?php endif; ?>
        </section>

        <?php if ( $is_auto_renewal) : ?>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/cart/cart-auto-renewal-terms.php'; ?>

        <?php endif; ?>

        <section class="dr-cart__actions-bottom">

            <a href="<?php echo get_post_type_archive_link( 'dr_product' ); ?>" class="continue-shopping"><?php echo __( 'Continue Shopping', 'digital-river-global-commerce' ); ?></a>

        </section>

    </form>

</div>
