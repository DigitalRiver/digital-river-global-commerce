<?php
/**
 * Register post types and taxonomies of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/admin
 */

class DRGC_Post_Types {

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'admin_init', array( $this, 'set_default_category' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_product_details_meta_box' ) );
		add_action( 'save_post', array( $this, 'save_post_meta_data' ) );
		add_action( 'after-dr_product_category-table', array( $this, 'add_manage_categories_link' ) );
		add_action( 'dr_product_category_edit_form', array( $this, 'add_manage_categories_link' ) );
		add_filter( 'manage_dr_product_posts_columns', array( $this, 'add_custom_columns_to_product_list' ), 10, 1 );
		add_action( 'manage_dr_product_posts_custom_column', array( $this, 'add_value_to_custom_columns' ), 10, 2 );
		add_filter( 'manage_edit-dr_product_sortable_columns', array( $this, 'make_custom_columns_sortable' ), 10, 1 );
		add_action( 'pre_get_posts', array( $this, 'custom_columns_orderby' ), 10, 1 );
	}

	/**
	 * Register post types.
	 *
	 * @since    1.0.0
	 */
	public function register_post_types() {
		register_post_type(
			'dr_product',
			array(
				'labels' => array(
					'name' => __( 'Products', 'digital-river-global-commerce' ),
					'singular_name' => __( 'Product', 'digital-river-global-commerce' ),
					'all_items' => __( 'Products', 'digital-river-global-commerce' ),
					'menu_name' => __( 'Digital River', 'digital-river-global-commerce' ),
					'add_new' => __( 'Add New', 'digital-river-global-commerce' ),
					'add_new_item' => __( 'Add new product', 'digital-river-global-commerce' ),
					'edit' => __( 'Edit', 'digital-river-global-commerce' ),
					'edit_item' => __( 'Edit product', 'digital-river-global-commerce' ),
					'new_item' => __( 'New product', 'digital-river-global-commerce' ),
					'view_item' => __( 'View product', 'digital-river-global-commerce' ),
					'view_items' => __( 'View products', 'digital-river-global-commerce' ),
					'search_items' => __( 'Search products', 'digital-river-global-commerce' ),
					'not_found' => __( 'No products found', 'digital-river-global-commerce' ),
					'not_found_in_trash' => __( 'No products found in trash', 'digital-river-global-commerce' )
				),
				'public' => true,
				'show_ui' => true,
				'show_in_menu' => true,
				'show_in_nav_menus' => true,
				'show_in_rest' => true,
				'rest_base' => 'dr_products',
				'menu_position' => 6,
				'publicly_queryable' => true,
				'exclude_from_search' => false,
				'hierarchical' => false,
				'query_var' => true,
				'has_archive' => true,
				'menu_icon' => 'dashicons-store',
				'capability_type' => 'post',
				'capabilities' => array(
					'create_posts' => 'do_not_allow'
				), // remove add new button
				'map_meta_cap' => true
			)
		);

		register_post_type(
			'dr_product_variation',
			array(
				'labels' => array(
					'name' => __( 'DR Variations', 'digital-river-global-commerce' ),
					'singular_name' => __( 'DR Variation', 'digital-river-global-commerce' ),
					'all_items' => __( 'Variations', 'digital-river-global-commerce' ),
				),
				'public' => true,
				'show_in_menu' => 'edit.php?post_type=dr_product',
				'show_in_rest' => true,
				'rest_base' => 'dr_products_variations',
				'hierarchical' => true,
				'query_var' => false,
				'has_archive' => false,
				'capability_type' => 'post',
				'capabilities' => array(
					'create_posts' => 'do_not_allow'
				),
				'map_meta_cap' => true,
				'publicly_queryable' => false
			)
		);
	}

	/**
	 * Register taxonomies.
	 *
	 * @since    1.0.0
	 */
	public function register_taxonomies() {
		register_taxonomy(
			'dr_product_category',
			'dr_product',
			array(
				'labels' => array(
					'name' => __( 'Product Categories', 'digital-river-global-commerce' ),
					'singular_name' => __( 'Category', 'digital-river-global-commerce' ),
					'menu_name' => __( 'Categories', 'digital-river-global-commerce' ),
					'search_items' => __( 'Search categories', 'digital-river-global-commerce' ),
					'all_items' => __( 'All categories', 'digital-river-global-commerce' ),
					'parent_item' => __( 'Parent category', 'digital-river-global-commerce' ),
					'parent_item_colon' => __( 'Parent category:', 'digital-river-global-commerce' ),
					'edit_item' => __( 'Edit category', 'digital-river-global-commerce' ),
					'update_item' => __( 'Update category', 'digital-river-global-commerce' ),
					'add_new_item' => __( 'Add new category', 'digital-river-global-commerce' ),
					'new_item_name' => __( 'New category name', 'digital-river-global-commerce' ),
					'not_found' => __( 'No categories found', 'digital-river-global-commerce' ),
				),
				'hierarchical' => true,
				'show_ui' => true,
				'show_in_rest' => true,
				'rest_base' => 'dr_product_categories',
				'query_var' => true
			)
		);
	}

	/**
	 * Set default category.
	 *
	 * @since    1.0.0
	 */
	public function set_default_category() {
		$default_cat = array(
			'taxonomy' => 'dr_product_category',
			'cat_name' => 'Uncategorized',
			'category_nicename' => 'uncategorized',
			'category_parent' => ''
		);
		wp_insert_category( $default_cat );
	}

	/**
	 * Add meta box for product details.
	 *
	 * @since    1.0.0
	 */
	public function add_product_details_meta_box() {
		$post_types = array( 'dr_product', 'dr_product_variation' );

		add_meta_box(
			'dr_product_details_box', // Unique ID
			__( 'Product Details', 'digital-river-global-commerce' ), // Box title
			array( $this, 'render_product_details_meta_box' ), // Content callback, must be of type callable
			$post_types // Post type
		);
	}

	/**
	 * Render meta box for product details.
	 *
	 * @since    1.0.0
	 */
	public function render_product_details_meta_box( $post ) {
    $post_parent = $post->post_parent;
    $gc_id = get_post_meta( $post->ID, 'gc_product_id', true );
		$plugin = DRGC();
		$product_name = '';
		$short_description = '';
		$long_description = '';
		$product_thumbnail_url = '';
		$product_image_url = '';
		$variation_attributes = [];
    $variations = drgc_get_product_variations( $post->ID );

		if ( $post_parent > 0 ) {
      $var_attr_values = [];
      $base_gc_id = get_post_meta( $post_parent, 'gc_product_id', true );
      $base_product_details = $plugin->product_details->get_product_details( $base_gc_id );

      if ( $base_product_details && isset( $base_product_details['variationAttributes'] ) ) {
        foreach ( $base_product_details['variationAttributes']['attribute'] as $attribute ) {
          $variation_attributes[ $attribute['name'] ] = $attribute['displayName'];
        }
      }

      $product_details = $plugin->product_details->get_product_details( $gc_id, array( 'expand' => 'all' ) );

      if ( $product_details && $product_details['customAttributes'] && ! empty( $variation_attributes ) ) {
        foreach ( $variation_attributes as $key => $value ) { 
          foreach ( $product_details['customAttributes']['attribute'] as $attribute ) {
            if ( $key === $attribute['name'] ) {
              $var_attr_values[ $key ] = $attribute['value'];
            }
          }
        }
      }
		} else {
      $var_attr_values = array( array() );
      $product_details = $plugin->product_details->get_product_details( $gc_id );

      if ( $product_details && isset( $product_details['variationAttributes'] ) ) {
        foreach ( $product_details['variationAttributes']['attribute'] as $attribute ) {
          $variation_attributes[ $attribute['name'] ] = $attribute['displayName'];
        }
      }

      if ( $variations && ! empty( $variation_attributes ) ) {
        foreach ( $variations as $variation ) {
          $var_gc_id = get_post_meta( $variation->ID, 'gc_product_id', true );
          $var_product_details = $plugin->product_details->get_product_details( $var_gc_id, array( 'expand' => 'all' ) );

          if ( $var_product_details && $var_product_details['customAttributes'] ) {
            foreach ( $variation_attributes as $key => $value ) {
              foreach ( $var_product_details['customAttributes']['attribute'] as $attribute ) {
                if ( $key === $attribute['name'] ) {
                  $var_attr_values[ $variation->ID ][] = $attribute['value'];
                }
              }
            }
          }
        }
      }
		}

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
		}

		$active_tab = isset( $_GET['locale'] ) ? $_GET['locale'] : 'en_US';
		$locales = get_option( 'drgc_store_locales' );
		$price = $product_details['pricing']['formattedListPrice'];

		echo '<h2 id="drcc-link"><a href="https://gc.digitalriver.com/gc/ent/site/selectSite.do?siteID=' . get_option( 'drgc_site_id' ) . '" target="_blank">Manage Products</a></h2>';

		include_once 'partials/drgc-product-variations.php';
		include_once 'partials/drgc-product-details-meta-box.php';
	}

	/**
	 * Save meta data.
	 *
	 * @since    1.0.0
	 */
	public function save_post_meta_data( $post_id ) {
		$fields = [
			'gc_product_id'
		];
		foreach ( $fields as $field ) {
			if ( array_key_exists( $field, $_POST ) ) {
				update_post_meta( $post_id, $field, sanitize_text_field( $_POST[ $field ] ) );
			}
		}
	}

	/**
	 * Add Manage Categories link.
	 *
	 * @since    1.0.0
	 */
	public function add_manage_categories_link() {
		echo '<p id="drcc-link"><a href="https://gc.digitalriver.com/gc/ent/site/selectSite.do?siteID=' . get_option( 'drgc_site_id' ) . '" target="_blank">Manage Categories</a></p>';
	}

	/**
	 * Add custom columns to product list.
	 *
	 * @since    1.0.0
	 */
	public function add_custom_columns_to_product_list( $columns ) {
		$new_columns = array();
		foreach ( $columns as $key => $title ) {
			if ( $key === 'date' ) {
				$new_columns[ 'gc_product_id' ] = __( 'Product ID', 'digital-river-global-commerce' );
				$new_columns[ 'sku' ] = __( 'SKU', 'digital-river-global-commerce' );
			}
			$new_columns[ $key ] = $title;
		}
		return $new_columns;
	}

	/**
	 * Make custom columns sortable.
	 *
	 * @since    1.0.0
	 */
	public function make_custom_columns_sortable( $columns ) {
		$columns[ 'gc_product_id' ] = 'gc_product_id';
		$columns[ 'sku' ] = 'sku';
		return $columns;
	}

	public function custom_columns_orderby( $query ) {
		if ( ! is_admin() ) return;

		$orderby = $query->get( 'orderby' );

		if ( $orderby === 'gc_product_id' ) {
			$query->set( 'meta_key', 'gc_product_id' );
			$query->set( 'orderby', 'meta_value_num' );
		} elseif ( $orderby === 'sku' ) {
			$query->set( 'meta_key', 'sku' );
			$query->set( 'orderby', 'meta_value' );
		}
	}

	/**
	 * Add value to custom columns.
	 *
	 * @since    1.0.0
	 */
	public function add_value_to_custom_columns( $key, $post_id ) {
		switch ( $key ) {
			case 'gc_product_id':
				echo get_post_meta( $post_id, 'gc_product_id', true );
				break;
			case 'sku':
				echo get_post_meta( $post_id, 'sku', true );
				break;
		}
	}
}
