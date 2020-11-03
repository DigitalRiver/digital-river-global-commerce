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
        <div class="dr-tab-pane fade" id="list-password" role="tabpanel" aria-labelledby="list-password-list">
            <div class="dr-h4"><span class="back">&lsaquo;</span><?php echo __( 'Change Password', 'digital-river-global-commerce' ); ?><span class="back close">&times;</span></div>

            <div class="overflowContainer">
                <?php include DRGC_PLUGIN_DIR . 'public/templates/account/account-password.php'; ?>
            </div>

        </div>

    </div>

</div>
