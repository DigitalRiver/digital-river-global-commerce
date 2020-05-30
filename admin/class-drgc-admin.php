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

		wp_enqueue_script( $this->drgc, DRGC_PLUGIN_URL . 'assets/js/drgc-admin' . $suffix . '.js', array( 'jquery', 'jquery-ui-progressbar' ), $this->version, false );

		// transfer drgc options from PHP to JS
		wp_localize_script( $this->drgc, 'drgc_admin_params',
			array(
				'api_key'               => $this->drgc_api_key,
				'api_secret'            => $this->drgc_api_secret,
				'site_id'               => $this->drgc_site_id,
				'drgc_ajx_instance_id'  => $this->drgc_ajx->instance_id,
				'ajax_url'              => admin_url( 'admin-ajax.php' ),
				'ajax_nonce'            => wp_create_nonce( 'drgc_admin_ajax' ),
			)
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

		$tab = isset( $_GET['tab'] ) ? $_GET['tab'] : null;
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
			'General',
			array( $this, $this->option_name . '_general_cb' ),
			$this->plugin_name
		);

		add_settings_field(
			$this->option_name . '_site_id',
			__( 'Site ID', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_site_id_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_site_id' )
		);

		add_settings_field(
			$this->option_name . '_api_key',
			__( 'Commerce API Key', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_api_key_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_api_key' )
		);

		add_settings_field(
			$this->option_name . '_api_secret',
			__( 'Commerce API Secret', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_api_secret_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_api_secret' )
		);

		add_settings_field(
			$this->option_name . '_domain',
			__( 'Domain', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_domain_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_domain' )
		);

		add_settings_field(
			$this->option_name . '_digitalRiver_key',
			__( 'Payment Services API Key', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_digitalRiver_key_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_digitalRiver_key' )
		);

		add_settings_field(
			$this->option_name . '_cron_handler',
			__( 'Scheduled Products Import', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_cron_handler_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_cron_handler' )
    );

		add_settings_field(
			$this->option_name . '_testOrder_handler',
			__( 'Test Order', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_testOrder_handler_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_testOrder_handler' )
		);

		add_settings_section(
			$this->option_name . '_payment',
			'Payments',
			array( $this, $this->option_name . '_payment_cb' ),
			$this->plugin_name
		);

		add_settings_field(
			$this->option_name . '_applepay_handler',
			__( 'Apple Pay', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_applepay_handler_cb' ),
			$this->plugin_name,
			$this->option_name . '_payment',
			array( 'label_for' => $this->option_name . '_applepay_handler' )
		);

		add_settings_field(
			$this->option_name . '_googlepay_handler',
			__( 'Google Pay', 'digital-river-global-commerce' ),
			array( $this, $this->option_name . '_googlepay_handler_cb' ),
			$this->plugin_name,
			$this->option_name . '_payment',
			array( 'label_for' => $this->option_name . '_googlepay_handler' )
		);

		add_settings_section(
			$this->option_name . '_extra',
			'',
			array( $this, $this->option_name . '_extra_cb' ),
			$this->plugin_name
		);

		register_setting( $this->plugin_name, $this->option_name . '_site_id', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( $this->plugin_name, $this->option_name . '_api_key', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( $this->plugin_name, $this->option_name . '_api_secret', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( $this->plugin_name, $this->option_name . '_domain', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
		register_setting( $this->plugin_name, $this->option_name . '_digitalRiver_key', array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
    register_setting( $this->plugin_name, $this->option_name . '_cron_handler', array( 'sanitize_callback' => array( $this, 'dr_sanitize_checkbox' ), 'default' => '' ) );
		register_setting( $this->plugin_name, $this->option_name . '_testOrder_handler', array( 'sanitize_callback' => array( $this, 'dr_sanitize_checkbox' ), 'default' => '' ) );
		register_setting( $this->plugin_name, $this->option_name . '_applepay_handler', array( 'sanitize_callback' => array( $this, 'dr_sanitize_checkbox' ), 'default' => '' ) );
    register_setting( $this->plugin_name, $this->option_name . '_googlepay_handler', array( 'sanitize_callback' => array( $this, 'dr_sanitize_checkbox' ), 'default' => '' ) );
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
	 * Render the text for the payment section.
	 *
	 * @since  1.0.2
	 */
	public function drgc_payment_cb() {
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
		echo '<div data-tooltip="Required to access your Global Commerce catalog data" data-tooltip-location="right"><input type="text" class="regular-text" name="' . $this->option_name . '_api_key' . '" id="' . $this->option_name . '_api_key' . '" value="' . $api_key . '"></div>';
	}

	/**
	 * Render input text field for API Secret.
	 *
	 * @since    1.0.0
	 */
	public function drgc_api_secret_cb() {
		$api_secret = get_option( $this->option_name . '_api_secret' );
		echo '<div data-tooltip="Required to support saved accounts for returning users" data-tooltip-location="right"><input type="text" class="regular-text" name="' . $this->option_name . '_api_secret' . '" id="' . $this->option_name . '_api_secret' . '" value="' . $api_secret . '"></div>';
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
		echo '<div data-tooltip="Required to process payments via DigitalRiver.js" data-tooltip-location="right"><input type="text" class="regular-text" name="' . $this->option_name . '_digitalRiver_key' . '" id="' . $this->option_name . '_digitalRiver_key' . '" value="' . $digitalRiver_key . '"></div>';
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
		echo '<span class="description" id="cron-description">' . __( 'Enable Test Order.', 'digital-river-global-commerce' ) . '</span>';
	}
	public function drgc_cron_handler_cb() {
		$option = get_option( $this->option_name . '_cron_handler' );
		$checked = '';

		if ( is_array( $option ) && $option['checkbox'] === '1' ) {
			$checked = 'checked="checked"';
		}

		echo '<input type="checkbox" class="regular-text" name="' . $this->option_name . '_cron_handler[checkbox]" id="' . $this->option_name . '_cron_handler" value="1" ' . $checked . ' />';
		echo '<span class="description" id="cron-description">' . __( 'Twice daily product synchronization with GC.', 'digital-river-global-commerce' ) . '</span>';
	}

	public function dr_sanitize_checkbox( $input ) {
		$new_input['checkbox'] = trim( $input['checkbox'] );
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
	 * Render checkbox field for enabling Apple Pay
	 *
	 * @since    1.0.2
	 */
	public function drgc_applepay_handler_cb() {
		$option = get_option( $this->option_name . '_applepay_handler' );
		$checked = '';

		if ( is_array( $option ) && $option['checkbox'] === '1' ) {
			$checked = 'checked="checked"';
		}

		echo '<label class="switch"><input type="checkbox" class="regular-text" name="' . $this->option_name . '_applepay_handler[checkbox]" id="' . $this->option_name . '_applepay_handler" value="1" ' . $checked . ' /><span class="slider round"></span></label>';
	}

	/**
	 * Render checkbox field for enabling Google Pay
	 *
	 * @since    1.0.2
	 */
	public function drgc_googlepay_handler_cb() {
		$option = get_option( $this->option_name . '_googlepay_handler' );
		$checked = '';

		if ( is_array( $option ) && $option['checkbox'] === '1' ) {
			$checked = 'checked="checked"';
		}

		echo '<label class="switch"><input type="checkbox" class="regular-text" name="' . $this->option_name . '_googlepay_handler[checkbox]" id="' . $this->option_name . '_googlepay_handler" value="1" ' . $checked . ' /><span class="slider round"></span></label>';
  }

  /**
	 * Render input text field for X-Stream username.
	 *
	 * @since    1.3.0
	 */
	public function drgc_big_blue_username_cb() {
		$username = get_option( $this->option_name . '_big_blue_username' );
		echo '<div data-tooltip="Required to manage subscriptions" data-tooltip-location="right"><input type="text" class="regular-text" name="' . $this->option_name . '_big_blue_username' . '" id="' . $this->option_name . '_big_blue_username' . '" value="' . $username . '"></div>';
	}

	/**
	 * Render input text field for X-Stream password.
	 *
	 * @since    1.3.0
	 */
	public function drgc_big_blue_password_cb() {
		$password = substr( password_hash( get_option( $this->option_name . '_big_blue_password' ), PASSWORD_DEFAULT ), 0, 16 );
		echo '<div data-tooltip="Required to manage subscriptions" data-tooltip-location="right"><input type="password" class="regular-text" name="' . $this->option_name . '_big_blue_password' . '" id="' . $this->option_name . '_big_blue_password' . '" value="' . $password . '"></div>';
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
			'currencies' => $localeOption['supportedCurrencies']['currency']
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
		update_option( $this->option_name . '_default_locale', $site_data['site']['defaultLocale'] );
		update_option( $this->option_name . '_locale_options', $locale_options );
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
}
