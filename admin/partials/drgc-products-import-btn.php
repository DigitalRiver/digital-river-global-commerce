<?php
/**
 * Render product import button.
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/admin/partials
 */
?>

<?php if ( isset( $_GET['import_complete'] ) ) : ?>
  <div class="notice notice-success is-dismissible products-import-notice"><p><?php _e( 'Import Complete!', 'digital-river-global-commerce' ); ?></p></div>
<?php endif; ?>

<div class="products-import-wrapper">
  <noscript><p><em><?php _e( 'You must enable Javascript in order to proceed!', 'digital-river-global-commerce' ) ?></em></p></noscript>
  <button type="button" id="products-import-btn" class="button"><?php _e( 'Import Products', 'digital-river-global-commerce' ); ?></button>
  <h4 id="products-import-msg"></h4>
  <div id="products-import-progress">
    <div id="products-import-progress-bar">
      Processing <span id="products-import-progress-count">0</span> out of <span id="products-import-progress-total">0</span>
    </div>
  </div>
</div>
