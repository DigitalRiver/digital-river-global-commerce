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

<h2><?php _e( 'Locales', 'digital-river-global-commerce' ) ?></h2>
<div id="dr-sync-locales-hint">
  <button type="button" class="button" id="dr-sync-locales-btn"><?php _e( 'Sync Locales and Currencies', 'digital-river-global-commerce' ) ?></button>
  <p><?php _e( 'Sync site locale and currency settings from BigBlue. Please notice that all of the locale attributes will be set to default value after synchronizing.', 'digital-river-global-commerce' ) ?></p>
</div>

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
                <th>
                  <div data-tooltip="<?php _e( 'For the locales with tax-exclusive/inclusive price lists but still need to present tax-inclusive/exclusive prices at storefront. This config is just like VAT Display Method setting in BigBlue, we suggest setting them consistently.', 'digital-river-global-commerce' ) ?>" data-tooltip-location="top">
                    <?php _e( 'Tax Display', 'digital-river-global-commerce' ) ?>
                    <span class="dashicons dashicons-editor-help"></span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
            <?php foreach ( $drgc_locale_options as $idx => $locale_option ) { ?>
              <tr>
                <td>
                  <?php echo $locale_option['dr_locale'] ?>
                  <span class="description"><?php echo ( $locale_option['dr_locale'] === $drgc_default_locale ) ? __( '(Default)', 'digital-river-global-commerce' ) : '' ?></span>
                </td>
                <td>
                  <?php
                  wp_dropdown_languages(
                    array(
                      'id' => "drgc_locale_options_wp_locale_{$idx}",
                      'name' => "drgc_locale_options[{$idx}][wp_locale]",
                      'selected' => $locale_option['wp_locale']
                    )
                  ) ?>
                </td>
                <td><?php echo join( ', ', $locale_option['supported_currencies'] ) ?></td>
                <td>
                  <select name="drgc_locale_options[<?php echo $idx ?>][tax_display]">
                    <option value="EXCL" <?php if ( $locale_option['tax_display'] === 'EXCL' ) echo 'selected'; ?>><?php _e( 'Exclusive', 'digital-river-global-commerce' ) ?></option>
                    <option value="INCL" <?php if ( $locale_option['tax_display'] === 'INCL' ) echo 'selected'; ?>><?php _e( 'Inclusive', 'digital-river-global-commerce' ) ?></option>
                  </select>
                </td>
              </tr>
            <?php } ?>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
<?php submit_button(); ?>
<?php } ?>
