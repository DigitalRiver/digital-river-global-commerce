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
// $subtotal_items = $order['order']['totalItemsInCart'];
$subtotal_items = 0;

if ( isset( $order['order'] ) ) {
    foreach( $order['order']['lineItems']['lineItem'] as $lineItem) {
        $subtotal_items += $lineItem['quantity'];
    }
}

$subtotal_items_text = $subtotal_items > 1 ? __( 'items', 'digital-river-global-commerce' ) : __( 'item', 'digital-river-global-commerce' );
$subtotal_value = $order['order']['pricing']['formattedSubtotal'] ?? '';
$tax_value = $order['order']['pricing']['formattedTax'] ?? '';
$shipping_price_value = ($order['order']['pricing']['shipping']['value'] ?? '') === 0 ? __( 'FREE', 'digital-river-global-commerce' ) : ($order['order']['pricing']['formattedShipping'] ?? '');
$discount = $order['order']['pricing']['incentive']['value'];
$formatted_discount = $order['order']['pricing']['formattedIncentive'];
$total_value = $order['order']['pricing']['formattedTotal'] ?? '';
$should_display_vat = drgc_should_display_vat( $customer['currency'] );
$is_tax_inclusive = drgc_is_tax_inclusive( $customer['locale'] );
$force_excl_tax = drgc_force_excl_tax();
$tax_suffix_label = $is_tax_inclusive ?
  $force_excl_tax ? ' ' . __( 'Excl. VAT', 'digital-river-global-commerce' ) : ' ' . __( 'Incl. VAT', 'digital-river-global-commerce' ) :
  '';
?>


<div class="dr-summary__subtotal">
    <p class="subtotal-label"><?php echo __( 'Subtotal', 'digital-river-global-commerce' ) . $tax_suffix_label . ' - (' .  $subtotal_items . ' ' . $subtotal_items_text . ')' ?></p>

    <p class="subtotal-value"><?php echo $subtotal_value; ?></p>
</div>

<div class="dr-summary__tax <?php echo ( $is_tax_inclusive && ! $force_excl_tax ) ? 'tree-sub-item' : '' ?>">

    <p class="item-label"><?php echo $should_display_vat ? __( 'VAT', 'digital-river-global-commerce' ) : __( 'Tax', 'digital-river-global-commerce' ) ?></p>

    <p class="item-value">--</p>

</div>
<?php if ( $order['order']['hasPhysicalProduct'] ) : ?>
<div class="dr-summary__shipping">

    <p class="item-label"><?php echo __( 'Shipping', 'digital-river-global-commerce' ) . $tax_suffix_label ?></p>

    <p class="item-value"><?php echo $shipping_price_value; ?></p>

</div>

<div class="dr-summary__shipping-tax <?php echo ( $is_tax_inclusive && ! $force_excl_tax ) ? 'tree-sub-item' : '' ?>">

    <p class="item-label"><?php echo $should_display_vat ? __( 'Shipping VAT', 'digital-river-global-commerce' ) : __( 'Shipping Tax', 'digital-river-global-commerce' ) ?></p>

    <p class="item-value">--</p>

</div>
<?php endif; ?>
<div class="dr-summary__discount" <?php if ( $discount === 0 ) echo 'style="display: none;"' ?>>

    <p class="discount-label"><?php echo __( 'Discount', 'digital-river-global-commerce' ) ?></p>

    <p class="discount-value"><?php echo '-' . $formatted_discount; ?></p>

</div>

<div class="dr-summary__total">

    <p class="total-label"><?php echo __( 'Total', 'digital-river-global-commerce' ) ?></p>

    <p class="total-value"><?php echo $total_value; ?></p>

</div>
