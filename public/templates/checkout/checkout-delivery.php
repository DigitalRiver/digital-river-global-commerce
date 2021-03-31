<div class="dr-checkout__delivery dr-checkout__el">

    <div class="dr-accordion">

        <span class="dr-accordion__name">

            <span class="dr-accordion__title-long">

                <?php echo isset( $steps_titles['delivery'] ) ? $steps_titles['delivery'] : ''; ?>

            </span>

            <span class="dr-accordion__title-short">

                <?php echo __( 'Delivery', 'digital-river-global-commerce' ); ?>

            </span>


        </span>

       <span class="dr-accordion__edit delivery"><?php _e( 'Edit', 'digital-river-global-commerce' ); ?>></span>


    </div>

    <form id="checkout-delivery-form" class="dr-panel-edit dr-panel-edit--delivery">

        <div class="dr-panel-edit__el"></div>

        <button type="submit" class="dr-panel-edit__btn dr-btn">

            <?php echo __( 'Save and continue', 'digital-river-global-commerce' ); ?>

        </button>

        <div class="invalid-feedback dr-err-field"></div>

    </form>

    <div class="dr-panel-result">

        <p class="dr-panel-result__text"></p>

    </div>

</div>
