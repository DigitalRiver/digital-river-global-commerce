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
 * @subpackage Digital_River_Global_Commerce/public/templates/parts
 */
?>

<?php
$variations = drgc_get_product_variations( get_the_ID() );
$gc_parent_id = '';
$post_id = '';

if ( $variations && isset( $variations[0] ) ) {
    $post_parent = $variations[0]->post_parent;
    $gc_parent_id = get_post_meta( $post_parent, 'gc_product_id', true );
    $post_id = $variations[0]->ID;
} else {
    $post_id = get_the_ID();
}

$gc_id = get_post_meta( $post_id, 'gc_product_id', true );
?>

<div class="dr-pd-item">
    <a href="<?php echo get_permalink(); ?>">
        <div class="dr-pd-item-thumbnail">
            <!-- Before JS is loaded, render 1x1 px transparent gif to avoid breaking image -->
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="<?php the_title_attribute() ?>"/>
        </div>

        <div class="dr-loading"></div>
        <div class="dr-pd-info" style="display: none;">
            <?php the_title( '<h3 class="dr-pd-item-title">', '</h3>' ); ?>
            <p class="dr-pd-price dr-pd-item-price"></p>
            <button type="button" class="dr-btn dr-buy-btn" data-parent-id="<?php echo $gc_parent_id; ?>" data-product-id="<?php echo $gc_id; ?>">
                <?php echo __( 'Add to Cart', 'digital-river-global-commerce'); ?>
            </button>
        </div>

        <?php the_content(); ?>
    </a>
</div>
