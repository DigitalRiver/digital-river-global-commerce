<?php
/**
 * Provide a admin area view for the plugin
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

<div class="wrap">
  <h1><?php esc_html_e( get_admin_page_title(), 'digital-river-global-commerce' ); ?></h1>
  <?php settings_errors(); ?>

  <nav class="nav-tab-wrapper">
    <a href="?post_type=dr_product&page=digital-river-global-commerce" class="nav-tab <?php if ( $active_tab === 'general' ) echo 'nav-tab-active'; ?>">
      <?php _e( 'General', 'digital-river-global-commerce' ) ?>
    </a>
    <a href="?post_type=dr_product&page=digital-river-global-commerce&tab=locales" class="nav-tab <?php if ( $active_tab === 'locales' ) echo 'nav-tab-active'; ?>">
      <?php _e( 'Locales', 'digital-river-global-commerce' ) ?>
    </a>
    <a href="?post_type=dr_product&page=digital-river-global-commerce&tab=checkout" class="nav-tab <?php if ( $active_tab === 'checkout' ) echo 'nav-tab-active'; ?>">
      <?php _e( 'Checkout', 'digital-river-global-commerce' ) ?>
    </a>
    <a href="?post_type=dr_product&page=digital-river-global-commerce&tab=drop_in" class="nav-tab <?php if ( $active_tab === 'drop_in' ) echo 'nav-tab-active'; ?>">
      <?php _e( 'Payments', 'digital-river-global-commerce' ) ?>
    </a>
  </nav>

  <div class="tab-content">
    <form method="post" action="options.php">
      <?php switch ( $active_tab ) {
        case 'general':
        case 'checkout':
        case 'drop_in':
          settings_fields( $this->plugin_name . '_' . $active_tab );
          do_settings_sections( $this->plugin_name . '_' . $active_tab );
          submit_button();
          break;

        case 'locales':
          settings_fields( $this->plugin_name . '_' . $active_tab );
          include_once 'drgc-admin-locales.php';
          break;
      }?>
    </form>
  </div>
</div>
