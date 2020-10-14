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
			$this->id = absint( $product->id );
			$this->post_type = $product->post_type;
		} elseif ( ! empty( $product->ID ) && is_object( $product ) ) {
			$this->id = absint( $product->ID );
			$this->post_type = $product->post_type;
		}
	}

	/**
	 * Set post parent ID in case of variation
	 *
	 * @param int $id
	 */
	public function set_parent( $id = 0 ) {
		$this->post_data['post_parent'] = absint( $id );
	}

	/**
	 * Prepares different post and meta data
	 *
	 * @param array $args
	 */
	public function set_data( $args = array() ) {
		$_product_data = array();
		$_product_meta = array();

		foreach ( $args as $key => $value ) {
			switch ( $key ) {
				case 'displayName':
					// Set Post Name
					$_product_data['post_title'] = wp_strip_all_tags( $value );
					break;
				case 'id':
					// Set External GC ID as meta
					$_product_meta['gc_product_id'] = absint( $value );
					break;
				case 'sku':
					// Set SKU as meta
					$_product_meta['sku'] = $value;
					break;
				case 'shortDescription':
					// Set post short description / excerpts
					$_product_meta['short_description'] = $value; // legacy support;
					break;
				case 'longDescription':
					// Set post long description / content
					$_product_meta['long_description'] = $value; // legacy support
					break;
				case 'productType':
					// Set product type as meta
					$_product_meta['product_type'] = $value;
					break;
				case 'externalReferenceId':
					// Set product reference ID as meta
					$_product_meta['external_reference_id'] = $value;
					break;
				case 'companyId':
					// Set product company ID as meta
					$_product_meta['company_id'] = $value;
					break;
				case 'purchasable':
					// Set product purchasable status as meta
					$_product_meta['purchasable'] = $value;
					break;
				case 'pricing': //this meta fields exists for legacy support and easing meta queries
					$_product_meta['currency']          = $value['listPrice']['currency'];
					$_product_meta['list_price_value']  = $value['listPrice']['value'];
					$_product_meta['sale_price_value']  = $value['salePriceWithQuantity']['value'];
					$_product_meta['price']             = $value['formattedSalePriceWithQuantity'];
					$_product_meta['regular_price']     = $value['formattedListPrice'];
					break;
				case 'inventoryStatus':
					$_product_meta['in_stock'] = 'true' === $value['productIsInStock'] ? true : false;
					$_product_meta['available_quantity'] = $value['availableQuantity'];
					break;
				case 'productImage':
					$_product_meta['gc_product_images_url'] = $value; // Legacy support
					break;
				case 'thumbnailImage':
					$_product_meta['gc_thumbnail_url'] = $value;
					break;
				case 'displayableProduct':
					$_product_meta['displayable'] = $value === 'true' ? true : false;
					$_product_data['post_status'] = $_product_meta['displayable'] ? 'publish' : 'pending';
					break;
				case 'keywords':
					$_product_meta['keywords'] = $value;
					break;
				default:
					//
					break;
			}
		}

		$_product_meta['product_images'] = array();
		$_product_images_path = $_product_meta['gc_product_images_url'] ? explode( '/product/detail/', $_product_meta['gc_product_images_url'] )[0] . '/product/detail/' : '';

		if ( isset( $args['customAttributes']['attribute'] ) ) {
			foreach ( $args['customAttributes']['attribute'] as $attribute ) {

				//Store images
				if ( preg_match( '/productImage/', $attribute['name'] ) ) {
					$parts = parse_url( $_product_meta['gc_product_images_url'] );
					$_product_meta['product_images'][] = $_product_images_path . $attribute['value'];
				}

				switch ( $attribute['name'] ) {
					case 'weight':
						$_product_meta['weight'] = $attribute['value'];
						break;
					case 'length':
						$_product_meta['length'] = $attribute['value'];
						break;
					case 'width':
						$_product_meta['width'] = $attribute['value'];
						break;
					case 'color':
						$_product_meta['color'] = $attribute['value'];
						break;
					case 'sizes':
						$_product_meta['sizes'] = $attribute['value'];
						break;
					case 'platform':
						$_product_meta['platform'] = $attribute['value'];
						break;
					case 'duration':
						$_product_meta['duration'] = $attribute['value'];
						break;
					case 'colorCode':
						$_product_meta['color_code'] = $attribute['value'];
						break;
					case 'Newly':
						$_product_meta['newly'] = 'true' === $attribute['value'] ? true : false;
						break;
					case 'cpu':
						$_product_meta['cpu'] = $attribute['value'];
						break;
					case 'disk_space':
						$_product_meta['disk_space'] = $attribute['value'];
						break;
					case 'web_browser':
						$_product_meta['web_browser'] = $attribute['value'];
						break;
					case 'gracePeriod':
						$_product_meta['grace_period'] = $attribute['value'];
						break;
					case 'memory':
						$_product_meta['memory'] = $attribute['value'];
						break;
					case 'isFreeTrial':
						$_product_meta['free_trial'] = 'true' === $attribute['value'] ? true : false;
						break;
					case 'giftingEnabled':
						$_product_meta['gift_enabled'] = 'true' === $attribute['value'] ? true : false;
						break;
					case 'operating_system':
						$_product_meta['operating_system'] = $attribute['value'];
						break;
					case 'wrapType':
						$_product_meta['wrap_type'] = $attribute['value'];
						break;
					default:
						//
						break;
				}
			}
		}
		
    if ( $args['baseProduct'] === 'true' && isset( $args['variationAttributes']['attribute'] ) ) {
      $_product_meta['var_attribute_names'] = array();
      $_product_meta['variations'] = array();
      $_product_meta['var_select_options'] = array();

      foreach ( $args['variationAttributes']['attribute'] as $attribute ) {
        $_product_meta['var_attribute_names'][ $attribute['name'] ] = $attribute['displayName'];
      }

      $var_products = $args['variations']['product'];
      $var_attribute_names = $_product_meta['var_attribute_names'];

      foreach ( $var_products as $variation ) {
        $var_product_id = $variation['id'];
        $var_custom_attributes = $variation['customAttributes']['attribute'];

        foreach ( $var_attribute_names as $key => $value ) {
          $found_key = array_search( $key, array_column( $var_custom_attributes, 'name' ) );

          if ( $found_key !== false ) {
            $attr_value = $var_custom_attributes[ $found_key ]['value'];
            $_product_meta['variations'][ $var_product_id ][ $key ] = $attr_value;

            if ( ! in_array( $attr_value, $_product_meta['var_select_options'][ $value ], true ) ) {
              $_product_meta['var_select_options'][ $value ][] = $attr_value;
            }
          }
        }
      }
    }

		$this->meta_data = array_merge( $this->meta_data, $_product_meta );
		$this->post_data = array_merge( $this->post_data, $_product_data );
	}

	/**
	 * Set product price for different currencies
	 *
	 * @param array $pricing
	 * @return mixed
	 */
	public function set_pricing_for_currency( $pricing = array() ) {
		if ( empty( $pricing ) ) return false;

		$_loc_pricing = array();
		if ( array_key_exists( 'loc_pricing', $this->meta_data ) ) {
			$_loc_pricing = $this->meta_data['loc_pricing'];
		}

		$currency = isset( $pricing['listPrice']['currency'] ) ? $pricing['listPrice']['currency'] : false;

		if ( $currency ) {
			$_loc_pricing[ $currency ]['currency']          = $pricing['listPrice']['currency'];
			$_loc_pricing[ $currency ]['list_price_value']  = $pricing['listPrice']['value'];
			$_loc_pricing[ $currency ]['sale_price_value']  = $pricing['salePriceWithQuantity']['value'];
			$_loc_pricing[ $currency ]['price']             = $pricing['formattedSalePriceWithQuantity'];
			$_loc_pricing[ $currency ]['regular_price']     = $pricing['formattedListPrice'];
		} else {
			error_log( var_export( array( 'Couldn\'t set pricing meta for a specific locale', $pricing ) ) );
			return false;
		}

		$this->meta_data['loc_pricing'] = $_loc_pricing;
	}

	/**
	 * Set of term IDs
	 *
	 * Equivalent to calling wp_set_post_terms()
	 * The current user MUST have the capability to work with a taxonomy
	 *
	 * @param array $categories
	 */
	public function set_categories( $categories = array() ) {
		$this->post_data['tax_input'] = array( 'dr_product_category' => $categories );
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

		return wp_insert_post( $this->post_data, true );
	}
}
