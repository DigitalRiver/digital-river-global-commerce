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

    $display = '';
    if ($cart['cart']['totalItemsInCart'] == 0 ) {
        echo __( 'Your cart is empty!', 'digital-river-global-commerce' );
        $display = 'style="display:none;"';
    }

    $customerEmail = '';
    if ( $customer && $customer['id'] != 'Anonymous' ) {
        $customerEmail = $customer['emailAddress'];
    }
?>

<div class="dr-checkout-wrapper" id="dr-checkout-page-wrapper">
    <div class="dr-checkout-wrapper__actions" <?php echo $display; ?>>
        <div class="back-link">

            <a href="" onclick="history.back(); return false;">&#60; Back</a>

        </div>

    </div>

    <div class="dr-checkout-wrapper__content" <?php echo $display; ?>>

        <div class="dr-checkout">

            <div class="dr-checkout__el dr-checkout__cloudpay">

                <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-pretandc.php'; ?>

                <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-googlepay.php'; ?>

                <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-applepay.php'; ?>

                <div class="invalid-feedback" id="dr-preTAndC-err-msg"></div>

            </div>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-email.php'; ?>

            <?php if( $cart['cart']['hasPhysicalProduct'] ) :
                include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-shipping.php';
            endif; ?>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-billing.php'; ?>

            <?php if( $cart['cart']['hasPhysicalProduct'] ) :
                include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-delivery.php';
            endif; ?>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-payment.php'; ?>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-confirmation.php'; ?>

        </div>

        <div class="dr-summary dr-summary--checkout">

            <div class="dr-summary__products">

                <?php if ( 1 < count($cart['cart']['lineItems']) ) : ?>
                    <?php foreach ($cart['cart']['lineItems']['lineItem'] as $line_item): ?>
                        <?php include DRGC_PLUGIN_DIR . 'public/templates/cart/cart-product.php'; ?>
                    <?php endforeach; ?>
                <?php endif; ?>

            </div>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-summary.php'; ?>

        </div>

    </div>

    <div class="dr-checkout__actions-bottom">

        <a href="<?php echo get_post_type_archive_link( 'dr_product' ); ?>" class="continue-shopping"><?php echo __( 'Continue Shopping', 'digital-river-global-commerce' ); ?></a>

    </div>

</div>
