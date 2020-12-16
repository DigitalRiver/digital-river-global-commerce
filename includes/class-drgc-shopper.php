<?php
/**
 * Shopper object, generates session.
 * Deals with generation of tokens, and fetching data.
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 * @version 1.0.0
 */

class DRGC_Shopper extends AbstractHttpService {
	/**
	 * Cart Id
	 */
	private $cart_id;

	/**
	 * The user id
	 */
	private $user_id;

	/**
	 *  Current shopper locale
	 */
	public $locale;

	/**
	 *  Shopper currency
	 */
	public $currency;

	/**
	 * Refresh token for limited access only | string
	 */
	private $refresh_token;

	/*
	 * Access token expiration
	 */
	private $expires_in;

	/**
	 * The client ip address
	 */
	private $client_ip_address;

	/**
	 * Weather the shopper is authenticated| bool
	 */
	private $authenticated = false;

	/**
	 * The authenticator | object
	 */
	protected $authenticator;

	/**
	 * The shopper personal data | array
	 */
	protected $shopper_data;

    /**
     * Undocumented variable
     */
    protected $drgc_api_key;

	/**
	 * DRGC_Shopper constructor.
	 *
	 * @param $authenticator
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
		$this->refresh_token = $this->authenticator->get_refresh_token();

    if ( $this->token ) {
      $this->get_access_token_information();
    }
	}

	/**
	 * Generate full access token
	 *
	 * @param string $username
	 * @param string $password
	 *
	 * @return mixed $data
	 */
	public function generate_access_token_by_login_id( $username, $password ) {
		$data = $this->authenticator->generate_access_token_by_login_id( $username, $password );

		$this->refresh_token        = null;
		$this->token                = isset( $data['access_token'] ) ? $data['access_token'] : null;
		$this->tokenType            = isset( $data['token_type'] ) ? $data['token_type'] : null;
		$this->expires_in           = isset( $data['expires_in'] ) ? $data['expires_in'] : null;

		return $data;
	}

	/**
	 * Generate full access token
	 *
	 * @param string $external_reference_id
	 *
	 * @return mixed $data
	 */
	public function generate_access_token_by_ref_id( $external_reference_id ) {
		$data = $this->authenticator->generate_access_token_by_ref_id( $external_reference_id );

		$this->refresh_token        = null;
		$this->token                = isset( $data['access_token'] ) ? $data['access_token'] : null;
		$this->tokenType            = isset( $data['token_type'] ) ? $data['token_type'] : null;
		$this->expires_in           = isset( $data['expires_in'] ) ? $data['expires_in'] : null;

		return $data;
	}

	/**
	 * Generate limited access token
	 *
	 * @return mixed $this
	 */
	public function generate_limited_access_token() {
		$data = $this->authenticator->generate_access_token( '' );

		$this->token          = isset( $data['access_token'] ) ? $data['access_token'] : null;
		$this->tokenType      = isset( $data['token_type'] ) ? $data['token_type'] : null;
		$this->expires_in     = isset( $data['expires_in'] ) ? $data['expires_in'] : null;
		$this->refresh_token  = isset( $data['refresh_token'] ) ? $data['refresh_token'] : null;

		return $this;
	}

	/**
	 * Updates shopper information for the current shopper.
	 *
	 * @param array $params
	 *
	 * @return array|bool
	 */
	public function update_shopper_fields( $params = array() ) {
		$default = array(
			'expand'            => 'all'
		);

		$params = array_merge(
			$default,
			array_intersect_key( $params, $default )
		);

		try {
			$this->post( "/v1/shoppers/me?" . http_build_query( $params ) );
			return true;
		} catch (\Exception $e) {
			return "Error: # {$e->getMessage()}";
		}
	}

  /**
   * Get access token data
   */
  public function get_access_token_information() {
    $res = $this->authenticator->get_access_token_information( $this->token );

    $this->locale            = $res['locale'];
    $this->currency          = $res['currency'];
    $this->cart_id           = $res['cartId'];
    $this->user_id           = $res['userId'];
    $this->authenticated     = $res['authenticated'] === 'true';
    $this->client_ip_address = $res['clientIpAddress'];

    return $res;
  }

	/**
	 * Retrieve the current (anonymous and
	 * authenticated) shopper and shopper data.
	 *
	 * @param array $params
	 * @return bool
	 */
	public function retrieve_shopper( $params = array() ) {
		$default = array(
			'expand'            => 'all'
		);

		$params = array_merge(
			$default,
			array_intersect_key( $params, $default )
		);

		$url = "/v1/shoppers/me?".http_build_query( $params );

		try {
			$res = $this->get($url);

      $this->shopper_data = array(
        'username'   =>  $res['shopper']['username'],
        'last_name'  =>  $res['shopper']['lastName'],
        'first_name' =>  $res['shopper']['firstName'],
        'email'      =>  $res['shopper']['emailAddress'],
        'id'         =>  $res['shopper']['id'],
        'locale'     =>  $res['shopper']['locale'],
        'currency'   =>  $res['shopper']['currency']
      );

			$this->user_id = $res['shopper']['id'];

			return $res['shopper'];
		} catch (\Exception $e) {
			return false;
		}
	}

  /**
   * Retrieve all addresses configured for a shopper
   *
   * @param array $params
   * @return array|bool
   */
  public function retrieve_all_addresses( $params = array() ) {
    $default = array(
      'expand'            => 'all'
    );

    $params = array_merge(
      $default,
      array_intersect_key( $params, $default )
    );

    $url = "/v1/shoppers/me/addresses?".http_build_query( $params );

    try {
      $res = $this->get($url);

      if ( isset( $res['addresses']['address'] ) && ! empty( $res['addresses']['address'] ) ) {
        return $res['addresses']['address'];
      } else {
        return false;
      }
    } catch (\Exception $e) {
      return false;
    }
	}

	/**
	 * Create a new shopper.
	 * The base shopper account information includes the shopper's name and email address.
	 *
	 * @param string $username
	 * @param string $password
	 * @param string $first_name
	 * @param string $last_name
	 * @param string $email_address
	 * @param string $externalReferenceId
	 *
	 * @return mixed
	 */
	public function create_shopper(
		$username,
		$password,
		$first_name,
		$last_name,
		$email_address,
		$externalReferenceId
	) {
		$data = array (
			'shopper' => array (
				'username'     			  => $username,
				'password'     			  => base64_encode($password),
				'firstName'    			  => $first_name,
				'lastName'     			  => $last_name,
				'emailAddress' 			  => $email_address,
				'externalReferenceId' => $externalReferenceId
				// 'locale'       => $this->locale,
				// 'currency'     => $this->currency,
			),
		);

		$this->setJsonContentType();

		try {
			$res = $this->post( "/v1/shoppers", $data );

			if ( isset( $res['errors']['error'] ) ) {
				return $res;
			}

			$this->generate_access_token_by_ref_id( $externalReferenceId );

			return true;
		} catch (\Exception $e) {
			return $e->getMessage();
		}
	}

  /**
   * Updates password for the current shopper.
   *
   * @param string $password
   *
   * @return mixed
   */
  public function update_shopper_password( $password ) {
    $data = array( 
      'shopper' => array(
        'password' => base64_encode( $password )
      )
    );

    try {
      $res = $this->post( "/v1/shoppers/me", $data );
      return $res;
    } catch (\Exception $e) {
      return $e->getMessage();
    }
  }

	/**
	 * Return true if the shopper is authenticated
	 *
	 * @return bool
	 */
	public function is_shopper_logged_in() {
		return $this->authenticated;
	}

	/**
	 * Return current shopper locale
	 *
	 * @return bool
	 */
	public function get_locale() {
		return $this->locale;
	}

  /**
   * Return current shopper data
   *
   * @return array
   */
  public function get_shopper_data() {
    return $this->shopper_data;
  }

  /**
   * Retrieve all scriptions for the current authenticated shopper.
   *
   * @param array $params
   *
   * @return array|bool
   */
  public function retrieve_subscriptions( $params = array() ) {
	  			
	if(!$this->is_shopper_logged_in()) return false;

    $default = array(
      'expand' => 'all'
    );

    $params = array_merge(
      $default,
      array_intersect_key( $params, $default )
    );

    $url = "/v1/shoppers/me/subscriptions?" . http_build_query( $params );

    try {
      $res = $this->get( $url );
      
      if ( isset( $res['subscriptions']['subscription'] ) ) {
        foreach ( $res['subscriptions']['subscription'] as $key => $sub ) {
          if ( $res['subscriptions']['subscription'][$key]['products']['product']['uri'] ) {
            $res['subscriptions']['subscription'][$key]['products']['product']['full'] = $this->get( $res['subscriptions']['subscription'][$key]['products']['product']['uri'] );
          }
        }
      }
      
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }

	/**
	 * Retrieve the scription details by a subscription ID.
	 *
	 * @param array $params
	 *
	 * @return array|bool
	 */
	public function get_subscription_details( $params = array() ) {
		if ( is_null ( $id = $_POST[ 'subscription_id' ] ?? null ) ) {
			return;
		}

		$default = array(
			'expand' => 'all'
		);

		$params = array_merge(
			$default,
			array_intersect_key( $params, $default )
		);

		$url = "/v1/shoppers/me/subscriptions/{$id}?" . http_build_query( $params );

		try {
			$res = $this->get($url);

			return isset( $res['subscription'] ) ? $res['subscription'] : '';
		} catch (\Exception $e) {
			return false;
		}
	}

  /**
   * Retrieve all orders for the current authenticated shopper.
   *
   * @param array $params
   *
   * @return array|bool
   */
  public function retrieve_orders( $params = array() ) {
    $default = array(
      'expand' => 'order.id,order.submissionDate,order.pricing.formattedTotal,order.orderState'
    );

    $params = array_merge(
      $default,
      array_intersect_key( $params, $default )
    );

    $url = "/v1/shoppers/me/orders?" . http_build_query( $params );

    try {
      $res = $this->get( $url );

      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }

	/**
	 * Retrieve a shopper order by an order ID.
	 *
	 * @param string $order_id
	 * @param array  $params
	 *
	 * @return array|bool
	 */
	public function retrieve_order( $order_id, $params = array() ) {
		$default = array(
			'expand' => 'all'
		);

		$params = array_merge(
			$default,
			array_intersect_key( $params, $default )
		);

		$url = "/v1/shoppers/me/orders/{$order_id}?" . http_build_query( $params );

		try {
			$res = $this->get($url);

			return $res['order'];
		} catch (\Exception $e) {
			return false;
		}
  }

	public function retrieve_shopper_payments( $params = array() ) {
		$default = array(
			'expand'            => 'all'
		);

		$params = array_merge(
			$default,
			array_intersect_key( $params, $default )
		);

		$url = "/v1/shoppers/me/payment-options?".http_build_query( $params );
		try {
			$res = $this->get($url);

			if ( isset($res['paymentOptions']['paymentOption']) && !empty($res['paymentOptions']['paymentOption']) ) {
				return $res['paymentOptions']['paymentOption'];
			} else {
				return false;
			}

		} catch (\Exception $e) {
			return false;
		}
	}

	public function delete_shopper_payments( $id ) {

		$url = "/v1/shoppers/me/payment-options/".$id;
		try {
			$res = $this->delete($url);

			return $res;

		} catch (\Exception $e) {
			return false;
		}
	}

	public function update_shopper_payments( $payLoad = array() ) {

		$jsonData = array('paymentOption' => $payLoad );

		$this->setJsonContentType();

		try {
			$res = $this->post( "/v1/shoppers/me/payment-options", $jsonData );

			if ( isset( $res['errors']['error'] ) ) {
				return $res;
			}

			return $res;
		} catch (\Exception $e) {
			return $e->getMessage();
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
		$data = array(
			'shopper' => array(
				'locale' => $locale,
				'currency' => $currency
			)
		);
		$this->setJsonContentType();

		try {
			$res = $this->post( '/v1/shoppers/me', $data );
			$this->locale = $locale;
			$this->currency = $currency;
			return $res;
		} catch (\Exception $e) {
			return false;
		}
  }

  /**
   * Retrieve the tax registrations for a shopper.
   *
   * @param string $customer_id
   *
   * @return array|bool
   */
  public function get_shopper_tax_registration( $customer_id = '' ) {
    if ( ! isset( $this->user_id ) && empty( $customer_id ) ) return;

    if ( empty( $customer_id ) ) {
      $customer_id = $this->user_id;
    }

    try {
      $res = $this->get( "/user-api/customers/{$customer_id}/tax-registration" );

      $res['US'] = array_key_exists( 'taxCertificates', $res ) ? 'ENABLED' : 'DISABLED';

      if ( ( $res['US'] === 'ENABLED' ) && ! empty( $res['taxCertificates'] ) ) {
        $found_key = array_search( 'ELIGIBLE', array_column( $res['taxCertificates'], 'status' ) );
        $res['eligibleCertificate'] = ( $found_key !== false ) ? $res['taxCertificates'][ $found_key ] : [];
			}

      return $res;
    } catch ( RequestException $e ) {
      return false;
    }
  }
}
