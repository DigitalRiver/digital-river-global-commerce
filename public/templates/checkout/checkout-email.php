<div class="dr-checkout__el dr-checkout__email active">

    <div class="dr-accordion">

        <span class="dr-accordion__name">

            <?php echo isset( $steps_titles['email'] ) ? $steps_titles['email'] : ''; ?>

        </span>

        <?php if ( ! $is_logged_in ): ?>

            <span class="dr-accordion__edit"><?php echo __( 'Edit', 'digital-river-global-commerce' ); ?>></span>

        <?php endif; ?>

    </div>

    <?php if ( ! $is_logged_in ): ?>

        <form id="checkout-email-form" class="dr-panel-edit dr-panel-edit--email needs-validation" novalidate>

            <div class="form-group">

                <input type="email" name="email" id="customer-email" value="<?php echo $customer_email ?>" class="form-control dr-panel-edit__el" placeholder="<?php echo __( 'Please enter your email address', 'digital-river-global-commerce' ); ?>" required>

                <div class="invalid-feedback">

                    <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                </div>

            </div>


            <button type="submit" class="dr-panel-edit__btn dr-btn" disabled="disabled">

                <?php echo __( 'Save and continue', 'digital-river-global-commerce' ); ?>

            </button>

        </form>

    <?php else: ?>

        <input type="hidden" name="email" id="customer-email" value="<?php echo $customer_email; ?>">

    <?php endif; ?>

    <div class="dr-panel-result">

        <p id="dr-panel-email-result" class="dr-panel-result__text"><?php echo ( $is_logged_in ) ? $customer_email : ''; ?></p>

    </div>

    <?php if ( $is_tems_us_enabled ): ?>

        <div id="tax-certificate-status" class="<?php echo ( $tems_us_status === 'ELIGIBLE_NOT_EXEMPTED' ) ? 'd-none' : ''; ?>">

            <?php if ( $certificate_status === 'ELIGIBLE' ): ?>

                <input type="hidden" id="tems-us-company-name" name="tems-us-company-name" value="<?php echo $customer_tax_regs['eligibleCertificate']['companyName']; ?>">

                <p class="cert-msg cert-good dr-panel-result__text"><?php _e( 'Your tax exempt certificate on file is good.', 'digital-river-global-commerce' )?> <span>(<a class="cert-details" href="javascript:void(0)"><?php _e( 'View Details', 'digital-river-global-commerce' ); ?></a>)</span></p>

                <p class="cert-msg cert-not-valid dr-panel-result__text d-none"><?php _e( 'Your tax exempt certificate on file is not valid for this order.', 'digital-river-global-commerce' )?> <span>(<a class="cert-details" href="javascript:void(0)"><?php _e( 'View Details', 'digital-river-global-commerce' ); ?></a>)</span></p>

                <p class="cert-msg cert-note dr-panel-result__text"><?php _e( 'Note that your purchase may still be subject to taxes if yor exemption does not cover your Shipping/Billing State.', 'digital-river-global-commerce' ); ?></p>

            <?php elseif ( $certificate_status === 'NOT_ELIGIBLE' ): ?>

                <p class="cert-msg cert-error dr-panel-result__text"><?php _e( 'There is a problem with your tax exempt certificate on file. Please resubmit your info.', 'digital-river-global-commerce' )?></p>

            <?php else: ?>

                <p class="cert-msg cert-not-found d-none"></p>

            <?php endif; ?>

        </div>

    <?php endif; ?>

</div>
