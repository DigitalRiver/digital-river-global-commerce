<?php
$personal_type_checked = array_key_exists( 'Individual', $tax_schema );
?>

<div class="dr-checkout__tax-id dr-checkout__el">

    <div class="dr-accordion">

        <span class="dr-accordion__name">

            <span class="dr-accordion__title-long">

                <?php echo isset( $steps_titles['tax_id'] ) ? $steps_titles['tax_id'] : ''; ?>

            </span>

            <span class="dr-accordion__title-short">

                <?php echo __( 'Tax ID', 'digital-river-global-commerce' ); ?>

            </span>

        </span>

        <span class="dr-accordion__edit tax-id"><?php _e( 'Edit', 'digital-river-global-commerce' ); ?>></span>

    </div>

    <form id="checkout-tax-id-form" class="dr-panel-edit dr-panel-edit--tax-id needs-validation" novalidate>

        <div class="form-group dr-panel-edit__el tax-id-shopper-type">

            <label class="tax-id-shopper-type-label control-label"><?php _e( 'Shopper Type', 'digital-river-global-commerce' ); ?>: </label>

        </div>

        <?php foreach ( $tax_schema as $shopper_type => $details ): 
            $shopper_type_label = ( $shopper_type === 'Individual' ) ? __( 'Personal purchase', 'digital-river-global-commerce' ) : __( 'Business purchase', 'digital-river-global-commerce' );
        ?>

            <div class="form-check form-check-inline shopper-type-radio">

                <input class="form-check-input" type="radio" name="shopper-type" id="shopper-type-<?php echo $shopper_type; ?>" value="<?php echo $details['customerType']; ?>">

                <label class="form-check-label" for="shopper-type-<?php echo $shopper_type; ?>"><?php echo $shopper_type_label; ?></label>

            </div>

            <?php if ( isset( $details['taxRegistrations'] ) ): ?>

                <?php foreach ( $details['taxRegistrations'] as $key => $value ): 
                    $tax_regs = $details['taxRegistrations'][ $key ][ key( $value ) ];
                ?>

                    <div class="form-group dr-panel-edit__el tax-id-field <?php echo $shopper_type; ?> <?php echo ( $personal_type_checked && $shopper_type === 'Business' ) ? 'd-none' : '' ?>">

                        <div class="float-container float-container--<?php echo key( $value ); ?>">

                            <label for="tax-id-field-<?php echo key( $value ); ?>" class="float-label">

                                <?php echo $tax_regs['title']; ?>

                            </label>

                            <input id="tax-id-field-<?php echo key( $value ); ?>" type="text" name="tax-id-<?php echo key( $value ); ?>" value="" class="form-control float-field float-field--<?php echo key( $value ); ?>" data-key="<?php echo key( $value ); ?>" data-title="<?php echo $tax_regs['title']; ?>" data-description="<?php echo $tax_regs['description']; ?>" data-pattern="<?php echo $tax_regs['pattern']; ?>">

                            <span class="tax-id-field-info">*<?php echo $tax_regs['description']; ?></span>

                            <div class="invalid-feedback"></div>

                        </div>

                    </div>

                <?php endforeach; ?>

            <?php endif; ?>

        <?php endforeach; ?>

        <button type="submit" class="dr-panel-edit__btn dr-btn">

            <?php _e( 'Save and continue', 'digital-river-global-commerce' ); ?>

        </button>

    </form>

    <div class="dr-panel-result">

        <p class="dr-panel-result__text"></p>

        <div class="invalid-feedback dr-err-field" style="display: none"></div>

    </div>

    <div id="tax-id-error-msg" class="invalid-feedback" style="display: none"></div>

</div>
