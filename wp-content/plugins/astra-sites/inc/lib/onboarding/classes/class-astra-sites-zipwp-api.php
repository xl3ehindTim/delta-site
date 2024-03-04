<?php


class Astra_Sites_ZipWP_Api {

    /**
     * Member Variable
     *
     * @var instance
     */
    private static $instance;

    /**
     * Initiator
     *
     * @since 4.0.0
     */
    public static function get_instance() {
        if ( ! isset( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     *
     * @since 4.0.0
     */
    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_route' ) );
    }

	/**
	 * Get api domain
	 *
	 * @since 4.0.0
	 * @return string
	 */
	public function get_api_domain() {
		return (defined('ZIPWP_API') ? ZIPWP_API : 'https://api.zipwp.com/api/');
	}

    /**
     * Get api namespace
     *
     * @since 4.0.0
     * @return string
     */
    public function get_api_namespace() {
        return 'zipwp/v1';
    }

	/**
	 * Get API headers
	 *
	 * @since 4.0.0
	 * @return array
	 */
	public function get_api_headers() {
		return array(
			'Content-Type' => 'application/json',
			'Accept' => 'application/json',
			'Authorization' => 'Bearer ' . Astra_Sites_ZipWP_Helper::get_token(),
		);
	}

    /**
	 * Check whether a given request has permission to read notes.
	 *
	 * @param  object $request WP_REST_Request Full details about the request.
	 * @return object|boolean
	 */
	public function get_item_permissions_check( $request ) {

		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error(
				'gt_rest_cannot_access',
				__( 'Sorry, you are not allowed to do that.', 'astra-sites' ),
				array( 'status' => rest_authorization_required_code() )
			);
		}
		return true;
	}

    /**
     * Register route
     *
     * @since 4.0.0
     * @return void
     */
    public function register_route() {
        $namespace = $this->get_api_namespace();

        register_rest_route(
			$namespace,
			'/description/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_description' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args' => array(
						'business_name' => array(
							'type'     => 'string',
							'required' => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_description' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'category' => array(
							'type'     => 'string',
							'sanitize_callback' => 'sanitize_text_field',
							'required' => false,
						),
					),
				),
			)
		);

        register_rest_route(
			$namespace,
			'/images/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_images' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args' => array(
						'keywords' => array(
							'type'     => 'array',
							'required' => true,
						),
						'per_page' => array(
							'type'     => 'string',
							'required' => false,
						),
						'page' => array(
							'type'     => 'string',
							'required' => false,
						),
						'orientation' => array(
							'type'     => 'string',
							'sanitize_callback' => 'sanitize_text_field',
							'required' => false,
						),
						'engine' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
				),
			)
		);

        register_rest_route(
			$namespace,
			'/keywords/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_keywords' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args' => array(
						'business_name' => array(
							'type'     => 'string',
							'required' => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_description' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'category' => array(
							'type'     => 'string',
							'sanitize_callback' => 'sanitize_text_field',
							'required' => false,
						),
					),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/template-keywords/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_template_keywords' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args' => array(
						'business_name' => array(
							'type'     => 'string',
							'required' => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_description' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_category_name' => array(
							'type'     => 'string',
							'sanitize_callback' => 'sanitize_text_field',
							'required' => false,
						),
					),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/categories/',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_categories' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/import-status/',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_import_status' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/migration-status/',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_migration_status' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/templates/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_templates' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args' => array(
						'business_name' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'keyword' => array(
							'type'     => 'string',
							'sanitize_callback' => 'sanitize_text_field',
							'required' => false,
						),
					),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/user-details/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'save_user_details' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args' => array(
						'business_description' => array(
							'type'     => 'string',
							'required' => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_name' => array(
							'type'     => 'string',
							'required' => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_addeess' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_phone' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'business_email' => array(
							'type'     => 'string',
							'required' => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'social_profiles' => array(
							'type'     => 'array',
							'required' => false,
						),
						'business_category' => array(
							'type'     => 'string',
							'sanitize_callback' => 'sanitize_text_field',
							'required' => true,
						),
						'business_category_name' => array(
							'type'     => 'string',
							'sanitize_callback' => 'sanitize_text_field',
							'required' => true,
						),
						'keywords' => array(
							'type'     => 'array',
							'required' => true,
						),
						'images' => array(
							'type'     => 'array',
							'required' => true,
						),
					),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/site/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'create_site' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args' => array(
						'template' => array(
							'type'     => 'string',
							'required' => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/site-features/',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_site_features' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				),
			)
		);
    }

	/**
	 * Get ZipWP Features list.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_site_features( $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . '/sites/features/';
		$request_args = array(
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_get( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data ) {
				wp_send_json_success(
					array(
						'data' => $response_data['data'],
						'status'  => true,
					)
				);
			}
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response_data,
					'status'  => false,

				)
			);
		}
		wp_send_json_error(
			array(
				'data' => 'Failed ' . $response_body,
				'status'  => false,

			)
		);
	}

	/**
	 * Create site.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function create_site( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . '/sites/';

		// $business_details = Astra_Sites_ZipWP_Helper::get_business_details();

		$post_data = array(
			'template' => isset($request['template']) ? sanitize_text_field($request['template']) : '',
			'business_email' => isset($request['business_email']) ? $request['business_email'] : '',
			'email' => Astra_Sites_ZipWP_Helper::get_zip_user_email(),
			'business_desc' => isset($request['business_description']) ? $request['business_description'] : '',
			'business_name' => isset($request['business_name']) ? $request['business_name'] : '',
			'title' => isset($request['business_name']) ? $request['business_name'] : '',
			'business_phone' => isset($request['business_phone']) ? $request['business_phone'] : '',
			'business_address' => isset($request['business_address']) ? $request['business_address'] : '',
			'business_category' => isset($request['business_category']) ? $request['business_category'] : '',
			'business_category_name' => isset($request['business_category_name']) ? $request['business_category_name'] : '',
			'image_keyword' => isset($request['image_keyword']) ? $request['image_keyword'] : '',
			'social_profiles' => isset($request['social_profiles']) ? $request['social_profiles'] : [],
			'images' => isset($request['images']) ? $request['images'] : '',
			'language' => 'en',
			'site_type' => 'ai',
			'site_source' => 'starter-templates',
			'site_config' => [
				'clickjackingProtection' => false,
			],
			'site_features' => isset($request['site_features']) ? $request['site_features'] : [],
		);

		$request_args = array(
			'body' => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 1000,
		);
		$response = wp_remote_post( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,
				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 201 === $response_code || 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data ) {
				update_option( 'zipwp_import_site_details', $response_data['site'] );
				wp_send_json_success(
					array(
						'data' => $response_data['site'],
						'status'  => true,
					)
				);
			} else {
				wp_send_json_error(
					array(
						'data' => 'Failed ' . $response_data,
						'status'  => false,

					)
				);
			}
		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed - ' . $response_body,
					'status'  => false,

				)
			);
		}

	}

	/**
	 * Save user details.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function save_user_details( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}
		$email = Astra_Sites_ZipWP_Helper::get_zip_user_email();

		$api_endpoint = $this->get_api_domain() . '/sites/generate-user-cache/';

		$business_details = array(
			'business_description' => isset( $request['business_description'] ) ? sanitize_text_field( $request['business_description'] ) : '',
			'business_name' => isset( $request['business_name'] ) ? sanitize_text_field( $request['business_name'] ) : '',
			'business_email' => isset( $request['business_email'] ) ? sanitize_text_field( $request['business_email'] ) : '',
			'business_address' => isset( $request['business_address'] ) ? sanitize_text_field( $request['business_address'] ) : '',
			'business_phone' => isset( $request['business_phone'] ) ? sanitize_text_field( $request['business_phone'] ) : '',
			'category' => isset($request['business_category']) ? sanitize_text_field($request['business_category']) : '',
			'category_name' => isset($request['business_category_name']) ? sanitize_text_field($request['business_category_name']) : '',
			'category_slug' => isset($request['business_category_slug']) ? sanitize_text_field($request['business_category_slug']) : '',
			'image_keyword' => isset( $request['keywords'] ) ? $request['keywords'] : [],
			'images' => isset( $request['images'] ) ? $request['images'] : [],
			'social_profiles' => isset( $request['social_profiles'] ) ? $request['social_profiles'] : [],
			'language' => 'en',
			'templates' => get_option( 'zipwp_selection_templates', array() ),
		);

		update_option(
			'zipwp_user_business_details',
			$business_details
		);

		$post_data = array_merge( $business_details, [ 'email' => $email, ] );

		$request_args = array(
			'body' => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_post( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			wp_send_json_success(
				array(
					'data' => $response_data,
					'status'  => true,
				)
			);

		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed - ' . $response_body,
					'status'  => false,

				)
			);
		}
	}

    /**
	 * Get AI based description.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_description( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . '/sites/suggest-description/';

		$post_data = array(
			'business_name' => isset( $request['business_name'] ) ? sanitize_text_field( $request['business_name'] ) : '',
			'business_desc' => isset( $request['business_description'] ) ? sanitize_text_field( $request['business_description'] ) : '',
			'business_category' => isset($request['category']) ? sanitize_text_field($request['category']) : '',
		);

		$request_args = array(
			'body' => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_post( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data['description'] ) {
				wp_send_json_success(
					array(
						'data' => $response_data['description'],
						'status'  => true,
					)
				);
			} else {
				wp_send_json_error(
					array(
						'data' => 'Failed ' . $response_data,
						'status'  => false,

					)
				);
			}
		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed',
					'status'  => false,

				)
			);
		}
	}

    /**
	 * Get Images.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_images( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . '/images/';

		$post_data = array(
			'keywords' => isset( $request['keywords'] ) ? $request['keywords'] : '',
			'per_page' => isset( $request['per_page'] ) ? $request['per_page'] : 20,
			'page' => isset( $request['page'] ) ? $request['page'] : 1,
			'orientation' => isset( $request['orientation'] ) ? sanitize_text_field( $request['orientation'] ) : '',
			'engine' => isset( $request['engine'] ) ? sanitize_text_field( $request['engine'] ) : '',
		);

		$request_args = array(
			'body' => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_post( $api_endpoint, $request_args );



		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			wp_send_json_success(
				array(
					'data' => $response_data['images'],
					'status'  => true,
				)
			);

		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed',
					'status'  => false,

				)
			);
		}
	}

    /**
	 * Get Keywords for image search.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_keywords( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . '/images/keyword/';

		$post_data = array(
			'business_desc' => isset( $request['business_description'] ) ? sanitize_text_field( $request['business_description'] ) : '',
		);

		$request_args = array(
			'body' => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_post( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data ) {
				wp_send_json_success(
					array(
						'data' => $response_data['keywords'],
						'status'  => true,
					)
				);
			} else {
				wp_send_json_error(
					array(
						'data' => 'Failed ' . $response_data,
						'status'  => false,

					)
				);
			}
		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed',
					'status'  => false,

				)
			);
		}
	}

	/**
	 * Get Template Keywords for image search.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_template_keywords( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . '/templates-keywords/';

		$post_data = array(
			'business_desc' => isset( $request['business_description'] ) ? sanitize_text_field( $request['business_description'] ) : '',
			'business_cat' => isset($request['business_category']) ? sanitize_text_field($request['business_category']) : '',
			'business_category_name' => isset($request['business_category_name']) ? sanitize_text_field($request['business_category_name']) : '',
			'business_name' => isset( $request['business_name'] ) ? sanitize_text_field( $request['business_name'] ) : '',
			'language' => 'en'
		);

		$request_args = array(
			'body' => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_post( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data ) {
				wp_send_json_success(
					array(
						'data' => $response_data['keywords'],
						'status'  => true,
					)
				);
			} else {
				wp_send_json_error(
					array(
						'data' => 'Failed ' . $response_data,
						'status'  => false,

					)
				);
			}
		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed',
					'status'  => false,

				)
			);
		}
	}

	/**
	 * Get Keywords for image search.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_templates( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$keyword = isset( $request['keyword'] ) ? sanitize_text_field( $request['keyword'] ) : 'multipurpose';

		$api_endpoint = $this->get_api_domain() . '/templates-search?query=' . $keyword;

		$post_data = array(
			'business_name' => isset( $request['business_name'] ) ? sanitize_text_field( $request['business_name'] ) : '',
			'email' => Astra_Sites_ZipWP_Helper::get_zip_user_email(),
		);

		$request_args = array(
			'body' => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_post( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data ) {
				update_option( 'zipwp_selection_templates', $response_data );
				wp_send_json_success(
					array(
						'data' => $response_data,
						'status'  => true,
					)
				);
			} else {
				wp_send_json_error(
					array(
						'data' => 'Failed ' . $response_data,
						'status'  => false,

					)
				);
			}
		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed',
					'status'  => false,

				)
			);
		}
	}

	/**
	 * Get Categories.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_categories( $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . '/all-parent-categories/';
		$request_args = array(
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_get( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,

				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data ) {
				wp_send_json_success(
					array(
						'data' => $response_data['categories'],
						'status'  => true,
					)
				);
			} else {
				wp_send_json_error(
					array(
						'data' => 'Failed ' . $response_data,
						'status'  => false,

					)
				);
			}
		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed',
					'status'  => false,

				)
			);
		}
	}

	/**
	 * Get Import Status.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_import_status( $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}

		$site = get_option( 'zipwp_import_site_details', array() );
		$api_endpoint = $this->get_api_domain() . '/sites/import-status/' . $site['uuid'] . '/';
		$request_args = array(
			'headers' => $this->get_api_headers(),
			'timeout' => 100,
		);
		$response = wp_remote_get( $api_endpoint, $request_args );

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response->get_error_message(),
					'status'  => false,
				)
			);
		}
		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		if ( 200 === $response_code ) {
			$response_data = json_decode( $response_body, true );
			if ( $response_data ) {
				wp_send_json_success(
					array(
						'data' => $response_data,
						'status'  => true,
					)
				);
			} else {
				wp_send_json_error(
					array(
						'data' => 'Failed ' . $response_data,
						'status'  => false,
					)
				);
			}
		} else {
			wp_send_json_error(
				array(
					'data' => 'Failed ' . $response_code,
					'status'  => false,
				)
			);
		}
	}

	/**
	 * Get Migration Status.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return mixed
	 */
	public function get_migration_status( $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data' => __( 'Nonce verification failed.', 'astra-sites' ),
					'status'  => false,

				)
			);
		}
		wp_send_json_success(
			array(
				'data' => get_option( 'astra_sites_batch_process_complete', 'no' ),
				'status'  => true,
			)
		);
	}

}

Astra_Sites_ZipWP_Api::get_instance();
