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

<?php
  $drgc_default_locale = get_option( 'drgc_default_locale' );
  $drgc_locale_options = get_option( 'drgc_locale_options' );
?>

<button type="button" class="button" id="dr-sync-locales-btn"><?php _e( 'Sync Locales and Currencies', 'digital-river-global-commerce' ) ?></button>

<?php if ( empty( $drgc_locale_options ) ) { ?>
  <p><?php _e( 'No locale, please sync it up by clicking button above.', 'digital-river-global-commerce' ) ?></p>
<?php } else { ?>
  <table class="form-table">
    <tbody>
      <tr>
        <th scope="row"><?php _e( 'Site Locales', 'digital-river-global-commerce' ) ?></th>
        <td>
          <table>
            <thead>
              <tr>
                <th><?php _e( 'DR Locale', 'digital-river-global-commerce' ) ?></th>
                <th><?php _e( 'WP Language', 'digital-river-global-commerce' ) ?></th>
                <th><?php _e( 'Currencies', 'digital-river-global-commerce' ) ?></th>
              </tr>
            </thead>
            <tbody>
            <?php foreach ( $drgc_locale_options as $locale_option ) { ?>
              <tr>
                <td>
                  <?php echo $locale_option['dr_locale'] ?>
                  <span class="description"><?php echo ( $locale_option['dr_locale'] === $drgc_default_locale ) ? __( '(Default)', 'digital-river-global-commerce' ) : '' ?></span>
                </td>
                <td><?php echo $locale_option['wp_locale'] ?></td>
                <td><?php echo join( ', ', $locale_option['supported_currencies'] ) ?></td>
              </tr>
            <?php } ?>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
<?php } ?>
