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

<?php if ( $this->list_price > $this->sale_price ) : ?>
    <p class="pd-item-price dr-pd-price dr-strike-price">
        <del>
            <?php echo get_post_meta( get_the_ID(), 'regular_price', true ); ?>
        </del>&nbsp;
        <span class="dr-sale-price">
        <?php echo get_post_meta( get_the_ID(), 'price', true ); ?>
    </span>
    </p>
<?php else : ?>
    <p class="pd-item-price dr-pd-price">
        <?php echo get_post_meta( get_the_ID(), 'price', true ); ?>
    </p>
<?php endif; ?>

<button type="button" class="btn btn-default dr-buy-btn" data-product-id="<?php echo get_post_meta( get_the_ID(), 'gc_product_id', true ); ?>">
    <?php echo __( 'Add to Cart', 'digital-river-global-commerce'); ?>
</button>
