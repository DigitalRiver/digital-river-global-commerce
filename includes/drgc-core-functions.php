<?php
/**
 * Create a page and store the ID in option for reference
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */
function drgc_create_page_and_reference( $page, $option_key = '' ) {
	global $wpdb;

	$page_id = NULL;
	$option_value = get_option( $option_key );

	if ( 0 < $option_value ) {
		// See if page already exist
		$page_exists = get_post( $option_value );

		if ( $page_exists && 'page' === $page_exists->post_type ) {
			return $page_exists->ID;
		}
	}

	if ( 0 < strlen( $page['post_content'] ) ) {
		// Search for existing page with the shortcode within the content
		$shortcode = str_replace( array( '<!-- wp:shortcode -->', '<!-- /wp:shortcode -->' ), '', $page['post_content'] );

		$page_id = $wpdb->get_var(
			$wpdb->prepare(
		"SELECT ID
				FROM $wpdb->posts
				WHERE post_type='page'
				AND post_name LIKE %s LIMIT 1;",
			"%{$shortcode}%"
			)
		);
	} else {
		// Search for an existing page with the slug.
		$page_id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT ID
				FROM $wpdb->posts
				WHERE post_type='page'
				AND post_content LIKE %s LIMIT 1;",
				"%{$page['post_name']}%"
			)
		);
	}

	if ( $page_id ) {
		$page_found = get_post( $page_id );

		// Update page status if it's not public
		if ( $page_found && 'publish' !== $page_found->post_status ) {
			wp_update_post( array( 'ID' => $page_id, 'post_status' => 'publish' ) );
		}
	} else {
		//Create the page if it's not existent
		$page_id = wp_insert_post( $page );
	}

	if ( $option_key ) {
		// Update the referencing option
		update_option( $option_key, $page_id );
	}

	return $page_id;
}

/**
 * Get the page permalink by given name
 *
 * @param string $name Name for the page
 * @return string $permalink Page URI
 */
function drgc_get_page_link( $name = '' ) {
	$page_id = NULL;

	if ( 0 < strlen( $name ) ) {
		$page_id = get_option( 'drgc_page_id_' . $name );
	}

	return get_page_link( $page_id );
}
/**
 * Get template part in plugin just like theme.
 */
function drgc_get_template_part( $slug, $name = '' ) {
	$template = DRGC_PLUGIN_DIR . "public/templates/parts/{$slug}-{$name}.php";
	if ( file_exists( $template ) ) {
		load_template( $template, false );
	}
}

/**
 * Includes the template with arguments
 *
 * @param string $template_name Template name
 * @param array $args Arguments()
 * @param string $template_path Template path (templates/parts)
 */
function drgc_get_template( $template_name, $args = array(), $template_path = '' ) {
	if ( empty( $template_path ) ) {
		$template_path = 'templates';
	}

	$template_dir = DRGC_PLUGIN_DIR . '/public/' . trailingslashit( $template_path );
	$template = (string) $template_dir  . $template_name;

	if ( ! empty( $args ) && is_array( $args ) ) {
		extract( $args );
	}

	include $template;
}

/**
 * Render pagination for archive page.
 */
function drgc_the_posts_pagination( $wp_query ) {
	$pagination = '<div class="pagination-container">';
	$pagination .= '<span class="pagination-desc">' . sprintf( __( 'Showing %s out of %s', 'digital-river-global-commerce' ), $wp_query->post_count, $wp_query->found_posts ) . '</span>';
	$pagination .= get_the_posts_pagination(
		array(
			'mid_size' => 1,
			'prev_text' => '<',
			'next_text' => '>',
			'screen_reader_text' => ' '
		)
	);
	$pagination .= '</div>';
	echo $pagination;
}

/**
 * Currency switcher (Old currency selector, will be deprecated after it's not used by any theme)
 */
function drgc_currency_toggler( string $classes = '' ) {
	$locales = get_option( 'drgc_store_locales' );
	$current_locale = DRGC()->shopper->get_locale();

	if ( ! empty( $locales['locales'] ) && count( $locales['locales'] ) > 1 ) {
		$output = "<div class=\"dr-currency-toggler {$classes}\">";
		$output .= sprintf("<span>%s</span>", __( 'Currency: ', 'digital-river-global-commerce' ) );
		$output .= '<select class="custom-select dr-currency-select">';

		foreach ( $locales['locales'] as $locale => $currency ) {
			$output .= "<option ";
			$output .= $current_locale === $locale ? 'selected ' : '';
			$output .= "data-locale=\"{$locale}\" value=\"{$currency}\">";
			$output .= "{$currency}</option>";
		}

		$output .= '</select></div>';
		echo $output;
	}
}

/**
 * Get product post by external meta ID
 *
 * @param int $gc_id external ID
 * @param boolean $variation
 * @return bool|object post
 */
function drgc_get_product_by_gc_id( $gc_id , $variation = false ) {
	$args = array(
		'posts_per_page'   => 1,
		'post_type'        => $variation ? 'dr_product_variation' : 'dr_product',
		'meta_query' => array(
			array(
				'key' => 'gc_product_id',
				'value' => $gc_id
			)
		),
	);

	$gc_query = new WP_Query( $args );

	if ( $gc_query->have_posts() ) {
		return $gc_query->posts[0];
	} else {
		return 0;
	}
}

/**
 * Get product post by gc_id
 *
 * @param int $gc_id
 * @param boolean $variation
 * @return bool|object post
 */
function drgc_get_parent_product_by_gcid( $gc_id, $variation = false ) {
	$args = array(
		'posts_per_page'   => 1,
		'post_type'        => $variation ? 'dr_product_variation' : 'dr_product',
		'meta_query' => array(
			array(
				'key' => 'gc_product_id',
				'value' => absint( $gc_id )
			)
		),
	);

	$gc_query = new WP_Query( $args );

	if ( $gc_query->have_posts() ) {
		if ( $variation ) {
			return $gc_query->posts[0]->post_parent;
		} else {
			return $gc_query->posts[0];
		}
	} else {
		return 0;
	}
}

/**
 * Returns the products meta data for variations meta queries
 *
 * @param object $term
 * @return array
 */
function drgc_get_product_meta_filters( $term = null ) {
	$term_query = array();
	if ( $term ) {
		$term_query[] = array(
			'taxonomy'  => $term->taxonomy,
			'terms'     => $term->term_id,
		);
	}

	$attributes = array();
	$args = array(
		'posts_per_page'   => -1,
		'post_type'        => 'dr_product',
		'post_status'      => 'publish',
		'tax_query'        => $term_query,
	);

	$query = new WP_Query( $args );

	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();

			if ( ! empty( get_post_meta( get_the_ID(), 'variation_types', true ) ) ) {
				if ( ! empty( $attributes['variation_types'] ) && is_array($attributes['variation_types'])) {
					$attributes['variation_types'] = array_unique( array_merge( $attributes['variation_types'], get_post_meta( get_the_ID(), 'variation_types', true ) ) );
				} else {
					$attributes['variation_types'] = get_post_meta( get_the_ID(), 'variation_types', true );
				}
			}

			if ( ! empty( get_post_meta( get_the_ID(), 'color', true ) ) && is_array( get_post_meta( get_the_ID(), 'color', true ) ) ) {
				if ( ! empty( $attributes['color'] ) && is_array( $attributes['color'] ) ) {
					$attributes['color'] = array_unique( array_merge( $attributes['color'], get_post_meta( get_the_ID(), 'color', true ) ) );
				} else {
					$attributes['color'] = get_post_meta( get_the_ID(), 'color', true );
				}
			}

			if ( ! empty( get_post_meta( get_the_ID(), 'sizes', true ) ) && is_array( get_post_meta( get_the_ID(), 'sizes', true ) ) ) {
				if ( ! empty( $attributes['sizes'] ) && is_array( $attributes['sizes'] ) ) {
					$attributes['sizes'] = array_unique( array_merge( $attributes['sizes'], get_post_meta( get_the_ID(), 'sizes', true ) ) );
				} else {
					$attributes['sizes'] = get_post_meta( get_the_ID(), 'sizes', true );
				}
			}

			if ( ! empty( get_post_meta( get_the_ID(), 'duration', true ) ) && is_array( get_post_meta( get_the_ID(), 'duration', true ) ) ) {
				if ( ! empty( $attributes['duration'] ) && is_array( $attributes['duration'] ) ) {
					$attributes['duration'] = array_unique( array_merge( $attributes['duration'], get_post_meta( get_the_ID(), 'duration', true ) ) );
				} else {
					$attributes['duration'] = get_post_meta( get_the_ID(), 'duration', true );
				}
			}

			if ( ! empty( get_post_meta( get_the_ID(), 'wrap_type', true ) ) && is_array( get_post_meta( get_the_ID(), 'wrap_type', true ) ) ) {
				if ( ! empty( $attributes['wrap_type'] ) && is_array( $attributes['wrap_type'] ) ) {
					$attributes['wrap_type'] = array_unique( array_merge( $attributes['wrap_type'], get_post_meta( get_the_ID(), 'wrap_type', true ) ) );
				} else {
					$attributes['wrap_type'] = get_post_meta( get_the_ID(), 'wrap_type', true );
				}
			}
		}
		wp_reset_postdata();
	}

	return $attributes;
}

/**
 * Returns array of dr_product_variation post objects
 * associated with particular base product
 *
 * @param int $post_id
 * @return array|bool
 */
function drgc_get_product_variations( $post_id = 0 ) {
	if ( ! $post_id ) {
		return false;
	}

	$query = new WP_Query( array(
		'post_type'      => 'dr_product_variation',
		'post_parent'    => absint( $post_id ),
		'posts_per_page' => -1,
	) );

	if ( $query->have_posts() ) {
		$variations = $query->posts;

		return $variations;
	} else {
		return false;
	}
}

/**
 *
 * @param $code
 * @param bool $abriviated
 * @return mixed|string|void
 */
function drgc_code_to_counry( $code, $abriviated = false ) {
	$code = strtoupper( explode( '_', $code )[1] ) ;
	$countries = drgc_list_countries();

	if ( ! array_key_exists( $code, $countries ) ) return;

	if ( $abriviated ) {
		return $code;
	}

	return $countries[$code];
}

/**
 * Get pricing info based on current locale and currency
 *
 * @param int $post_id
 * @return array|bool
 */
function drgc_get_product_pricing( $post_id = 0 ) {
	if ( ! $post_id ) return false;

	$store_currencies = get_option( 'drgc_store_locales' );
	$product_pricing = get_post_meta( absint( $post_id ), 'loc_pricing', true );
	$current_locale = DRGC()->shopper->get_locale();
	$current_currency = $store_currencies['locales'][ $current_locale ];
	$cart = DRGC()->cart->cart;

	if ( $cart ) {
		$current_currency = isset( $cart['pricing']['orderTotal']['currency'] ) ? $cart['pricing']['orderTotal']['currency'] : '';
	}

	if ( isset( $product_pricing[ $current_currency ] ) ) {
		return $product_pricing[ $current_currency ];
	} else {
		return array(
			'currency'          => get_post_meta( absint( $post_id ), 'currency', true ),
			'list_price_value'  => get_post_meta( absint( $post_id ), 'list_price_value', true ),
			'sale_price_value'  => get_post_meta( absint( $post_id ), 'sale_price_value', true ),
			'price'             => get_post_meta( absint( $post_id ), 'price', true ),
			'regular_price'     => get_post_meta( absint( $post_id ), 'regular_price', true ),
		);
	}
}

/**
 * Code per Country list
 * @return array
 */
function drgc_list_countries() {
   return array( 'AF' => 'Afghanistan', 'AX' => 'Aland Islands', 'AL' => 'Albania', 'DZ' => 'Algeria', 'AS' => 'American Samoa', 'AD' => 'Andorra', 'AO' => 'Angola', 'AI' => 'Anguilla', 'AQ' => 'Antarctica', 'AG' => 'Antigua and Barbuda', 'AR' => 'Argentina', 'AM' => 'Armenia', 'AW' => 'Aruba', 'AU' => 'Australia', 'AT' => 'Austria', 'AZ' => 'Azerbaijan', 'BS' => 'Bahamas the', 'BH' => 'Bahrain', 'BD' => 'Bangladesh', 'BB' => 'Barbados', 'BY' => 'Belarus', 'BE' => 'Belgium', 'BZ' => 'Belize', 'BJ' => 'Benin', 'BM' => 'Bermuda', 'BT' => 'Bhutan', 'BO' => 'Bolivia', 'BA' => 'Bosnia and Herzegovina', 'BW' => 'Botswana', 'BV' => 'Bouvet Island (Bouvetoya)', 'BR' => 'Brazil', 'IO' => 'British Indian Ocean Territory (Chagos Archipelago)', 'VG' => 'British Virgin Islands', 'BN' => 'Brunei Darussalam', 'BG' => 'Bulgaria', 'BF' => 'Burkina Faso', 'BI' => 'Burundi', 'KH' => 'Cambodia', 'CM' => 'Cameroon', 'CA' => 'Canada', 'CV' => 'Cape Verde', 'KY' => 'Cayman Islands', 'CF' => 'Central African Republic', 'TD' => 'Chad', 'CL' => 'Chile', 'CN' => 'China', 'CX' => 'Christmas Island', 'CC' => 'Cocos (Keeling) Islands', 'CO' => 'Colombia', 'KM' => 'Comoros the', 'CD' => 'Congo', 'CG' => 'Congo the', 'CK' => 'Cook Islands', 'CR' => 'Costa Rica', 'CI' => 'Cote d\'Ivoire', 'HR' => 'Croatia', 'CU' => 'Cuba', 'CY' => 'Cyprus', 'CZ' => 'Czech Republic', 'DK' => 'Denmark', 'DJ' => 'Djibouti', 'DM' => 'Dominica', 'DO' => 'Dominican Republic', 'EC' => 'Ecuador', 'EG' => 'Egypt', 'SV' => 'El Salvador', 'GQ' => 'Equatorial Guinea', 'ER' => 'Eritrea', 'EE' => 'Estonia', 'ET' => 'Ethiopia', 'FO' => 'Faroe Islands', 'FK' => 'Falkland Islands (Malvinas)', 'FJ' => 'Fiji the Fiji Islands', 'FI' => 'Finland', 'FR' => 'France, French Republic', 'GF' => 'French Guiana', 'PF' => 'French Polynesia', 'TF' => 'French Southern Territories', 'GA' => 'Gabon', 'GM' => 'Gambia the', 'GE' => 'Georgia', 'DE' => 'Germany', 'GH' => 'Ghana', 'GI' => 'Gibraltar', 'GR' => 'Greece', 'GL' => 'Greenland', 'GD' => 'Grenada', 'GP' => 'Guadeloupe', 'GU' => 'Guam', 'GT' => 'Guatemala', 'GG' => 'Guernsey', 'GN' => 'Guinea', 'GW' => 'Guinea-Bissau', 'GY' => 'Guyana', 'HT' => 'Haiti', 'HM' => 'Heard Island and McDonald Islands', 'VA' => 'Holy See (Vatican City State)', 'HN' => 'Honduras', 'HK' => 'Hong Kong', 'HU' => 'Hungary', 'IS' => 'Iceland', 'IN' => 'India', 'ID' => 'Indonesia', 'IR' => 'Iran', 'IQ' => 'Iraq', 'IE' => 'Ireland', 'IM' => 'Isle of Man', 'IL' => 'Israel', 'IT' => 'Italy', 'JM' => 'Jamaica', 'JP' => 'Japan', 'JE' => 'Jersey', 'JO' => 'Jordan', 'KZ' => 'Kazakhstan', 'KE' => 'Kenya', 'KI' => 'Kiribati', 'KP' => 'Korea', 'KR' => 'Korea', 'KW' => 'Kuwait', 'KG' => 'Kyrgyz Republic', 'LA' => 'Lao', 'LV' => 'Latvia', 'LB' => 'Lebanon', 'LS' => 'Lesotho', 'LR' => 'Liberia', 'LY' => 'Libyan Arab Jamahiriya', 'LI' => 'Liechtenstein', 'LT' => 'Lithuania', 'LU' => 'Luxembourg', 'MO' => 'Macao', 'MK' => 'Macedonia', 'MG' => 'Madagascar', 'MW' => 'Malawi', 'MY' => 'Malaysia', 'MV' => 'Maldives', 'ML' => 'Mali', 'MT' => 'Malta', 'MH' => 'Marshall Islands', 'MQ' => 'Martinique', 'MR' => 'Mauritania', 'MU' => 'Mauritius', 'YT' => 'Mayotte', 'MX' => 'Mexico', 'FM' => 'Micronesia', 'MD' => 'Moldova', 'MC' => 'Monaco', 'MN' => 'Mongolia', 'ME' => 'Montenegro', 'MS' => 'Montserrat', 'MA' => 'Morocco', 'MZ' => 'Mozambique', 'MM' => 'Myanmar', 'NA' => 'Namibia', 'NR' => 'Nauru', 'NP' => 'Nepal', 'AN' => 'Netherlands Antilles', 'NL' => 'Netherlands the', 'NC' => 'New Caledonia', 'NZ' => 'New Zealand', 'NI' => 'Nicaragua', 'NE' => 'Niger', 'NG' => 'Nigeria', 'NU' => 'Niue', 'NF' => 'Norfolk Island', 'MP' => 'Northern Mariana Islands', 'NO' => 'Norway', 'OM' => 'Oman', 'PK' => 'Pakistan', 'PW' => 'Palau', 'PS' => 'Palestinian Territory', 'PA' => 'Panama', 'PG' => 'Papua New Guinea', 'PY' => 'Paraguay', 'PE' => 'Peru', 'PH' => 'Philippines', 'PN' => 'Pitcairn Islands', 'PL' => 'Poland', 'PT' => 'Portugal, Portuguese Republic', 'PR' => 'Puerto Rico', 'QA' => 'Qatar', 'RE' => 'Reunion', 'RO' => 'Romania', 'RU' => 'Russian Federation', 'RW' => 'Rwanda', 'BL' => 'Saint Barthelemy', 'SH' => 'Saint Helena', 'KN' => 'Saint Kitts and Nevis', 'LC' => 'Saint Lucia', 'MF' => 'Saint Martin', 'PM' => 'Saint Pierre and Miquelon', 'VC' => 'Saint Vincent and the Grenadines', 'WS' => 'Samoa', 'SM' => 'San Marino', 'ST' => 'Sao Tome and Principe', 'SA' => 'Saudi Arabia', 'SN' => 'Senegal', 'RS' => 'Serbia', 'SC' => 'Seychelles', 'SL' => 'Sierra Leone', 'SG' => 'Singapore', 'SK' => 'Slovakia (Slovak Republic)', 'SI' => 'Slovenia', 'SB' => 'Solomon Islands', 'SO' => 'Somalia, Somali Republic', 'ZA' => 'South Africa', 'GS' => 'South Georgia and the South Sandwich Islands', 'ES' => 'Spain', 'LK' => 'Sri Lanka', 'SD' => 'Sudan', 'SR' => 'Suriname', 'SJ' => 'Svalbard & Jan Mayen Islands', 'SZ' => 'Swaziland', 'SE' => 'Sweden', 'CH' => 'Switzerland, Swiss Confederation', 'SY' => 'Syrian Arab Republic', 'TW' => 'Taiwan', 'TJ' => 'Tajikistan', 'TZ' => 'Tanzania', 'TH' => 'Thailand', 'TL' => 'Timor-Leste', 'TG' => 'Togo', 'TK' => 'Tokelau', 'TO' => 'Tonga', 'TT' => 'Trinidad and Tobago', 'TN' => 'Tunisia', 'TR' => 'Turkey', 'TM' => 'Turkmenistan', 'TC' => 'Turks and Caicos Islands', 'TV' => 'Tuvalu', 'UG' => 'Uganda', 'UA' => 'Ukraine', 'AE' => 'United Arab Emirates', 'GB' => 'United Kingdom', 'US' => 'United States', 'UM' => 'United States Minor Outlying Islands', 'VI' => 'United States Virgin Islands', 'UY' => 'Uruguay, Eastern Republic of', 'UZ' => 'Uzbekistan', 'VU' => 'Vanuatu', 'VE' => 'Venezuela', 'VN' => 'Vietnam', 'WF' => 'Wallis and Futuna', 'EH' => 'Western Sahara', 'YE' => 'Yemen', 'ZM' => 'Zambia', 'ZW' => 'Zimbabwe'
	);
}

function drgc_get_user_status() {
	$shopperInfo = array();
	if ( DRGC()->shopper ) {
		$shopperInfo = DRGC()->shopper->get_access_token_information();
		return $shopperInfo['authenticated'];
	} else {
		return 'false';
	}
}

/**
 * Get business entity name by entity code
 *
 * @param string $entity_code
 * @return string
 */
function drgc_get_business_entity_name( $entity_code = '' ) {
	$entity_list = array(
		'DR_INC-ENTITY' => 'Digital River, Inc.',
		'DR_IRELAND-ENTITY' => 'Digital River Ireland Ltd.'
	);
	if ( ! array_key_exists( $entity_code, $entity_list ) ) {
		$entity_code = 'DR_INC-ENTITY';
	}
	return $entity_list[$entity_code];
}

/**
 * Displaying VAT/Tax depends on currency
 *
 * @param string $currency
 * @return bool
 */
function drgc_should_display_vat( $currency = '' ) {
	return ( $currency == 'GBP' || $currency == 'EUR' );
}

/**
 * Displaying tax inclusive label depends on locale (temp solution)
 *
 * @param string $locale
 * @return bool
 */
function drgc_is_tax_inclusive( $locale = '' ) {
	return $locale !== 'en_US';
}

function drgc_force_excl_tax() {
  $force_excl_tax_option = get_option( 'drgc_force_excl_tax_handler' );
  return ( is_array( $force_excl_tax_option ) && '1' == $force_excl_tax_option['checkbox'] )  ? true : false;
}

/**
 * Check if there is any subs in the cart
 *
 * @param array $cart
 * @return array
 */
function drgc_is_subs_added_to_cart( $cart ) {
  $line_items = $cart['cart']['lineItems']['lineItem'] ?? [];
  $has_subs = false;
  $is_auto = false;

  if ( count( $line_items ) > 0 ) {
    foreach ( $line_items as $line_item ) {
      $custom_attrs = $line_item['product']['customAttributes']['attribute'] ?? [];

      foreach ( $custom_attrs as $attr ) {
        if ( $attr['name'] === 'isAutomatic' ) {
          $has_subs = true;
          $is_auto = ( $attr['value'] === 'true' );
          break 2;
        }
      }
    }
  }

  return array( 'has_subs' => $has_subs, 'is_auto' => $is_auto );
}

/**
 * Check if the auto-renewal terms checkbox is checked
 *
 * @param array $cart
 * @return bool
 */
function drgc_is_auto_renewal_terms_checked( $cart ) {
  $custom_attrs = $cart['cart']['customAttributes']['attribute'] ?? [];

  if ( count( $custom_attrs ) === 0 ) return false;

  foreach ( $custom_attrs as $attr ) {
    if ( $attr['name'] === 'autoRenewOptedInOnCheckout' ) return ( $attr['value'] === 'true' );
  }

  return false;
}

/**
 * Get current DR locale by query param
 *
 * @return string
 */
function drgc_get_current_dr_locale() {
  $drgc_locale_options = get_option( 'drgc_locale_options' ) ?: array();
  $is_valid_locale = isset( $_GET['locale'] ) && false !== array_search( $_GET['locale'], array_column( $drgc_locale_options, 'dr_locale' ) );
  return $is_valid_locale ?
    $_GET['locale'] :
    get_option( 'drgc_default_locale' ) ?: 'en_US';
}
/**
 * Get current WP locale by DR locale
 *
 * @param string $dr_locale
 * @return string
 */
function drgc_get_current_wp_locale( $dr_locale ) {
  $drgc_locale_options = get_option( 'drgc_locale_options' );
  if ( empty( $drgc_locale_options ) ) {
    return get_wp_locale_by_map( $dr_locale );
  } else {
    $key = array_search( $dr_locale, array_column( $drgc_locale_options, 'dr_locale' ) );
    return $drgc_locale_options[$key]['wp_locale'];
  }
}
/**
 * Get primary currency by current DR locale
 *
 * @param string $dr_locale
 * @return string
 */
function drgc_get_primary_currency( $dr_locale ) {
  $drgc_locale_options = get_option( 'drgc_locale_options' );
  if ( empty( $drgc_locale_options ) ) {
    return '';
  } else {
    $key = array_search( $dr_locale, array_column( $drgc_locale_options, 'dr_locale' ) );
    return $drgc_locale_options[$key]['primary_currency'];
  }
}
/**
 * Get supported currencies by current DR locale
 *
 * @param string $dr_locale
 * @return array
 */
function drgc_get_supported_currencies( $dr_locale ) {
  $drgc_locale_options = get_option( 'drgc_locale_options' );
  if ( empty( $drgc_locale_options ) ) {
    return array();
  } else {
    $key = array_search( $dr_locale, array_column( $drgc_locale_options, 'dr_locale' ) );
    return $drgc_locale_options[$key]['supported_currencies'];
  }
}

/**
 * Get the category URL for Continue Shopping link
 *
 * @return string
 */
function drgc_get_continue_shopping_link() {
  $category_link = '';
  $categories = get_terms( array( 
    'taxonomy'   => 'dr_product_category',
    'parent'     => 0,
    'hide_empty' => false
  ) );

  if ( ! empty( $categories ) ) {
    $arr = [];

    foreach ( $categories as $category ) {
      $arr[] = $category->count;
    }

    if ( count( $arr ) > 2 ) {
      $index = array_search( max( $arr ), $arr );

      if ( $categories[$index]->slug === 'uncategorized' ) {
        unset( $arr[$index] );
        unset( $categories[$index] );
        $index = array_search( max( $arr ), $arr );
      }
    } else {
      $index = 0;
    }

    $category_link = esc_url( get_term_link( $categories[$index]->slug, 'dr_product_category' ) );
  } else {
    $category_link = isset( $_GET['locale'] ) ? esc_url( add_query_arg( 'locale', $_GET['locale'], get_home_url() ) ) : esc_url( get_home_url() );
  }

  return $category_link;
}
