<div class="dr-checkout__payment dr-checkout__el">

    <div class="dr-accordion">
        
        <span class="dr-accordion__name">

            <?php echo isset( $steps_titles['payment'] ) ? $steps_titles['payment'] : ''; ?>

        </span>

        <span class="dr-accordion__edit payment"><?php _e( 'Edit', 'digital-river-global-commerce' ); ?>></span>
        
    </div>

    <form id="checkout-payment-form" class="dr-panel-edit dr-panel-edit--payment needs-validation" novalidate>

        <div class="dr-panel-edit__info">

            <p class="payment-info">

                <?php _e( 'How would you like to pay?', 'digital-river-global-commerce' ); ?>

            </p>

        </div>

        <div id="dr-payment-info"></div>

    </form>

    <div class="dr-panel-result">

        <p class="dr-panel-result__text"></p>

    </div>

    <div id="dr-payment-failed-msg" class="invalid-feedback"></div>

</div>
