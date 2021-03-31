<div class="dr-checkout__confirmation dr-checkout__el d-none">

    <p>
        <?php echo __( 'Please review your order details and place your order below.', 'digital-river-global-commerce' ); ?>
    </p>

    <hr style="margin-top: -5px">

    <form id="checkout-confirmation-form" action="<?php echo esc_url( drgc_get_page_link( 'thank-you' ) ); ?>" method="post">
        <input type="hidden" name="order_id">

        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="dr-tAndC">
            <label class="form-check-label" for="dr-tAndC">
                <?php
                    $tos_link = '<a href="#" target="_blank" class="dr-termsOfSale">' . __( 'Terms of Sale', 'digital-river-global-commerce' ) . '</a>';
                    $pp_link = '<a href="#" target="_blank" class="dr-privacyPolicy">' . __( 'Privacy Policy', 'digital-river-global-commerce' ) . '</a>';
                    $entity_name = drgc_get_business_entity_name( $cart['cart']['businessEntityCode'] );
                    printf( __( 'By submitting the order, I agree to %s and %s of %s', 'digital-river-global-commerce' ), $tos_link, $pp_link, $entity_name );
                ?>
            </label>
        </div>

        <button type="submit" class="dr-btn">
            <?php echo __( 'Place Order', 'digital-river-global-commerce' ); ?>
        </button>
    </form>

    <div class="dr-panel-result">

        <p class="dr-panel-result__text"></p>

    </div>

    <div id="dr-checkout-err-field" class="invalid-feedback" ></div>

</div>
