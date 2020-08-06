<?php
/**
 * User Management object
 *
 * @since      1.3.0
 * @package    Digital_River_Global_Commerce
 */

class DRGC_User_Management extends AbstractHttpService {
  /**
   *  Site ID
   */
  public $site_id;

  /**
   * User Management endpoint
   */
  public $endpoint;

  /**
   * Constructor
   */
  public function __construct( $handler = false ) {
    parent::__construct($handler);

    $this->site_id = get_option( 'drgc_site_id' );
    $this->endpoint = "https://gc.digitalriver.com/integration/job/request/UserManagement/{$this->site_id}/company/";
  }

  /**
   * Get the XML request body for User Management calls
   *
   * @param string $action
   * @param array  $params
   *
   * @return string
   */
  public function get_request_body( $action, $params = array() ) {
    $body = '';

    if ( isset( $params['id'] ) ) {
      $id = $params['id'];

      switch ( trim( $action ) ) {
        case 'CANCEL_SUBS':
          $body = "<?xml version='1.0' encoding='utf-8'?>
            <CancelSubscriptionRequest xmlns='http://integration.digitalriver.com/UserManagement/1.0'>
              <subscriptionKey>
                <subscriptionID>{$id}</subscriptionID>
              </subscriptionKey>
            </CancelSubscriptionRequest>";

          break;
        case 'SWITCH_RENEWAL_TYPE':
          if ( isset( $params['renewal_type'] ) ) {
            $renewal_type = $params['renewal_type'];
            $body = "<?xml version='1.0' encoding='utf-8'?>
              <ModifyAutoRenewalRequest xmlns='http://integration.digitalriver.com/UserManagement/1.0'>
                <subscriptionKey>
                  <subscriptionID>{$id}</subscriptionID>
                </subscriptionKey>
                <autoRenewalAction>{$renewal_type}</autoRenewalAction>
              </ModifyAutoRenewalRequest>"; 
          }

          break;
        case 'CHANGE_RENEWAL_QTY':
          if ( isset( $params['renewal_qty'] ) ) {
            $qty = $params['renewal_qty'];
            $body = "<?xml version='1.0' encoding='utf-8'?>
              <ChangeRenewalQuantitySubscriptionRequest xmlns='http://integration.digitalriver.com/UserManagement/1.0'>
                <subscriptionKey>
                  <subscriptionID>{$id}</subscriptionID>
                </subscriptionKey>
                <renewalQuantity>{$qty}</renewalQuantity>
              </ChangeRenewalQuantitySubscriptionRequest>";
          }

          break;
      }
    }

    return $body;
  }

  /**
   * Send the User Management request
   *
   * @param string $action
   * @param array  $params
   *
   * @return mixed
   */
  public function send_request( $action, $params = array() ) {
    $data = $this->get_request_body( $action, $params );

    if ( $data !== '' ) {
      try {
        return $this->postXml( $this->endpoint, $data );
      } catch ( \Exception $e ) {
        return $e->getMessage();
      }
    } else {
      return false;
    }
  }

  /**
   * Send a JSON response back to an AJAX request
   *
   * @param string $response
   *
   */
  public function send_json_response( $response ) {
    if ( strpos( $response, 'errorCode' ) > -1 ) {
      $xml = simplexml_load_string( $response );

      if ( trim( $xml->errorCode ) === '0' ) {
        wp_send_json_success();
      } else {
        wp_send_json_error( array( 'message' => $xml->errorMessage ) );
      }
    } elseif ( strpos( $response, 'html' ) > -1 ) {
      $dom = new DomDocument;
      $dom->loadHTML( $response );
      $h1s = $dom->getElementsByTagName( 'h1' );
      $error_msg = 'Service Temporarily Unavailable!';
      
      if ( strlen( trim( $h1s[0]->nodeValue ) ) ) {
        $error_msg = trim( $h1s[0]->nodeValue );
      }

      wp_send_json_error( array( 'message' => $error_msg ) );
    } else {
      wp_send_json_error( array( 'message' => 'An unknown error has occurred.' ) );
    }
  }
}
