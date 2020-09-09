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
	 * Holds the session data
	 */
	private $session_data;

	/**
	 * Name of the session db table
	 */
	private $table_name;

  /**
   * Init session data and hooks
   *
   * @since 1.0.0
   */
  public function __construct() {
    $this->table_name = $GLOBALS['wpdb']->prefix . 'drgc_sessions';
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
    if ( empty( $this->session_id ) ) {
      $this->session_id = session_id();
    }

    $this->set_cookie();
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
   * Create the cookie if headers are not already sent
   */
  public function set_cookie() {
    if ( ! headers_sent() && did_action( 'wp_loaded' ) ) {
      // WP Engine will exclude pages where a cookie containing wordpress_ has a value set from server caching
      @setcookie( 'wordpress_wpe_page_cache', 'off', 0, '/' );
    }
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
    return ( ! empty( $this->session_id ) );
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

    $this->session_data = '';
    $this->session_id = '';

    if ( ini_get( 'session.use_cookies' ) ) { 
      $params = session_get_cookie_params(); 

      @setcookie( session_name(), '', time() - 42000, 
        $params['path'], 
        $params['domain'], 
        $params['secure'], $params['httponly'] 
      );
    }

    session_unset();
    session_destroy();
    update_option( 'drgc_guest_flag', 'false' );
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
        0,
        $this->session_data
      )
    );
  }
}
