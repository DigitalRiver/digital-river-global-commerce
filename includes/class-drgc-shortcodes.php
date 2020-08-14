<?php
/**
 * Shortcodes
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

defined( 'ABSPATH' ) || exit;

class DRGC_Shortcodes {

	/**
	 * Initialize
	 */
	public function __construct() {
		add_action( 'init', array( __CLASS__, 'add_shortcodes' ) );
	}

	/**
	 * Register shortcodes.
	 */
	public static function add_shortcodes() {
		$shortcodes = array(
			'dr-cart'               => __CLASS__.'::cart',
			'dr-checkout'           => __CLASS__.'::checkout',
			'dr-login'              => __CLASS__.'::login',
			'dr-account'            => __CLASS__.'::account',
			'dr-thank-you'          => __CLASS__.'::thank_you',
			'dr-my-subs'            => __CLASS__.'::my_subs',
			'dr-subs-details'       => __CLASS__.'::subs_details'
		);

		foreach ( $shortcodes as $shortcode => $function ) {
			add_shortcode( $shortcode , $function );
		}
	}

	/**
	 * Shortcode Wrapper.
	 *
	 * @param string[] $function Callback function.
	 * @param array    $atts     Attributes. Default to empty array.
	 * @param array    $wrapper  Customer wrapper data.
	 *
	 * @return string
	 */
	public static function shortcode_wrapper(
		$function,
		$atts = array(),
		$wrapper = array(
			'class'  => 'drgc-wrapper',
			'before' => null,
			'after'  => null,
		)
	) {
		ob_start();

		echo empty( $wrapper['before'] ) ? '<div class="' . esc_attr( $wrapper['class'] ) . '">' : $wrapper['before'];
		call_user_func( $function, $atts );
		echo empty( $wrapper['after'] ) ? '</div>' : $wrapper['after'];

		return ob_get_clean();
	}

	/**
	 * Cart page shortcode.
	 *
	 * @return string
	 */
	public static function cart() {
        return self::shortcode_wrapper( array( 'DR_Shortcode_Cart', 'output' ) );
    }
    
    /**
	 * Checkout page shortcode.
	 *
	 * @return string
	 */
	public static function checkout() {
		return self::shortcode_wrapper( array( 'DR_Shortcode_Checkout', 'output' ) );
	}

    /**
     * Login page shortcode.
     *
     * @return string
     */
    public static function login() {
        return self::shortcode_wrapper( array( 'DR_Shortcode_Login', 'output' ) );
    }

    /**
     * Account page shortcode.
     *
     * @return string
     */
    public static function account() {
        return self::shortcode_wrapper( array( 'DR_Shortcode_Account', 'output' ) );
    }
    
    /**
	 * Thank you page shortcode.
	 *
	 * @return string
	 */
	public static function thank_you() {
		return self::shortcode_wrapper( array( 'DR_Shortcode_Thank_You', 'output' ) );
	}

	/**
	 * My Subscriptions page shortcode.
	 *
	 * @return string
	 */
	public static function my_subs() {
		return self::shortcode_wrapper( array( 'DR_Shortcode_My_Subs', 'output' ) );
	}

	/**
	 * Subscription Details page shortcode.
	 *
	 * @return string
	 */
	public static function subs_details() {
		return self::shortcode_wrapper( array( 'DR_Shortcode_Subs_Details', 'output' ) );
	}
}

/*
 * Initialize the Shortcodes
 */
new DRGC_Shortcodes();
