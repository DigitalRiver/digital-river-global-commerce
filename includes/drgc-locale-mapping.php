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

function get_locale_mapping() { // (Will be deprecated once new localization is done)
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
        'de_AT' => 'de_AT',
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
        'id_ID' => 'in_ID',
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

function get_full_locale_mapping() {
  return array(
    'sq_AL' => array( 'wp_locale' => 'sq', 'lang' => 'Albanian', 'country' => __( 'Albania', 'digital-river-global-commerce' ) ),
    'ar_DZ' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Algeria', 'digital-river-global-commerce' ) ),
    'ar_BH' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Bahrain', 'digital-river-global-commerce' ) ),
    'ar_EG' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Egypt', 'digital-river-global-commerce' ) ),
    'ar_IQ' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Iraq', 'digital-river-global-commerce' ) ),
    'ar_JO' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Jordan', 'digital-river-global-commerce' ) ),
    'ar_KW' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Kuwait', 'digital-river-global-commerce' ) ),
    'ar_LB' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Lebanon', 'digital-river-global-commerce' ) ),
    'ar_LY' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Libya', 'digital-river-global-commerce' ) ),
    'ar_MA' => array( 'wp_locale' => 'ary', 'lang' => 'Arabic', 'country' => __( 'Morocco', 'digital-river-global-commerce' ) ),
    'ar_OM' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Oman', 'digital-river-global-commerce' ) ),
    'ar_QA' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Qatar', 'digital-river-global-commerce' ) ),
    'ar_SA' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Saudi Arabia', 'digital-river-global-commerce' ) ),
    'ar_SD' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Sudan', 'digital-river-global-commerce' ) ),
    'ar_SY' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Syria', 'digital-river-global-commerce' ) ),
    'ar_TN' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Tunisia', 'digital-river-global-commerce' ) ),
    'ar_AE' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'United Arab Emirates', 'digital-river-global-commerce' ) ),
    'ar_YE' => array( 'wp_locale' => 'ar', 'lang' => 'Arabic', 'country' => __( 'Yemen', 'digital-river-global-commerce' ) ),
    'be_BY' => array( 'wp_locale' => 'bel', 'lang' => 'Belarusian', 'country' => __( 'Belarus', 'digital-river-global-commerce' ) ),
    'bg_BG' => array( 'wp_locale' => 'bg_BG', 'lang' => 'Bulgarian', 'country' => __( 'Bulgaria', 'digital-river-global-commerce' ) ),
    'ca_ES' => array( 'wp_locale' => 'ca', 'lang' => 'Catalan', 'country' => __( 'Spain', 'digital-river-global-commerce' ) ),
    'zh_CN' => array( 'wp_locale' => 'zh_CN', 'lang' => 'Chinese', 'country' => __( 'China', 'digital-river-global-commerce' ) ),
    'zh_HK' => array( 'wp_locale' => 'zh_HK', 'lang' => 'Chinese', 'country' => __( 'Hong Kong SAR China', 'digital-river-global-commerce' ) ),
    'zh_MO' => array( 'wp_locale' => 'zh_HK', 'lang' => 'Chinese', 'country' => __( 'Macau SAR China', 'digital-river-global-commerce' ) ),
    'zh_TW' => array( 'wp_locale' => 'zh_TW', 'lang' => 'Chinese', 'country' => __( 'Taiwan', 'digital-river-global-commerce' ) ),
    'hr_BA' => array( 'wp_locale' => 'hr', 'lang' => 'Croatian', 'country' => __( 'Bosnia & Herzegovina', 'digital-river-global-commerce' ) ),
    'hr_HR' => array( 'wp_locale' => 'hr', 'lang' => 'Croatian', 'country' => __( 'Croatia', 'digital-river-global-commerce' ) ),
    'cs_CZ' => array( 'wp_locale' => 'cs_CZ', 'lang' => 'Czech', 'country' => __( 'Czechia', 'digital-river-global-commerce' ) ),
    'da_DK' => array( 'wp_locale' => 'da_DK', 'lang' => 'Danish', 'country' => __( 'Denmark', 'digital-river-global-commerce' ) ),
    'nl_BE' => array( 'wp_locale' => 'nl_BE', 'lang' => 'Dutch', 'country' => __( 'Belgium', 'digital-river-global-commerce' ) ),
    'nl_NL' => array( 'wp_locale' => 'nl_NL', 'lang' => 'Dutch', 'country' => __( 'Netherlands', 'digital-river-global-commerce' ) ),
    'en_AU' => array( 'wp_locale' => 'en_AU', 'lang' => 'English', 'country' => __( 'Australia', 'digital-river-global-commerce' ) ),
    'en_BE' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Belgium', 'digital-river-global-commerce' ) ),
    'en_CA' => array( 'wp_locale' => 'en_CA', 'lang' => 'English', 'country' => __( 'Canada', 'digital-river-global-commerce' ) ),
    'en_DK' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Denmark', 'digital-river-global-commerce' ) ),
    'en_FI' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Finland', 'digital-river-global-commerce' ) ),
    'en_HK' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Hong Kong SAR China', 'digital-river-global-commerce' ) ),
    'en_IS' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Iceland', 'digital-river-global-commerce' ) ),
    'en_IN' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'India', 'digital-river-global-commerce' ) ),
    'en_ID' => array( 'wp_locale' => 'en_US', 'lang' => 'English', 'country' => __( 'Indonesia', 'digital-river-global-commerce' ) ),
    'en_IE' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Ireland', 'digital-river-global-commerce' ) ),
    'en_MY' => array( 'wp_locale' => 'en_US', 'lang' => 'English', 'country' => __( 'Malaysia', 'digital-river-global-commerce' ) ),
    'en_MT' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Malta', 'digital-river-global-commerce' ) ),
    'en_NL' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Netherlands', 'digital-river-global-commerce' ) ),
    'en_NZ' => array( 'wp_locale' => 'en_NZ', 'lang' => 'English', 'country' => __( 'New Zealand', 'digital-river-global-commerce' ) ),
    'en_NO' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Norway', 'digital-river-global-commerce' ) ),
    'en_PH' => array( 'wp_locale' => 'en_US', 'lang' => 'English', 'country' => __( 'Philippines', 'digital-river-global-commerce' ) ),
    'en_PR' => array( 'wp_locale' => 'en_US', 'lang' => 'English', 'country' => __( 'Puerto Rico', 'digital-river-global-commerce' ) ),
    'en_SG' => array( 'wp_locale' => 'en_US', 'lang' => 'English', 'country' => __( 'Singapore', 'digital-river-global-commerce' ) ),
    'en_ZA' => array( 'wp_locale' => 'en_ZA', 'lang' => 'English', 'country' => __( 'South Africa', 'digital-river-global-commerce' ) ),
    'en_SE' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Sweden', 'digital-river-global-commerce' ) ),
    'en_CH' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'Switzerland', 'digital-river-global-commerce' ) ),
    'en_TH' => array( 'wp_locale' => 'en_US', 'lang' => 'English', 'country' => __( 'Thailand', 'digital-river-global-commerce' ) ),
    'en_GB' => array( 'wp_locale' => 'en_GB', 'lang' => 'English', 'country' => __( 'United Kingdom', 'digital-river-global-commerce' ) ),
    'en_US' => array( 'wp_locale' => 'en_US', 'lang' => 'English', 'country' => __( 'United States', 'digital-river-global-commerce' ) ),
    'et_EE' => array( 'wp_locale' => 'et', 'lang' => 'Estonian', 'country' => __( 'Estonia', 'digital-river-global-commerce' ) ),
    'fi_FI' => array( 'wp_locale' => 'fi', 'lang' => 'Finnish', 'country' => __( 'Finland', 'digital-river-global-commerce' ) ),
    'fr_BE' => array( 'wp_locale' => 'fr_BE', 'lang' => 'French', 'country' => __( 'Belgium', 'digital-river-global-commerce' ) ),
    'fr_CA' => array( 'wp_locale' => 'fr_CA', 'lang' => 'French', 'country' => __( 'Canada', 'digital-river-global-commerce' ) ),
    'fr_FR' => array( 'wp_locale' => 'fr_FR', 'lang' => 'French', 'country' => __( 'France', 'digital-river-global-commerce' ) ),
    'fr_LU' => array( 'wp_locale' => 'fr_FR', 'lang' => 'French', 'country' => __( 'Luxembourg', 'digital-river-global-commerce' ) ),
    'fr_PM' => array( 'wp_locale' => 'fr_FR', 'lang' => 'French', 'country' => __( 'St. Pierre & Miquelon', 'digital-river-global-commerce' ) ),
    'fr_CH' => array( 'wp_locale' => 'fr_FR', 'lang' => 'French', 'country' => __( 'Switzerland', 'digital-river-global-commerce' ) ),
    'de_AT' => array( 'wp_locale' => 'de_AT', 'lang' => 'German', 'country' => __( 'Austria', 'digital-river-global-commerce' ) ),
    'de_DE' => array( 'wp_locale' => 'de_DE', 'lang' => 'German', 'country' => __( 'Germany', 'digital-river-global-commerce' ) ),
    'de_LI' => array( 'wp_locale' => 'de_DE', 'lang' => 'German', 'country' => __( 'Liechtenstein', 'digital-river-global-commerce' ) ),
    'de_LU' => array( 'wp_locale' => 'de_DE', 'lang' => 'German', 'country' => __( 'Luxembourg', 'digital-river-global-commerce' ) ),
    'de_CH' => array( 'wp_locale' => 'de_CH', 'lang' => 'German', 'country' => __( 'Switzerland', 'digital-river-global-commerce' ) ),
    'el_GR' => array( 'wp_locale' => 'el', 'lang' => 'Greek', 'country' => __( 'Greece', 'digital-river-global-commerce' ) ),
    'iw_IL' => array( 'wp_locale' => 'he_IL', 'lang' => 'Hebrew', 'country' => __( 'Israel', 'digital-river-global-commerce' ) ),
    'hi_IN' => array( 'wp_locale' => 'hi_IN', 'lang' => 'Hindi', 'country' => __( 'India', 'digital-river-global-commerce' ) ),
    'hu_HU' => array( 'wp_locale' => 'hu_HU', 'lang' => 'Hungarian', 'country' => __( 'Hungary', 'digital-river-global-commerce' ) ),
    'is_IS' => array( 'wp_locale' => 'is_IS', 'lang' => 'Icelandic', 'country' => __( 'Iceland', 'digital-river-global-commerce' ) ),
    'in_ID' => array( 'wp_locale' => 'id_ID', 'lang' => 'Indonesian', 'country' => __( 'Indonesia', 'digital-river-global-commerce' ) ),
    'it_IT' => array( 'wp_locale' => 'it_IT', 'lang' => 'Italian', 'country' => __( 'Italy', 'digital-river-global-commerce' ) ),
    'it_CH' => array( 'wp_locale' => 'it_IT', 'lang' => 'Italian', 'country' => __( 'Switzerland', 'digital-river-global-commerce' ) ),
    'ja_JP' => array( 'wp_locale' => 'ja', 'lang' => 'Japanese', 'country' => __( 'Japan', 'digital-river-global-commerce' ) ),
    'kk_KZ' => array( 'wp_locale' => 'kk', 'lang' => 'Kazakh', 'country' => __( 'Kazakhstan', 'digital-river-global-commerce' ) ),
    'ko_KR' => array( 'wp_locale' => 'ko_KR', 'lang' => 'Korean', 'country' => __( 'South Korea', 'digital-river-global-commerce' ) ),
    'lv_LV' => array( 'wp_locale' => 'lv', 'lang' => 'Latvian', 'country' => __( 'Latvia', 'digital-river-global-commerce' ) ),
    'lt_LT' => array( 'wp_locale' => 'lt_LT', 'lang' => 'Lithuanian', 'country' => __( 'Lithuania', 'digital-river-global-commerce' ) ),
    'mk_MK' => array( 'wp_locale' => 'mk_MK', 'lang' => 'Macedonian', 'country' => __( 'Macedonia', 'digital-river-global-commerce' ) ),
    'ms_MY' => array( 'wp_locale' => 'ms_MY', 'lang' => 'Malay', 'country' => __( 'Malaysia', 'digital-river-global-commerce' ) ),
    'no_NO' => array( 'wp_locale' => 'nb_NO', 'lang' => 'Norwegian', 'country' => __( 'Norway', 'digital-river-global-commerce' ) ),
    'no_NO_NY' => array( 'wp_locale' => 'nn_NO', 'lang' => 'Norwegian', 'country' => __( 'Norway, Nynorsk', 'digital-river-global-commerce' ) ),
    'pl_PL' => array( 'wp_locale' => 'pl_PL', 'lang' => 'Polish', 'country' => __( 'Poland', 'digital-river-global-commerce' ) ),
    'pt_BR' => array( 'wp_locale' => 'pt_BR', 'lang' => 'Portuguese', 'country' => __( 'Brazil', 'digital-river-global-commerce' ) ),
    'pt_PT' => array( 'wp_locale' => 'pt_PT', 'lang' => 'Portuguese', 'country' => __( 'Portugal', 'digital-river-global-commerce' ) ),
    'ro_RO' => array( 'wp_locale' => 'ro_RO', 'lang' => 'Romanian', 'country' => __( 'Romania', 'digital-river-global-commerce' ) ),
    'ru_RU' => array( 'wp_locale' => 'ru_RU', 'lang' => 'Russian', 'country' => __( 'Russia', 'digital-river-global-commerce' ) ),
    'sr_RS' => array( 'wp_locale' => 'sr_RS', 'lang' => 'Serbian', 'country' => __( 'Serbia', 'digital-river-global-commerce' ) ),
    'sr_YU' => array( 'wp_locale' => 'sr_RS', 'lang' => 'Serbian', 'country' => __( 'YU', 'digital-river-global-commerce' ) ),
    'sk_SK' => array( 'wp_locale' => 'sk_SK', 'lang' => 'Slovak', 'country' => __( 'Slovakia', 'digital-river-global-commerce' ) ),
    'sl_SI' => array( 'wp_locale' => 'sl_SI', 'lang' => 'Slovenian', 'country' => __( 'Slovenia', 'digital-river-global-commerce' ) ),
    'es_AR' => array( 'wp_locale' => 'es_AR', 'lang' => 'Spanish', 'country' => __( 'Argentina', 'digital-river-global-commerce' ) ),
    'es_BO' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Bolivia', 'digital-river-global-commerce' ) ),
    'es_CL' => array( 'wp_locale' => 'es_CL', 'lang' => 'Spanish', 'country' => __( 'Chile', 'digital-river-global-commerce' ) ),
    'es_CO' => array( 'wp_locale' => 'es_CO', 'lang' => 'Spanish', 'country' => __( 'Colombia', 'digital-river-global-commerce' ) ),
    'es_CR' => array( 'wp_locale' => 'es_CR', 'lang' => 'Spanish', 'country' => __( 'Costa Rica', 'digital-river-global-commerce' ) ),
    'es_DO' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Dominican Republic', 'digital-river-global-commerce' ) ),
    'es_EC' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Ecuador', 'digital-river-global-commerce' ) ),
    'es_SV' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'El Salvador', 'digital-river-global-commerce' ) ),
    'es_GT' => array( 'wp_locale' => 'es_GT', 'lang' => 'Spanish', 'country' => __( 'Guatemala', 'digital-river-global-commerce' ) ),
    'es_HN' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Honduras', 'digital-river-global-commerce' ) ),
    'es_MX' => array( 'wp_locale' => 'es_MX', 'lang' => 'Spanish', 'country' => __( 'Mexico', 'digital-river-global-commerce' ) ),
    'es_NI' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Nicaragua', 'digital-river-global-commerce' ) ),
    'es_PA' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Panama', 'digital-river-global-commerce' ) ),
    'es_PY' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Paraguay', 'digital-river-global-commerce' ) ),
    'es_PE' => array( 'wp_locale' => 'es_PE', 'lang' => 'Spanish', 'country' => __( 'Peru', 'digital-river-global-commerce' ) ),
    'es_PR' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Puerto Rico', 'digital-river-global-commerce' ) ),
    'es_ES' => array( 'wp_locale' => 'es_ES', 'lang' => 'Spanish', 'country' => __( 'Spain', 'digital-river-global-commerce' ) ),
    'es_UY' => array( 'wp_locale' => 'es_UY', 'lang' => 'Spanish', 'country' => __( 'Uruguay', 'digital-river-global-commerce' ) ),
    'es_VE' => array( 'wp_locale' => 'es_VE', 'lang' => 'Spanish', 'country' => __( 'Venezuela', 'digital-river-global-commerce' ) ),
    'sv_SE' => array( 'wp_locale' => 'sv_SE', 'lang' => 'Swedish', 'country' => __( 'Sweden', 'digital-river-global-commerce' ) ),
    'th_TH' => array( 'wp_locale' => 'th', 'lang' => 'Thai', 'country' => __( 'Thailand', 'digital-river-global-commerce' ) ),
    'th_TH_TH_#u-nu-thai' => array( 'wp_locale' => 'th', 'lang' => 'Thai', 'country' => __( 'Thailand, TH, Thai Digits', 'digital-river-global-commerce' ) ),
    'tr_TR' => array( 'wp_locale' => 'tr_TR', 'lang' => 'Turkish', 'country' => __( 'Turkey', 'digital-river-global-commerce' ) ),
    'uk_UA' => array( 'wp_locale' => 'uk', 'lang' => 'Ukrainian', 'country' => __( 'Ukraine', 'digital-river-global-commerce' ) ),
    'vi_VN' => array( 'wp_locale' => 'vi', 'lang' => 'Vietnamese', 'country' => __( 'Vietnam', 'digital-river-global-commerce' ) )
  );
}

/**
 * Convert DR locale to WP locale by mapping.
 *
 * @since  2.0.0
 */
function get_wp_locale_by_map( $dr_locale ) {
  $mapping = get_full_locale_mapping();
  $wp_locale = isset( $mapping[$dr_locale] ) ? $mapping[$dr_locale]['wp_locale'] : 'en_US';
  return $wp_locale;
}

/**
 * Get DR country name by DR locale.
 *
 * @since  2.0.0
 */
function get_dr_country_name( $dr_locale ) {
  $mapping = get_full_locale_mapping();
  $country = isset( $mapping[$dr_locale] ) ? $mapping[$dr_locale]['country'] : $mapping['en_US']['country'] ;
  return $country;
}

/**
 * Get DR country code by extracting a substring from DR locale.
 *
 * @since  2.0.0
 */
function get_dr_country_code( $dr_locale ) {
  $arr = explode( '_', $dr_locale );
  return isset( $arr[1] ) ? strtolower( $arr[1] ) : '';
}

/**
 * Convert WP locale to DR locale by mapping. (Will be deprecated once new localization is done)
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
