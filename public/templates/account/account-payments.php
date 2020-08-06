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

<?php foreach ($payments as $key => $payment): ?>

    <div class="col-12 col-lg-6 payment-col">
        <address class="payment" <?php if ($payment['isDefault'] === 'true') echo 'data-primary="Primary"' ;?> >
            <div class="payment-name">
                <span class="firstName"><?php echo $payment['nickName'] ?></span>
            </div>

            <div class="payment-card-info">
                <div class="brand"><?php echo $payment['creditCard']['brand']; ?></div>
                <div class="number">**** <?php echo $payment['creditCard']['lastFourDigits']; ?></div>
            </div>

            <div class="payment-edit" style="display:none;">

                <form class="dr-panel-edit">
                    <input type="hidden" name="sourceId" value="<?php echo $payment['sourceId'] ?>">
                    <input type="hidden" name="id" value="<?php echo $payment['id'] ?>">

                    <div class="required-text">
                        <?php echo __( 'Fields marked with * are mandatory', 'digital-river-global-commerce' ); ?>
                    </div>

                    <div class="form-group dr-panel-edit__el">

                        <div class="float-container float-container--first-name">

                            <label for="first-name-<?php echo $key ?>" class="float-label ">

                                <?php echo __( 'Card Name *', 'digital-river-global-commerce' ); ?>

                            </label>

                            <input id="card-name-<?php echo $key ?>" type="text" value="<?php echo $payment['nickName'] ?>" name="nickName" class="form-control float-field float-field--first-name" required>

                            <div class="invalid-feedback">

                                <?php echo __( 'This field is required.', 'digital-river-global-commerce' ); ?>

                            </div>

                        </div>

                    </div>
                    <div class="invalid-feedback dr-err-field" style="display: none"></div>

                    <input type="submit" class="dr-btn dr-btn-green" value="<?php echo __( 'Save', 'digital-river-global-commerce' );?>">

                </form>
            </div>

            <button class="payment-edit-btn" role="img" aria-label="Edit Payment" title="Edit Payment"></button>
            <button class="payment-delete-btn" role="img" aria-label="Delete Payment" title="Delete Payment"></button>
        </address>

    </div>

<?php endforeach; ?>

<!-- payment confirm modal -->
<div id="paymentDeleteConfirm" class="dr-modal" tabindex="-1" role="dialog">
  <div class="dr-modal-dialog dr-modal-dialog-centered">
    <div class="dr-modal-content">
      <div class="dr-modal-body">
        <p><?php echo __( 'Are you sure you want to delete this payment?', 'digital-river-global-commerce' ); ?></p>
      </div>
      <div class="dr-modal-footer">
        <button type="button" class="dr-btn dr-btn-blue dr-confirm-payment-off" data-dismiss="dr-modal"><?php echo __( 'Accept', 'digital-river-global-commerce' ); ?></button>
        <button type="button" class="dr-btn dr-btn-black dr-confirm-cancel" data-dismiss="dr-modal"><?php echo __( 'Cancel', 'digital-river-global-commerce' ); ?></button>
      </div>
    </div>
  </div>
</div>
