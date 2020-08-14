<?php

/**
 * Handle data for the current customers session,
 * which may contain Auth tokens, cart items or other
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 * @version 1.0.0
 */

class DRGC_Session {
	/**
	 * ID of the current session
	 */
	public $session_id;

	/**
	 * When session expires.
	 */
	public $expires;

	/**
	 * Cookie name
	 */
	private $cookie;

	/**
	 * Holds the session data
	 */
	private $session_data;

	/**
	 * Name of the session db table
	 */
	private $table_name;

	/**
	 * Dirty preset session
	 */
	private $dirty;

	/**
	 * Init session data and hooks
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->table_name = $GLOBALS['wpdb']->prefix . 'drgc_sessions';
		$this->cookie     = 'drgc_session';
	}

	/**
	 * Setup the session
	 */
	public function init() {
		if ( ! $this->maybe_start_session() ) {
			return;
		}

		$this->maybe_construct_session_cookie();

		// TODO have a scheduled event for deleting old sessions
	}

	public function maybe_construct_session_cookie() {
		if ( $this->dirty ) {
			$cookie = $this->dirty;
		} else {
			$cookie = isset( $_COOKIE[ $this->cookie ] ) ? $_COOKIE[ $this->cookie ] : false;
		}

		if ( $cookie && ! empty( $cookie ) ) {
			// Explode session ID and expiration time from the cookie
			$_cookie = explode( '|', $cookie );

			if ( isset( $_cookie[0] ) ) {
				// Assign the validated session ID
				$this->session_id = $_cookie[0];
			} else {
				// Generate new session ID
				$this->generate_session_id();
			}

			if ( isset( $_cookie[1] ) && intval( $_cookie[1] ) < time() ) {
				// Update session expiration time and cookie
				$this->set_expiration_time();
				$this->set_cookie();
			} else {
				$this->expires = intval( $_cookie[1] );
			}
		} else {
			// Setup new session
			$this->generate_session_id();
			$this->set_expiration_time();
			$this->set_cookie();
		}
	}

	/**
	 * Patch session to avoid session cookie oddities
	 *
	 * @param string $cookie
	 */
	public function dirty_set_session( $cookie ) {
		if ( $cookie && ! empty( $cookie ) ) {
			$this->dirty = str_replace( '%', '|', $cookie );
			$this->maybe_construct_session_cookie();
		} else {
			$this->dirty = false;
		}
	}

	/**
	 * Create the cookie data
	 *
	 * @param array $args
	 */
	public function generate_session_cookie_data( $args ) {
		$this->session_data = json_encode( array(
			'session_token' => $args[ 'session_token' ],
			'access_token'  => $args[ 'access_token' ],
			'refresh_token' => $args[ 'refresh_token' ]
		) );

		$this->store_session();
	}

	/**
	 * Get the cookie data
	 */
	public function get_session_cookie_data() {
		return $this->session_data;
	}

	/**
	 * Session expiration time
	 * 1 hour from now
	 */
	public function set_expiration_time() {
		$this->expires = time() + intval( 60 * 60 );
	}

	/**
	 * Create the cookie if headers are not already sent
	 */
	public function set_cookie() {
		if ( ! headers_sent() && did_action( 'wp_loaded' ) ) {
			$this->set_guest_flag_cookie( 'false' );
			@setcookie( $this->cookie, $this->session_id . '|' . $this->expires, $this->expires, '/', '', false, true );
			@setcookie('wordpress_cache_off',"true",$this->expires,'/');
		}
	}

	/**
	 * Reset the cookie
	 * 
	 * @return boolean
	 */
	public function reset_cookie() {
		if ( isset( $_COOKIE[ $this->cookie ] ) ) {
			$this->expires = time() + intval( 60 * 60 );
			@setcookie( $this->cookie, $this->session_id . '|' . $this->expires, $this->expires, '/', '', false, true );
	
			$cookie = explode( '|', $_COOKIE[ $this->cookie ] );

			return ( $cookie[1] < $this->expires );
		} else {
			return false;
		}
	}

	/**
	 * Create/modify the cookie of drgc_guest_flag
	 */
	public function set_guest_flag_cookie( $value ) {
		@setcookie( 'drgc_guest_flag', $value, $this->expires, '/' );
	}

	/**
	 * Generate hashed session ID
	 */
	public function generate_session_id() {
		require_once ABSPATH . 'wp-includes/class-phpass.php';
		$hasher = new PasswordHash( 8, false );

		$this->session_id = md5( $hasher->get_random_bytes( 32 ) );
	}

	/**
	 * Check if valid session ID
	 *
	 * @param string $md5
	 *
	 * @return false|int
	 */
	function is_valid_md5( $md5 = '' ) {
		return preg_match( '/^[a-f0-9]{32}$/', $md5 );
	}

	/**
	 * Determines if session should start
	 *
	 * @return bool
	 */
	public function maybe_start_session() {
		$session = true;

		if ( is_admin() && ! wp_doing_ajax() ) {
			// Don't create session within the admin, unless during WP_Ajax
			$session = false;
		}

		return $session;
	}

	/**
	 * Checks for the current session
	 *
	 * @return bool
	 */
	public function has_session() {
		return ( $this->session_id && $this->is_valid_md5( $this->session_id ) ? true : false );
	}

	/**
	 * Get existing session record
	 *
	 * @return string|void|null
	 */
	public function get_session_data() {
		if ( ! $this->has_session() ) {
			return;
		}

		global $wpdb;

		$records = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT session_data FROM $this->table_name
				WHERE session_id = %s
				LIMIT 1" ,
				$this->session_id
			)
		);

		foreach ( $records as $session ) {

			return json_decode( $session->session_data, true );
		}
	}

	/**
	 * Clears current session and record
	 */
	public function clear_session() {
		if ( ! $this->has_session() ) {
			return;
		}

		global $wpdb;

		$wpdb->query(
			$wpdb->prepare(
				"DELETE FROM $this->table_name
				WHERE session_id = %s",
				$this->session_id
			)
		);

    $this->generate_session_id();
    $this->reset_cookie();
    $this->session_data = '';
	}

	/**
	 * Stores session record
	 */
	public function store_session() {
		if ( ! $this->has_session() && $this->session_data ) {
			return;
		}

		global $wpdb;

		$wpdb->query(
			$wpdb->prepare(
				"INSERT INTO $this->table_name ( `session_id`, `expires`, `session_data` )
			VALUES ( %s, %d, %s )
			ON DUPLICATE KEY
			UPDATE `expires` = VALUES(`expires`), `session_data` = VALUES(`session_data`)",
				$this->session_id,
				$this->expires,
				$this->session_data
			)
		);
	}
}