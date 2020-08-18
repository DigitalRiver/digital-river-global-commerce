<?php
use function GuzzleHttp\json_encode;

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/public
 */

class DRGC_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $drgc    The ID of this plugin.
	 */
	private $drgc;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $drgc       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $drgc, $version ) {
		$this->drgc = $drgc;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in DRGC_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The DRGC_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->drgc, plugin_dir_url( __FILE__ ) . '../assets/css/drgc-public.min.css', array(), $this->version, 'all' );

	}

  /**
   * Register the JavaScript for the public-facing side of the site.
   *
   * @since    1.0.0
   */
  public function enqueue_scripts() {
    $suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
    // Adds support for ES6
    wp_enqueue_script( 'js-polyfill', '//cdn.polyfill.io/v3/polyfill.js' );

    wp_enqueue_script( $this->drgc, DRGC_PLUGIN_URL . 'assets/js/drgc-public' . $suffix . '.js', array( 'jquery' ), $this->version, false );

    if ( is_page( 'cart' ) || is_page( 'checkout' ) || is_page( 'thank-you' ) || is_page( 'account' ) ) {
      wp_enqueue_script( 'digital-river-js', 'https://js.digitalriverws.com/v1/DigitalRiver.js', array( $this->drgc ), null, true );
    }
    if ( is_page( 'checkout' ) ) {
      wp_enqueue_script( 'paypal-checkout-js', 'https://www.paypalobjects.com/api/checkout.js', array( $this->drgc ), null, true );
    }

    $access_token = '';
    if ( DRGC()->authenticator ) {
      $access_token = DRGC()->authenticator->get_token();
    }

    $cart_obj = '';
    $order_obj = '';
    if ( DRGC()->cart ) {
      $cart_obj = DRGC()->cart->retrieve_cart();
      if ( is_page( 'thank-you' ) ) $order_obj = DRGC()->cart->retrieve_order();
    }

		$customer = array();
		if ( DRGC()->shopper ) {
			$customer = DRGC()->shopper->retrieve_shopper();
		}

    //test Order Handler
    $testOrder_option = get_option( 'drgc_testOrder_handler' );
    $testOrder_enable = ( is_array( $testOrder_option ) && '1' == $testOrder_option['checkbox'] )  ? "true" : "false";

    $force_excl_tax_option = get_option( 'drgc_force_excl_tax_handler' );
    $force_excl_tax_enable = ( is_array( $force_excl_tax_option ) && '1' == $force_excl_tax_option['checkbox'] )  ? "true" : "false";

    $applepay_option = get_option( 'drgc_applepay_handler' );
    $applepay_enabled = ( is_array( $applepay_option ) && '1' == $applepay_option['checkbox'] )  ? 'true' : 'false';

    $googlepay_option = get_option( 'drgc_googlepay_handler' );
    $googlepay_enabled = ( is_array( $googlepay_option ) && '1' == $googlepay_option['checkbox'] )  ? 'true' : 'false';

    $translation_array = array(
      'upgrade_label'               => __('Upgrade', 'digital-river-global-commerce'),
      'add_label'                   => __('Add', 'digital-river-global-commerce'),
      'free_label'                  => __('FREE', 'digital-river-global-commerce'),
      'incl_vat_label'              => __('Incl. VAT', 'digital-river-global-commerce'),
      'excl_vat_label'              => __('Excl. VAT', 'digital-river-global-commerce'),
      'vat_label'                   => __('VAT', 'digital-river-global-commerce'),
      'estimated_vat_label'         => __('Estimated VAT', 'digital-river-global-commerce'),
      'shipping_vat_label'          => __('Shipping VAT', 'digital-river-global-commerce'),
      'estimated_shipping_vat_label'=> __('Estimated Shipping VAT', 'digital-river-global-commerce'),
      'tax_label'              	    => __('Tax', 'digital-river-global-commerce'),
      'estimated_tax_label'         => __('Estimated Tax', 'digital-river-global-commerce'),
      'shipping_tax_label'          => __('Shipping Tax', 'digital-river-global-commerce'),
      'estimated_shipping_tax_label'=> __('Estimated Shipping Tax', 'digital-river-global-commerce'),
      'shipping_label'              => __('Shipping', 'digital-river-global-commerce'),
      'estimated_shipping_label'    => __('Estimated Shipping', 'digital-river-global-commerce'),
      'credit_card_ending_label'    => __('Credit card ending in', 'digital-river-global-commerce'),
      'pay_with_card_label'         => __('pay with card', 'digital-river-global-commerce'),
      'pay_with_paypal_label'       => __('pay with paypal', 'digital-river-global-commerce'),
      'view_cart_label'             => __('View Cart', 'digital-river-global-commerce'),
      'checkout_label'              => __('Checkout', 'digital-river-global-commerce'),
      'remove_label'                => __('Remove', 'digital-river-global-commerce'),
      'subtotal_label'              => __('Sub-Total', 'digital-river-global-commerce'),
      'qty_label'                   => __('Qty', 'digital-river-global-commerce'),
      'shipping_and_handling_label'	=> __('Shipping and Handling', 'digital-river-global-commerce'),
      'discount_label'		          => __('Discount', 'digital-river-global-commerce'),
      'order_total_label'		        => __('Order Total', 'digital-river-global-commerce'),
      'product_label'               => __('Product', 'digital-river-global-commerce'),
      'password_reset_title'        => __('Password reset email sent', 'digital-river-global-commerce'),
      'password_saved_title'        => __('Password saved', 'digital-river-global-commerce'),
      'password_reset_msg'          => __('You will be receiving an email soon with instructions on resetting your login password.', 'digital-river-global-commerce'),
      'password_saved_msg'          => __('You can now log in with your new password.', 'digital-river-global-commerce'),
      'empty_cart_msg'              => __('Your cart is empty.', 'digital-river-global-commerce'),
      'invalid_promo_code_msg'      => __('Please enter a valid promo code.', 'digital-river-global-commerce'),
      'invalid_email_msg'           => __('Please enter a valid email address.', 'digital-river-global-commerce'),
      'address_error_msg'           => __('Address not accepted for current currency.', 'digital-river-global-commerce'),
      'credit_card_error_msg'       => __('Failed payment for specified credit card.', 'digital-river-global-commerce'),
      'required_field_msg'          => __('This field is required.', 'digital-river-global-commerce'),
      'email_confirm_error_msg'     => __('Emails do not match.', 'digital-river-global-commerce'),
      'password_length_error_msg'      => __('Password must be between 8 - 32 characters.', 'digital-river-global-commerce'),
      'password_uppercase_error_msg'   => __('Must use at least one upper case letter.', 'digital-river-global-commerce'),
      'password_lowercase_error_msg'   => __('Must use at least one lower case letter.', 'digital-river-global-commerce'),
      'password_number_error_msg'      => __('Must use at least one number.', 'digital-river-global-commerce'),
      'password_char_error_msg'        => __('Must use at least one special character (! _ @).', 'digital-river-global-commerce'),
      'password_banned_char_error_msg' => __('Contains non-allowable special characters (only ! _ @ are allowed).', 'digital-river-global-commerce'),
      'password_confirm_error_msg'     => __('Passwords do not match.', 'digital-river-global-commerce'),
      'required_tandc_msg'             => __('Please indicate you have read and accepted the privacy policy and terms of sale.', 'digital-river-global-commerce'),
      'undefined_error_msg'            => __('Something went wrong. Please try again.', 'digital-river-global-commerce'),
      'loading_msg'                    => __('Loading...', 'digital-river-global-commerce'),
      'buy_now'                        => __('Buy Now', 'digital-river-global-commerce'),
      'add_to_cart'                    => __('Add to Cart', 'digital-river-global-commerce'),
      'out_of_stock'                   => __('Out of Stock', 'digital-river-global-commerce'),
      'cancel_subs_confirm'            => __('Are you sure you want to immediately unsubscribe this subscription?', 'digital-river-global-commerce'),
      'change_renewal_qty_prompt'      => __('Please enter the required quantity:', 'digital-river-global-commerce'),
      'shipping_options_error_msg'	   => __('There are no delivery options available for your cart or destination.', 'digital-river-global-commerce'),
      'card_expiration_placeholder'    => __('MM/YY', 'digital-river-global-commerce'),
      'card_cvv_placeholder'           => __('CVV', 'digital-river-global-commerce'),
      'shipping_country_error_msg'     => __('Shipping country is not supported.', 'digital-river-global-commerce'),
      'billing_country_error_msg'      => __('Billing country is not supported.', 'digital-river-global-commerce'),
      'invalid_postal_code_msg'        => __('Your postal code is invalid.', 'digital-river-global-commerce'),
      'invalid_city_msg'               => __('Your city is invalid.', 'digital-river-global-commerce'),
      'invalid_region_msg'             => __('Your region value is invalid. Please supply a different one.', 'digital-river-global-commerce'),
      'upsell_decline_label'           => __('No, thanks', 'digital-river-global-commerce'),
      'unable_place_order_msg'         => __('Unable to place order', 'digital-river-global-commerce'),
      'new_password_error_msg'         => __('The new password must be different from the current password.', 'digital-river-global-commerce')
    );

		// transfer drgc options from PHP to JS
		$options = array(
			'wpLocale'          =>  drgc_get_current_wp_locale( drgc_get_current_dr_locale() ),
			'drLocale'          =>  drgc_get_current_dr_locale(),
			'ajaxUrl'           =>  admin_url( 'admin-ajax.php' ),
			'ajaxNonce'         =>  wp_create_nonce( 'drgc_ajax' ),
			'homeUrl'           =>  get_home_url(),
			'cartUrl'           =>  drgc_get_page_link( 'cart' ),
			'checkoutUrl'       =>  drgc_get_page_link( 'checkout' ),
			'accountUrl'        =>  drgc_get_page_link( 'account' ),
			'mySubsUrl'         =>  drgc_get_page_link( 'my-subscriptions' ),
			'loginUrl'          =>  drgc_get_page_link( 'login' ),
			'loginPath'         =>  parse_url( drgc_get_page_link( 'login' ) )['path'],
			'siteID'            =>  get_option( 'drgc_site_id' ),
			'domain'            =>  get_option( 'drgc_domain' ),
			'digitalRiverKey'   =>  get_option( 'drgc_digitalRiver_key' ),
			'accessToken'       =>  $access_token,
			'cart'              =>  $cart_obj,
			'order'             =>  $order_obj,
			'thankYouEndpoint'  =>  esc_url( drgc_get_page_link( 'thank-you' ) ),
			'isLogin'           =>  drgc_get_user_status(),
			'payPal'            =>  array (
				'sourceId' => isset( $_GET['sourceId'] ) ? $_GET['sourceId'] : false,
				'failure'  => isset( $_GET['ppcancel'] ) ? $_GET['ppcancel'] : false,
				'success'  => isset ( $_GET['ppsuccess'] ) ? $_GET['ppsuccess'] : false,
      ),
			'testOrder'          => $testOrder_enable,
			'shouldDisplayVat'   => drgc_should_display_vat( isset( $customer['currency'] ) ? $customer['currency'] : '' ) ? 'true' : 'false',
			'isTaxInclusive'     => drgc_is_tax_inclusive( isset( $customer['locale'] ) ? $customer['locale'] : '' ) ? 'true' : 'false',
			'forceExclTax'       => $force_excl_tax_enable,
			'translations'       => $translation_array,
			'isApplePayEnabled'  => $applepay_enabled,
			'isGooglePayEnabled' => $googlepay_enabled,
			'client_ip'          => $_SERVER['REMOTE_ADDR'],
      'applePayButtonType'   => get_option( 'drgc_applepay_button_type' ),
      'applePayButtonColor'  => get_option( 'drgc_applepay_button_color' ),
      'googlePayButtonType'  => get_option( 'drgc_googlepay_button_type' ),
      'googlePayButtonColor' => get_option( 'drgc_googlepay_button_color' )
    );

    wp_localize_script( $this->drgc, 'drgc_params', $options );
  }

	public function ajax_attempt_auth() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		$plugin = DRGC();

		if ( (isset( $_POST['username'] ) && isset( $_POST['password'] )) ) {
			$username = sanitize_text_field( $_POST['username'] );
			$password = sanitize_text_field( $_POST['password'] );

			$user = wp_authenticate( $username, $password );

			if ( is_wp_error( $user ) ) {
				wp_send_json_error( __( 'Authorization failed for specified credentials', 'digital-river-global-commerce' ) );
			}

			$current_user = get_user_by( 'login', $username );
			$externalReferenceId = get_user_meta( $current_user->ID, '_external_reference_id', true );
			$attempt = $plugin->shopper->generate_access_token_by_ref_id( $externalReferenceId );
		}

		if ( array_key_exists( 'error', $attempt ) ) {
			wp_send_json_error( $attempt );
		}

		if ( array_key_exists( 'access_token', $attempt ) ) {
			$plugin->session->set_guest_flag_cookie( 'false' );
			$plugin->session->dirty_set_session( $_COOKIE['drgc_session'] );

			wp_send_json_success( $attempt );
		}
	}

	private function get_password_error_msgs( $password, $confirm_password ) {
		$error_msgs = array();

		if ( $password !== $confirm_password ) {
			array_push( $error_msgs, __( 'Passwords do not match.', 'digital-river-global-commerce' ) );
		}

		if ( 8 > strlen( $password ) || 32 < strlen( $password ) ) {
			array_push( $error_msgs, __( 'Password must be between 8 - 32 characters.', 'digital-river-global-commerce' ) );
		}

		if ( ! preg_match( '/[A-Z]/', $password ) ) {
			array_push( $error_msgs, __( 'Must use at least one upper case letter.', 'digital-river-global-commerce' ) );
		}

		if ( ! preg_match( '/[a-z]/', $password ) ) {
			array_push( $error_msgs, __( 'Must use at least one lower case letter.', 'digital-river-global-commerce' ) );
		}

		if ( ! preg_match( '/[0-9]/', $password ) ) {
			array_push( $error_msgs, __( 'Must use at least one number.', 'digital-river-global-commerce' ) );
		}

		if ( ! preg_match( '/[!_@]/', $password ) ) {
			array_push( $error_msgs, __( 'Must use at least one special character (! _ @).', 'digital-river-global-commerce' ) );
		}

		if ( ! preg_match( '/^[a-zA-Z0-9!_@]+$/', $password ) ) {
			array_push( $error_msgs, __( 'Contains non-allowable special characters (only ! _ @ are allowed).', 'digital-river-global-commerce' ) );
		}

		return $error_msgs;
	}

	public function dr_signup_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		$plugin = DRGC();

		if ( isset( $_POST['first_name'] ) && isset( $_POST['last_name'] ) &&
			   isset( $_POST['username'] ) && isset( $_POST['password'] ) ) {
			$first_name = sanitize_text_field( $_POST['first_name'] );
			$last_name = sanitize_text_field( $_POST['last_name'] );
			$email = sanitize_text_field( $_POST['username'] );
			$password = sanitize_text_field( $_POST['password'] );
			$confirm_password = sanitize_text_field( $_POST['confirm_password'] );

			$plugin->session->dirty_set_session( $_COOKIE['drgc_session'] );
			$error_msgs = array();

			if ( ! is_email( $email ) ) {
				array_push( $error_msgs, __( 'Please enter a valid email address.', 'digital-river-global-commerce' ) );
			}

			$error_msgs = array_merge( $error_msgs, $this->get_password_error_msgs( $password, $confirm_password ) );

			if ( !empty( $error_msgs ) ) {
				wp_send_json_error( join( ' ', $error_msgs) );
				return;
			}

			// Attemp WP user store
			$userdata = array(
				'user_login'  => $email,
				'user_pass'   => $password,
				'user_email'  => $email,
				'first_name'  => $first_name,
				'last_name'   => $last_name,
				'role'        => 'subscriber'
			);

			$user_id = wp_insert_user( $userdata ) ;
			$externalReferenceId = hash( 'sha256', uniqid( $user_id, true ) );

			add_user_meta( $user_id, '_external_reference_id', $externalReferenceId);

			if ( is_wp_error( $user_id ) ) {
				wp_send_json_error( $user_id->get_error_message() );
				return;
			}

			$attempt = $plugin->shopper->create_shopper( $email, $password, $first_name, $last_name, $email, $externalReferenceId );

			if ( ! is_null( $attempt ) && array_key_exists( 'errors', $attempt ) ) {
				wp_delete_user( $user_id );
				wp_send_json_error( $attempt );
			} else {
				$user = wp_authenticate( $email, $password );

				if ( is_wp_error( $user ) ) {
					wp_send_json_error( $user );
				}

				$plugin->session->set_guest_flag_cookie( 'false' );
				$attempt = $plugin->shopper->generate_access_token_by_ref_id( $externalReferenceId );
				wp_send_json_success( $attempt );
			}
		} else {
			wp_send_json_error();
		}
	}

	public function checkout_as_guest_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );
		$plugin = DRGC();
		$plugin->session->set_guest_flag_cookie( 'true' );
		wp_send_json_success();
	}

	public function dr_logout_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );
		$plugin = DRGC();
		$plugin->shopper = null;
		$plugin->session->set_guest_flag_cookie( 'false' );
		$plugin->session->dirty_set_session( $_COOKIE['drgc_session'] );
		$plugin->session->clear_session();
		wp_send_json_success();
	}

  public function change_password_ajax() {
    check_ajax_referer( 'drgc_ajax', 'nonce' );

    $plugin = DRGC();
    $gc_user = $plugin->shopper->retrieve_shopper();
    $username = $gc_user['username'];
    $current_user = get_user_by( 'login', $username );
    $current_user_id = $current_user->ID;
    $email = $current_user->user_email;
    $current_password = sanitize_text_field( $_POST['current_password'] );
    $new_password = sanitize_text_field( $_POST['new_password'] );
    $confirm_new_password = sanitize_text_field( $_POST['confirm_new_password'] );
    $error_msgs = $this->get_password_error_msgs( $new_password, $confirm_new_password );

    if ( ! empty( $error_msgs ) ) {
      wp_send_json_error( join( ' ', $error_msgs) );
    }

    if ( ! wp_check_password( $current_password, $current_user->user_pass, $current_user_id ) ) {
      wp_send_json_error( __( 'The current password you entered is incorrect.', 'digital-river-global-commerce' ) );
    }

    if ( $new_password === $current_password ) {
      wp_send_json_error( __( 'Your new password can not be the same as the current password.', 'digital-river-global-commerce' ) );
    }

    $attempt = $plugin->shopper->update_shopper_password( $new_password );

    if ( isset( $attempt['errors']['error'] ) ) {
      wp_send_json_error( $attempt );
    }

    wp_set_password( $new_password, $current_user_id );

    $user_data = array(
      'user_login'    => $email,
      'user_password' => $new_password,
      'remember'      => false
    );

    $user = wp_signon( $user_data );

    if ( is_wp_error( $user ) ) {
      $attempt = $plugin->shopper->update_shopper_password( $current_password );
      wp_send_json_error( $user );
    }

    wp_send_json_success();
  }

	/**
	 * Ajax handles sending password retrieval email to user.
	 */
	function dr_send_email_reset_pass_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		$errors = new WP_Error();

		$email = sanitize_text_field( $_POST['email'] );
		if ( empty( $email ) || ! is_string( $email ) ) {
			$errors->add( 'empty_username', __( 'Enter a username or email address.', 'digital-river-global-commerce' ) );
		} elseif ( strpos( $email, '@' ) ) {
			$user_data = get_user_by( 'email', wp_unslash( $email ) );
			if ( empty( $user_data ) ) {
				$errors->add( 'invalid_email', __( 'There is no account with that username or email address.', 'digital-river-global-commerce' ) );
			}
		} else {
			$user_data = get_user_by( 'login', $email );
		}

		/**
		 * Fires before errors are returned from a password reset request.
		 */
		do_action( 'lostpassword_post', $errors );
		if ( $errors->has_errors() ) {
			wp_send_json_error($errors);
		}
		if ( ! $user_data ) {
			$errors->add( 'invalidcombo', __( 'There is no account with that username or email address.', 'digital-river-global-commerce' ) );
			wp_send_json_error($errors);
		}

		// Redefining user_login ensures we return the right case in the email.
		$user_login = $user_data->user_login;
		$user_email = $user_data->user_email;
		$key        = get_password_reset_key( $user_data );

		if ( is_wp_error( $key ) ) {
			wp_send_json_error($key);
		}
		if ( is_multisite() ) {
			$site_name = get_network()->site_name;
		} else {
			/*
			* The blogname option is escaped with esc_html on the way into the database
			* in sanitize_option we want to reverse this for the plain text arena of emails.
			*/
			$site_name = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
		}

		$message = '<p>' . __( 'Someone has requested a password reset for the following account:', 'digital-river-global-commerce' ) . '</p><br>';
		$message .= '<p>' . sprintf( __( 'Site Name: %s', 'digital-river-global-commerce' ), $site_name ) . '<br>';
		$message .= sprintf( __( 'Username: %s', 'digital-river-global-commerce' ), $user_login ) . '</p><br>';
		$message .= '<p>' . __( 'If this was a mistake, just ignore this email and nothing will happen.', 'digital-river-global-commerce' ) . '<br>';
		$message .= __( 'To reset your password, visit the following address:', 'digital-river-global-commerce' ) . '</p><br>';
		$message .= '<a href="' . drgc_get_page_link( 'login'  ) . "?action=rp&key=$key&login=" . rawurlencode( $user_login ) . '">';
		$message .=  __( 'Reset Password', 'digital-river-global-commerce' ) . '</a>';

		$title = sprintf( __( '[%s] Password Reset', 'digital-river-global-commerce' ), $site_name );

		/**
		 * Filters the subject of the password reset email.
		 */
		$title = apply_filters( 'retrieve_password_title', $title, $user_login, $user_data );

		/**
		 * Filters the message body of the password reset mail.
		 * If the filtered message is empty, the password reset email will not be sent.
		 */
		$message = apply_filters( 'retrieve_password_message', $message, $key, $user_login, $user_data );
		add_filter( 'wp_mail_content_type', function( $content_type ) { return 'text/html'; });

		if ( $message && ! wp_mail( $user_email, wp_specialchars_decode( $title ), $message ) ) {
			wp_die( __( 'The email could not be sent. Possible reason: your host may have disabled the mail() function.', 'digital-river-global-commerce' ) );
		}

		wp_send_json_success();
	}

	/**
	 * Reset user password AJAX
	 */
	public function dr_reset_password_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		$password = sanitize_text_field( $_POST['password'] );
		$confirm = sanitize_text_field( $_POST['confirm-password'] );
		$key = sanitize_text_field( $_POST['key'] );
		$login = urldecode( sanitize_text_field( $_POST['login'] ) );

		if (
			empty( $password ) || ! is_string( $password ) ||
			empty( $key ) || ! is_string( $key ) ||
			empty( $login ) || ! is_string( $login )
		) {
			wp_send_json_error( __( 'Something went wrong.', 'digital-river-global-commerce' ) );
			return;
		}

		$error_msgs = $this->get_password_error_msgs( $password, $confirm );

		if ( !empty( $error_msgs ) ) {
			wp_send_json_error( join( ' ', $error_msgs) );
			return;
		}

		// Check if key is valid
		$user = check_password_reset_key( $key, $login );

		if ( is_wp_error( $user ) ) {
			if ( $user->get_error_code() === 'expired_key' ){
				wp_send_json_error( __( 'Expired key', 'digital-river-global-commerce' ) );
			} else {
				wp_send_json_error( __( 'Invalid key', 'digital-river-global-commerce' ) );
			}
		}

		reset_password( $user, $password );
		wp_send_json_success();
	}

	/**
	 * Get permalink by product ID for AJAX usage.
	 *
	 * @since  1.0.0
	 */
	public function ajax_get_permalink_by_product_id() {
		$product_id = isset( $_POST['productID'] ) ? intval( $_POST['productID'] ) : NULL;

		if ( $product_id ) {
			$products = get_posts(
				array(
					'post_type'     => 'dr_product',
					'meta_key'      => 'gc_product_id',
					'meta_value'    => $product_id
				)
			);

			if ( ! empty( $products ) ) {
				echo get_permalink( $products[0]->ID );
				die();
			}
		}

		echo '#';
		die();
	}

	/**
	 * Hide sidebar when, subscriber is authenticated
	 */

	public function remove_admin_bar() {
		if ( ! current_user_can( 'administrator' ) && ! is_admin() ) {
			show_admin_bar( false );
		}
		// if ( ! current_user_can( 'manage_optins' )  ) {
		// 	add_filter('show_admin_bar', '__return_false');
		// }
	}

	/**
	 * Insert login link at menu.
	 *
	 * @since  1.1.0
	 */
	public function insert_login_menu_items( $items, $args ) {
		$customer = DRGC()->shopper->retrieve_shopper();
		$is_logged_in = $customer && 'Anonymous' !== $customer['id'];
		$subs = DRGC()->shopper->retrieve_subscriptions();

		$new_item = array(
			'title'            => $is_logged_in ? __( 'Hi, ', 'digital-river-global-commerce' ) . $customer['firstName'] : __( 'Login', 'digital-river-global-commerce' ),
			'menu_item_parent' => 0,
			'ID'               => 'login',
			'db_id'            => 'login',
			'url'              => get_permalink( get_page_by_path( 'login' ) ),
			'classes'          => $is_logged_in ? array( 'menu-item', 'menu-item-has-children' ) : array( 'menu-item' ),
			'target'           => null,
			'xfn'              => null,
			'current'          => null // for preventing warning in debug mode
		);
		$items[] = (object) $new_item;

		if ( $is_logged_in ) {
			$new_sub_item_account = array(
				'title'            => __( 'My Account', 'digital-river-global-commerce' ),
				'menu_item_parent' => 'login',
				'ID'               => 'account',
				'db_id'            => 'account',
				'url'              => get_permalink( get_page_by_path( 'account' ) ),
				'classes'          => array( 'menu-item' ),
				'target'           => null,
				'xfn'              => null,
				'current'          => null // for preventing warning in debug mode
			);
			$new_sub_item_logout = array(
				'title'            => __( 'Logout', 'digital-river-global-commerce' ),
				'menu_item_parent' => 'login',
				'ID'               => 'logout',
				'db_id'            => 'logout',
				'url'              => '#',
				'classes'          => array( 'menu-item' ),
				'target'           => null,
				'xfn'              => null,
				'current'          => null // for preventing warning in debug mode
			);
			$items[] = (object) $new_sub_item_account;
			$items[] = (object) $new_sub_item_logout;
		}

		return $items;
	}

	/**
	 * Insert locale selector at menu.
	 *
	 * @since  2.0.0
	 */
	public function insert_locale_selector( $content ) {
		if ( ! is_page( 'thank-you' ) ) {
			ob_start();
			include_once 'partials/drgc-locale-selector.php';
			$append = ob_get_clean();
			return $content . $append;
		}
		return $content;
	}

	/**
	 * Insert currency selector at menu.
	 *
	 * @since  2.0.0
	 */
	public function insert_currency_selector( $content ) {
		if ( ! is_page( 'thank-you' ) ) {
			ob_start();
			include_once 'partials/drgc-currency-selector.php';
			$append = ob_get_clean();
			return $content . $append;
		}
		return $content;
	}

	/**
	 * Render minicart on header.
	 *
	 * @since  1.0.0
	 */
	public function minicart_in_header( $content ) {
		if ( !is_page( 'cart' ) && !is_page( 'checkout' ) && !is_page( 'thank-you' ) ) {
			ob_start();
			include_once 'partials/drgc-minicart.php';
			$append = ob_get_clean();
			return $content . $append;
		}
		return $content;
	}

	/**
	 * Render the full page by overwriting template.
	 *
	 * @since  1.0.0
	 */
	public function overwrite_template( $template ) {
		$theme = wp_get_theme();
		if ( 'Digital River Global Commerce' != $theme->name ) {
			if ( is_singular( 'dr_product' ) ) {
				$template = DRGC_PLUGIN_DIR . 'public/templates/single.php';
			} else if ( is_post_type_archive( 'dr_product' ) || is_tax( 'dr_product_category' ) ) {
				$template = DRGC_PLUGIN_DIR . 'public/templates/archive.php';
			}
		}
		return $template;
	}

	public function add_legal_link() {
		if ( is_page( 'cart' ) || is_page( 'checkout' ) || is_page( 'thank-you' ) ) {
			if ( ! is_page( 'thank-you' ) ) {
				$cart = DRGC()->cart->retrieve_cart();
				$entity_code = $cart['cart']['businessEntityCode'];
			} else {
				$order = DRGC()->cart->retrieve_order();
				$entity_code = $order['order']['businessEntityCode'];
			}
			include_once 'partials/drgc-legal-footer.php';
		}
	}

  /**
   * Prevent browser caching.
   *
   * @since  1.3.0
   */
  public function prevent_browser_caching() {
    if ( is_page( 'cart' ) || is_page( 'checkout' ) || is_page( 'thank-you' ) ||
         is_page( 'login' ) || is_page( 'account' ) ) {
      nocache_headers();
    }
  }

  public function overwrite_nocache_headers( $headers ) {
    $headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0';
    $headers['Pragma'] = 'no-cache';
    return $headers;
  }

  /**
   * Redirect on page load.
   *
   * @since  1.1.0
   */
  public function redirect_on_page_load() {
    if ( ! is_admin() ) {
      $plugin = DRGC();
      $dr_locale = drgc_get_current_dr_locale();
      $wp_locale = drgc_get_current_wp_locale( $dr_locale );

      // Update shopper's locale & currency
      if ( $plugin->shopper->locale !== $dr_locale ) {
        $primary_currency = drgc_get_primary_currency( $dr_locale );
        $plugin->shopper->update_locale_and_currency( $dr_locale, $primary_currency );
      }

      // Load plugin translated text strings
      switch_to_locale( $wp_locale );
      load_plugin_textdomain(
        'digital-river-global-commerce',
        false,
        dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
      );

      if ( is_page( 'checkout' ) || is_page( 'account' ) || is_page( 'thank-you' ) ) {
        $customer = $plugin->shopper->retrieve_shopper();
        $is_logged_in = $customer && 'Anonymous' !== $customer['id'];
        $is_guest = 'true' === $_COOKIE['drgc_guest_flag'];

        if ( is_page( 'checkout' ) ) {
          $cart = $plugin->cart->retrieve_cart();
          $check_subs = drgc_is_subs_added_to_cart( $cart );
          $terms_checked = drgc_is_auto_renewal_terms_checked( $cart );

          if ( ! $is_logged_in && ( ! $is_guest || $check_subs['has_subs'] ) ) {
            wp_redirect( get_permalink( get_page_by_path( 'login' ) ) );
            exit;
          } elseif ( $check_subs['is_auto'] && ! $terms_checked ) {
            wp_redirect( get_permalink( get_page_by_path( 'cart' ) ) );
            exit;
          }
        } elseif ( is_page( 'account' ) ) {
          if ( ! $is_logged_in ) {
            wp_redirect( get_permalink( get_page_by_path( 'login' ) ) );
            exit;
          }
        } elseif ( is_page( 'thank-you' ) ) {
          if ( ! $is_logged_in && ! $is_guest ) {
            wp_redirect( get_permalink( get_page_by_path( 'login' ) ) );
            exit;
          }
        }
      }
    }
  }

	/**
	 *  ON/OFF auto renewal AJAX
	 *
	 * @since  1.3.0
	 */
	public function toggle_auto_renewal_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		if ( isset( $_POST['subscriptionId'] ) && isset( $_POST['renewalType'] ) ) {
			$plugin = DRGC();
			$params = array(
				'id' => $_POST['subscriptionId'],
				'renewal_type' => $_POST['renewalType']
			);

			$response = $plugin->user_management->send_request( 'SWITCH_RENEWAL_TYPE', $params );

			if ( $response ) {
				$plugin->user_management->send_json_response( $response );
			} else {
				wp_send_json_error( array( 'message' => 'Something went wrong!' ) );
			}
		}

		wp_send_json_error( array( 'message' => 'Something went wrong!' ) );
	}

	/**
	 * Change the next renewal quantity AJAX
	 *
	 * @since  1.3.0
	 */
	public function change_renewal_qty_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		if ( isset( $_POST['subscriptionId'] ) && isset( $_POST['renewalQty'] ) ) {
			$plugin = DRGC();
			$subscription_id = sanitize_text_field( $_POST['subscriptionId'] );
			$renewal_qty = sanitize_text_field( $_POST['renewalQty'] );
			$params = array(
				'id' => $subscription_id,
				'renewal_qty' => $renewal_qty
			);

			$response = $plugin->user_management->send_request( 'CHANGE_RENEWAL_QTY', $params );

			if ( $response ) {
				$plugin->user_management->send_json_response( $response );
			} else {
				wp_send_json_error();
			}
		} else {
			wp_send_json_error();
		}
	}

	/**
	 * Cancel the subscription AJAX
	 *
	 * @since  1.3.0
	 */
	public function cancel_subscription_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		if ( isset( $_POST['subscriptionId'] ) ) {
			$plugin = DRGC();
			$subscription_id = sanitize_text_field( $_POST['subscriptionId'] );
			$params = array(
				'id' => $subscription_id
			);

			$response = $plugin->user_management->send_request( 'CANCEL_SUBS', $params );

			if ( $response ) {
				$plugin->user_management->send_json_response( $response );
			} else {
				wp_send_json_error();
			}
		} else {
			wp_send_json_error();
		}
	}

	public function add_modal_html() {
	?>
		<div class="modal fade" id="dr-autoLogoutModal" tabindex="-1" role="dialog" aria-labelledby="dr-autoLogoutModal" aria-hidden="true" data-keyboard="false" data-backdrop="static">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dr-autoLogoutModalTitle">
							<?php echo __( 'You\'re about to be logged out!', 'digital-river-global-commerce' ); ?>
						</h5>
					</div>
					<div class="modal-body" id="dr-autoLogoutModalBody">
						<p>
							<?php echo __('For security reasons, your connection times out after you\'ve been inactive for a while. You will be logged out in <strong>n</strong> seconds.<br>Click Continue if you\'d like to stay logged in.', 'digital-river-global-commerce'); ?>
						</p>
					</div>
					<div class="modal-footer">
						<button id="dr-modalContinueBtn" type="button" class="dr-btn w-100">
							<?php echo __( 'Continue', 'digital-river-global-commerce' ); ?>
						</button>
						<button id="dr-modalLogoutBtn" type="button" class="dr-btn w-100 btn-secondary">
							<?php echo __( 'Logout', 'digital-river-global-commerce' ); ?>
						</button>
					</div>
				</div>
			</div>
		</div>
		<?php if ( is_page( 'login' ) && ( drgc_get_user_status() === 'false' ) ) : ?>
			<div class="modal fade" id="drResetPassword" tabindex="-1" role="dialog" aria-labelledby="drResetPasswordTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<form id="dr-pass-reset-form" novalidate>
							<div class="modal-header">
								<h5 class="modal-title">
									<?php echo __( 'Forgot Password', 'digital-river-global-commerce' ); ?>
								</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body" id="drResetPasswordModalBody">
								<p>
									<?php echo __( 'To reset your password, please enter your email address below and an email with instructions on resetting your password will be sent to you.', 'digital-river-global-commerce' ); ?>
								</p>
								<div class="form-group">
									<label for="email-address" class="col-form-label"><?php echo __( 'Email Address:', 'digital-river-global-commerce' ); ?></label>
									<input name="email" type="email" class="form-control" id="email-address" required>
									<div class="invalid-feedback">
										<?php echo __( 'This field is required email.', 'digital-river-global-commerce' ); ?>
									</div>
								</div>
								<div class="form-group">
									<label for="email-address-confirm" class="col-form-label"><?php echo __( 'Verify Email Address:', 'digital-river-global-commerce' ); ?></label>
									<input name="email-confirm" type="email" class="form-control" id="email-address-confirm" required>
									<div class="invalid-feedback">
										<?php echo __( 'This field is required email.', 'digital-river-global-commerce' ); ?>
									</div>
								</div>
								<div id="dr-reset-pass-error" class="invalid-feedback"></div>
							</div>
							<div class="modal-footer">
								<button id="dr-pass-reset-submit" type="submit" class="dr-btn w-100">
									<?php echo __( 'Reset Password', 'digital-river-global-commerce' ); ?>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
    <?php endif; ?>
    <?php if ( is_page( 'account' ) && ( drgc_get_user_status() !== 'false' ) ): ?>
      <div id="dr-passwordUpdated" class="dr-modal" tabindex="-1" role="dialog">
        <div class="dr-modal-dialog dr-modal-dialog-centered">
          <div class="dr-modal-content">
            <div class="dr-modal-body">
              <div class="dr-modal-icon"><img src="<?php echo DRGC_PLUGIN_URL . 'assets/images/success-icon.svg' ?>" alt="success icon"></div>
              <h4><?php echo __( 'Password Updated!', 'digital-river-global-commerce' ); ?></h4>
              <p><?php echo __( 'Your password has been changed successfully.', 'digital-river-global-commerce' ); ?></p>
            </div>
            <div class="dr-modal-footer">
              <button type="button" class="dr-btn dr-btn-blue" data-dismiss="dr-modal"><?php echo __( 'OK', 'digital-river-global-commerce' ); ?></button>
            </div>
          </div>
        </div>
      </div>
    <?php endif; ?>
	<?php
	}

	public function reset_cookie_ajax() {
		check_ajax_referer( 'drgc_ajax', 'nonce' );

		if ( DRGC()->session->reset_cookie() ) {
			wp_send_json_success();
		} else {
			wp_send_json_error();
		}
	}

  public function get_offers_by_pop_ajax() {
    check_ajax_referer( 'drgc_ajax', 'nonce' );

    $pop_type = $_POST['popType'];
    $product_id = $_POST['productId'];

    if ( isset( $pop_type ) ) {
      $response = DRGC()->cart->get_offers_by_pop( $pop_type, $product_id );

      if ( $response ) {
        wp_send_json_success( $response );
      } else {
        wp_send_json_error();
      }
    } else {
      wp_send_json_error();
    }
  }

  /**
   * Renew access token
   */
  public function renew_access_token() {
    if ( ! is_page( 'thank-you' ) ) return;

    $plugin = DRGC();
    $customer = $plugin->shopper->retrieve_shopper();

    $plugin->session->clear_session();

    if ( $customer && ( $customer['id'] !== 'Anonymous' ) ) {
      $current_user = get_user_by( 'login', $customer['username'] );
      $external_reference_id = get_user_meta( $current_user->ID, '_external_reference_id', true );

      $plugin->shopper->generate_access_token_by_ref_id( $external_reference_id, false );
    } else {
      $plugin->authenticator->do_refresh_access_token();
    }
  }

  public function translate_archive_title( $title ) {
    if ( is_tax( 'dr_product_category' ) ) {
      return __( single_cat_title( '', false ), 'digital-river-global-commerce' );
    }

    return $title;
  }

  public function translate_menu_items( $item_output, $item ) {
    if ( property_exists( $item, 'title' ) ) {
      return preg_replace( '/(<.*?>).*(<\/.*?>)/s', '$1' . __( $item->title, 'digital-river-global-commerce' ) . '$2', $item_output, 1 );
    }

    return $item_output;
  }

  /**
   * Append query string at URL.
   *
   * @since  2.0.0
   * @param  string
   * @return string
   */
  public function append_query_string( $url ) {
    if ( isset( $_GET['locale'] ) ) {
      $url = add_query_arg( 'locale', $_GET['locale'], $url );
    }
    return $url;
  }
}
