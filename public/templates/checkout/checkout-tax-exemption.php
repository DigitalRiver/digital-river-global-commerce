<?php
$company_ein = '';
$custom_attributes = isset( $cart['cart']['customAttributes'] ) ? $cart['cart']['customAttributes']['attribute'] : [];

if ( count( $custom_attributes ) > 0 ) {
    foreach( $custom_attributes as $attr ) {
        if ( 'companyEIN' === $attr['name'] ) {
            $company_ein = $attr['value'];
            break;
        }
    }
}
?>
<div class="dr-checkout__tax-exempt dr-checkout__el">

    <div class="dr-accordion">

        <span class="dr-accordion__name">

            <?php echo isset( $steps_titles['tax_exempt'] ) ? $steps_titles['tax_exempt'] : ''; ?>

        </span>

        <span class="dr-accordion__edit tax-exempt"><?php _e( 'Edit', 'digital-river-global-commerce' ); ?>></span>

    </div>

    <form id="checkout-tax-exempt-form" enctype="multipart/form-data" class="dr-panel-edit dr-panel-edit--tax-id needs-validation" novalidate>

        <input type="hidden" id="tems-us-status" name="tems-us-status" value="<?php echo $tems_us_status; ?>">

        <div class="form-group dr-panel-edit__el">

            <div class="field-checkbox">

                <input type="checkbox" name="tax-exempt-checkbox" id="tax-exempt-checkbox">

                <label for="tax-exempt-checkbox" class="checkbox-label">

                    <?php _e( 'Are you making a tax exempt purchase?', 'digital-river-global-commerce' ); ?>

                </label>

            </div>

        </div>

        <div id="tax-certificate-status" style="display: none;">

            <?php if ( $certificate_status === 'ELIGIBLE' ): ?>

                <p class="cert-good d-none"></p>

            <?php elseif ( $certificate_status === 'NOT_ELIGIBLE' ): ?>

                <p class="alert alert-danger"><?php _e( 'There is a problem with your tax exempt certificate on file. Please resubmit your info.', 'digital-river-global-commerce' )?></p>

            <?php else: ?>

                <p class="alert alert-info"><?php _e( 'Please submit your tax exemption details.', 'digital-river-global-commerce' ); ?></p>

            <?php endif; ?>

        </div>

        <p id="tax-exempt-note" class="d-none">*<?php _e( 'Note that your purchase may still be subject to taxes if your exemption does not cover your Shipping/Billing State.', 'digital-river-global-commerce' ); ?> <span>(<a class="cert-details" href="javascript:void(0)"><?php _e( 'View Your Certificate', 'digital-river-global-commerce' ); ?></a>)</span></p>

        <?php if ( $certificate_status !== 'ELIGIBLE' ): ?>

            <div id="checkout-tax-exempt-app" style="display: none;">  

                <div class="required-text"><?php echo __( 'Fields marked with * are mandatory', 'digital-river-global-commerce' ); ?></div>

                <div class="form-group dr-panel-edit__el">

                    <div class="float-container float-container--company-name">

                        <label for="tems-us-company-name" class="float-label">

                            <?php _e( 'Company Name', 'digital-river-global-commerce' ); ?> *

                        </label>

                        <input id="tems-us-company-name" type="text" name="companyName" value="" class="form-control float-field float-field--company-name" required>

                        <div class="invalid-feedback">

                            <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>

                        </div>

                    </div>

                </div>

                <div class="form-group dr-panel-edit__el">

                    <select class="form-control custom-select" name="taxAuthority" id="certificate-tax-authority" required>

                        <option value="">
                            <?php _e( 'Select Certificate Tax Authority', 'digital-river-global-commerce' ); ?> *
                        </option>

                        <?php foreach ( $usa_states as $key => $state ): ?>
                            <?php
                                echo "<option value=\"{$key}\">{$state}</option>";
                            ?>
                        <?php endforeach; ?>

                    </select>

                    <div class="help-text">

                        <p>*<?php _e( 'This should be the State or official entity authorizing your business as tax exempt. Note that your purchase may still be subject to taxes if yor exemption does not cover your Shipping/Billing State.', 'digital-river-global-commerce' ) ?></p>

                    </div>

                    <div class="invalid-feedback">

                        <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>

                    </div>

                </div>

                <div class="form-group dr-panel-edit__el">

                    <div class="float-container float-container--start-date">

                        <label for="tems-us-start-date" class="float-label">

                            <?php _e( 'Exemption Start Date', 'digital-river-global-commerce' ); ?> *

                        </label>

                        <input type="text" name="startDate" id="tems-us-start-date" class="form-control float-field float-field--start-date" onfocus="(this.type='date')" onblur="(this.type='text')" required>

                        <div class="invalid-feedback">

                            <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>

                        </div>

                    </div>

                </div>

                <div class="form-group dr-panel-edit__el">

                    <div class="float-container float-container--end-date">

                        <label for="tems-us-end-date" class="float-label">

                            <?php _e( 'Exemption Expiration Date', 'digital-river-global-commerce' ); ?> *

                        </label>

                        <input type="text" name="endDate" id="tems-us-end-date" class="form-control float-field float-field--end-date" onfocus="(this.type='date')" onblur="(this.type='text')" required>

                        <div class="invalid-feedback">

                            <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>

                        </div>

                    </div>

                </div>

                <div class="form-group dr-panel-edit__el">

                    <div class="float-container float-container--certificate">

                        <label for="tems-us-certificate">

                            <?php _e( 'Upload Your Certificate', 'digital-river-global-commerce' ); ?>: *

                        </label>

                        <input id="tems-us-certificate" type="file" name="certificate" class="form-control float-field float-field--certificate" required>

                        <div class="help-text">(<?php _e( 'Supported File Types: BMP, GIF, JPG, PNG, PDF', 'digital-river-global-commerce' ); ?>)</div>

                        <div class="invalid-feedback">

                            <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>

                        </div>

                    </div>

                </div>

            </div>

        <?php endif; ?>

        <div class="form-group dr-panel-edit__el form-group-business company-name">

            <div class="float-container float-container--company-name">

                <label for="business-company-name" class="float-label">

                    <?php echo __( 'Company Name', 'digital-river-global-commerce' ); ?>

                </label>

                <input id="business-company-name" type="text" name="business-company-name" value="<?php echo $company_name; ?>" class="form-control float-field float-field--company-name" <?php echo ( $tems_us_status === 'ELIGIBLE_EXEMPTED' ) ? 'readonly' : '';?>>

            </div>

        </div>

        <div class="form-group dr-panel-edit__el form-group-business ein">

            <div class="float-container float-container--ein">

                <label for="business-ein" class="float-label">

                    <?php _e( 'EIN', 'digital-river-global-commerce' ); ?>

                </label>

                <input id="business-ein" type="text" name="business-ein" value="<?php echo $company_ein; ?>" class="form-control float-field float-field--ein">

            </div>

        </div>

        <button type="submit" class="dr-panel-edit__btn dr-btn">

            <?php _e( 'Save and continue', 'digital-river-global-commerce' ); ?>

        </button>

    </form>

    <div class="dr-panel-result">

        <p class="tax-exempt dr-panel-result__text d-none"><?php _e( 'You are claiming a tax exemption.', 'digital-river-global-commerce' )?></p>

        <p class="taxable dr-panel-result__text d-none"><?php _e( 'You\'re making a taxable purchase.', 'digital-river-global-commerce' )?></p>

        <p class="dr-panel-result__text"></p>

        <p class="alert alert-success uploaded d-none"><?php _e( 'Your tax exempt certificate has been uploaded successfully.', 'digital-river-global-commerce' ); ?></p>

    </div>

    <div id="tems-us-error-msg" class="invalid-feedback"></div>

</div>