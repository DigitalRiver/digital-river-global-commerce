<?php
/**
 * Provide a publidr-facing view for the plugin
 *
 * This file is used to markup the publidr-facing aspects of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public/partials
 */
?>

<?php
$product_name = $line_item['product']['displayName'];
$product_image_uri = $line_item['product']['thumbnailImage'];
<<<<<<< HEAD
=======
$product_colors = ['Black', 'Red'];
>>>>>>> 86b3aff29e238939b8c6899f4aabee8e2da0c988
$product_sku = $line_item['product']['id'];
$sale_price = $line_item['pricing']['formattedSalePriceWithQuantity'];
$price = $line_item['pricing']['formattedListPriceWithQuantity'];
$product_qty = $line_item['quantity'];
$is_variation = isset( $line_item['product']['parentProduct'] );
$short_description = $line_item['product']['shortDescription'] ?? '';
$short_description_option = get_option( 'drgc_display_short_description_handler' );
$short_description_enabled = ( is_array( $short_description_option ) && $short_description_option['checkbox'] === '1' );
?>

<div data-line-item-id="<?php echo $line_item['id']; ?>" class="dr-product">

    <div class="dr-product-content">

        <div class="dr-product__img" style="background-image: url(<?php echo $product_image_uri; ?>)"></div>

        <div class="dr-product__info">

            <a class="product-name" href="<?php echo get_permalink( drgc_get_parent_product_by_gcid( $product_sku, $is_variation ) ); ?>" >
                <?php echo $product_name; ?>
            </a>

            <div class="product-short-description">
                  
                <span><?php echo $short_description_enabled ? $short_description : ''; ?></span>
            
            </div>

            <div class="product-sku">

                <span><?php _e( 'Product', 'digital-river-global-commerce' ); ?> </span>

                <span>#<?php echo $product_sku; ?></span>

            </div>

            <div class="product-qty">

                <span class="qty-text"><?php _e( 'Qty', 'digital-river-global-commerce' ); ?> <?php echo $product_qty; ?></span>

                <span class="dr-pd-cart-qty-minus value-button-decrease"></span>

                <input
                    type="number"
                    class="product-qty-number"
                    step="1"
                    min="1"
                    max="999"
                    value="<?php echo $product_qty; ?>"
                    maxlength="5"
                    size="2"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    readonly="true"/>

                <span class="dr-pd-cart-qty-plus value-button-increase"></span>

            </div>

        </div>

    </div>

    <div class="dr-product__price">

        <button class="dr-prd-del remove-icon"></button>

        <span class="sale-price"><?php echo $sale_price; ?></span>
        <span class="regular-price <?php echo $sale_price === $price ? 'd-none' : ''; ?>"><?php echo $price; ?></span>

    </div>

</div>