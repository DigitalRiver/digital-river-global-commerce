<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/templates/parts
 */


$first_name = isset( $customer['firstName'] ) ? $customer['firstName'] : '';
$last_name = isset( $customer['lastName'] ) ? $customer['lastName'] : '';
$subs_count = isset( $subscriptions['subscriptions']['subscription'] ) && is_array( $subscriptions['subscriptions']['subscription'] ) ?
  count( $subscriptions['subscriptions']['subscription'] ) : 0;
$customer_address = $customer['addresses']['address'] ?? '';
$addr_count = is_array( $customer_address ) ? count( $customer_address ) : 0;

if ($first_name !== '' && $last_name !== '') {
    $full_name = $first_name . ' ' . $last_name;
} else {
    $full_name = $first_name . $last_name;
}

$total_pages = $orders['orders']['totalResultPages'];
$is_tems_us_enabled = is_array( $customer_tax_regs ) && ( $customer_tax_regs['US'] === 'ENABLED' );
$cert_count = $is_tems_us_enabled ? count( $customer_tax_regs['taxCertificates'] ) : 0;
$account_company_name = ( $cert_count > 0 ) ? $customer_tax_regs['taxCertificates'][0]['companyName'] : '';
?>

<div class="dr-account-wrapper container" id="dr-account-page-wrapper">

    <div class="side-nav">
        <div class="dr-h6"><?php echo __( 'Hello', 'digital-river-global-commerce' ); ?><?php if ($full_name !== '') echo ', ' . $full_name ?></div>

        <ul class="dr-list-group" id="list-tab" role="tablist">
            <li>
                <a class="dr-list-group-item dr-list-group-item-action" id="list-orders-list" data-toggle="dr-list" href="#list-orders" role="tab" aria-controls="orders">
                    <div class="side-nav-icon"><img src="<?php echo DRGC_PLUGIN_URL . 'assets/images/order-icon.svg' ?>" alt="orders icon"></div>
                    <span class="side-nav-label"><?php echo __( 'Orders', 'digital-river-global-commerce' ); ?></span>
                    <span class="side-nav-chev">&#8250;</span>
                </a>
            </li>
            <li>
                <a class="dr-list-group-item dr-list-group-item-action" id="list-subscriptions-list" data-toggle="dr-list" href="#list-subscriptions" role="tab" aria-controls="subscriptions">
                    <div class="side-nav-icon"><img src="<?php echo DRGC_PLUGIN_URL . 'assets/images/subscription-icon.svg' ?>" alt="subscriptions icon"></div>
                    <span class="side-nav-label"><?php echo __( 'Subscriptions', 'digital-river-global-commerce' ); ?></span>
                    <span class="side-nav-chev">&#8250;</span>
                </a>
            </li>
            <li>
                <a class="dr-list-group-item dr-list-group-item-action" id="list-addresses-list" data-toggle="dr-list" href="#list-addresses" role="tab" aria-controls="addresses">
                    <div class="side-nav-icon"><img src="<?php echo DRGC_PLUGIN_URL . 'assets/images/address-icon.svg' ?>" alt="address icon"></div>
                    <span class="side-nav-label"><?php echo __( 'Addresses', 'digital-river-global-commerce' ); ?></span>
                    <span class="side-nav-chev">&#8250;</span>
                </a>
            </li>

            <?php if ( $is_tems_us_enabled ): ?>

                <li>
                    <a class="dr-list-group-item dr-list-group-item-action" id="list-certificates-list" data-toggle="dr-list" href="#list-certificates" role="tab" aria-controls="certificates">
                        <div class="side-nav-icon"><img src="<?php echo DRGC_PLUGIN_URL . 'assets/images/certificate-icon.svg' ?>" alt="certificate icon"></div>
                        <span class="side-nav-label"><?php echo __( 'Tax Certificates', 'digital-river-global-commerce' ); ?></span>
                        <span class="side-nav-chev">&#8250;</span>
                    </a>
                </li>

            <?php endif; ?>

            <li>
                <a class="dr-list-group-item dr-list-group-item-action" id="list-password-list" data-toggle="dr-list" href="#list-password" role="tab" aria-controls="password">
                    <div class="side-nav-icon"><img src="<?php echo DRGC_PLUGIN_URL . 'assets/images/password-icon.svg' ?>" alt="password icon"></div>
                    <span class="side-nav-label"><?php echo __( 'Change Password', 'digital-river-global-commerce' ); ?></span>
                    <span class="side-nav-chev">&#8250;</span>
                </a>
            </li>
            <li>
                <a class="dr-list-group-item dr-list-group-item-action dr-logout" id="list-logout-list" href="#" aria-controls="l">
                    <div class="side-nav-icon"><img src="<?php echo DRGC_PLUGIN_URL . 'assets/images/logout-icon.svg' ?>" alt="logout icon"></div>
                    <span class="side-nav-label"><?php echo __( 'Sign out', 'digital-river-global-commerce' ); ?></span>
                    <span class="side-nav-chev">&#8250;</span>
                </a>
            </li>
        </ul>
    </div>

    <div class="dr-tab-content dr-loading" id="nav-tabContent">

        <div class="dr-tab-pane fade" id="list-orders" role="tabpanel" aria-labelledby="list-orders-list">
            <div class="dr-h4"><span class="back">&lsaquo;</span><?php echo __( 'My Orders', 'digital-river-global-commerce' ); ?><span class="back close">&times;</span></div>

            <div class="overflowContainer">
                <?php if ( 0 < $orders['orders']['totalResults'] ) : ?>
                    <?php include DRGC_PLUGIN_DIR . 'public/templates/account/account-orders.php'; ?>

                    <div class="dr-pagination">
                        <?php if ( $total_pages > 1 ): ?>
                            <a class="page-link prev" href="javascript:void(0)">
                                <button class="btn" disabled>&laquo;</button>
                            </a>
                        <?php endif; ?>
                        <a class="page-link active" href="javascript:void(0)" data-page-number="1">1</a>
                        <?php for ( $x = 1; $x < $total_pages; $x++ ) { ?>
                            <a class="page-link" href="javascript:void(0)" data-page-number="<?php echo ( $x + 1 ); ?>"><?php echo ( $x + 1 ); ?></a>
                        <?php } ?>
                        <?php if ( $total_pages > 1 ): ?>
                            <a class="page-link next" href="javascript:void(0)">
                                <button class="btn">&raquo;</button>
                            </a>
                        <?php endif; ?>
                    </div>

                <?php else: ?>
                    <?php echo __( 'You have no recorded orders. If you just place an order, please wait a few miniutes and reload the page. The order detail will be there.', 'digital-river-global-commerce' ); ?>
                <?php endif; ?>
            </div>

        </div>

        <div class="dr-tab-pane fade" id="list-subscriptions" role="tabpanel" aria-labelledby="list-subscriptions-list">
            <div class="dr-h4"><span class="back">&lsaquo;</span><?php echo __( 'My Subscriptions', 'digital-river-global-commerce' ); ?><span class="back close">&times;</span></div>

            <div class="overflowContainer">

                <?php if ( $subs_count ) : ?>
                    <?php include DRGC_PLUGIN_DIR . 'public/templates/account/account-subscriptions.php'; ?>
                <?php else: ?>
                    <?php echo __( 'You have no subscription products.', 'digital-river-global-commerce' ); ?>
                <?php endif; ?>
            </div>

        </div>

        <div class="dr-tab-pane fade" id="list-addresses" role="tabpanel" aria-labelledby="list-addresses-list">
            <div class="dr-h4"><span class="back">&lsaquo;</span><?php echo __( 'My Addresses', 'digital-river-global-commerce' ); ?><span class="back close">&times;</span></div>

            <div class="overflowContainer">

                <?php if ( $addr_count ) : ?>
                    <div class="container-fluid">
                        <div class="row addresses">
                            <?php include DRGC_PLUGIN_DIR . 'public/templates/account/account-addresses.php'; ?>
                        </div>
                    </div>

                <?php else: ?>
                    <?php echo __( 'You have no saved addresses.', 'digital-river-global-commerce' ); ?>
                <?php endif; ?>
            </div>

        </div>

        <?php if ( $is_tems_us_enabled ): ?>

            <div class="dr-tab-pane fade" id="list-certificates" role="tabpanel" aria-labelledby="list-certificates-list">
                <div class="dr-h4">
                    <span class="back">&lsaquo;</span><?php _e( 'My Tax Certificates', 'digital-river-global-commerce' ); ?><span class="back close">&times;</span>
                    <button class="certificate-add-btn" id="add-new-cert" role="img" aria-label="Add New Certificate" title="Add New Certificate"></button>
                </div>
                <input type="hidden" id="account-company-name" name="account-company-name" value="<?php echo $account_company_name; ?>">
                <div class="overflowContainer">

                    <?php if ( $cert_count ): ?>

                        <?php include DRGC_PLUGIN_DIR . 'public/templates/account/account-tax-certificates.php'; ?>

                    <?php else: ?>

                        <?php _e( 'You have no tax exempt certificates.', 'digital-river-global-commerce' ); ?>

                    <?php endif; ?>

                </div>
            </div>

        <?php endif; ?>

        <div class="dr-tab-pane fade" id="list-password" role="tabpanel" aria-labelledby="list-password-list">
            <div class="dr-h4"><span class="back">&lsaquo;</span><?php echo __( 'Change Password', 'digital-river-global-commerce' ); ?><span class="back close">&times;</span></div>

            <div class="overflowContainer">
                <?php include DRGC_PLUGIN_DIR . 'public/templates/account/account-password.php'; ?>
            </div>

        </div>

    </div>

</div>

<?php if ( $is_tems_us_enabled ): ?>

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
                                        <p>*<?php _e( 'This should be the State or official entity authorizing your business as tax exempt. Note that your purchase may still be subject to taxes if your exemption does not cover your Shipping/Billing State.', 'digital-river-global-commerce' ) ?></p>
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

<?php endif; ?>
