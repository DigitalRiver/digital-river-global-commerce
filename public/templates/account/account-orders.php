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

<script>
    window.drOrders = window.drOrders || {};
</script>

<?php 
  $orderID = __( 'Order ID', 'digital-river-global-commerce' );
  $date = __( 'Date', 'digital-river-global-commerce' );
  $amount = __( 'Amount', 'digital-river-global-commerce' );
  $status = __( 'Status', 'digital-river-global-commerce' );
?>

<div class="order order-headings">

    <div class="order-id">
        <?php echo $orderID; ?>
    </div>

    <div class="order-date">
        <?php echo $date; ?>
    </div>

    <div class="order-amount">
        <?php echo $amount; ?>
    </div>

    <div class="order-status">
        <?php echo $status; ?>
    </div>

    <div class="order-details"></div>

</div>


<?php foreach ( $orders['orders']['order'] as $order ): ?>

<?php
  $order_currency = $order['pricing']['total']['currency'] ?? '';
  $order_locale = $order['locale'] ?? '';
?>
    <div class="order">

        <div class="order-id" data-heading="<?php echo $orderID; ?>">
            <?php echo $order['id']; ?>
        </div>

        <div class="order-date" data-heading="<?php echo $date; ?>">
            <?php echo date_format(date_create($order['submissionDate']),"m/d/Y"); ?>
        </div>

        <div class="order-amount" data-heading="<?php echo $amount; ?>">
            <?php echo $order['pricing']['formattedTotal']; ?>
        </div>

        <div class="order-status <?php echo  str_replace(' ', '', strtolower($order['orderState'])); ?>"  data-heading="<?php echo $status; ?>">
            <?php echo $order['orderState']; ?>
        </div>

        <div class="order-details">
            <button type="button" class="btn btn-transparent" data-order="<?php echo $order['id']; ?>">
                <?php _e( 'Order Details', 'digital-river-global-commerce' ) ?>
            </button>
        </div>

    </div>

    <script>
        drOrders['<?php echo $order['id']; ?>'] = {
            formattedTotal: '<?php echo $order['pricing']['formattedTotal']; ?>',
            formattedSubtotal: '<?php echo $order['pricing']['formattedSubtotal']; ?>',
            formattedIncentive: '<?php echo $order['pricing']['formattedIncentive']; ?>',
            formattedShipping: '<?php echo $order['pricing']['formattedShipping']; ?>',
            formattedTax: '<?php echo $order['pricing']['formattedTax']; ?>',
            orderState: '<?php echo $order['orderState']; ?>',
            orderDate: <?php echo date_format(date_create($order['submissionDate']),"m/d/Y"); ?>,
            shippingMethod: '<?php echo $order['shippingMethod']['description'] ?? ''; ?>',
            shippingMethodCode: '<?php echo $order['shippingMethod']['code'] ?? ''; ?>',
            entityCode: '<?php echo $order['businessEntityCode']; ?>',
            billingAddress: {
                firstName: '<?php echo $order['billingAddress']['firstName']; ?>',
                lastName: '<?php echo $order['billingAddress']['lastName']; ?>',
                line1: '<?php echo $order['billingAddress']['line1']; ?>',
                line2: '<?php echo $order['billingAddress']['line2']; ?>',
                city: '<?php echo $order['billingAddress']['city']; ?>',
                state: '<?php echo $order['billingAddress']['countrySubdivision']; ?>',
                zip: '<?php echo $order['billingAddress']['postalCode']; ?>',
                country: '<?php echo $order['billingAddress']['country']; ?>'
            },
            shippingAddress: {
                firstName: '<?php echo $order['shippingAddress']['firstName']; ?>',
                lastName: '<?php echo $order['shippingAddress']['lastName']; ?>',
                line1: '<?php echo $order['shippingAddress']['line1']; ?>',
                line2: '<?php echo $order['shippingAddress']['line2']; ?>',
                city: '<?php echo $order['shippingAddress']['city']; ?>',
                state: '<?php echo $order['shippingAddress']['countrySubdivision']; ?>',
                zip: '<?php echo $order['shippingAddress']['postalCode']; ?>',
                country: '<?php echo $order['shippingAddress']['country']; ?>'
            },
            products: [
                <?php foreach ($order['lineItems']['lineItem'] as $lineItem): ?>
                    {
                        qty: '<?php echo $lineItem['quantity']; ?>',
                        status: '<?php echo $lineItem['lineItemState']; ?>',
                        id: '<?php echo $lineItem['product']['id']; ?>',
                        sku: '<?php echo $lineItem['product']['sku']; ?>',
                        name: '<?php echo $lineItem['product']['displayName']; ?>',
                        image: '<?php echo $lineItem['product']['thumbnailImage']; ?>',
                        salePrice: '<?php echo $lineItem['pricing']['formattedSalePriceWithQuantity']; ?>',
                        strikePrice: '<?php echo $lineItem['pricing']['formattedListPriceWithQuantity']; ?>',
                        encodedPricing: '<?php echo json_encode( $lineItem['pricing'] ); ?>'
                    },
                <?php endforeach; ?>
            ],
            encodedPricing: '<?php echo json_encode( $order['pricing'] ); ?>',
            shouldDisplayVat: '<?php echo drgc_should_display_vat( $order_currency ) ? 'true' : 'false' ?>',
            isTaxInclusive: '<?php echo drgc_is_tax_inclusive( $order_locale ) ? 'true' : 'false' ?>'
        }
    </script>
    
<?php endforeach; ?>

<!-- Order details dr-modal -->
<div id="ordersModal" class="dr-modal fade" tabindex="-1" role="dialog" aria-labelledby="dr-modalLabel" aria-hidden="true">
    <div class="dr-modal-dialog dr-modal-xl">
        <div class="dr-modal-content">
            <div class="dr-modal-header">
                <div class="dr-modal-title dr-h5" id="dr-modalLabel"><?php _e( 'Order Details', 'digital-river-global-commerce' ) ?></div>
                <button type="button" class="close" data-dismiss="dr-modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="dr-modal-body">
                
                <div class="dr-thank-you-wrapper" id="dr-thank-you-page-wrapper">
                    <div class="dr-thank-you-wrapper__info">
                        <div class="order-number">
                            <span><?php echo __( 'Order number: ', 'digital-river-global-commerce' ) ?></span>
                            <span class="dr-modal-orderNumber"></span>
                        </div>
                        <div class="order-info">
                            <button id="print-button" class="print-button"><?php echo __( 'Print Receipt', 'digital-river-global-commerce' ) ?></button>
                        </div>
                    </div>
                    <div class="dr-thank-you-wrapper__products dr-summary dr-summary--thank-you">
                        <div class="dr-summary__products">
                            <!-- loop through line items -->
                            
                            <!-- end line item loop -->
                        </div>
                    </div>
                    <div class="dr-thank-you-wrapper__summary">
                        <div class="dr-order-address">
                            <!-- if hasPhysicalProduct -->
                            <div class="dr-order-address__shipping">
                                <div class="address-title"><?php echo __( 'Shipping Address', 'digital-river-global-commerce' ) ?></div>
                                <div class="address-info">
                                    <p class="dr-modal-shippingName"></p>
                                    <p class="dr-modal-shippingAddress1"></p>
                                    <p class="dr-modal-shippingAddress2"></p>
                                    <p class="dr-modal-shippingCountry"></p>
                                </div>
                            </div>
                            <!-- end if -->
                            <div class="dr-order-address__billing">
                                <div class="address-title"><?php echo __( 'Billing Address', 'digital-river-global-commerce' ) ?></div>
                                <div class="address-info">
                                    <p class="dr-modal-billingName"></p>
                                    <p class="dr-modal-billingAddress1"></p>
                                    <p class="dr-modal-billingAddress2"></p>
                                    <p class="dr-modal-billingCountry"></p>
                                </div>
                            </div>
                        </div>
                        <div class="dr-summary dr-summary--thank-you order-summary">
                            <div class="dr-summary__subtotal">
                                <p class="subtotal-label"><?php echo __( 'Subtotal', 'digital-river-global-commerce' ) ?></p>
                                <p class="subtotal-value dr-modal-subtotal"></p>
                            </div>
                            <div class="dr-summary__tax">
                                <p class="item-label"><?php echo __( 'Tax', 'digital-river-global-commerce' ) ?></p>
                                <p class="item-value dr-modal-tax"></p>
                            </div>
                            <!-- if shipping -->
                            <div class="dr-summary__shipping">
                                <p class="item-label"><?php echo __( 'Shipping', 'digital-river-global-commerce' ) ?></p>
                                <p class="item-value dr-modal-shipping"></p>
                            </div>
                            <div class="dr-summary__shipping-tax">
                                <p class="item-label"><?php echo __( 'Shipping Tax', 'digital-river-global-commerce' ) ?></p>
                                <p class="item-value dr-modal-shipping-tax"></p>
                            </div>
                            <!-- end if -->
                            <div class="dr-summary__discount">
                                <p class="discount-label"><?php echo __( 'Discount', 'digital-river-global-commerce' ) ?></p>
                                <p class="discount-value">-<span class="dr-modal-discount"></span></p>
                            </div>
                            <div class="dr-summary__total">
                                <p class="total-label"><?php echo __( 'Total', 'digital-river-global-commerce' ) ?></p>
                                <p class="total-value dr-modal-total"></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="dr-modal-footer">
                <button type="button" class="dr-btn dr-btn-black" data-dismiss="dr-modal"><?php _e( 'Close', 'digital-river-global-commerce' ) ?></button>
                <button type="button" class="dr-btn print-button"><?php _e( 'Print', 'digital-river-global-commerce' ) ?></button>
            </div>
        </div>
    </div>
</div>
