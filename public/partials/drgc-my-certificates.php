<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      2.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/partials
 */

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
