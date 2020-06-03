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
  $supported_currencies = drgc_get_supported_currencies( $current_locale );
  $selected_currency = drgc_get_selected_currency();
?>

<?php if ( ! empty( $supported_currencies ) ) { ?>
<li id="dr-currency-selector">
  <a class="dr-selected-currency" data-dr-currency="<?php echo $selected_currency ?>" href="#"><?php echo $selected_currency ?></a>
  <?php if ( count( $supported_currencies ) > 1 ) { ?>
  <ul class="dr-other-currencies">
    <?php foreach ( $supported_currencies as $currency ) { ?>
      <?php if ( $selected_currency !== $currency ) { ?>
        <li>
          <a data-dr-currency="<?php echo $currency ?>" href="#"><?php echo $currency ?></a>
        </li>
      <?php } ?>
    <?php } ?>
  </ul>
  <?php } ?>
</li>
<?php } ?>
