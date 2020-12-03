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

<?php include_once DRGC_PLUGIN_DIR . 'public/partials/drgc-my-certificates.php'; ?>

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
