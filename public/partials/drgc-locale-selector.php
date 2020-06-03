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
 * @subpackage Digital_River_Global_Commerce/public/partials
 */
?>

<?php
  $current_locale = drgc_get_current_dr_locale();
  $drgc_locale_options = get_option( 'drgc_locale_options' );
?>

<?php if ( ! empty( $drgc_locale_options ) ) { ?>
<li id="dr-locale-selector">
  <a class="dr-current-locale" data-dr-locale="<?php echo $current_locale ?>" href="#">
    <span class="dr-flag-icon <?php echo get_dr_country_code( $current_locale ) ?>"></span>
    <?php echo get_dr_country_name( $current_locale ) ?>
  </a>
  <?php if ( count( $drgc_locale_options ) > 1 ) { ?>
  <ul class="dr-other-locales">
  <?php foreach ( $drgc_locale_options as $locale_option ) { ?>
    <?php if ( $current_locale !== $locale_option['dr_locale'] ) { ?>
      <li>
        <a data-dr-locale="<?php echo $locale_option['dr_locale'] ?>" href="#">
          <span class="dr-flag-icon <?php echo get_dr_country_code( $locale_option['dr_locale'] ) ?>"></span>
          <?php echo get_dr_country_name( $locale_option['dr_locale'] ) ?>
        </a>
      </li>
    <?php } ?>
  <?php } ?>
  </ul>
  <?php } ?>
</li>
<?php } ?>
