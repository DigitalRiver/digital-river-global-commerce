<?php
/**
 * Provide a publidr-facing view for the plugin
 *
 * This file is used to markup the publidr-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      2.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/partials
 */
?>
<?php 
  $company_name = __( 'Company Name', 'digital-river-global-commerce' );
  $tax_certificate = __( 'Certificate', 'digital-river-global-commerce' );
  $tax_authority = __( 'Tax Authority', 'digital-river-global-commerce' );
  $certificate_status = __( 'Status', 'digital-river-global-commerce' );
  $start_date = __( 'Start Date', 'digital-river-global-commerce' );
  $end_date = __( 'Expiration Date', 'digital-river-global-commerce' );
?>

<div class="certificate certificate-headings">

    <div class="certificate-company-name"><?php echo $company_name; ?></div>

    <div class="certificate-tax-cert"><?php echo $tax_certificate; ?></div>

    <div class="certificate-tax-authority"><?php echo $tax_authority; ?></div>

    <div class="certificate-status"><?php echo $certificate_status; ?></div>

    <div class="certificate-start-date"><?php echo $start_date; ?></div>

    <div class="certificate-end-date"><?php echo $end_date; ?></div>

</div>

<?php foreach ( $customer_tax_regs['taxCertificates'] as $certificate ): ?>

    <div class="certificate">

        <div class="certificate-company-name" data-heading="<?php echo $company_name; ?>">
            <?php echo $certificate['companyName']; ?>
        </div>

        <div class="certificate-tax-cert" data-heading="<?php echo $tax_certificate; ?>">
            <?php echo $certificate['fileName']; ?>
        </div>

        <div class="certificate-tax-authority" data-heading="<?php echo $tax_authority; ?>">
            <?php echo $certificate['taxAuthority']; ?>
        </div>

        <div class="certificate-status<?php echo ' ' . str_replace('_', '-', strtolower( $certificate['status'] ) ); ?>" data-heading="<?php echo $certificate_status; ?>">
            <?php echo ucwords( str_replace('_', ' ', strtolower( $certificate['status'] ) ) ); ?>
        </div>

        <div class="certificate-start-date" data-heading="<?php echo $start_date; ?>">
            <?php echo $certificate['startDate']; ?>
        </div>

        <div class="certificate-end-date" data-heading="<?php echo $end_date; ?>">
            <?php echo $certificate['endDate']; ?>
        </div>

    </div>

<?php endforeach; ?>

<div id="certificate-modal" class="drgc-modal dr-modal fade" tabindex="-1" role="dialog" aria-labelledby="dr-certModalLabel" aria-hidden="true">
    <div class="dr-modal-dialog dr-modal-xl">
        <div class="dr-modal-content">
            <div class="dr-modal-header">
                <div class="dr-modal-title dr-h5" id="dr-certModalLabel"><?php _e( 'Please Submit Your Tax Exemption Details', 'digital-river-global-commerce' ) ?></div>
                <button type="button" class="close" data-dismiss="dr-modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="dr-modal-body">
                <form id="account-tem-us-form" enctype="multipart/form-data" class="needs-validation" novalidate>
                    <div class="tems-us-section">
                        <div class="form-group row">
                            <label for="tems-us-company-name" class="col-sm-4 col-form-label">
                                <?php _e( 'Company Name', 'digital-river-global-commerce' ); ?>: *
                            </label>
                            <div class="col-sm-8">
                                <input id="tems-us-company-name" type="text" name="companyName" value="<?php echo $account_company_name; ?>" class="form-control" required>
                                <div class="invalid-feedback row">
                                    <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="certificate-tax-authority" class="col-sm-4 col-form-label">
                                <?php _e( 'Exemption Certificate Tax Authority', 'digital-river-global-commerce' ); ?>: *
                            </label>
                            <div class="col-sm-8">
                                <select class="form-control" name="taxAuthority" id="certificate-tax-authority" required>
                                    <?php echo '<option value="">' . __( 'Select One', 'digital-river-global-commerce' ) . '</option>'; ?>
                                    <?php foreach ( $usa_states as $key => $state ): ?>
                                        <?php echo "<option value=\"{$key}\">{$state}</option>"; ?>
                                    <?php endforeach; ?>
                                </select>
                                <div class="help-text row">
                                    <p>*<?php _e( 'This should be the State or official entity authorizing your business as tax exempt. Note that your purchase may still be subject to taxes if yor exemption does not cover your Billing/Shipping State.', 'digital-river-global-commerce' ) ?></p>
                                </div>
                                <div class="invalid-feedback row">
                                    <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="tems-us-start-date" class="col-sm-4 col-form-label">
                                <?php _e( 'Exemption Start Date', 'digital-river-global-commerce' ); ?>: *
                            </label>
                            <div class="col-sm-8">
                                <input type="text" name="startDate" id="tems-us-start-date" class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')" required>
                                <div class="invalid-feedback row">
                                    <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="tems-us-end-date" class="col-sm-4 col-form-label">
                                <?php _e( 'Exemption Expiration Date', 'digital-river-global-commerce' ); ?>: *
                            </label>
                            <div class="col-sm-8">
                                <input type="text" name="endDate" id="tems-us-end-date" class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')" required>
                                <div class="invalid-feedback row">
                                    <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="tems-us-certificate" class="col-sm-4 col-form-label">
                                <?php _e( 'Upload Your Certificate', 'digital-river-global-commerce' ); ?>: *
                            </label>
                            <div class="col-sm-8">
                                <input id="tems-us-certificate" type="file" name="certificate" class="form-control" required>
                                <div class="help-text row">(<?php _e( 'Supported File Types: BMP, GIF, JPG, PNG, PDF', 'digital-river-global-commerce' ); ?>)</div>
                                <div class="invalid-feedback row">
                                    <?php _e( 'This field is required.', 'digital-river-global-commerce' ); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div id="tems-us-error-msg" class="invalid-feedback"></div>
            </div>
            <div class="dr-modal-footer">
                <button type="button" class="dr-btn submit"><?php _e( 'Submit', 'digital-river-global-commerce' ) ?></button>
                <button type="button" class="dr-btn dr-btn-black cancel" data-dismiss="dr-modal"><?php _e( 'Cancel', 'digital-river-global-commerce' ) ?></button>
            </div>
        </div>
    </div>
</div>

<div id="company-name-confirm" class="drgc-modal dr-modal" tabindex="-1" role="dialog">
    <div class="dr-modal-dialog dr-modal-dialog-centered">
        <div class="dr-modal-content">
            <div class="dr-modal-body">
                <p><?php _e( 'The system is going to update the company name for your previous tax profiles as well. Are you sure you want to change your company name?', 'digital-river-global-commerce' ); ?></p>
            </div>
            <div class="dr-modal-footer">
                <button type="button" class="dr-btn dr-btn-blue confirm" data-dismiss="dr-modal"><?php echo __( 'Accept', 'digital-river-global-commerce' ); ?></button>
                <button type="button" class="dr-btn dr-btn-black cancel" data-dismiss="dr-modal"><?php echo __( 'Cancel', 'digital-river-global-commerce' ); ?></button>
            </div>
        </div>
    </div>
</div>
