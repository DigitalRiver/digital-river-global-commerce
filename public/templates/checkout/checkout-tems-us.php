<div class="dr-checkout__tems-us dr-checkout__el">

    <?php if ( $certificate_status !== 'ELIGIBLE' ): ?>

        <div id="checkout-tem-us-wrapper" style="display: none;">

            <div class="dr-accordion">

                <span class="dr-accordion__name">

                    <?php echo isset( $steps_titles['tems_us'] ) ? $steps_titles['tems_us'] : ''; ?>

                </span>

            </div>

            <form id="checkout-tem-us-form" enctype="multipart/form-data" class="dr-panel-edit dr-panel-edit--tems-us needs-validation" novalidate>

                <div class="tems-us-section">

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

                <div class="invalid-feedback dr-err-field" style="display: none"></div>

                <button type="submit" class="dr-panel-edit__btn dr-btn">

                    <?php _e( 'Save and continue', 'digital-river-global-commerce' ); ?>

                </button>

            </form>

            <div class="dr-panel-result">

                <p class="dr-panel-result__text"></p>

            </div>

            <div id="tems-us-error-msg" class="invalid-feedback"></div>

        </div>

    <?php endif; ?>

    <div id="tems-us-purchase-link">

        <p class="tax-exempt<?php echo ( $certificate_status === 'ELIGIBLE' ) && ( $tems_us_status !== 'ELIGIBLE_NOT_EXEMPTED' ) ? ' d-none' : ''; ?>">

            <a class="tax-exempt" href="javascript:void(0)"><?php _e( 'Click here if you\'re making a tax exempt purchase', 'digital-river-global-commerce' ); ?></a>

        </p>

        <p class="taxable<?php echo ( $tems_us_status === 'ELIGIBLE_NOT_EXEMPTED' ) || ( $certificate_status === 'NOT_ELIGIBLE' ) || empty( $certificate_status ) ? ' d-none' : ''; ?>">

            <a class="taxable" href="javascript:void(0)"><?php _e( 'Click here if you\'re making a taxable purchase', 'digital-river-global-commerce' ); ?></a>

        </p>

    </div>

    <p id="cert-uploaded-msg" class="cert-good dr-panel-result__text d-none"><?php _e( 'Your tax exempt certificate has been uploaded successfully.', 'digital-river-global-commerce' ); ?></p>

</div>
