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
    //sort variation array by sale price here!
    $variations_sort = array();
  
    foreach ( $variations as $variation ) {
        $var_pricing = drgc_get_product_pricing( $variation->ID );
        $variation->sale_price = $var_pricing['sale_price_value'];
        array_push( $variations_sort, $variation );
    }

    usort( $variations_sort, function( $a, $b ) {
        if ( $a == $b ) {
            return 0;
        }

        return ( $a->sale_price < $b->sale_price ) ? -1 : 1;
    });

    $variations = $variations_sort;
    $post_parent = $variations[0]->post_parent;
    $gc_parent_id = get_post_meta( $post_parent, 'gc_product_id', true );
    $post_id = $variations[0]->ID;
} else {
    $post_id = get_the_ID();
}

$gc_id = get_post_meta( $post_id, 'gc_product_id', true );
$product_image_url = get_post_meta( $post_id, 'gc_product_images_url', true );
$product_thumbnail_url = get_post_meta( $post_id, 'gc_thumbnail_url', true );
?>

<div class="dr-pd-item">
    <a href="<?php echo get_permalink(); ?>">
        <div class="dr-pd-item-thumbnail">
            <img src="<?php echo $product_thumbnail_url ?: $product_image_url ?>" alt="<?php the_title_attribute() ?>"/>
        </div>

        <div class="dr-loading"></div>
        <div class="dr-pd-info" style="display: none;">
            <?php the_title( '<h3 class="dr-pd-item-title">', '</h3>' ); ?>
            <p class="dr-pd-price dr-pd-item-price"></p>
            <button type="button" class="dr-btn dr-buy-btn" data-parent-id="<?php echo $gc_parent_id; ?>" data-product-id="<?php echo $gc_id; ?>" <?php echo 'true' !== $purchasable ? 'disabled' : ''; ?>>
                <?php echo __( 'Add to Cart', 'digital-river-global-commerce'); ?>
            </button>
        </div>

        <?php the_content(); ?>
    </a>
</div>
