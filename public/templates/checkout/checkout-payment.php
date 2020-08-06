
<div class="dr-checkout__payment dr-checkout__el">

<div class="dr-accordion">

    <span class="dr-accordion__name">

        <?php echo isset( $steps_titles['payment'] ) ? $steps_titles['payment'] : ''; ?>

    </span>

    <span class="dr-accordion__edit">Edit></span>

</div>

<form id="checkout-payment-form" class="dr-panel-edit dr-panel-edit--payment needs-validation" novalidate>

    <div class="dr-panel-edit__info">

        <p class="payment-info">

            <?php echo __( 'How would you like to pay?', 'digital-river-global-commerce' ); ?>

        </p>

    </div>

    <div class="dr-panel-edit__el">

        <div class="credit-card-section">

            <div class="field-radio">

                <input type="radio" id="radio-credit-card" name="selector" value="credit-card" checked>

                <label for="radio-credit-card">

                    <span class="credit-card-icon"></span>

                    <span class="black">

                        <?php echo __( 'Credit Card', 'digital-river-global-commerce' ); ?>

                    </span>

                </label>

            </div>

            <div class="cards">

                <div class="amex-icon"></div>

                <div  class="dinersclub-icon"></div>

                <div  class="discover-icon"></div>

                <div  class="jcb-icon"></div>

                <div  class="mastercard-icon"></div>

                <div  class="visa-icon"></div>

            </div>

        </div>

        <div class="credit-card-info">
            <div class="clearfix">
                <div class="form-group card-number-wrapper">
                    <div id="card-number"></div>
                    <div class="invalid-feedback" id="card-number-error"></div>
                </div>

                <div class="form-group card-expiration-wrapper">
                    <div id="card-expiration"></div>
                    <div class="invalid-feedback" id="card-expiration-error"></div>
                </div>

                <div class="form-group card-cvv-wrapper">
                    <div id="card-cvv"></div>
                    <div class="invalid-feedback" id="card-cvv-error"></div>
                </div>
            </div>
        </div>

    </div>

    <?php if ( ! $check_subs['has_subs'] ) : ?>

        <div class="dr-panel-edit__el">

            <div class="field-radio">

                <input type="radio" id="radio-paypal" name="selector" value="paypal" >

                <label for="radio-paypal">

                    <span class="paypal-icon"></span>

                    <span class="black">

                        <?php echo __( 'PayPal', 'digital-river-global-commerce' ); ?>

                    </span>

                </label>

            </div>

        </div>

    <?php endif; ?>
    <!-- <div class="dr-panel-edit__el">

        <div class="field-radio">

            <input type="radio" id="radio-paypal-credit" name="selector" value="paypal-credit" <?php echo 'paypal-credit' == $payment_type ? 'checked' : ''; ?>>

            <label for="radio-paypal-credit">

                <span class="paypal-credit-small-icon"></span>

                <span class="paypal-credit-logo-icon"></span>

            </label>

        </div>

    </div> -->

    <button id="dr-submit-payment" type="submit" class="dr-panel-edit__btn dr-btn">

        <?php echo __( 'Pay with card', 'digital-river-global-commerce' ); ?>

    </button>

    <div id="dr-paypal-button" class="dr-panel-edit__btn"></div>

</form>

<div class="dr-panel-result">

    <p class="dr-panel-result__text"></p>

</div>

<div id="dr-payment-failed-msg" class="invalid-feedback"></div>

</div>
