<?php
/**
 * Cron class
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes/shortcodes
 */

class DRGC_Cron extends AbstractHttpService {
	/**
	 * Scheduled option
	 * @var bool
	 */
	private $enabled;

	/**
	 * DRGC_Cron constructor.
	 */
	public function __construct() {
		$option 								= get_option( 'drgc_cron_handler' );
		$this->enabled          = ( is_array( $option ) && '1' == $option['checkbox'] )  ? true : false;
		$this->init();
	}

	/**
	 * Maybe initialize scheduled events
	 * @return bool
	 */
	public function init() {
		//Schedule products import
		if ( ! wp_next_scheduled( 'dr_products_import' ) ) {
			wp_schedule_event( time(), 'twicedaily', 'dr_products_import' );
		}

		add_action( 'dr_products_import', array( $this, 'do_import' ) );

		//Schedule session clean up
		if ( ! wp_next_scheduled( 'dr_clean_expired_sessions' ) ) {
			wp_schedule_event( time(), 'twicedaily', 'dr_clean_expired_sessions' );
		}

		add_action( 'dr_clean_expired_sessions', array( $this, 'do_clean_sessions' ) );
	}

	/**
	 * Delete all sessions records older than 24hrs
	 */
	public function do_clean_sessions() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'drgc_sessions';

		$wpdb->query(
			"DELETE FROM $table_name
			WHERE `creation_time` < UNIX_TIMESTAMP(NOW() - INTERVAL 24 HOUR)"
		);
	}

	/**
	 * Import products and categories
	 * This will also delete older posts and terms
	 *
	 * @return boolean
	 */
	public function do_import() {
		if ( ! $this->enabled ) {
			return false;
		}

		$products = $this->get_api_products();

		if ( $products ) {
			$imported = array();
			$currencies = array();
			$local_currencies = DRGC()->cart->retrieve_currencies();

			if ( is_array( $local_currencies ) && isset( $local_currencies['site'] ) ) {
				$currencies['default_locale'] = $local_currencies['site']['defaultLocale'];

				if ( isset( $local_currencies['site']['localeOptions']['localeOption'] ) ) {
					foreach ( $local_currencies['site']['localeOptions']['localeOption'] as $locale ) {
						$currencies['locales'][ $locale['locale'] ] = $locale['primaryCurrency'];
					}
				}
			}

			foreach ( $products as $product_data ) {
				$post_terms          = array();
				$gc_id               = isset( $product_data['id'] ) ? absint( $product_data['id'] ) : 0;
				$existing_product_id = drgc_get_product_by_gcid( $gc_id );

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
							$post_terms[] = $term->term_id;
						}
					}

					$default_term = new DRGC_Category( 'uncategorized' );
					$default_term->save();

					$imported['terms'][] = $default_term->term_id;
					$post_terms[] = $default_term->term_id;
				}

				$post_id = $parent_product->save();
				$imported['posts'][] = $post_id;

				$post_terms = array_map( 'intval', $post_terms );
				$post_terms = array_unique( $post_terms );

				wp_set_object_terms( $post_id, $post_terms, 'dr_product_category' );

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
				}
			}

			// Delete terms not included within the current import
			$terms = get_terms( array(
				'taxonomy' => 'dr_product_category',
				'hide_empty' => false,
			) );

			$imported['terms'] = array_unique( $imported['terms'] );
			foreach ( $terms as $term ) {
				if ( ! in_array( $term->term_id, $imported['terms'] ) ) {
					wp_delete_term( $term->term_id, 'dr_product_category' );
				}
			}

			// Delete posts not included within the current import
			$_products = new WP_Query( array(
				'post_type'             => 'dr_product',
				'post_status'           => 'publish',
				'posts_per_page'        => -1,
			) );

			if ( $_products->have_posts() ) {
				while ( $_products->have_posts() ) {
					$_products->the_post();
					if ( ! in_array( get_the_ID(), $imported['posts'] ) ) {
						wp_delete_post( get_the_ID(), true );
					}
				}
				wp_reset_postdata();
			}

			// Delete variations not included within the current import
			$_products_var = new WP_Query( array(
				'post_type'             => 'dr_product_variation',
				'post_status'           => 'publish',
				'posts_per_page'        => -1,
			) );

			if ( $_products_var->have_posts() ) {
				while ( $_products_var->have_posts() ) {
					$_products_var->the_post();
					if ( ! in_array( get_the_ID(), $imported['variations'] ) ) {
						wp_delete_post( get_the_ID(), true );
					}
				}
				wp_reset_postdata();
			}
		}
		return true;
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
				return $res['products']['product'];
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
			$res = $this->get( $url, array(), true );

			return isset( $res['pricing'] ) ? $res['pricing'] : array();
		} catch (\Exception $e) {
			return false;
		}
	}
}