<?php
/** 
 * Product Details class.
 *
 * @link       https://www.digitalriver.com
 * @since      2.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

class DRGC_Product_Details extends AbstractHttpService {
	/**
	 * @var string $current_locale
	 */
	public $current_locale;

	/**
	 * @var string $current_currency
	 */
	public $current_currency;

	/**
	 * The authenticator | object
	 */
	protected $authenticator;

	/**
	 * DRGC_Product_Details constructor.
	 */
	public function __construct( $authenticator, $handler = false ) {
		parent::__construct( $handler );

		$this->authenticator = $authenticator;
		$this->init();
  }
	
	/**
	 * Initialize the product details object.
	 */
	public function init() {
		$this->current_locale = drgc_get_current_dr_locale();
    $this->current_currency = drgc_get_selected_currency();
		$this->token = $this->authenticator->get_token();
	}

  /**
	 * Get pricing for a specific product.
	 *
	 * @param integer $id - GC product id
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
	 * Get a product by ID.
	 *
	 * @param integer $id - GC product id
	 * @param array $params - query strings
	 *
	 * @return array|bool
	 */
	public function get_product_details( $id, $params = array() ) {
		$plugin = DRGC();

		if ( ( $plugin->shopper->locale !== $this->current_locale ) || ( $plugin->shopper->currency !== $this->current_currency ) ) {
			$plugin->shopper->update_locale_and_currency( $this->current_locale, $this->current_currency );
		}

		$url = "/v1/shoppers/me/products/{$id}?" . http_build_query( $params );

		try {
			$res = $this->get( $url );

			return isset( $res['product'] ) ? $res['product'] : array();
		} catch (\Exception $e) {
			return false;
		}
	}
}