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
  $plugin = DRGC();
  $current_locale = $plugin->shopper->locale;
  $supported_currencies = drgc_get_supported_currencies( $current_locale );
  $selected_currency = $plugin->shopper->currency;
  $has_other_currencies = count( $supported_currencies ) > 1;
?>

<?php if ( ! empty( $supported_currencies ) ) { ?>
<li class="dropdown menu-item <?php echo $has_other_currencies ? 'menu-item-has-children' : '' ?>" id="dr-currency-selector">
  <a class="<?php echo $has_other_currencies ? 'dropdown-toggle' : '' ?> nav-link dr-selected-currency" data-dr-currency="<?php echo $selected_currency ?>" href="#"><?php echo $selected_currency ?></a>
  <?php if ( $has_other_currencies ) { ?>
  <ul class="dropdown-menu dr-other-currencies">
    <?php foreach ( $supported_currencies as $currency ) { ?>
      <?php if ( $selected_currency !== $currency ) { ?>
        <li class="menu-item nav-item">
          <a class="dropdown-item" data-dr-currency="<?php echo $currency ?>" href="#"><?php echo $currency ?></a>
        </li>
      <?php } ?>
    <?php } ?>
  </ul>
  <?php } ?>
</li>
<?php } ?>
