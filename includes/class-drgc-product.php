<?php
/**
 * Product class
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

class DRGC_Product {
	/**
	 * Post ID
	 *
	 * @var integer
	 */
	public $id = 0;

	/**
	 * Post type
	 *
	 * @var string
	 */
	public $post_type;

	/**
	 * Product post data.
	 *
	 * @var array
	 */
	protected $post_data = array(
		'ID'                    => 0,
		'post_type'             => '',
		'post_author'           => 0,
		'post_title'            => '',
		'post_status'           => 'pending',
		'post_content'          => '',
		'comment_status'        => 'closed',
		'post_parent'           => 0,
		'tax_input'             => array(),
		'meta_input'            => array(),
	);

	/**
	 * Product meta data.
	 *
	 * @var array
	 */
	protected $meta_data = array();

	/**
	 * DRGC_Product constructor.
	 *
	 * @param int $product
	 * @param string $post_type
	 */
	public function __construct( $product = 0, $post_type = 'dr_product' ) {

		$this->post_type = $post_type;

		if ( is_numeric( $product ) && $product > 0 ) {
			$this->id = $product;
		} elseif ( $product instanceof self ) {
			$this->id = $product->id;
			$this->post_type = $product->post_type;
		} elseif ( ! empty( $product->ID ) && is_object( $product ) ) {
			$this->id = $product->ID;
			$this->post_type = $product->post_type;
		}
	}

	/**
	 * Set post parent ID in case of variation
	 *
	 * @param int $id
	 */
	public function set_parent( $id = 0 ) {
		$this->post_data['post_parent'] = $id;
  }

  /**
	 * Prepares different post and meta data
	 *
	 * @param array $product
	 */
  public function set_data( $product ) {
    $_post_data = array();
    $_meta_data = array();

    $_post_data['post_title'] = wp_strip_all_tags( $product['displayName'] );
    $_meta_data['gc_product_id'] = $product['id'];
    $_meta_data['sku'] = $product['sku'];
    $_post_data['post_status'] = ( $product['displayableProduct'] === 'true' ) ? 'publish' : 'pending';

    // For multi variation attributes
    if ( $product['baseProduct'] === 'true' && isset( $product['variationAttributes']['attribute'] ) ) {
      $_meta_data['var_attribute_names'] = array();
      $_meta_data['variations'] = array();
      $_meta_data['var_select_options'] = array();

      foreach ( $product['variationAttributes']['attribute'] as $attribute ) {
        $_meta_data['var_attribute_names'][ $attribute['name'] ] = $attribute['displayName'];
      }

      $var_products = $product['variations']['product'];
      $var_attribute_names = $_meta_data['var_attribute_names'];

      foreach ( $var_products as $variation ) {
        $var_product_id = $variation['id'];
        $var_custom_attributes = $variation['customAttributes']['attribute'];

        foreach ( $var_attribute_names as $key => $value ) {
          $found_key = array_search( $key, array_column( $var_custom_attributes, 'name' ) );

          if ( $found_key !== false ) {
            $attr_value = $var_custom_attributes[ $found_key ]['value'];
            $_meta_data['variations'][ $var_product_id ][ $key ] = $attr_value;

            if ( ! in_array( $attr_value, $_meta_data['var_select_options'][ $value ], true ) ) {
              $_meta_data['var_select_options'][ $value ][] = $attr_value;
            }
          }
        }
      }
    }

    $this->post_data = array_merge( $this->post_data, $_post_data );
    $this->meta_data = array_merge( $this->meta_data, $_meta_data );
  }

	/**
	 * Set of term IDs
	 *
	 * Equivalent to calling wp_set_post_terms()
	 * The current user MUST have the capability to work with a taxonomy
	 *
	 * @param array $terms_ids
	 */
	public function set_categories( $terms_ids = array() ) {
		$this->post_data['tax_input'] = array( 'dr_product_category' => $terms_ids );
	}

	/**
	 * Returns post or meta value based on key
	 *
	 * @param $key
	 * @return false|int|mixed
	 */
	public function get( $key ) {
		switch ( $key ) {
			case 'id':
				$value = $this->id;
				break;
			case 'parent':
				$value = wp_get_post_parent_id( $this->id );
				break;
			default:
				$value = get_post_meta( $this->id, $key, true );
				break;
		}

		return $value;
	}

	/**
	 * Will create post or update existing
	 *
	 * @return int|WP_Error
	 */
	public function save() {
		$this->post_data['meta_input'] = $this->meta_data;
		$this->post_data['post_type'] = $this->post_type;

		if ( $this->id ) {
			$this->post_data['ID'] = $this->id;
		}

		$this->id = wp_insert_post( $this->post_data, true );
		return $this->id;
	}
}
