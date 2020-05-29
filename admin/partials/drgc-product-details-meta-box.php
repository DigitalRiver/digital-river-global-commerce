<?php
/**
 * Render product details meta box.
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
<div class="meta-form-group">
    <table class="form-table">
        <tbody>
            <?php if ( $post_parent > 0 ) : ?>
                <fieldset>
                    <legend><span><?php echo __( 'Variation Attributes', 'digital-river-global-commerce' ); ?></span></legend>
                    <?php foreach ($var_attr_values as $key => $value) : ?>
                        <dl>
                            <dt>
                                <label><?php echo esc_attr( $key ); ?>: </label>
                            </dt>
                            <dd>
                                <div class="regular-text" id="variation-attributes"><?php echo esc_attr( $value ); ?></div>
                            </dd>
                        </dl>
                    <?php endforeach; ?>
                </fieldset>
            <?php endif; ?>
            <tr>
                <th scope="row"> <label for="gc-product-id"><?php echo __( 'GC Product ID', 'digital-river-global-commerce' ); ?></label></th>
                <td><input type="text" class="regular-text" id="gc-product-id" name="gc_product_id" value="<?php echo esc_attr( get_post_meta( get_the_ID(), 'gc_product_id', true ) ); ?>" readonly /></td>
            </tr>
            <tr>
                <th scope="row"> <label for="ext-reference-id"><?php echo __( 'External Reference ID', 'digital-river-global-commerce' ); ?></label></th>
                <td><input type="text" class="regular-text" id="ext-reference-id" name="external_reference_id" value="<?php echo esc_attr( get_post_meta( get_the_ID(), 'external_reference_id', true ) ); ?>" readonly /></td>
            </tr>
            <tr>
                <th scope="row"> <label for="sku"><?php echo __( 'SKU', 'digital-river-global-commerce' ); ?></label></th>
                <td><input type="text" class="regular-text" id="sku" name="sku" value="<?php echo esc_attr( get_post_meta( get_the_ID(), 'sku', true ) ); ?>" readonly /></td>
            </tr>
        </tbody>
    </table>
    <div class="locales-wrap">
        <nav class="nav-tab-wrapper">
            <a href="?post=<?php echo get_the_ID() ?>&action=edit&locale=<?php echo $locales['default_locale'] ?>" class="nav-tab <?php if ( $active_tab === $locales['default_locale'] ):?>nav-tab-active<?php endif; ?>"><?php echo $locales['default_locale'] ?> (<?php echo __( 'Default', 'digital-river-global-commerce' ); ?>)</a>
            <?php foreach ( $locales['locales'] as $locale => $currency ) : ?>
                <?php if ( $locales['default_locale'] !== $locale ) : ?>
                    <a href="?post=<?php echo get_the_ID() ?>&action=edit&locale=<?php echo $locale ?>" class="nav-tab <?php if ( $active_tab === $locale ):?>nav-tab-active<?php endif; ?>"><?php echo $locale ?></a>
                <?php endif; ?>
            <?php endforeach; ?>
        </nav>
        <div class="tab-content">
            <table class="form-table">
                <tbody>
                    <tr>
                        <th scope="row"> <label for="price"><?php echo __( 'Price', 'digital-river-global-commerce' ); ?></label></th>
                        <td><input type="text" class="regular-text" id="price" name="price" value="<?php echo $price; ?>" readonly /></td>
                    </tr>
                    <tr>
                        <th scope="row"> <label for="display-name"><?php echo __( 'Display Name', 'digital-river-global-commerce' ); ?></label></th>
                        <td><input type="text" class="regular-text" id="display-name" value="<?php echo $product_name; ?>" readonly /></td>
                    </tr>
                    <tr>
                        <th scope="row"> <label for="short-description"><?php echo __( 'Short Description', 'digital-river-global-commerce' ); ?></label></th>
                        <td><textarea id="short-description" class="large-text" rows="3" readonly><?php echo $short_description; ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row"> <label for="long-description"><?php echo __( 'Long Description', 'digital-river-global-commerce' ); ?></label></th>
                        <td><textarea id="long-description" class="large-text" rows="10" readonly><?php echo $long_description; ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row"> <label for="thumbnail"><?php echo __( 'Thumbnail', 'digital-river-global-commerce' ); ?></label></th>
                        <td><img id="product-thumbnail" src="<?php echo $product_thumbnail_url; ?>" alt="<?php echo $product_name ?>"/></td>
                    </tr>
                    <tr>
                        <th scope="row"> <label for="product-image"><?php echo __( 'Product Image', 'digital-river-global-commerce' ); ?></label></th>
                        <td><img id="product-image" src="<?php echo $product_image_url; ?>" alt="<?php echo $product_name ?>"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
