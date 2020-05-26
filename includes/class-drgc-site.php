<?php
/**
 * Fetching site data such as locales and currencies.
 *
 * @package    Digital_River_Global_Commerce
 * @subpackage Digital_River_Global_Commerce/includes
 * @version 2.0.0
 */

class DRGC_Site extends AbstractHttpService {

  public function __construct( $handler = false ) {
    parent::__construct( $handler );
  }

  public function get_site( $params = array() ) {
    try {
      $res = $this->get( '/v1/shoppers/site?' . http_build_query( $params ) );
      return $res;
    } catch (\Exception $e) {
      return false;
    }
  }
}
