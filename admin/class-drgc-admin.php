<?php
/**
 * Admin-specific functionality
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/admin
 */

class DRGC_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $drgc
	 */
	private $drgc;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version
	 */
	private $version;

	/**
	 * The plugin name
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string     $plugin_name
	 */
	private $plugin_name = 'digital-river-global-commerce';

	/**
	 * The option name to be used in this plugin
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string     $option_name
	 */
	private $option_name = 'drgc';

	/**
	 * site ID
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $drgc_site_id;

	/**
	 * API key
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $drgc_api_key;

	/**
	 * API Secret
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $drgc_api_secret;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $drgc
	 * @param      string    $version
	 */
	public function __construct( $drgc, $version, $drgc_ajx ) {
		$this->drgc = $drgc;
		$this->version = $version;
		$this->drgc_ajx = $drgc_ajx;
		$this->drgc_site_id = get_option( 'drgc_site_id' );
		$this->drgc_api_key = get_option( 'drgc_api_key' );
    $this->drgc_api_secret = get_option( 'drgc_api_secret' );

    if ( empty( get_option( 'drgc_sync_locales' ) ) ) {
      add_option( 'drgc_sync_locales', 'false' );
    }
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->drgc, DRGC_PLUGIN_URL . 'assets/css/drgc-admin.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

		wp_enqueue_script( $this->drgc, DRGC_PLUGIN_URL . 'assets/js/drgc-admin' . $suffix . '.js', array( 'jquery' ), $this->version, false );

		// transfer drgc options from PHP to JS
		wp_localize_script( $this->drgc, 'drgc_admin_params',
			array(
				'api_key'               => $this->drgc_api_key,
				'api_secret'            => $this->drgc_api_secret,
				'site_id'               => $this->drgc_site_id,
				'ajax_url'              => admin_url( 'admin-ajax.php' ),
				'ajax_nonce'            => wp_create_nonce( 'drgc_admin_ajax' ),
				'default_locale'        => get_option( 'drgc_default_locale' ) ?: 'en_US',
				'locale_options'        => get_option( 'drgc_locale_options' ) ?: array(),
			)
		);
	}

  /**
   * Register the stylesheets for Gutenberg admin area.
   *
   * @since    2.0.0
   */
  public function enqueue_guten_styles() {
    wp_enqueue_style(
      'admin-guten-style',
      DRGC_PLUGIN_URL . 'assets/css/drgc-admin-guten.css'
    );
  }

  /**
   * Register the JavaScript for Gutenberg admin area.
   *
   * @since    2.0.0
   */
  public function enqueue_guten_scripts() {
    wp_enqueue_script(
      'admin-guten-script',
      DRGC_PLUGIN_URL . 'assets/js/drgc-admin-guten.js',
      array( $this->drgc, 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data' ),
      $this->version,
      false
    );
  }

	/**
	 * Add settings menu and link it to settings page.
	 *
	 * @since    1.0.0
	 */
	public function add_settings_page() {
		add_submenu_page(
      'edit.php?post_type=dr_product',
			__( 'Settings', 'digital-river-global-commerce' ),
			__( 'Settings', 'digital-river-global-commerce' ),
			'manage_options',
			'digital-river-global-commerce',
			array( $this, 'display_settings_page' ),
			100
		);
	}

	/**
	 * Render settings page.
	 *
	 * @since    1.0.0
	 */
	public function display_settings_page() {
		// Double check user capabilities
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$active_tab = isset( $_GET['tab'] ) ? $_GET['tab'] : 'general';
		include_once 'partials/drgc-admin-display.php';
	}

	/**
	 * Register settings fields.
	 *
	 * @since    1.0.0
	 */
	public function register_settings_fields() {

		add_settings_section(
			$this->option_name . '_general',
			__('General', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_general_cb' ),
			$this->plugin_name . '_general'
		);

		add_settings_field(
			$this->option_name . '_site_id',
			__( 'Site ID', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_site_id_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_site_id' )
		);

		add_settings_field(
			$this->option_name . '_api_key',
			__( 'Commerce API Key', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_api_key_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_api_key' )
		);

		add_settings_field(
			$this->option_name . '_api_secret',
			__( 'Commerce API Secret', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_api_secret_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_api_secret' )
		);

		add_settings_field(
			$this->option_name . '_domain',
			__( 'Domain', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_domain_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_domain' )
		);

		add_settings_field(
			$this->option_name . '_digitalRiver_key',
			__( 'Payments Service API Key', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_digitalRiver_key_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_digitalRiver_key' )
		);

		add_settings_field(
			$this->option_name . '_big_blue_username',
			__( 'UMS Username', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_big_blue_username_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_big_blue_username' )
		);

		add_settings_field(
			$this->option_name . '_big_blue_password',
			__( 'UMS Password', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_big_blue_password_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_big_blue_password' )
		);

		add_settings_field(
			$this->option_name . '_cron_handler',
			__( 'Scheduled Products Import', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_cron_handler_cb' ),
			$this->plugin_name . '_general',
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_cron_handler' )
    );

		add_settings_section(
			$this->option_name . '_checkout',
			__( 'Checkout', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_checkout_cb' ),
			$this->plugin_name . '_checkout'
		);

		add_settings_field(
			$this->option_name . '_testOrder_handler',
			__( 'Test Order', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_testOrder_handler_cb' ),
			$this->plugin_name . '_checkout',
			$this->option_name . '_checkout',
			array( 'label_for' => $this->option_name . '_testOrder_handler' )
		);

    add_settings_field(
      $this->option_name . '_display_short_description_handler',
      __( 'Product Short Description', 'digital-river-global-commerce' ),
      array( $this, $this->option_name . '_display_short_description_handler_cb' ),
      $this->plugin_name . '_checkout',
      $this->option_name . '_checkout',
      array( 'label_for' => $this->option_name . '_display_short_description_handler' )
    );

    add_settings_section(
      $this->option_name . '_drop_in',
      __( 'Drop-in', 'digital-river-global-commerce' ),
      array( $this, $this->option_name . '_drop_in_cb' ),
      $this->plugin_name . '_drop_in'
    );

    add_settings_field(
      $this->option_name . '_drop_in_config',
      __( 'Payment Method Configuration', 'digital-river-global-commerce' ),
      array( $this, $this->option_name . '_drop_in_config_cb' ),
      $this->plugin_name . '_drop_in',
      $this->option_name . '_drop_in',
      array( 'label_for' => $this->option_name . '_drop_in_config' )
    );

		add_settings_section(
			$this->option_name . '_extra',
			'',
			array( $this, $this->option_name . '_extra_cb' ),
			$this->plugin_name . '_general'
		);

    // General
    register_setting( $this->plugin_name . '_general', $this->option_name . '_site_id', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_api_key', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_api_secret', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_domain', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_digitalRiver_key', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_big_blue_username', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_big_blue_password', array( 'type' => 'string', 'sanitize_callback' => null ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_cron_handler', array( 'sanitize_callback' => array( $this, 'dr_sanitize_checkbox' ), 'default' => '' ) );
    register_setting( $this->plugin_name . '_general', $this->option_name . '_cron_utc_time', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );

    // Locales
    register_setting( $this->plugin_name . '_locales', $this->option_name . '_locale_options', array( 'sanitize_callback' => array( $this, 'dr_sanitize_locale_options' ) ) );

    // Checkout
    register_setting( $this->plugin_name . '_checkout', $this->option_name . '_testOrder_handler', array( 'sanitize_callback' => array( $this, 'dr_sanitize_checkbox' ), 'default' => '' ) );
    register_setting( $this->plugin_name . '_checkout', $this->option_name . '_display_short_description_handler', array( 'sanitize_callback' => array( $this, 'dr_sanitize_checkbox' ), 'default' => false ) );

    // Payments
    register_setting( $this->plugin_name . '_drop_in', $this->option_name . '_drop_in_config', array( 'type' => 'string', 'sanitize_callback' => null ) );
	}

	/**
	 * Render the text for the general section.
	 *
	 * @since  1.0.0
	 */
	public function drgc_general_cb() {
		return; // No need to print section message
	}

	/**
	 * Render the text for the checkout section.
	 *
	 * @since  1.3.1
	 */
	public function drgc_checkout_cb() {
		return; // No need to print section message
	}

	/**
	 * Render the text for the payment section.
	 *
	 * @since  1.0.2
	 */
	public function drgc_drop_in_cb() {
		return; // No need to print section message
	}

	/**
	 * Render the text for the extra section.
	 *
	 * @since  1.0.0
	 */
	public function drgc_extra_cb() {
		echo '<p class="description">' . __( 'Please contact your account representative for assistance with these settings.', 'digital-river-global-commerce' ) . '</p>';
	}

	/**
	 * Render input text field for Site ID.
	 *
	 * @since    1.0.0
	 */
	public function drgc_site_id_cb() {
		$site_id = get_option( $this->option_name . '_site_id' );
		echo '<input type="text" class="regular-text" name="' . $this->option_name . '_site_id' . '" id="' . $this->option_name . '_site_id' . '" value="' . $site_id . '"> ';
	}

	/**
	 * Render input text field for API Key.
	 *
	 * @since    1.0.0
	 */
	public function drgc_api_key_cb() {
		$api_key = get_option( $this->option_name . '_api_key' );
		echo '<div data-tooltip="Required to access your Global Commerce catalog data" data-tooltip-location="right">';
		echo '<input type="password" class="regular-text" name="' . $this->option_name . '_api_key' . '" id="' . $this->option_name . '_api_key' . '" value="' . $api_key . '">';
		echo '<span class="dashicons dashicons-hidden visible-toggle"></span>';
		echo '</div>';
	}

	/**
	 * Render input text field for API Secret.
	 *
	 * @since    1.0.0
	 */
	public function drgc_api_secret_cb() {
		$api_secret = get_option( $this->option_name . '_api_secret' );
		echo '<div data-tooltip="Required to support saved accounts for returning users" data-tooltip-location="right">';
		echo '<input type="password" class="regular-text" name="' . $this->option_name . '_api_secret' . '" id="' . $this->option_name . '_api_secret' . '" value="' . $api_secret . '">';
		echo '<span class="dashicons dashicons-hidden visible-toggle"></span>';
		echo '</div>';
	}

	/**
	 * Render input text field for domain setting.
	 *
	 * @since    1.0.0
	 */
	public function drgc_domain_cb() {
		$domain = get_option( $this->option_name . '_domain' );
		echo '<input type="text" class="regular-text" name="' . $this->option_name . '_domain' . '" id="' . $this->option_name . '_domain' . '" value="' . $domain . '"> ';
	}

	/**
	 * Render input text field for DigitalRiver Plugin
	 *
	 * @since    1.0.0
	 */
	public function drgc_digitalRiver_key_cb() {
		$digitalRiver_key = get_option( $this->option_name . '_digitalRiver_key' );
		echo '<div data-tooltip="Required to process payments via DigitalRiver.js" data-tooltip-location="right">';
		echo '<input type="password" class="regular-text" name="' . $this->option_name . '_digitalRiver_key' . '" id="' . $this->option_name . '_digitalRiver_key' . '" value="' . $digitalRiver_key . '">';
		echo '<span class="dashicons dashicons-hidden visible-toggle"></span>';
		echo '</div>';
	}

	/**
	 * Render checkbox field for enabling scheduled import
	 *
	 * @since    1.0.0
	 */

	public function drgc_testOrder_handler_cb() {
		$option = get_option( $this->option_name . '_testOrder_handler' );
		$checked = '';

		if ( is_array( $option ) && $option['checkbox'] === '1' ) {
			$checked = 'checked="checked"';
		}

		echo '<input type="checkbox" class="regular-text" name="' . $this->option_name . '_testOrder_handler[checkbox]" id="' . $this->option_name . '_testOrder_handler" value="1" ' . $checked . ' />';
		echo '<span class="description" id="test-order-description">' . __( 'Enable Test Order.', 'digital-river-global-commerce' ) . '</span>';
	}

  public function drgc_display_short_description_handler_cb() {
    $option = get_option( $this->option_name . '_display_short_description_handler' );
    $checkbox = 0;

    if ( $option === false ) {
      $checkbox = 1;
      update_option( $this->option_name . '_display_short_description_handler', array( 'checkbox' => '1' ) );
    } elseif ( is_array( $option ) && isset( $option['checkbox'] ) ) {
      $checkbox = $option['checkbox'];
    }

    echo '<input type="checkbox" class="regular-text" name="' . $this->option_name . '_display_short_description_handler[checkbox]" id="' . $this->option_name . '_display_short_description_handler" value="1" ' . checked( $checkbox, 1, false ) . ' />';
    echo '<span class="description" id="short-description-description">' . __( 'Display Short Description along with the product name', 'digital-river-global-commerce' ) . '</span>';
  }

	public function drgc_cron_handler_cb() {
    $option = get_option( $this->option_name . '_cron_handler' );
    $utc_time = get_option( $this->option_name . '_cron_utc_time' ) ?: '12:00';
    $utc_time_arr = explode( ':', $utc_time );
    $utc_hours = $utc_time_arr[0];
    $utc_minutes = $utc_time_arr[1];

		$checked = '';

		if ( is_array( $option ) && $option['checkbox'] === '1' ) {
			$checked = 'checked="checked"';
		}

		echo '<input type="checkbox" class="regular-text" name="' . $this->option_name . '_cron_handler[checkbox]" id="' . $this->option_name . '_cron_handler" value="1" ' . $checked . ' />';
		echo '<span class="description" id="cron-description">' . __( 'Twice daily product synchronization with GC.', 'digital-river-global-commerce' ) . '</span>';
    echo '<div id="drgc_cron_schedule"><span>' . __( 'Will be triggered at your', 'digital-river-global-commerce' ) . '</span>';
    echo '<input type="hidden" name="' . $this->option_name . '_cron_utc_time' . '" id="' . $this->option_name . '_cron_utc_time' . '" value="' . $utc_time . '"> ';
    echo '<select name="' . $this->option_name . '_cron_local_hours" id="' . $this->option_name . '_cron_local_hours">';
    for ( $h = 1; $h <= 12; $h++ ) {
      $hh = ( $h < 10 ) ? ( '0' . $h ) : $h;
      echo '<option value="'. $hh .'">' . $hh .'</option>';
    }
    echo '</select>';
    echo ' : ';
    echo '<select name="' . $this->option_name . '_cron_local_minutes" id="' . $this->option_name . '_cron_local_minutes">';
    for ( $m = 0; $m <= 59; $m++ ) {
      $mm = ( $m < 10 ) ? ( '0' . $m ) : $m;
      echo '<option value="'. $mm .'"'. ( $mm == $utc_minutes ? ' selected' : '' ) . '>' . $mm .'</option>';
    }
    echo '</select>&nbsp;';
    echo '<span>am & pm (UTC <code id="' . $this->option_name . '_cron_utc_label' . '">' . $utc_hours. ':' . $utc_minutes . '</code> am & pm)</span>';
    echo '</div>';
  }

	public function dr_sanitize_checkbox( $input ) {
		$new_input['checkbox'] = trim( $input['checkbox'] );
		return $new_input;
  }
  
	/**
	 * Update wp_locale and tax_display and install needed language packs.
	 *
	 * @since    2.0.0
	 */
	public function dr_sanitize_locale_options( $input ) {
		$new_input = get_option( 'drgc_locale_options' ) ?: array();
		$changed_wp_locales = array();

		foreach ( $new_input as $idx => $locale_option ) {
			$input_wp_locale = $input[$idx]['wp_locale'];
			$input_tax_display = $input[$idx]['tax_display'];

			$new_input[$idx]['wp_locale'] = $input_wp_locale;
			$new_input[$idx]['tax_display'] = $input_tax_display;

			if ( $input_wp_locale && $locale_option['wp_locale'] !== $input_wp_locale ) {
				array_push( $changed_wp_locales, $input_wp_locale );
			}
		}

		if ( ! empty( $changed_wp_locales ) ) {
			$this->install_language_packs( $changed_wp_locales );
		}

		return $new_input;
	}

	/**
	 * Render button of products import.
	 *
	 * @since    1.0.0
	 */
	public function render_products_import_button( $views ) {
		include_once DRGC_PLUGIN_DIR . 'admin/partials/drgc-products-import-btn.php';
		return $views;
	}

	/**
	 * Delete associated variations when a DR product is being deleted
	 * Note: This fires when the user empties the Trash
	 *
	 * @param $postid
	 */
	public function clean_variations_on_product_deletion( $postid ) {
		if ( get_post_type( $postid ) != 'dr_product' ) {
			return;
		}

		$variations = drgc_get_product_variations( $postid );

		if ( $variations ) {
			foreach ( $variations as $variation ) {
				wp_delete_post( $variation->ID, true );
			}
		}
	}

  /**
	 * Render input text field for UMS username.
	 *
	 * @since    1.3.0
	 */
	public function drgc_big_blue_username_cb() {
		$username = get_option( $this->option_name . '_big_blue_username' );
		echo '<div data-tooltip="Required to manage and retrieve subscriptions via User Management Service" data-tooltip-location="right"><input type="text" class="regular-text" name="' . $this->option_name . '_big_blue_username' . '" id="' . $this->option_name . '_big_blue_username' . '" value="' . $username . '"></div>';
	}

	/**
	 * Render input text field for UMS password.
	 *
	 * @since    1.3.0
	 */
	public function drgc_big_blue_password_cb() {
		$password = password_hash( get_option( $this->option_name . '_big_blue_password' ), PASSWORD_DEFAULT );
		echo '<div data-tooltip="Required to manage and retrieve subscriptions via User Management Service" data-tooltip-location="right">';
		echo '<input type="password" class="regular-text" name="' . $this->option_name . '_big_blue_password' . '" id="' . $this->option_name . '_big_blue_password' . '" value="' . $password . '">';
		echo '<span class="dashicons dashicons-hidden visible-toggle"></span>';
		echo '</div>';
	}

	/**
	 * Reformat locale's data structure for easier usage.
	 *
	 * @since    2.0.0
	 */
	private function reformat_locale_options( $localeOption ) {
		return array(
			'dr_locale' => $localeOption['locale'],
			'wp_locale' => get_wp_locale_by_map( $localeOption['locale'] ),
			'primary_currency' => $localeOption['primaryCurrency'],
			'supported_currencies' => $localeOption['supportedCurrencies']['currency'],
			'tax_display' => $localeOption['locale'] === 'en_US' ? 'EXCL' : 'INCL'
		);
	}

	/**
	 * Call get site API and save locales data to the option.
	 *
	 * @since    2.0.0
	 */
	public function drgc_sync_locales_ajax() {
		check_ajax_referer( 'drgc_admin_ajax', 'nonce' );
		$site_data = DRGC()->site->get_site();
		$locale_options = array_map( array( $this, 'reformat_locale_options' ), $site_data['site']['localeOptions']['localeOption'] );
		$wp_locales = array_column( $locale_options, 'wp_locale' );
		update_option( $this->option_name . '_default_locale', $site_data['site']['defaultLocale'] );
		update_option( $this->option_name . '_locale_options', $locale_options );
		if ( ! empty( $wp_locales ) ) {
			$this->install_language_packs( $wp_locales );
		}

    update_option( 'drgc_sync_locales', 'true' );
		wp_send_json_success();
  }

	/**
	 * Remove the Editor from the DRGC post types.
	 *
	 * @since    2.0.0
	 */
	public function remove_product_editor() {
		remove_post_type_support( 'dr_product', 'editor' );
		remove_post_type_support( 'dr_product_variation', 'editor' );
	}

	/**
	 * Remove the slug meta box from the DRGC post types.
	 *
	 * @since    2.0.0
	 */
	public function remove_slug_meta_box() {
		remove_meta_box( 'slugdiv', 'dr_product', 'normal');
		remove_meta_box( 'slugdiv', 'dr_product_variation', 'normal');
	}

	/**
	 * Disable dragging of the meta box for the DRGC post types.
	 *
	 * @since    2.0.0
	 */
	public function disable_drag_meta_box() {
		if ( ( get_current_screen()->post_type === 'dr_product' ) || ( get_current_screen()->post_type === 'dr_product_variation' ) ) {
			wp_deregister_script( 'postbox' );
		}
  }
  
  /**
   * Create translation strings for supported country names.
   *
   * @since    2.0.0
   */
  public function create_country_name_trans_strings() {
    $fh = fopen( plugin_dir_path( __DIR__ ) . 'drgc-menu-label-trans-strings.php', 'w' ) or die( __( 'Failed to create file', 'digital-river-global-commerce' ) );
    $locales = get_option( 'drgc_locale_options' ) ?: array();
    $names = '';

    foreach ( $locales as $locale ) {
      $names = $names . ( empty( $names ) ? '' : ' . ' . PHP_EOL ) . '__( ' . '"' . get_dr_country_name( $locale['dr_locale'] ) . '"' . ', "digital-river-global-commerce" )';
    }

    fwrite( $fh, "<?php" . PHP_EOL . "\$drgc_supported_country_names = " . PHP_EOL . "$names;" . PHP_EOL ) or die( __( 'Could not write to file', 'digital-river-global-commerce' ) );
    fclose( $fh );
  }

  /**
   * Create translation strings for menu labels.
   *
   * @since    2.0.0
   */
	public function create_menu_label_trans_strings() {
    $filename = plugin_dir_path( __DIR__ ) . 'drgc-menu-label-trans-strings.php';
    $content = file_get_contents( $filename );
    $pos = strpos( $content, 'drgc_nav_menu_labels');
    
    if ( $pos > 0 ) {
      $content_chunks = explode( '$drgc_nav_menu_labels', $content );
      $content = $content_chunks[0];
    }

    $locs = get_nav_menu_locations();

    foreach ( $locs as $loc => $value ) {
      $labels = '';
      $menu = wp_get_nav_menu_object( $value );

      if ( $menu ) {
        $items = wp_get_nav_menu_items( $menu->term_id );

        foreach ( $items as $k => $v ) {
          $labels = $labels . ( empty( $labels ) ? '' : ' . ' . PHP_EOL ) . '__( ' . '"' . $items[ $k ]->title . '"' . ', "digital-river-global-commerce" )';
        }
      }
    }

    $content = $content . "\$drgc_nav_menu_labels = " . PHP_EOL . "$labels;";
    
    file_put_contents( $filename, $content );
	}

  /**
   * Create translation strings for category names.
   *
   * @since    2.0.0
   */
	public function create_category_name_trans_strings() {
    $fh = fopen( plugin_dir_path( __DIR__ ) . 'drgc-category-name-trans-strings.php', 'w' ) or die( __( 'Failed to create file', 'digital-river-global-commerce' ) );
    $terms = get_terms( array( 
      'taxonomy' => 'dr_product_category', 
      'hide_empty' => false 
    ) );

    if ( ! empty( $terms ) ) {
      $cat_names = '';

      foreach ( $terms as $term ) {
        $cat_names = $cat_names . ( empty( $cat_names ) ? '' : ' . ' . PHP_EOL ) . '__( ' . '"' . $term->name . '"' . ', "digital-river-global-commerce" )';
      }

      fwrite( $fh, "<?php" . PHP_EOL . "\$drgc_category_names = " . PHP_EOL . "$cat_names;" ) or die( __( 'Could not write to file', 'digital-river-global-commerce' ) );
      fclose( $fh );
    }
  }
  
  /**
   * Initiate the translation string files.
   *
   * @since    2.0.0
   */
  public function init_trans_string_files() {
    if ( ! file_exists( plugin_dir_path( __DIR__ ) . 'drgc-category-name-trans-strings.php' ) ) {
      $this->create_category_name_trans_strings();
    }

    if ( ! file_exists( plugin_dir_path( __DIR__ ) . 'drgc-menu-label-trans-strings.php' ) ) {
      $this->create_country_name_trans_strings();
    }
  }

	/**
	 * Install needed language packs from wordpress.org.
	 *
	 * @since    2.0.0
	 */
	public function install_language_packs( $locales ) {
		require_once( ABSPATH . 'wp-admin/includes/translation-install.php' );
		foreach ( $locales as $locale ) {
			wp_download_language_pack( $locale );
		}
	}

  /**
   * Register post meta for saving localized title/content.
   *
   * @since    2.0.0
   */
  public function setup_post_meta() {
    $locales = get_option( 'drgc_locale_options' ) ?: array();
    $args = array(
      'show_in_rest' => true,
      'single' => true,
      'type' => 'string',
    );

    foreach ( $locales as $locale ) {
      register_post_meta( 'page', 'drgc_title_' . $locale['dr_locale'], $args );
      register_post_meta( 'page', 'drgc_content_' . $locale['dr_locale'], $args );
      register_post_meta( 'post', 'drgc_title_' . $locale['dr_locale'], $args );
      register_post_meta( 'post', 'drgc_content_' . $locale['dr_locale'], $args );
    }
  }

  /**
   * Remove custom fields for avoiding conflicts of classic & Gutenburg form.
   *
   * @since    2.0.0
   */
  public function remove_custom_meta_box() {
    remove_meta_box( 'postcustom', 'page', 'normal' );
    remove_meta_box( 'postcustom', 'post', 'normal' );
  }

  /**
   * Render the textarea for Drop-in configuration.
   *
   * @since    2.0.0
   */
  public function drgc_drop_in_config_cb() {
    $config = get_option( $this->option_name . '_drop_in_config' ) ?: json_encode( array(), JSON_FORCE_OBJECT );
    echo '<div><textarea name="' . $this->option_name . '_drop_in_config' . '" id="' . $this->option_name . '_drop_in_config' . '">' . esc_textarea( wp_unslash( $config ) ) . '</textarea>';
    echo '<p class="description">';
    echo sprintf( __( 'Please refer to the sample code of <code>paymentMethodConfiguration</code> from <a target="_blank" href="%s">Drop-in integration guide</a> to customize the look and feel of payment elements.', 'digital-river-global-commerce' ),
      'https://docs.digitalriver.com/commerce-api/payment-integrations-1/drop-in/drop-in-integration-guide#configuring-payment-methods-within-drop-in'
    );
    echo '</p></div>';
  }

  /**
   * Load the codemirror scripts on dr_product_page_digital-river-global-commerce only.
   *
   * @since    2.0.0
   */
  public function codemirror_enqueue_scripts( $hook ) {
    if ( $hook !== 'dr_product_page_digital-river-global-commerce' ) {
      return;
    }
  
    wp_enqueue_code_editor( array( 'type' => 'application/json' ) );
    wp_enqueue_script( 'wp-theme-plugin-editor' );
    wp_enqueue_style( 'wp-codemirror' );
  }

  /**
   * Add the custom error message to WP admin pages when session.use_cookies is not set to 1.
   *
   * @since    2.0.0
   */
  public function add_custom_error_msg() {
    if ( is_plugin_active( 'digital-river-global-commerce/digital-river-global-commerce.php' ) ) {      
      if ( ! ini_get( 'session.use_cookies' ) ) {
        $class = 'notice notice-error';
        $message = __( 'To make sure Digital River Global Commerce plugin is working as expected, please set 1 to session.use_cookies in php.ini.', 'digital-river-global-commerce' );

        printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
      }
    }
  }

  /**
   * Add the custom notice when locales sync is complete.
   *
   * @since    2.0.0
   */
  public function add_custom_notice() {
    if ( isset( $_GET['tab'] ) && $_GET['tab'] === 'locales' ) {      
      if ( get_option( 'drgc_sync_locales' ) === 'true' ) {
        $class = 'notice notice-success is-dismissible';
        $message = __( 'Sync Complete!', 'digital-river-global-commerce' );

        printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
        update_option( 'drgc_sync_locales', 'false' );
      }
    }
  }

  /**
   * Register a custom widget area for adding DRGC Mobile Mini-cart widget.
   *
   * @since    2.0.0
   */
  public function register_widget_areas() {
    register_sidebar( array(
      'name'          => __( 'DRGC Mobile Mini-cart Area', 'digital-river-global-commerce' ),
      'id'            => 'drgc-header-sidebar',
      'description'   => __( 'Add mini-cart widget here to appear beneath the header and above the main content on mobile devices.', 'digital-river-global-commerce' ),
      'before_widget' => '<div class="dr-widget-wrapper" style="display: none;">', 
      'after_widget'  => '</div>',
      'before_title'  => '',
      'after_title'   => ''
    ) );
  }

  /**
   * Register DRGC Mobile Mini-cart widget.
   *
   * @since    2.0.0
   */
  public function register_custom_widget() {
    register_widget( 'drgc_widget_mini_cart' );
  }

  /**
   * Reschedule cron event if trigger time is updated.
   *
   * @since    2.0.0
   */
  public function reschedule_cron() {
    DRGC()->cron->reschedule();
  }
}
