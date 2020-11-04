<?php
/**
 * Authenticator, generates session,
 * access and refresh tokens, syncs with session.
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 * @version 1.0.0
 */

if ( ! defined('DRGC_PLUGIN_DIR') ) {
	require_once 'abstract-http-service.php';
}

class DRGC_Authenticator extends AbstractHttpService {
	/**
	 * Session object
	 */
	protected $session;

	/**
	 * Api key
	 */
	protected $drgc_api_key;

	/**
	 * Token expires in
	 */
	protected $expires_in;

	/**
	 * Refresh token on limited access
	 */
	protected $refresh_token;

	/**
	 * DR session token
	 */
	protected $dr_session_token;

	/**
	 * External Reference Id for shopper
	 */
	protected $dr_external_reference_id;

	/**
	 * DRGC_Authenticator constructor.
	 *
	 * @param $session
	 */
	public function __construct( $handler = false) {
		parent::__construct($handler);

		$this->drgc_api_key = get_option( 'drgc_api_key' );
		$this->site_id = get_option( 'drgc_site_id' );
	}

	/**
	 * Get access token
	 */
	public function get_token() {
		return trim( $this->token ) ?: false;
	}

	/**
	 * Get refresh token
	 */
	public function get_refresh_token() {
		return trim( $this->refresh_token ) ?: false;
	}

	/**
	 * Get token type
	 */
	public function get_token_type() {
		return ucfirst($this->tokenType) ?: false;
	}

	/**
	 * Get session token
	 */
	public function get_session_token() {
		return $this->dr_session_token ?: false;
	}

	/**
	 * Initialize tokens
	 */
	public function init( $session ) {
		$this->session = $session;
		$session_data = $this->session->get_session_data();

		if ( ! empty( $session_data['session_token'] ) && ! is_null( $session_data['session_token'] )
			&& ! empty( $session_data['access_token'] ) && ! is_null( $session_data['access_token'] )
		) {
			$this->dr_session_token = $session_data['session_token'];
			$this->token = $session_data['access_token'];
			$this->refresh_token = $session_data['refresh_token'];
		} else {
			$this->generate_dr_session_token();
			$this->generate_access_token( '' );
		}
		
		$this->set_schedule_refresher();
	}

	/**
	 * Set Schedule Refresher
	 */
	public function set_schedule_refresher() {
		if ( ! wp_next_scheduled ( 'dr_refresh_access_token' ) ) {
			wp_schedule_event( time(), 'hourly', 'dr_refresh_access_token');
		}

		add_action( 'dr_refresh_access_token', array( $this, 'do_refresh_access_token' ) );
	}
		// If we have full access exit

	/**
	 * Generate Session token if not present
	 *
	 * @return mixed
	 */
	public function generate_dr_session_token() {
		$url = $this->authUrl();

		return $this->dr_session_token = $this->getNoAuth( $url )['session_token'];
	}

	/**
	 * Generate session-aware access token
	 *
	 * @param string $key - public API key
	 * @param array $data - post body
	 * 
	 * @return array $res
	 */
	public function generate_access_token( $key = '', $data = array() ) {
		try {
			if ( empty( $key ) ) {
				// via Oauth 2.0
				if ( ! $data ) {
					$data = array(
						"dr_session_token" => $this->dr_session_token,
						"grant_type" => "password"
					);
				}
	
				$this->setFormContentType();
				$res = $this->post( "/oauth20/token",  $this->prepareParams( $data ) );
			} else {
				// via a public API key
				$params = array(
					'apiKey' => $key
				);
		
				$url = $this->authUrl() . '?' . http_build_query( $params );
				$res = $this->getNoAuth( $url );
			}
			 
			$this->token         = $res['access_token'] ?? null;
			$this->tokenType     = $res['token_type'] ?? null;
			$this->expires_in    = $res['expires_in'] ?? null;
			$this->refresh_token = $res['refresh_token'] ?? null;
	
			if ( ! is_null( $this->session ) ) {
				$this->session->generate_session_cookie_data( array(
					'session_token' => $this->dr_session_token,
					'refresh_token' => $this->refresh_token ?: null,
					'access_token'  => $this->token,
				));
			}
	
			return $res;
		} catch (\Exception $e) {
			return "Error: # {$e->getMessage()}";
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
		$data = array (
			'username' => $username,
			'password' => base64_encode($password),
			'grant_type' => 'password'
		);

		$this->setFormContentType();

		try {
			$res = $this->post( "/oauth20/token", $this->prepareParams( $data ) );

			if ( isset( $res['error'] ) ) {
				return $res;
			}

			$this->refresh_token        = null;
			$this->token                = $res['access_token'] ?? $res['access_token'];
			$this->tokenType            = $res['token_type'] ?? $res['token_type'];
			$this->expires_in           = $res['expires_in'] ?? $res['expires_in'];

			if ( ! is_null( $this->session ) ) {
				$this->session->generate_session_cookie_data( array(
					'session_token' => $this->dr_session_token,
					'refresh_token' => $this->refresh_token,
					'access_token'  => $this->token,
				) );
			}

			return $res;
		} catch (\Exception $e) {
			return "Error: # {$e->getMessage()}";
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
  public function generate_access_token_by_ref_id( $external_reference_id, $force_bearer_token = false ) {
    $data = array (
      'dr_external_reference_id' => $external_reference_id,
      'grant_type'               => 'client_credentials'
    );

    $this->setFormContentType();

    try {
      $res = $this->post( "/oauth20/token", $this->prepareParams( $data ), $force_bearer_token );

      if ( isset( $res['error'] ) ) {
        return $res;
      }

      $this->refresh_token        = null;
      $this->token                = $res['access_token'] ?? $res['access_token'];
      $this->tokenType            = $res['token_type'] ?? $res['token_type'];
      $this->expires_in           = $res['expires_in'] ?? $res['expires_in'];

      if ( ! is_null( $this->session ) ) {
        $this->session->generate_session_cookie_data( array(
          'session_token' => $this->dr_session_token,
          'refresh_token' => $this->refresh_token,
          'access_token'  => $this->token,
        ) );
      }

      return $res;
    } catch (\Exception $e) {
      return "Error: # {$e->getMessage()}";
    }
  }

  /**
   * Refresh Token handler
   */
  public function do_refresh_access_token() {
    if ( is_null( $this->refresh_token ) ) return false;

    $data = array(
      "refresh_token" => $this->refresh_token,
      "grant_type" 	  => "refresh_token"
    );

    $this->setFormContentType();
    $res = $this->post( "/oauth20/token",  $this->prepareParams( $data ), false );

    $this->token         = $res['access_token']  ?? null;
    $this->tokenType     = $res['token_type']    ?? null;
    $this->expires_in    = $res['expires_in']    ?? null;
    $this->refresh_token = $res['refresh_token'] ?? null;

    if ( ! is_null( $this->session ) ) {
      $this->session->generate_session_cookie_data( array(
        'session_token' => $this->dr_session_token,
        'access_token'  => $this->token,
        'refresh_token' => $this->refresh_token
      ));
    }

    return $res;
  }
}
