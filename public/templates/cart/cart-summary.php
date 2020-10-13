<?php
/**
 * Provide a publidr-facing view for the plugin
 *
 * This file is used to markup the publidr-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/partials
 */
?>

<?php
$shipping_price = $cart['cart']['pricing']['formattedShippingAndHandling'];
$discount       = $cart['cart']['pricing']['discount']['value'];
$formatted_discount = $cart['cart']['pricing']['formattedDiscount'];
$subtotal_items = $cart['cart']['totalItemsInCart'];
$subtotal_value = $cart['cart']['pricing']['formattedSubtotal'];
$subtotal_with_discount_value = $cart['cart']['pricing']['formattedSubtotalWithDiscount'];
$tax = $cart['cart']['pricing']['formattedTax'];
$order_total = $cart['cart']['pricing']['formattedOrderTotal'];
$should_display_vat = drgc_should_display_vat( $customer['currency'] );
$is_tax_inclusive = drgc_is_tax_inclusive( $customer['locale'] );
$force_excl_tax = drgc_force_excl_tax();
$tax_suffix_label = $is_tax_inclusive ?
  $force_excl_tax ? ' ' . __( 'Excl. VAT', 'digital-river-global-commerce' ) : ' ' . __( 'Incl. VAT', 'digital-river-global-commerce' ) :
  '';
?>



<div class="dr-summary dr-summary--cart">

    <div class="dr-summary__subtotal">

        <p class="subtotal-label"><?php echo __( 'Subtotal', 'digital-river-global-commerce' ) . $tax_suffix_label ?></p>

        <p class="subtotal-value"><?php echo $subtotal_value; ?></p>

    </div>

    <div class="dr-summary__discounted-subtotal" style="display: none;">

        <p class="discounted-subtotal-label"><?php echo __( 'Subtotal', 'digital-river-global-commerce' ) ?></p>

        <p class="discounted-subtotal-value"><?php echo $subtotal_with_discount_value; ?></p>

    </div>

    <div class="dr-summary__tax <?php echo ( $is_tax_inclusive && ! $force_excl_tax ) ? 'tree-sub-item' : '' ?>">

        <p class="tax-label"><?php echo $should_display_vat ? __( 'Estimated VAT', 'digital-river-global-commerce' ) : __( 'Estimated Tax', 'digital-river-global-commerce' ) ?></p>

        <p class="tax-value">--</p>

    </div>

    <div class="dr-summary__shipping">

        <p class="shipping-label"><?php echo __( 'Estimated Shipping', 'digital-river-global-commerce' ) . $tax_suffix_label ?></p>

        <p class="shipping-value"><?php echo $shipping_price; ?></p>

    </div>

    <div class="dr-summary__shipping-tax <?php echo ( $is_tax_inclusive && ! $force_excl_tax ) ? 'tree-sub-item' : '' ?>">

        <p class="shipping-tax-label"><?php echo $should_display_vat ? __( 'Estimated Shipping VAT', 'digital-river-global-commerce' ) : __( 'Estimated Shipping Tax', 'digital-river-global-commerce' ) ?></p>

        <p class="shipping-tax-value">--</p>

    </div>

    <div class="dr-summary__discount" <?php if ( $discount === 0 ) echo 'style="display: none;"' ?>>

        <p class="discount-label"><?php echo __( 'Discount', 'digital-river-global-commerce' ) ?></p>

        <p class="discount-value"><?php echo '-' . $formatted_discount; ?></p>

    </div>

    <hr class="dashed">

    <div class="dr-summary__promo-code">
        <a class="promo-code-toggle" href="javascript:void(0);"><?php echo __( 'Add Promo Code', 'digital-river-global-commerce' ) ?> +</a>
        <div class="promo-code-wrapper" style="display: none;">
            <input type="text" class="form-control" id="promo-code" name="promo_code" placeholder="<?php echo __( 'Promo Code', 'digital-river-global-commerce' ) ?>">
            <button type="button" class="dr-btn" id="apply-promo-code-btn"><?php echo __( 'Apply', 'digital-river-global-commerce' ) ?></button>
            <div class="invalid-feedback" id="dr-promo-code-err-field"></div>
        </div>
    </div>

    <hr class="solid">

    <div class="dr-summary__total">

        <p class="total-label"><?php echo __( 'Total', 'digital-river-global-commerce' ) ?></p>

        <p class="total-value"><?php echo $order_total; ?></p>

    </div>

    <?php if ( ! $is_empty_cart && ! $is_auto_renewal ): ?>

        <a href="<?php echo esc_url( drgc_get_page_link( 'checkout' ) ); ?>" class="dr-summary__proceed-checkout dr-btn" id="dr-checkout-btn"><?php echo __( 'Proceed to checkout', 'digital-river-global-commerce' ) ?></a>

    <?php endif; ?>

</div>
