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

if ( $cart['cart']['totalItemsInCart'] === 0 ) {
?>
    <p class="dr-checkout__empty-cart"><?php echo __( 'Your cart is empty!', 'digital-river-global-commerce' ); ?></p>
    <div class="dr-checkout__actions-top">
        <a href="<?php echo drgc_get_continue_shopping_link(); ?>" class="continue-shopping"><?php echo __( 'Continue Shopping', 'digital-river-global-commerce' ); ?></a>
    </div>
<?php
    return;
}

$customer_email = $is_logged_in ? $customer['emailAddress'] : '';
$default_address = $cart['cart']['billingAddress'];
$addresses = [];

if ( $is_logged_in ) {
    $addresses = $customer['addresses']['address'] ?? [];

    if ( count( $addresses ) > 0 ) {
        foreach( $addresses as $addr ) {
            if ( $addr['isDefault'] === 'true' ) {
                $default_address = $addr;
                break;
            }
        }
    }
    $default_address['firstName'] = $default_address['firstName'] ?? $customer['firstName'];
    $default_address['lastName'] = $default_address['lastName'] ?? $customer['lastName'];
}

$check_subs = drgc_is_subs_added_to_cart( $cart );
$is_tems_row_enabled = is_array( $tax_schema ) && ( $selected_country !== 'US' );
$is_tems_us_enabled = is_array( $customer_tax_regs ) && ( $customer_tax_regs['US'] === 'ENABLED' );

if ( $is_tems_us_enabled ) {
    $certificate_status = '';
    $tems_us_status = '';

    if ( array_key_exists( 'eligibleCertificate', $customer_tax_regs ) ) {
        if ( empty( $customer_tax_regs['eligibleCertificate'] ) ) {
            $certificate_status = 'NOT_ELIGIBLE';
        } else {
            $certificate_status = 'ELIGIBLE';
        }
    }

    if ( isset( $cart['cart']['customAttributes'] ) ) {
        $custom_attrs = $cart['cart']['customAttributes']['attribute'];
        $found_key = array_search( 'TAX_EXEMPTION_US_STATUS', array_column( $custom_attrs, 'name' ) );
        $tems_us_status = ( $found_key === false ) ? '' : $custom_attrs[ $found_key ]['value'];
    }

    if ( ( $certificate_status !== 'ELIGIBLE' ) && ( $tems_us_status !== 'NOT_ELIGIBLE' ) ) {
        if ( DRGC()->cart->update_tems_us_status( 'NOT_ELIGIBLE' ) ) $tems_us_status = 'NOT_ELIGIBLE';
    }
}

$billingAddress = $cart['cart']['billingAddress'];
$company_name = ( isset( $customer_tax_regs['eligibleCertificate'] ) && ! empty( $customer_tax_regs['eligibleCertificate'] ) ) ?
    $customer_tax_regs['eligibleCertificate']['companyName'] : $billingAddress['companyName'];
?>
<div class="dr-checkout-wrapper" id="dr-checkout-page-wrapper">

    <div class="dr-checkout-wrapper__actions">

        <div class="back-link">

            <a href="javascript:void(0)">&#60; <?php _e( 'Back', 'digital-river-global-commerce' ); ?></a>

        </div>

    </div>

    <?php if ( $is_tems_us_enabled ): ?>

        <div id="tems-us-result">

            <p class="alert alert-success tax-exempt" style="display: none;"><?php _e( 'This order is tax exempt.', 'digital-river-global-commerce' )?></p>

            <p class="alert alert-danger taxable" style="display: none;"><?php _e( 'Your tax exempt certificate on file is not valid for this order. Please update your address or continue with a taxable order.', 'digital-river-global-commerce' )?></p>

        </div>

    <?php endif; ?>

    <div class="dr-checkout-wrapper__content">

        <div class="dr-checkout">

            <div class="d-none" id="edit-info-link">

                <span><?php _e( 'Edit', 'digital-river-global-commerce' ); ?>></span>

            </div>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-email.php'; ?>

            <?php if ( $is_tems_us_enabled ):
                include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-tax-exemption.php';
            endif; ?>

            <?php if ( $cart['cart']['hasPhysicalProduct'] ) :
                include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-shipping.php';
            endif; ?>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-billing.php'; ?>

            <?php if ( $is_tems_row_enabled ):
                include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-tax-identifier.php';
            endif; ?>

            <?php if( $cart['cart']['hasPhysicalProduct'] ) :
                include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-delivery.php';
            endif; ?>

            <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-drop-in.php'; ?>

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

            <div class="dr-summary__pricing">

                <?php include_once DRGC_PLUGIN_DIR . 'public/templates/checkout/checkout-summary.php'; ?>

            </div>

        </div>

    </div>

    <div class="dr-checkout__actions-bottom">

        <a href="<?php echo drgc_get_continue_shopping_link(); ?>" class="continue-shopping"><?php echo __( 'Continue Shopping', 'digital-river-global-commerce' ); ?></a>

    </div>

</div>

<?php if ( $is_tems_us_enabled ): ?>

    <div id="certificate-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="dr-certModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <?php include_once DRGC_PLUGIN_DIR . 'public/partials/drgc-my-certificates.php'; ?>
                </div>
                <div class="modal-footer">
                    <button type="button" class="dr-btn dr-btn-black close" data-dismiss="modal"><?php _e( 'Close', 'digital-river-global-commerce' ) ?></button>
                </div>
            </div>
        </div>
    </div>

<?php endif; ?>
