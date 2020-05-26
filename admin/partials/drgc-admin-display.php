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

  <nav class="nav-tab-wrapper">
    <a href="?post_type=dr_product&page=digital-river-global-commerce" class="nav-tab <?php if ( $tab === null ) echo 'nav-tab-active'; ?>">General</a>
    <a href="?post_type=dr_product&page=digital-river-global-commerce&tab=locales" class="nav-tab <?php if ( $tab === 'locales' ) echo 'nav-tab-active'; ?>">Locales</a>
  </nav>

  <div class="tab-content">
    <form method="post" action="options.php">
      <?php switch ( $tab ) {
        case 'locales':
          include_once 'drgc-admin-locales.php';
          break;

        default:
          settings_fields( $this->plugin_name );
          do_settings_sections( $this->plugin_name );
          submit_button();
      }?>
    </form>
  </div>
</div>
