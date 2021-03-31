<?php
/**
 * Cart object
 *
 * @since      1.0.0
 * @package    Digital_River_Global_Commerce
 */

class DRGC_Cart extends AbstractHttpService {
    /**
     * Cart Object
     */
    public $cart;

    /**
     * Refresh token
     */
    protected $refresh_token;

    /**
     * Current line items
     */
    protected $line_items = array();

    /**
     * Billing address
     */
    protected $billing_address = array();

    /**
     * Undocumented variable
     */
    protected $drgc_api_key;

	/**
	 * The authenticator | object
	 */
	protected $authenticator;

    /**
     * Constructor
     */
    public function __construct( $authenticator, $handler = false ) {
        parent::__construct($handler);

        $this->authenticator = $authenticator;
        $this->drgc_api_key = get_option( 'drgc_api_key' );

        $this->init();
    }
    
    /**
     * Initialize the shopper object
     */
    public function init() {
        $this->token         = $this->authenticator->get_token();
        $this->refresh_token =  $this->authenticator->get_refresh_token();
    }

    /**
     * Get line item by id
     */
    public function get_line_item_by_id( $id ) {
        foreach ( $this->line_items as $line_item ) {
            if ( $line_item['id'] === $id ) {
                return $line_item;
            }
        }
    }

    /**
     * Returns a list of all cart line-items.
     */
    public function list_line_items() {
        return $this->line_items ?: array();
    }

    /**
     * Retrieve the contents of an active cart. Supply
     * an active token and Digital River will respond with the
     * corresponding cart information (products, prices and links
     * to billing and shipping address as well as shipping options).
     */
    public function retrieve_cart( $params = array() ) {
        $default = array(
            'expand' => 'all'
        );

        $params = array_merge(
            $default,
            array_intersect_key( $params, $default )
        );

        $res = $this->get( "/v1/shoppers/me/carts/active?".http_build_query( $params ) );
        $hasPhysicalProduct = false;

        if ( isset( $res['cart']['lineItems']['lineItem'] ) ) {
	        $line_items = $res['cart']['lineItems']['lineItem'];
		        foreach ( $line_items as $line_item ) {
                    if ( $line_item['product']['productType'] === 'PHYSICAL' ) {
                        $hasPhysicalProduct = true;
                    }
			        $this->line_items[] = $line_item;
		        }
        }

        if ( isset( $res['cart'] ) ) {
            $res['cart']['hasPhysicalProduct'] = $hasPhysicalProduct;
        }

        $this->cart = isset( $res['cart'] ) ? $res['cart'] : false;

        return $res;
    }

    /**
     * Create a brand new cart by using the new access token.
     */
    public function create_new_cart( $token = '' ) {
        $data = array(
            'cart' => ''
        );

        if ( ! empty( $token ) ) {
            $this->token = $token;
        }

        $this->setJsonContentType();
        $res = $this->post( '/v1/shoppers/me/carts/active', $data );

        return $res;
    }

    /**
     * Retrieve a shopper order. Supply a full 
     * access token as well as an order ID and Digital 
     * River will provide all corresponding order information.
     */
    public function retrieve_order() {
        if ( is_null ( $id = $_POST[ 'order_id' ] ?? null ) ) {
            // Maybe redirect to other page
            return;
        }

        $hasPhysicalProduct = false;

        $default = array(
            'expand'     => 'all',
            'orderState' => 'Open'
        );

        $res = $this->get( "/v1/shoppers/me/orders/{$id}?".http_build_query( $default ) );
        $hasPhysicalProduct = false;

        if ( isset( $res['order']['lineItems']['lineItem'] ) ) {
            $line_items = $res['order']['lineItems']['lineItem'];
                foreach ( $line_items as $line_item ) {
                    if ( $line_item['product']['productType'] === 'PHYSICAL' ) {
                        $hasPhysicalProduct = true;
                        break;
                    }
                }
        }

        if ( isset( $res['order'] ) ) {
            $res['order']['hasPhysicalProduct'] = $hasPhysicalProduct;
        }

        return $res;
    }

    /**
     * Returns a list of all site 
     * supported currencies and locales.
     */
    public function retrieve_currencies() {
        return $this->get( "/v1/shoppers/site" );
    }

    /**
     * Returns a list of all cart line-items.
     * Supply an active token and Digital River will respond with
     * the corresponding product and price information for all cart line-items.
     */
    public function fetch_items( $params = array() ) {
        $res = $this->get( "/v1/shoppers/me/carts/active/line-items" . http_build_query( $params ) );

        if ( $line_items = $res['lineItems']['lineItem'] ) {
            foreach ( $line_items as $line_item ) {
                $this->line_items[] = $line_item;
            }
        }

        return $res;
    }

    /**
     * Update and/or add product line-items to
     * an active cart. Supply one or more product
     * ID's or your system's product ID's (external reference ID)
     * and Digital River will add those products to the shopper's cart.
     */
    public function update_line_items( $params = array() ) {    
        try {
            $this->post( "/v1/shoppers/me/carts/active/line-items".http_build_query( $params ));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Retrieve a cart billing address.
     * Supply a limited access token and Digtial River
     * will respond with all corresponding billing address information.
     */
    public function get_billing_address( $params = array() ) {
        $default = array(
            'expand'            => 'all'
        );

        $params = array_merge(
            $default,
            array_intersect_key( $params, $default )
        );

        $res = $this->get( "/v1/shoppers/me/carts/active/billing-address?" . http_build_query( $params ) );

        $this->billing_address = $res['address'];

        return $res;
    }

    /**
     * Retrieve all offers for a product by giving the name of the point-of-promotion and the product ID.
     */
    public function get_offers_by_pop( $pop_type, $product_id, $params = array()) {
        $product_uri = $product_id ? "products/{$product_id}/" : '';
        $default = array(
            'expand' => 'all'
        );

        $params = array_merge(
            $default,
            array_intersect_key( $params, $default )
        );

        try {
            $res = $this->get( "/v1/shoppers/me/{$product_uri}point-of-promotions/{$pop_type}/offers?" . http_build_query( $params ) );
            return $res;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Updates the shipping address for a cart
     */
    public function update_cart_shipping( $data = array() ) {
        $this->setJsonContentType();

        try {
            $this->put( '/v1/shoppers/me/carts/active/shipping-address', $data );
            return true;
        } catch ( RequestException $e ) {
            return false;
        }
    }

    /**
     * Updates the billing address for a cart
     */
    public function update_cart_billing( $data = array() ) {
        $this->setJsonContentType();

        try {
            $this->put( '/v1/shoppers/me/carts/active/billing-address', $data );
            return true;
        } catch ( RequestException $e ) {
            return false;
        }
    }

    /**
     * Get the tax schema
     */
    public function get_tax_schema( $address ) {
        $data = array(
            'address' => $address
        );

        try {
            if ( ! $this->update_cart_shipping( $data ) ) return false;

            $res = $this->get( "/carts/active/tax-registrations/schema" );

            if ( isset( $res['errors'] ) ) {
                if ( is_array( $res['errors'] ) && isset( $res['errors'][0]['message'] ) && ! empty( $res['errors'][0]['message'] ) ) {
                    return $res['errors'][0]['message'];
                } elseif ( isset( $res['errors']['error'] ) && is_array( $res['errors']['error'] ) && isset( $res['errors']['error'][0]['description'] ) && ! empty( $res['errors']['error'][0]['description'] ) ) {
                    return $res['errors']['error'][0]['description'];
                } else {
                    return __( 'Something went wrong with TEMS ROW.', 'digital-river-global-commerce' );
                }
            } elseif ( isset( $res['oneOf'] ) && is_array( $res['oneOf'] ) ) {
                $enabled_types = [];
                $shopper_types = $res['oneOf'];
                $len = strlen('definitions/');

                foreach ( $shopper_types as $type ) {
                    if ( isset( $type['properties']['customerType']['enum'] ) && is_array( $type['properties']['customerType']['enum'] ) ) {
                        $customer_type = $type['properties']['customerType']['enum'];
                        $enabled_types[ $type['title'] ]['customerType'] = $customer_type[0];
                    }

                    if ( isset( $type['properties']['taxRegistrations']['items'] ) && is_array( $type['properties']['taxRegistrations']['items'] ) ) {
                        $items = $type['properties']['taxRegistrations']['items'];

                        if ( count( $items ) > 0 ) {
                            foreach ( $items as $item ) {
                                $ref = $item['$ref'];
                                $ref_key = substr( $ref, strpos( $ref, 'definitions') + $len );

                                if ( isset( $res['definitions'][ $ref_key ] ) ) { 
                                    $definition = $res['definitions'][ $ref_key ]['properties']['value'];
                                    $enabled_types[ $type['title'] ]['taxRegistrations'][] = array( 
                                        $ref_key => array(
                                            'title'       => $definition['title'],
                                            'description' => $definition['description'],
                                            'pattern'     => $definition['pattern']
                                        ) 
                                    );
                                }
                            }
                        } else {
                            $enabled_types[ $type['title'] ]['taxRegistrations'] = [];
                        }
                    }
                }

                return $enabled_types;
            } else {
                return [];
            }
        } catch ( RequestException $e ) {
            if ( $e->hasResponse() ) {
                $response = $e->getResponse();
                return $response->getReasonPhrase();
            } else {
                $response = $e->getHandlerContext();
                return ( $response['error'] ) ?? false;
            }
        }
    }

    /**
     * Apply the tax registrations to cart
     */
    public function apply_tax_registration( $customer_type, $tax_regs = array() ) {
        $data = array(
            'customerType' => $customer_type,
            'taxRegistrations' => $tax_regs
        );

        $this->setJsonContentType();

        try {
            $res = $this->post( '/carts/active/tax-registrations', $data );
            return $res;
        } catch ( RequestException $e ) {
            return false;
        }
    }

    /**
     * Get the tax registrations from the current cart
     */
    public function get_tax_registration() {
        try {
            $res = $this->get( '/carts/active/tax-registrations' );
            return $res;
        } catch ( RequestException $e ) {
            return false;
        }
    }

    /**
     * Updates the TAX_EXEMPTION_US_STATUS custom attribute for a cart
     */
    public function update_tems_us_status( $status = '' ) {
        $data = array(
            'cart' => array(
                'customAttributes' => array(
                    'attribute' => array(
                        array(
                            'name'  => 'TAX_EXEMPTION_US_STATUS',
                            'value' => $status
                        )
                    )
                )
            )
        );

        $this->setJsonContentType();

        try {
            $res = $this->post( '/v1/shoppers/me/carts/active', $data );
            return $res;
        } catch ( RequestException $e ) {
            return false;
        }
    }
}
