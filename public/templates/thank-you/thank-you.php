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

$order_number = $order['order']['id'] ?? '';

$shipping_first_name = isset($order['order']['shippingAddress']['firstName']) ? $order['order']['shippingAddress']['firstName'] : '' ;
$shipping_last_name = isset($order['order']['shippingAddress']['lastName']) ? $order['order']['shippingAddress']['lastName'] : '';
$shipping_address1 = isset($order['order']['shippingAddress']['line1']) ? $order['order']['shippingAddress']['line1'] : '';
$shipping_city = isset($order['order']['shippingAddress']['city']) ? $order['order']['shippingAddress']['city'] : '';
$shipping_state = isset($order['order']['shippingAddress']['countrySubdivision']) ? $order['order']['shippingAddress']['countrySubdivision'] : '';
$shipping_code = isset($order['order']['shippingAddress']['postalCode']) ? $order['order']['shippingAddress']['postalCode'] : '';
$shipping_country = isset($order['order']['shippingAddress']['countryName']) ? $order['order']['shippingAddress']['countryName'] : '';

$billing_first_name = isset($order['order']['billingAddress']['firstName']) ? $order['order']['billingAddress']['firstName'] : '' ;
$billing_last_name = isset($order['order']['billingAddress']['lastName']) ? $order['order']['billingAddress']['lastName'] : '';
$billing_address1 = isset($order['order']['billingAddress']['line1']) ? $order['order']['billingAddress']['line1'] : '';
$billing_city = isset($order['order']['billingAddress']['city']) ? $order['order']['billingAddress']['city'] : '';
$billing_state = isset($order['order']['billingAddress']['countrySubdivision']) ? $order['order']['billingAddress']['countrySubdivision'] : '';
$billing_code = isset($order['order']['billingAddress']['postalCode']) ? $order['order']['billingAddress']['postalCode'] : '';
$billing_country = isset($order['order']['billingAddress']['countryName']) ? $order['order']['billingAddress']['countryName'] : '';

if ( $shipping_first_name !== '' && $shipping_last_name !== '' ) {
    $shipping_name = $shipping_first_name . ' ' . $shipping_last_name;
} else {
    $shipping_name = $shipping_first_name . $shipping_last_name;
}

if ( $shipping_city !== '' && $shipping_code !== '' ) {
    $shipping_code = $shipping_state ? $shipping_state . ' ' . $shipping_code : $shipping_code;
    $shipping_address2 = $shipping_city . ', ' . $shipping_code;
} else {
    $shipping_address2 = $shipping_city . $shipping_code;
}

if ( $billing_first_name !== '' && $billing_last_name !== '' ) {
    $billing_name = $billing_first_name . ' ' . $billing_last_name;
} else {
    $billing_name = $billing_first_name . $billing_last_name;
}

if ( $billing_city !== '' && $billing_code !== '' ) {
    $billing_code = $billing_state ? $billing_state . ' ' . $billing_code : $billing_code;
    $billing_address2 = $billing_city . ', ' . $billing_code;
} else {
    $billing_address2 = $billing_city . $billing_code;
}

$is_wire_transfer = $order['order']['paymentMethod']['type'] === 'wireTransfer';
?>

<style>
/* For thank you page only */
@media print {
  body * {
    visibility: hidden;
  }
  .section-to-print, .section-to-print * {
    visibility: visible;
  }
  .section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

<div class="dr-thank-you-wrapper section-to-print" id="dr-thank-you-page-wrapper">

    <h1 class="page-title"><?php echo __( 'Thank you', 'digital-river-global-commerce' ) ?></h1>

    <?php if ( isset( $order['order']['id'] ) ): ?>

        <div class="dr-thank-you-wrapper__info">

            <div class="subheading">

                <?php if ( $is_wire_transfer ): ?>

                    <?php echo __( 'Your order has been successfully placed.', 'digital-river-global-commerce' ) ?></div>

                <?php else: ?>

                    <?php echo __( 'Your order was completed successfully.', 'digital-river-global-commerce' ) ?></div>

                <?php endif; ?>

            <div class="order-number">

                <span><?php echo __( 'Order number is: ', 'digital-river-global-commerce' ) ?></span>
                <span><?php echo $order_number ?></span>

            </div>

            <div class="order-info">

                <?php if ( $is_wire_transfer ): ?>

                    <?php include_once DRGC_PLUGIN_DIR . 'public/templates/thank-you/wire-transfer-instructions.php'; ?>

                <?php else: ?>

                    <p><?php
                    echo sprintf(
                        __( 'You will receive an email confirmation shortly at %s', 'digital-river-global-commerce' ),
                        $order['order']['shippingAddress']['emailAddress']) ?? '';
                    ?></p>

                    <button id="print-button" class="print-button"><?php echo __( 'Print Receipt', 'digital-river-global-commerce' ) ?></button>

                <?php endif; ?>

            </div>

        </div>

        <div class="dr-thank-you-wrapper__products dr-summary dr-summary--thank-you">

            <div class="dr-summary__products">

                <?php if ( isset($order['order']) && isset($order['order']['lineItems']['lineItem'] )) : ?>
                    <?php if ( $order['order']['lineItems']['lineItem'] ) : ?>
                        <?php foreach ($order['order']['lineItems']['lineItem'] as $line_item): ?>
                            <?php include DRGC_PLUGIN_DIR . 'public/templates/cart/cart-product.php'; ?>
                        <?php endforeach; ?>
                    <?php endif; ?>
                <?php endif; ?>

            </div>

        </div>

        <div class="dr-thank-you-wrapper__summary">

            <div class="dr-order-address">

                <?php if ( $order['order']['hasPhysicalProduct'] ) : ?>
                <div class="dr-order-address__shipping">

                    <div class="address-title"><?php echo __( 'Shipping Address', 'digital-river-global-commerce' ) ?></div>

                    <div class="address-info">
                        <p><?php echo $shipping_name; ?></p>
                        <p><?php echo $shipping_address1; ?></p>
                        <p><?php echo $shipping_address2; ?></p>
                        <p><?php echo $shipping_country; ?></p>
                    </div>

                </div>
                <?php endif; ?>

                <div class="dr-order-address__billing">

                    <div class="address-title"><?php echo __( 'Billing Address', 'digital-river-global-commerce' ) ?></div>

                    <div class="address-info">
                        <p><?php echo $billing_name; ?></p>
                        <p><?php echo $billing_address1; ?></p>
                        <p><?php echo $billing_address2; ?></p>
                        <p><?php echo $billing_country; ?></p>
                    </div>

                </div>

            </div>

            <div class="dr-summary dr-summary--thank-you order-summary">

                <?php include_once DRGC_PLUGIN_DIR . 'public/templates/thank-you/thank-you-summary.php'; ?>

            </div>

        </div>

    <?php endif; ?>

</div>
