<?php
/**
 * Provide a publidr-facing view for the plugin
 *
 * This file is used to markup the publidr-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/partials
 */
?>

<?php foreach ($subscriptions['subscriptions']['subscription'] as $key => $sub): ?>

<?php
  $subs_id = $sub['id'];
  $product_id = $sub['products']['product']['id'];
  $product_name = $sub['products']['product']['displayName'];
  $product_image = $sub['products']['product']['full']['product']['productImage'] ?? '';
  $is_auto = false;
  $custom_attributes = $sub['products']['product']['customAttributes']['attribute'] ?? [];
  $status = $sub['status'];

  if ( $custom_attributes ) {
    foreach ( $custom_attributes as $att ) { 
      if ( $att['name'] === 'isAutomatic' && $att['value'] === 'true' ) {
        $is_auto = true;
        break;
      }
    }
  }
?>

<div class="subscription" data-id="<?php echo $subs_id ?>">

  <?php if ( $product_image ): ?>
    <div class="subscription-img">
      <img class="img-fluid" src="<?php echo $product_image ?>" alt="<?php echo $product_name ?>">
    </div>
  <?php endif; ?>

  <div class="subscription-info">
    <div class="subscription-title"><?php echo $product_name ?></div>
    <div class="subscription-content">
      <p><strong>PID:</strong> <?php echo $product_id ?></p>
      <p><strong>SKU:</strong> <?php echo $sub['products']['product']['sku'] ?></p>
    </div>
  </div>

  <div class="subscription-dates">
    <div class="subscription-title"><?php echo __( 'Date', 'digital-river-global-commerce' ); ?></div>
    <div class="subscription-content">
      <?php if ($sub['activationDate']) : ?>
        <p class="activationDate">
          <strong><?php echo __( 'Activated:', 'digital-river-global-commerce' ); ?></strong> 
          <?php echo date_format(date_create($sub['activationDate']),"m/d/Y"); ?>
        </p>
      <?php endif; ?>
      <?php if ($sub['nextRenewalDate']) : ?>
        <p class="nextRenewalDate" data-on="<?php echo __( 'Renews on:', 'digital-river-global-commerce' ); ?>" data-off="<?php echo __( 'Renewal Due:', 'digital-river-global-commerce' ); ?>">
          <strong>
            <?php 
              if ($sub['autoRenewal'] === 'enabled') {
                echo __( 'Renews on:', 'digital-river-global-commerce' );
              } else {
                echo __( 'Renewal Due:', 'digital-river-global-commerce' );
              }
            ?>
          </strong> 
          <?php echo date_format(date_create($sub['nextRenewalDate']),"m/d/Y"); ?>
        </p>
      <?php endif; ?>
      <?php if ($sub['cancellationDate']) : ?>
        <p class="cancellationDate">
          <strong><?php echo __( 'Cancels on:', 'digital-river-global-commerce' ); ?></strong> 
          <?php echo date_format(date_create($sub['cancellationDate']),"m/d/Y"); ?>
        </p>
      <?php endif; ?>
    </div>
  </div>

  <div class="subscription-status">
    <div class="subscription-title"><?php echo __( 'Status', 'digital-river-global-commerce' ); ?></div>
    <div class="subscription-content <?php echo  str_replace(' ', '', strtolower( $status )); ?>"><?php echo $status ?></div>
  </div>

  <div class="subscription-ar">
    <?php if ( $is_auto ): ?>
      <div class="subscription-title"><?php echo __( 'Auto Renewal', 'digital-river-global-commerce' ); ?></div>
      <?php if ( $status === 'Active' ): ?>
        <label class="switch" for="ar-switch-<?php echo $key ?>">
          <input type="checkbox" id="ar-switch-<?php echo $key ?>" <?php if ($sub['autoRenewal'] === 'enabled') echo ' checked'; ?>>
          <div class="slider" data-on="<?php echo __( 'on', 'digital-river-global-commerce' ); ?>" data-off="<?php echo __( 'off', 'digital-river-global-commerce' ); ?>"></div>
        </label>
      <?php else: ?>
        <div class="subscription-content">
          <button type="button" class="dr-btn dr-renew-btn" data-subs-id="<?php echo $subs_id ?>" data-product-id="<?php echo $product_id ?>" data-renewal-qty="<?php echo $sub['nextRenewalQuantity'] ?>"><?php echo __( 'Renew Now', 'digital-river-global-commerce' ); ?></button>
        </div>
      <?php endif; ?>
    <?php else : ?>
      <div class="subscription-title"><?php echo __( 'Manual Renewal', 'digital-river-global-commerce' ); ?></div>
      <div class="subscription-content">
        <button type="button" class="dr-btn dr-renew-btn" data-subs-id="<?php echo $subs_id ?>" data-product-id="<?php echo $product_id ?>" data-renewal-qty="<?php echo $sub['nextRenewalQuantity'] ?>"><?php echo __( 'Renew Now', 'digital-river-global-commerce' ); ?></button>
      </div>
    <?php endif; ?>
  </div>

  <div class="subscription-id">ID: <?php echo $subs_id ?></div>

</div>

<?php endforeach; ?>

<!-- subscription error modal -->
<div id="subscriptionError" class="dr-modal" tabindex="-1" role="dialog">
  <div class="dr-modal-dialog dr-modal-dialog-centered">
    <div class="dr-modal-content">
      <div class="dr-modal-header">
        <div class="dr-h5 dr-modal-title"><?php echo __( 'Auto Renewal Update', 'digital-river-global-commerce' ); ?></div>
        <button type="button" class="close" data-dismiss="dr-modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="dr-modal-body">
        <p><?php echo __( 'There was a problem changing your auto renew settings for this product. Please try again, or contact customer support.', 'digital-river-global-commerce' ); ?></p>
      </div>
      <div class="dr-modal-footer">
        <button type="button" class="dr-btn dr-btn-black" onclick="location.reload()"><?php echo __( 'Try again', 'digital-river-global-commerce' ); ?></button>
      </div>
    </div>
  </div>
</div>

<!-- subscription Disable AR confirmation modal -->
<div id="subscriptionConfirm" class="dr-modal" tabindex="-1" role="dialog">
  <div class="dr-modal-dialog dr-modal-dialog-centered">
    <div class="dr-modal-content">
      <div class="dr-modal-body">
        <p><?php echo __( 'If you stop automatic billing for your subscription it will remain active until the expiration date, however you will have to manually renew at that time or your subscription will be cancelled.', 'digital-river-global-commerce' ); ?></p>
        <p><?php echo __( 'Are you sure you want to stop automatic billing for this subscription?', 'digital-river-global-commerce' ); ?></p>
      </div>
      <div class="dr-modal-footer">
        <button type="button" class="dr-btn dr-btn-blue dr-confirm-ar-off" data-dismiss="dr-modal"><?php echo __( 'Accept', 'digital-river-global-commerce' ); ?></button>
        <button type="button" class="dr-btn dr-btn-black dr-confirm-cancel" data-dismiss="dr-modal"><?php echo __( 'Cancel', 'digital-river-global-commerce' ); ?></button>
      </div>
    </div>
  </div>
</div>

<div id="dr-autoRenewalPlanTerms" class="dr-modal" tabindex="-1" role="dialog">
  <div class="dr-modal-dialog dr-modal-dialog-centered">
    <div class="dr-modal-content">
      <div class="dr-modal-body"><p></p></div>
      <div class="dr-modal-footer">
        <button type="button" class="dr-btn dr-btn-blue dr-confirm-ar-on" data-dismiss="dr-modal"><?php echo __( 'Accept', 'digital-river-global-commerce' ); ?></button>
        <button type="button" class="dr-btn dr-btn-black dr-confirm-cancel" data-dismiss="dr-modal"><?php echo __( 'Cancel', 'digital-river-global-commerce' ); ?></button>
      </div>
    </div>
  </div>
</div>
