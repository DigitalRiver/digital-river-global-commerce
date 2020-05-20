<?php
/**
 * WP-DR locale mapping.
 *
 * @link       https://www.digitalriver.com
 * @since      1.0.0
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 */

function get_locale_mapping() {
    return array(
        'af' => '',
        'ar' => 'ar_EG',
        'ary' => 'ar_MA',
        'as' => '',
        'azb' => '',
        'az' => '',
        'bel' => 'be_BY',
        'bg_BG' => 'bg_BG',
        'bn_BD' => '',
        'bo' => '',
        'bs_BA' => '',
        'ca' => 'ca_ES',
        'ceb' => '',
        'cs_CZ' => 'cs_CZ',
        'cy' => '',
        'da_DK' => 'da_DK',
        'de_DE_formal' => 'de_DE',
        'de_DE' => 'de_DE',
        'de_CH_informal' => 'de_CH',
        'de_CH' => 'de_CH',
        'dzo' => '',
        'el' => 'el_GR',
        'en_US' => 'en_US',
        'en_CA' => 'en_CA',
        'en_AU' => 'en_AU',
        'en_ZA' => 'en_ZA',
        'en_GB' => 'en_GB',
        'en_NZ' => 'en_NZ',
        'en' => 'en_US',
        'eo' => '',
        'es_CL' => 'es_CL',
        'es_ES' => 'es_ES',
        'es_MX' => 'es_MX',
        'es_CR' => 'es_CR',
        'es_VE' => 'es_VE',
        'es_CO' => 'es_CO',
        'es_GT' => 'es_GT',
        'es_PE' => 'es_PE',
        'es_AR' => 'es_AR',
        'et' => 'et_EE',
        'eu' => '',
        'fa_IR' => '',
        'fi' => 'fi_FI',
        'fr_FR' => 'fr_FR',
        'fr_CA' => 'fr_CA',
        'fr_BE' => 'fr_BE',
        'fur' => '',
        'gd' => '',
        'gl_ES' => '',
        'gu' => '',
        'haz' => '',
        'he_IL' => 'iw_IL',
        'hi_IN' => 'hi_IN',
        'hr' => 'hr_HR',
        'hu_HU' => 'hu_HU',
        'hy' => '',
        'id_ID' => 'id_ID',
        'is_IS' => 'is_IS',
        'it_IT' => 'it_IT',
        'ja' => 'ja_JP',
        'jv_ID' => '',
        'ka_GE' => '',
        'kab' => '',
        'kk' => 'kk_KZ',
        'km' => '',
        'ko_KR' => 'ko_KR',
        'ckb' => '',
        'lo' => '',
        'lt_LT' => 'lt_LT',
        'lv' => 'lv_LV',
        'mk_MK' => 'mk_MK',
        'ml_IN' => '',
        'mn' => '',
        'mr' => '',
        'ms_MY' => 'ms_MY',
        'my_MM' => '',
        'nb_NO' => 'no_NO',
        'ne_NP' => '',
        'nl_BE' => 'nl_BE',
        'nl_NL_formal' => 'nl_NL',
        'nl_NL' => 'nl_NL',
        'nn_NO' => 'no_NO_NY',
        'oci' => '',
        'pa_IN' => '',
        'pl_PL' => 'pl_PL',
        'ps' => '',
        'pt_BR' => 'pt_BR',
        'pt_PT' => 'pt_PT',
        'pt_PT_ao90' => 'pt_PT',
        'rhg' => '',
        'ro_RO' => 'ro_RO',
        'ru_RU' => 'ru_RU',
        'sah' => '',
        'si_LK' => '',
        'sk_SK' => 'sk_SK',
        'skr' => '',
        'sl_SI' => 'sl_SI',
        'sq' => 'sq_AL',
        'sr_RS' => 'sr_RS',
        'sv_SE' => 'sv_SE',
        'szl' => '',
        'ta_IN' => '',
        'te' => '',
        'th' => 'th_TH',
        'tl' => '',
        'tr_TR' => 'tr_TR',
        'tt_RU' => '',
        'tah' => '',
        'ug_CN' => '',
        'uk' => 'uk_UA',
        'ur' => '',
        'uz_UZ' => '',
        'vi' => 'vi_VN',
        'zh_TW' => 'zh_TW',
        'zh_CN' => 'zh_CN',
        'zh_HK' => 'zh_HK'
    );
}

/**
 * Convert DR locale to WP locale by mapping.
 *
 * @since  2.0.0
 */
function get_wp_locale_by_map( $dr_locale ) {
  $mapping = get_locale_mapping();
  $wp_locale = array_search( $dr_locale, $mapping );

  // When there is no matching WP locale, find by 2 characters lang code instead
  if ( ! $wp_locale ) {
    $dr_locale_arr = explode( '_', $dr_locale );
    $lang_code = $dr_locale_arr[0];

    if ( isset( $lang_code ) ) {
      $filtered = array_filter( $mapping, function( $k ) use ( $lang_code ) {
        return substr( $k, 0, 2 ) === $lang_code;
      }, ARRAY_FILTER_USE_KEY );
      $wp_locale = array_key_first( $filtered );
    }
  }

  return $wp_locale ?: 'en_US';
}

/**
 * Convert WP locale to DR locale by mapping.
 *
 * @since  1.0.0
 */
function get_dr_locale_by_map( $wp_locale ) {
  $mapping = get_locale_mapping();
  return $mapping[ $wp_locale ];
}

/**
 * Returns a list of all usa sates
 */
function retrieve_usa_states() {
    return array('AL' => "Alabama",  'AK' => "Alaska",  'AZ' => "Arizona",  'AR' => "Arkansas",  'CA' => "California",  'CO' => "Colorado",  'CT' => "Connecticut",  'DE' => "Delaware",  'DC' => "District Of Columbia",  'FL' => "Florida",  'GA' => "Georgia",  'HI' => "Hawaii",  'ID' => "Idaho",  'IL' => "Illinois",  'IN' => "Indiana",  'IA' => "Iowa",  'KS' => "Kansas",  'KY' => "Kentucky",  'LA' => "Louisiana",  'ME' => "Maine",  'MD' => "Maryland",  'MA' => "Massachusetts",  'MI' => "Michigan",  'MN' => "Minnesota",  'MS' => "Mississippi",  'MO' => "Missouri",  'MT' => "Montana",'NE' => "Nebraska",'NV' => "Nevada",'NH' => "New Hampshire",'NJ' => "New Jersey",'NM' => "New Mexico",'NY' => "New York",'NC' => "North Carolina",'ND' => "North Dakota",'OH' => "Ohio",  'OK' => "Oklahoma",  'OR' => "Oregon",  'PA' => "Pennsylvania",  'RI' => "Rhode Island",  'SC' => "South Carolina",  'SD' => "South Dakota",'TN' => "Tennessee",  'TX' => "Texas",  'UT' => "Utah",  'VT' => "Vermont",  'VA' => "Virginia",  'WA' => "Washington",  'WV' => "West Virginia",  'WI' => "Wisconsin",  'WY' => "Wyoming");
}
