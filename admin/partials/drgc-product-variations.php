<?php
/**
 * Render variations area.
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
<?php if ( $variations ) : ?>
    <fieldset>
        <legend><span><?php echo __( 'Variations', 'digital-river-global-commerce' ); ?></span></legend>
        <table class="data-table">
            <thead>
                <tr>
                    <th><?php echo __( 'ID', 'digital-river-global-commerce' ); ?></th>
                    <th><?php echo __( 'Internal Variation Name', 'digital-river-global-commerce' ); ?></th>
                    <th><?php echo __( 'Variation Attributes', 'digital-river-global-commerce' ); ?></th>
                </tr>
            </thead>
            <tbody>
            <?php 
                foreach ( $variations as $variation ) {
                    $base_variation_attributes = get_post_meta( get_the_ID(), 'variation_attributes', true );
                    $varying_attribute_array = [];

                    foreach ( $var_attr_values[$variation->ID] as $attr ) {
                        if ( ! empty( $attr ) ) {
                            array_push( $varying_attribute_array, $attr );
                        }
                    }
            ?>
                    <tr>
                        <td><a href="<?php echo admin_url( 'post.php?post=' . $variation->ID . '&action=edit' ) ?>"><?php echo esc_attr( get_post_meta( $variation->ID, 'gc_product_id', true ) ) ?></a></td>
                        <td><?php echo esc_attr( $variation->post_title ) ?></td>
                        <td><?php echo esc_attr( implode( ', ', $varying_attribute_array) ) ?></td>
                    </tr>
            <?php
                }
            ?>
            </tbody>
        </table>
    </fieldset>
<?php endif; ?>