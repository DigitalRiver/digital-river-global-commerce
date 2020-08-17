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
  $has_other_locales = count( $drgc_locale_options ) > 1;
?>

<?php if ( ! empty( $drgc_locale_options ) ) { ?>
<li class="dropdown menu-item <?php echo $has_other_locales ? 'menu-item-has-children' : '' ?>" id="dr-locale-selector">
  <a class="<?php echo $has_other_locales ? 'dropdown-toggle' : '' ?> nav-link dr-current-locale" data-dr-locale="<?php echo $current_locale ?>" href="#">
    <span class="dr-flag-icon <?php echo get_dr_country_code( $current_locale ) ?>"></span>
    <?php echo __( get_dr_country_name( $current_locale ), 'digital-river-global-commerce' ) ?>
  </a>
  <?php if ( $has_other_locales ) { ?>
  <ul class="dropdown-menu dr-other-locales">
  <?php foreach ( $drgc_locale_options as $locale_option ) { ?>
    <?php if ( $current_locale !== $locale_option['dr_locale'] ) { ?>
      <li class="menu-item nav-item">
        <a class="dropdown-item" data-dr-locale="<?php echo $locale_option['dr_locale'] ?>" href="#">
          <span class="dr-flag-icon <?php echo get_dr_country_code( $locale_option['dr_locale'] ) ?>"></span>
          <?php echo __( get_dr_country_name( $locale_option['dr_locale'] ), 'digital-river-global-commerce' ) ?>
        </a>
      </li>
    <?php } ?>
  <?php } ?>
  </ul>
  <?php } ?>
</li>
<?php } ?>
