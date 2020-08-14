<?php
/** Products and categories importing with steps during AJAX calls
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

class DRGC_Ajx_Importer extends AbstractHttpService {

	/**
	 * @var string $instance_id
	 */
	public $instance_id;

	/**
	 * Slugified instance id
	 *
	 * @var string $instance_slug
	 */
	public $instance_slug;

	/**
	 * Api key option
	 * @var mixed|void
	 */
	public $api_key;

	/**
	 * Cached GC Products request
	 *
	 * @var array|bool
	 */
	private $dr_products;

	/**
	 * @var string $default_locale
	 */
	public $default_locale;

	/**
	 * @var string $default_currency
	 */
	public $default_currency;

	/**
	 * DRGC_Ajx_Importer constructor.
	 *
	 * @param string $instance_id
	 */
	public function __construct( $instance_id, $handler = false ) {
		parent::__construct( $handler );

		$this->instance_id      = $instance_id;
		$this->instance_slug    = DRGC_Ajx::slugify( $instance_id );

		if ( ! DRGC()->authenticator->get_token() ) {
			DRGC()->authenticator->generate_dr_session_token();
			DRGC()->authenticator->generate_access_token( '' );
		}

		$this->token = DRGC()->authenticator->get_token();

		$this->dr_products = wp_cache_get( 'dr_products' );

		if ( false === $this->dr_products ) {	
			$this->get_store_locales_and_currencies();
			$this->fetch_and_cache_products();
		}
	}

	/**
	 * Initial Ajax Step
	 *
	 * @return array
	 */
	public function init() {
		$batch_size     = 1;
		$index_start    = 0;
		$entries_count  = count( $this->dr_products['product'] );

		return array(
			'entries_count'    => $entries_count,
			'batch_size'       => $batch_size,
			'index_start'      => $index_start,
		);
	}

	/**
	 * Processing product terms, post and its variations
	 * Called during batch process
	 *
	 * @param array $product_data
	 * @param integer $index
	 * @param array $persist
	 *
	 * @return array
	 */
	public function process( $product_data, $index, $persist = array() ) {
    set_time_limit(100);
		try {
			$imported            = array();
			$gc_id               = isset( $product_data['id'] ) ? absint( $product_data['id'] ) : 0;
			$existing_product_id = drgc_get_product_by_gcid( $gc_id );
			$currencies          = get_option( 'drgc_store_locales' );

			if ( $existing_product_id == 0 ) {
				$parent_product_new = new DRGC_Product( $existing_product_id );
				$parent_product_new->set_data( $product_data );
				$parent_product_new->save();
				$existing_product_id = drgc_get_product_by_gcid( $gc_id );
			}

			$parent_product = new DRGC_Product( $existing_product_id );
			$parent_product->set_data( $product_data );

			if ( $gc_id ) {

				if ( ! empty( $currencies ) && isset( $currencies['locales'] ) ) {
					$imported_currencies = array();
					foreach ( $currencies['locales'] as $locale => $currency ) {
						if ( $currencies['default_locale'] === $locale || in_array( $currency, $imported_currencies ) ) {
							continue;
						}

						$imported_currencies[] = $currency;
						$loc_price = $this->get_product_pricing_for_currency( $gc_id, $currency );
						
						if ( ! empty( $loc_price ) ) {
							$parent_product->set_pricing_for_currency( $loc_price );
						}
					}
				}

				$categories = $this->get_api_product_category( $gc_id );

				if ( is_array( $categories ) ) {
					foreach ( $categories as $key => $category ) {
						$term = new DRGC_Category( $category['displayName'] );
						$term->save();

						$imported['terms'][] = $term->term_id;
					}
				}

				$default_term = new DRGC_Category( 'uncategorized' );
				$default_term->save();

				$imported['terms'][] = $default_term->term_id;
			}

			if ( isset( $imported['terms'] ) && ! empty( $imported['terms'] ) ) {
				$parent_product->set_categories( $imported['terms'] );
			}

			$imported['posts'][] = $parent_product->save();

			// Create product variations as separate post entities
			if ( isset( $product_data['variations'] ) && ! empty( $product_data['variations']['product'] ) ) {
				foreach ( $product_data['variations']['product'] as $var_key => $variation_data ) {

					$_gc_id                 = isset( $variation_data['id'] ) ? absint( $variation_data['id'] ) : 0;
					$existing_variation_id  = drgc_get_product_by_gcid( $_gc_id, true );

					$variation_product = new DRGC_Product( $existing_variation_id, 'dr_product_variation' );
					$variation_product->set_data( $variation_data );
					$variation_product->set_parent( $parent_product->id );

					if ( ! empty( $currencies ) && isset( $currencies['locales'] ) ) {
						$imported_currencies = array();
						foreach ( $currencies['locales'] as $locale => $currency ) {
							if ( $currencies['default_locale'] === $locale || in_array( $currency, $imported_currencies ) ) {
								continue;
							}

							$imported_currencies[] = $currency;
							$loc_price = $this->get_product_pricing_for_currency( $_gc_id, $currency );

							if ( ! empty( $loc_price ) ) {
								$variation_product->set_pricing_for_currency( $loc_price );
							}
						}
					}

					$imported['variations'][] = $variation_product->save();
				}

				if ( isset( $persist['variations'] ) ) {
					$imported['variations'] = array_merge( $persist['variations'], $imported['variations'] );
				}
			}

			if ( isset( $persist['terms'] ) ) {
				$imported['terms'] = array_unique( array_merge( $persist['terms'], $imported['terms'] ) );
			}

			if ( isset( $persist['posts'] ) ) {
				$imported['posts'] = array_merge( $persist['posts'], $imported['posts'] );
			}

			return array(
				'success' => true,
				'index'   => $index,
				'persist' => array_replace_recursive( $persist, $imported ),
			);

		} catch ( Exception $e ) {
			return array(
				'success' => false,
				'index'   => $index,
				'persist' => new WP_Error( 'dr_product_import_error', $e->getMessage(), array( 'status' => $e->getCode() ) ),
			);
		}
	}

	/**
	 * Processing batch of product indexes to avoid timeouts
	 *
	 * @return array
	 */
	public function batchprocess() {
		$results = array();
		$items_being_process = DRGC_Ajx::get_post_value( 'itemsBeingProcessed' );

		if ( ! is_array( $items_being_process ) ) {
			error_log( 'itemsBeingProcessed is NOT an array' );

			wp_send_json_error(
				array(
					'error' => 'itemsBeingProcessed is NOT an array'
				)
			);
		}

		$persist = DRGC_Ajx::get_post_value( 'persist', array() );

		foreach ( $items_being_process as $index ) {
			$index = intval( $index );

			$product_data = $this->dr_products['product'][ $index ];

			if ( ! is_array( $product_data ) ) {
				error_log( 'Product with index: ' . $index . ' is NOT an array' );

				wp_send_json_error(
					array(
						'error' => 'Product is NOT an array'
					)
				);
			}

			$results[ $index ] = $this->process( $product_data, $index, $persist );
			$persist = $results[ $index ]['persist'];
		}

		$data = array(
			'results' => $results,
		);

		return $data;
	}

	/**
	 * Last step for the ajax
	 * Cleaning older terms and product posts
	 *
	 * @return array
	 */
	public function end() {
		wp_cache_delete( 'dr_products' );

		$imported_ids = DRGC_Ajx::get_post_value( 'persist', array() );

		// Delete terms not included within the current import
		if ( ! empty( $imported_ids['terms'] ) ) {
			$terms = get_terms( array(
				'taxonomy' => 'dr_product_category',
				'hide_empty' => false,
			) );

			foreach ( $terms as $term ) {
				if ( ! in_array( $term->term_id, $imported_ids['terms'] ) ) {
					wp_delete_term( $term->term_id, 'dr_product_category' );
				}
			}
		}

		// Delete products not included within the current import
		if ( ! empty( $imported_ids['posts'] ) ) {
			$_products = new WP_Query( array(
				'post_type'             => 'dr_product',
				'post_status'           => 'publish',
				'posts_per_page'        => -1,
			) );

			if ( $_products->have_posts() ) {
				while ( $_products->have_posts() ) {
					$_products->the_post();
					if ( ! in_array( get_the_ID(), $imported_ids['posts'] ) ) {
						wp_delete_post( get_the_ID(), true );
					}
				}
			}
			wp_reset_postdata();
		}

		// Delete variations not included within the current import
		if ( ! empty( $imported_ids['variations'] ) ) {
			$_products = new WP_Query( array(
				'post_type'             => 'dr_product_variation',
				'post_status'           => 'publish',
				'posts_per_page'        => -1,
			) );

			if ( $_products->have_posts() ) {
				while ( $_products->have_posts() ) {
					$_products->the_post();
					if ( ! in_array( get_the_ID(), $imported_ids['variations'] ) ) {
						wp_delete_post( get_the_ID(), true );
					}
				}
			}
			wp_reset_postdata();
		}
		
		return array(
			'persist'   => array(),
			'url'       => add_query_arg( 'import-complete', true, admin_url( 'edit.php?post_type=dr_product' ) ),
		);
	}

	/**
	 * Retrieve and update store locales and currencies
	 */
	public function get_store_locales_and_currencies() {
		$local_currencies = DRGC()->cart->retrieve_currencies();
		$_locale_currencies_option = array();

		if ( is_array( $local_currencies ) && isset( $local_currencies['site'] ) ) {
			$_locale_currencies_option['default_locale'] = $local_currencies['site']['defaultLocale'];
			$this->default_locale = $local_currencies['site']['defaultLocale'];

			if ( isset( $local_currencies['site']['localeOptions']['localeOption'] ) ) {
				foreach ( $local_currencies['site']['localeOptions']['localeOption'] as $locale ) {
					$_locale_currencies_option['locales'][ $locale['locale'] ] = $locale['primaryCurrency'];

					if ( $locale['locale'] === $this->default_locale ) {
						$this->default_currency = $locale['primaryCurrency'];
					}
				}
			}
		}

		update_option( 'drgc_store_locales', $_locale_currencies_option, 'yes' );
	}

	/**
	 * Fetch the GC products data and cache them
	 */
	public function fetch_and_cache_products() {
		$this->dr_products = $this->get_api_products();

		wp_cache_set( 'dr_products', $this->dr_products	);
	}

	/**
	 * Retrieve API data
	 *
	 * @return array|bool
	 */
	public function get_api_products() {
		$params = array(
			'expand'         => 'all'
		);

		$url = '/v1/shoppers/me/products?' . http_build_query( $params );

		try {
			$res = $this->get( $url );

			if ( isset( $res['products'] ) && ! empty( $res['products']['product'] ) ) {
				$count = absint( $res['products']['totalResultPages'] );
				$pages = [];

				if ( $count > 1 ) {
					for ( $i = 0; $i < $count; $i++ ) {
						$pages[$i] = 'pageNumber=' . ($i + 1);
					}

					$results = $this->getAsync( $url, $pages );

					return $results['products'];
				} else {
					return $res['products'];
				}
			}
		} catch (\Exception $e) {
			return false;
		}
	}

	/**
	 * Retrieve API data
	 *
	 * @param integer $id dr product id
	 * @return array|bool
	 */
	public function get_api_product_category( $id ) {
		$url = '/v1/shoppers/me/products/' . $id . '/categories';

		try {
			$res = $this->get( $url );

			if ( isset( $res['categories'] ) && ! empty( $res['categories']['category'] ) ) {
				return $res['categories']['category'];
			}
			return $res;
		} catch (\Exception $e) {
			return false;
		}
	}

	/**
	 * Retrieve API data
	 *
	 * @param integer $id dr product id
	 *
	 * @return array|bool
	 */
	public function get_product_pricing( $id ) {
		$url = '/v1/shoppers/me/products/' . $id . '/pricing';

		try {
			$res = $this->get( $url );

			return isset( $res['pricing'] ) ? $res['pricing'] : array();
		} catch (\Exception $e) {
			return false;
		}
	}

	/**
	 * Update locale and currency for the current shopper
	 *
	 * @param string $locale locale
	 * @param string $currency currency code
	 * 
	 * @return bool
	 */
	public function update_locale_and_currency( $locale, $currency ) {
		$params = array(
			'locale'         => $locale,
			'currency'       => $currency
		);

		$url = '/v1/shoppers/me?' . http_build_query( $params );

		try {
			$this->post( $url );

			return true;
		} catch (\Exception $e) {
			return false;
		}
	}

	/**
	 * Retrieve API data
	 *
	 * @param integer $id dr product id
	 * @param string $currency currency code
	 * 
	 * @return array|bool
	 */
	public function get_product_pricing_for_currency( $id, $currency ) {
		$params = array(
			'currency'       => $currency,
		);

		$url = '/v1/shoppers/me/products/' . $id . '/pricing?' . http_build_query( $params );
		
		try {
			$res = $this->get( $url, array(), false );

			return isset( $res['pricing'] ) ? $res['pricing'] : array();
		} catch (\Exception $e) {
			return false;
		}
	}
}