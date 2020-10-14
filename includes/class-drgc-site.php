<?php
/**
 * Fetching site data such as locales/currencies/products/categories.
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 * @version 2.0.0
 */

class DRGC_Site extends AbstractHttpService {

  public function __construct( $handler = false ) {
    parent::__construct( $handler );
  }

  public function fetch_data_by_uri( $uri = '', $params = array() ) {
    try {
      $uri_without_query = strtok( $uri, '?' );
      $uri_query_str = parse_url( $uri, PHP_URL_QUERY );
      parse_str( $uri_query_str, $uri_query_params );
      $params = array_merge( $uri_query_params, $params );
      $res = $this->get( $uri_without_query . '?' . http_build_query( $params ) );
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }

  public function get_site( $params = array() ) {
    try {
      $res = $this->get( '/v1/shoppers/site?' . http_build_query( $params ) );
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }

  public function get_categories( $params = array() ) {
    try {
      $res = $this->get( '/v1/shoppers/me/categories?' . http_build_query( $params ) );
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }

  public function get_category( $id, $params = array() ) {
    try {
      $res = $this->get( '/v1/shoppers/me/categories/' . $id . '?' . http_build_query( $params ) );
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }

  public function get_products( $params = array() ) {
    try {
      $res = $this->get( '/v1/shoppers/me/products?' . http_build_query( $params ) );
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }

  public function get_product_categories( $id, $params = array() ) {
    try {
      $res = $this->get( '/v1/shoppers/me/products/' . $id . '/categories?' . http_build_query( $params ) );
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }
}
