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
$plugin = DRGC();
$gc_id = get_post_meta( get_the_ID(), 'gc_product_id', true );
$lang = explode( '_', drgc_get_current_dr_locale() )[0];
$product_name = '';
$short_description = '';
$long_description = '';
$product_thumbnail_url = '';
$product_image_url = '';
$variation_attributes = [];
$product_details = $plugin->product_details->get_product_details( $gc_id );

if ( $product_details ) {
    if ( isset( $product_details['displayName'] ) ) {
        $product_name = $product_details['displayName'];
    }
    
    if ( isset( $product_details['shortDescription'] ) ) {
        $short_description = $product_details['shortDescription'];
    }

    if ( isset( $product_details['longDescription'] ) ) {
        $long_description = $product_details['longDescription'];
    }

    if ( isset( $product_details['thumbnailImage'] ) ) {
        $product_thumbnail_url = $product_details['thumbnailImage'];
    }

    if ( isset( $product_details['productImage'] ) ) {
        $product_image_url = $product_details['productImage'];
    }

    if ( $product_details['baseProduct'] === 'true' ) {
        if ( isset( $product_details['variationAttributes'] ) ) {
			foreach ( $product_details['variationAttributes']['attribute'] as $attribute ) {
                $variation_attributes[ $attribute['name'] ] = $attribute['displayName'];
            }
        }
    }
}

$variations = drgc_get_product_variations( get_the_ID() );

if ( $variations && isset( $variations[0] ) ) {
    $vars_count = count( $variations );
    $var_attr_values = array( array() );
    $var_type = '';
    $var_type_label = '';

    foreach ( $variation_attributes as $key => $value ) {
        foreach ( $variations as $variation ) {
            $var_gc_id = get_post_meta( $variation->ID, 'gc_product_id', true );
            $var_product_details = $plugin->product_details->get_product_details( $var_gc_id, array( 'expand' => 'all' ) );

            foreach ( $var_product_details['customAttributes']['attribute'] as $attribute ) {
                if ( $key === $attribute['name'] ) {
                    $variation->$key = $attribute['value'];
                    $var_attr_values[ $key ][] = $attribute['value'];
                }
            }
        }

        if ( isset( $var_attr_values[ $key ] ) && is_array( $var_attr_values[ $key ] ) && count( array_unique( $var_attr_values[ $key ] ) ) === $vars_count ) {
            $var_type = $key;
        }
    }

    $var_type_label = $variation_attributes[ $var_type ];

    //sort variation array  by sale price here!
    $variations_sort = array();

    foreach ( $variations as $variation ) {
        $var_gc_id = get_post_meta( $variation->ID, 'gc_product_id', true );
        $var_product_details = $plugin->product_details->get_product_details( $var_gc_id );
        $variation->sale_price = isset( $var_product_details['pricing']['salePriceWithQuantity'] ) ? $var_product_details['pricing']['salePriceWithQuantity']['value'] : '';
        array_push( $variations_sort, $variation );
    }

    usort( $variations_sort, function( $a, $b ) {
        if ( $a == $b ) {
            return 0;
        }
        return ( $a->sale_price < $b->sale_price ) ? -1 : 1;
    });

    $variations = $variations_sort;
}
?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="row">
        <div class="col-12 col-md-6">
            <img src="<?php echo $product_thumbnail_url ?: $product_image_url ?>" alt="<?php echo $product_name; ?>" class="dr-pd-img" />
        </div>
        <div class="col-12 col-md-6">
		    <h1 class="entry-title dr-pd-title"><?php echo $product_name; ?></h1>
            <div class="dr-pd-content">
			    <?php if ( $short_description ) { ?>
                    <p class="dr-pd-short-desc"><?php echo $short_description; ?></p>
			    <?php } ?>
			    <?php the_content(); ?>

                <?php if ( $variations ) : ?>
                    <h6><?php echo __( 'Select ', 'digital-river-global-commerce' ) . ( ( $lang === 'en' ) ? ucwords( $var_type_label ) : $var_type_label ) . ':'; ?></h6>

                    <div class="dr_prod-variations">

                        <select name="dr-variation">
                            <?php foreach ( $variations as $variation ) :
                                $var_gc_id = get_post_meta( $variation->ID, 'gc_product_id', true );
                                $var_option = ( $var_type !== '' ) ? $variation->$var_type : '';
                                $var_image_url = get_post_meta( $variation->ID, 'gc_product_images_url', true );
                                $var_thumbnail_url = get_post_meta( $variation->ID, 'gc_thumbnail_url', true );
                            ?>
                                <option value="<?php echo $var_gc_id; ?>" data-thumbnail-url="<?php echo $var_thumbnail_url ?: $var_image_url ?>">
                                    <?php echo ( $var_option !== '' ) ? ( ( $lang === 'en' ) ? ucwords( $var_option ) : $var_option ) : $variation->post_name; ?>
                                </option>
						    <?php endforeach; ?>
                        </select>

                    </div>
			    <?php endif; ?>

                <form id="dr-pd-form">
                    <div class="dr-pd-price-wrapper" id="dr-pd-price-wrapper">
                        <p class="dr-pd-price"></p>
                    </div>
                    <div class="dr-pd-qty-wrapper">
                        <span class="dr-pd-qty-minus" style="background-image: url('<?php echo get_site_url(); ?>/wp-content/plugins/digital-river-global-commerce/assets/images/product-minus.svg');"></span>
                        <input type="number" class="dr-pd-qty no-spinners" id="dr-pd-qty" step="1" min="1" max="999" value="1" maxlength="5" size="2" pattern="[0-9]*" inputmode="numeric" readonly />
                        <span class="dr-pd-qty-plus"  style="background-image: url('<?php echo DRGC_PLUGIN_URL; ?>assets/images/icons-plus.svg');"></span>
                    </div>
                    <p>
                        <button type="button" class="dr-btn dr-buy-btn" data-product-id="<?php echo $gc_id; ?>">
						    <?php echo __( 'Add to Cart', 'digital-river-global-commerce'); ?>
                        </button>
                    </p>
                </form>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
	        <?php if ( $long_description ) { ?>
                <section class="dr-pd-info">
                    <div class="dr-pd-long-desc">
				        <?php echo $long_description; ?>
                    </div>
                </section>
	        <?php } ?>
        </div>
        <section id="dr-pd-offers"></section>
    </div>

</div>
