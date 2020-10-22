<?php

require_once dirname( dirname(__FILE__) ).'/vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use GuzzleHttp\Exception\RequestException;
use Psr\Http\Message\ResponseInterface;

/**
 * Class http service
 */
abstract class AbstractHttpService {
    /**
     * Current client instance
     */
    protected $client;

    /**
     * Access token
     * @var string
     */
    public $token;

    /**
     * Token type
     *
     * @var string
     */
    public $tokenType = 'Bearer';

    /**
     * Default configuration
     *
     * @var array
     */
    protected $config = array(
        'base_uri'    => null,
        'http_errors' => false,
        'verify'      => false,
        'headers'     => array(
            'Accept'        => 'application/json',
            'Content-Type'  => 'application/json',
            'Cache-Control' => 'no-cache',
            'Pragma'        => 'no-cache'
        ),
        'handler'     => null
    );

    /**
     * Most recent status
     *
     * @var string
     */
    protected $status = '';

    /**
     * Env
     *
     * @var string
     */
    public $env;

    /**
     * Services constructor.
     *
     * @param string|null $userName
     * @param string|null $password
     */
    public function __construct( $handler = false ) {
        if ( $handler ) {
            $this->config['handler'] = $handler;

            if ( is_null( $this->token ) ) {
                $this->token = explode(' ', $this->config['headers']['Authorization'])[1];
            }
        }

        $this->setFormContentType();
        $this->setJsonContentType();
        $this->setEnv();
        $this->site_id = get_option( 'drgc_site_id' );
    }

    /**
     * Validate status code
     *
     * @param \Psr\Http\Message\ResponseInterface $response
     */
    private function validateStatusCode( ResponseInterface $response ) {
        $statusCode = $response->getStatusCode();

        if ( 200 > $statusCode ||  299 < $statusCode ) {
            // Log error if needed
            $this->setStatus('Api connection failed.');
        }
    }

    /**
     * Get response data from the body
     *
     * @param \Psr\Http\Message\ResponseInterface $response
     *
     * @return array
     */
    private function getResponseData( ResponseInterface $response ): array {
        $data = json_decode( $response->getBody()->getContents(), true );
        return $data ?: array();
    }

    /**
     * Prepare params for "form-urlencoded" content type
     *
     * @param array $requestParams
     *
     * @return array
     */
    protected function prepareParams(array $requestParams): array {
        return array( GuzzleHttp\RequestOptions::FORM_PARAMS => $requestParams );
    }

    /**
     * Initialize new client
     *
     * @param boolean $force_bearer_token
     * @param boolean $is_user_management
     *
     * @return \GuzzleHttp\Client
     */
    private function createClient( $force_bearer_token = true, $is_user_management = false ): Client {
        if ( $this->token && $force_bearer_token ) {
            $this->config['headers']['Authorization'] = trim( ucfirst( $this->tokenType ) . ' ' . $this->token );
        } else {
            if ( $is_user_management ) {
                $auth = base64_encode( get_option( 'drgc_big_blue_username' ) . '@' . get_option( 'drgc_site_id' ) . ':' . get_option( 'drgc_big_blue_password' ) );
                $this->config['headers']['Content-Type'] = 'text/xml; charset=UTF8';
                $this->config['headers']['Accept'] = 'text/xml; charset=UTF8';
            } else {
                $auth = base64_encode( get_option( 'drgc_api_key' ) . ':' . get_option( 'drgc_api_secret' ) );
            }

            $this->config['headers']['Authorization'] = trim( 'Basic ' . $auth );
        }

        return new Client($this->config);
    }

    /**
     * Set current response status
     *
     * @param string $status
     */
    private function setStatus( string $status ) {
        $this->status = $status;
    }

    /**
     * Get most recent response status
     *
     * @return string
     */
    public function getStatus(): string {
        return $this->status;
    }

    /**
     * Get the domain uri
     *
     * @return string
     */
    protected function normalizeUri($uri): string {
        $domain = get_option( 'drgc_domain' ) ?: 'api.digitalriver.com';
        preg_match( '/^(http|https):\/\//', $domain, $matches );
        if ( empty( $matches ) ) {
            $domain = "https://{$domain}";
        }

        preg_match( '/^(http|https):\/\//', $uri, $result );
        if ( empty( $result ) ) {
            return $domain.$uri;
        }

        return $uri;
    }

    /**
     * Generate random unique UID
     * @return string
     */
    protected function guidv4() {
        if ( function_exists('com_create_guid') === true ) {
            return trim(com_create_guid(), '{}');
        }

        $data = openssl_random_pseudo_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /**
     * Set json content type
     * @return void
     */
    protected function setJsonContentType() {
        $this->config['headers']['Content-Type'] = 'application/json';
    }

    protected function setFormContentType() {
        $this->config['headers']['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    /**
     * Set Env
     * @return void
     */
    protected function setEnv() {
        $this->env = ( ( strpos( get_option( 'drgc_domain' ), 'test' ) !== false ) ? 'test' : 'production' );
    }

    /**
     * Get the URL for the sessionToken site action
     *
     * @return string
     */
    protected function authUrl(): string {
        $gc_domain = ( ( $this->env === 'test' ) ? 'drhadmin-sys-drx.drextenv.net' : 'store.digitalriver.com' );

        return "https://{$gc_domain}/store/{$this->site_id}/SessionToken";
    }

    /**
     * @param string $url
     * @param array  $data
     *
     * @return array
     */
    protected function getNoAuth( string $url = '', array $data = array() ): array {
        $config = array(
            'base_uri'    => null,
            'http_errors' => false,
            'verify'      => false,
            'headers'     => array(
                'Accept'        => 'application/json',
                'Content-Type'  => 'application/json'
            )
        );

        $client = new Client( $config );
        $response = $client->get( $url, $data );

        $this->validateStatusCode( $response );

        return $this->getResponseData( $response );
    }

    /**
     * @param string $uri
     * @param array  $data
     * @param boolean $force_bearer_token
     *
     * @return array
     */
    protected function get( string $uri = '', array $data = array(), $force_bearer_token = true ): array {
        $client = $this->createClient( $force_bearer_token );
        $uri = $this->normalizeUri($uri);
        $response = $client->get( $uri, $data );

        $this->validateStatusCode( $response );

        return $this->getResponseData( $response );
    }

    /**
     * @param string $uri
     * @param array  $data
     *
     * @return array
     */
    protected function getAsync( string $uri = '', array $data = array() ): array {
        $client = $this->createClient();
        $uri = $this->normalizeUri( $uri );
        $promises = [];
        $products = [];
        $result = [];

        foreach ( $data as $value ) {
            $promises[] = $client->requestAsync( 'GET', $uri . '&' . $value );
        }

        $responses = Promise\unwrap( $promises );

        foreach ( $responses as $response ) {
            if ( 200 === $response->getStatusCode() ) {
                $products = array_merge( $products, $this->getResponseData( $response )['products']['product'] );
                $result = array_merge( $result, $this->getResponseData( $response ) );
            }
        }

        $result['products']['product'] = $products;

        return $result;
    }

    /**
     * @param string  $uri
     * @param array   $data
     * @param boolean $force_bearer_token
     *
     * @return array
     */
    protected function post( string $uri = '', array $data = array(), $force_bearer_token = true ) {
        if ( $this->config['headers']['Content-Type'] === 'application/json' ) {
            $data = array( GuzzleHttp\RequestOptions::JSON => $data );
        }

        $client = $this->createClient( $force_bearer_token );

        $uri = $this->normalizeUri($uri);

        $response = $client->post( $uri, $data );

        return $this->getResponseData( $response );
    }

    /**
     * @param string $uri
     * @param array  $data
     *
     * @return array
     */
    protected function delete( string $uri = '', array $data = array() ) {
      if ( $this->config['headers']['Content-Type'] === 'application/json' ) {
          $data = array( GuzzleHttp\RequestOptions::JSON => $data );
      }

      $client = $this->createClient();

      $uri = $this->normalizeUri($uri);

      $response = $client->delete( $uri, $data );

      return $this->getResponseData( $response );
    }

    /**
     * @param string $uri
     * @param string $xml
     *
     * @return string
     */
    protected function postXml( string $uri = '', string $xml = '' ) {
        $client = $this->createClient( false, true );
        $response =  $client->post( $uri, array( 'body' => $xml ) );

        return $response->getBody();
    }

    /**
     * @param string  $uri
     * @param array   $data
     * @param boolean $force_bearer_token
     *
     * @return array
     */
    protected function put( string $uri = '', array $data = array(), $force_bearer_token = true ) {
        if ( $this->config['headers']['Content-Type'] === 'application/json' ) {
            $data = array( GuzzleHttp\RequestOptions::JSON => $data );
        }

        $client = $this->createClient( $force_bearer_token );

        $uri = $this->normalizeUri($uri);

        $response = $client->put( $uri, $data );

        return $this->getResponseData( $response );
    }
}
