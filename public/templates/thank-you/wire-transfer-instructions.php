<?php
    $wire_transfer = $order['order']['paymentMethod']['wireTransfer'];
?>
<div class="wire-transfer">

    <p><?php _e( 'Your order has been entered and is awaiting payment.', 'digital-river-global-commerce' ); ?></p>

    <p><?php _e( 'Please make your payment now to complete your order. All funds must be drawn in the currency shown below.', 'digital-river-global-commerce' ); ?></p>

    <p><?php _e( 'Provide your bank with the following wire transfer instructions:', 'digital-river-global-commerce'); ?></p>

    <div class="wire-transfer-instructions">

        <p><strong><?php _e( 'Amount:', 'digital-river-global-commerce' ); ?></strong> <?php echo $order['order']['pricing']['formattedTotal']; ?></p>

        <p><strong><?php _e( 'Wire Transfer Reference Number:', 'digital-river-global-commerce' ); ?></strong> <?php echo $wire_transfer['referenceId']; ?></p>

        <p><?php _e( '*Be sure to include this number or your payment may not be received.', 'digital-river-global-commerce' ); ?></p>

        <p><strong><?php _e( 'Bank:', 'digital-river-global-commerce' ); ?></strong> <?php echo $wire_transfer['bankName']; ?></p>

        <p><strong><?php _e( 'Location:', 'digital-river-global-commerce' ); ?></strong> <?php echo $wire_transfer['city']; ?></p>

        <p><strong><?php _e( 'Account Holder:', 'digital-river-global-commerce' ); ?></strong> <?php echo $wire_transfer['accountHolder']; ?></p>

        <p><strong><?php _e( 'Account Number:', 'digital-river-global-commerce' ); ?></strong> <?php echo $wire_transfer['accountNumber']; ?></p>

        <p><strong><?php _e( 'Swift Code:', 'digital-river-global-commerce' ); ?></strong> <?php echo $wire_transfer['swiftCode']; ?></p>

        <?php if ( isset( $wire_transfer['iban'] ) ): ?>

            <p><strong><?php _e( 'IBAN*:', 'digital-river-global-commerce' ); ?></strong> <?php echo $wire_transfer['iban']; ?></p>

        <?php endif; ?>

    </div>

    <p><?php _e( 'Please ensure you use your \'Reference Number\' as your transaction reference when you electronically transfer the money for payment. If you do not use this reference number we will not be able to process your payment.', 'digital-river-global-commerce' ); ?></p>

    <p><?php _e( 'After we receive confirmation that our bank has received your funds, we will send you an email notification. If a payment is not received within 20 business days, your order will be cancelled.', 'digital-river-global-commerce' ); ?></p>

    <p><?php _e( 'Print this page for your records as all bank details are required to make your payment. You can use this information to make your payment to the fore mentioned bank account. Any orders placed without all of the above information may not be processed.', 'digital-river-global-commerce' ) ?></p>

    <p><?php _e( 'When we have finished processing your order, you will be sent a confirmation email at the address provided.', 'digital-river-global-commerce' ); ?></p>

</div>
