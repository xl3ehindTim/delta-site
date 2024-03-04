<?php
/**
 * ZipWP Helper.
 *
 * @package {{package}}
 * @since 4.0.0
 */

/**
 * Importer Helper
 *
 * @since 4.0.0
 */
class Astra_Sites_ZipWP_Helper {

    /**
     * Get Saved Token.
     * 
     * @since 4.0.0
     * @return string
     */
    public static function get_token() {
        $token_details = get_option( 'zip_ai_settings', array( 'auth_token' => '', 'zip_token' => '', 'email' => '' ) );
        return isset( $token_details['zip_token'] ) ? self::decrypt( $token_details['zip_token'] ) : '';
    }

	/**
     * Get Saved ZipWP user email.
     * 
     * @since 4.0.0
     * @return string
     */
    public static function get_zip_user_email() {
        $token_details = get_option( 'zip_ai_settings', array( 'auth_token' => '', 'zip_token' => '', 'email' => '' ) );
        return isset( $token_details['email'] ) ? $token_details['email'] : '';
    }

	 /**
     * Get Saved settings.
     * 
     * @since 4.0.0
     * @return string
     */
    public static function get_setting() {
        return get_option( 'zip_ai_settings', array( 'auth_token' => '', 'zip_token' => '', 'email' => '' ) );
    }

	/**
	 * Encrypt data using base64.
	 *
	 * @param string $input The input string which needs to be encrypted.
	 * @since 4.0.0
	 * @return string The encrypted string.
	 */
	public static function encrypt( $input ) {
		// If the input is empty or not a string, then abandon ship.
		if ( empty( $input ) || ! is_string( $input ) ) {
			return '';
		}

		// Encrypt the input and return it.
		$base_64 = base64_encode( $input ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
		$encode  = rtrim( $base_64, '=' );
		return $encode;
	}

	/**
	 * Decrypt data using base64.
	 *
	 * @param string $input The input string which needs to be decrypted.
	 * @since 4.0.0
	 * @return string The decrypted string.
	 */
	public static function decrypt( $input ) {
		// If the input is empty or not a string, then abandon ship.
		if ( empty( $input ) || ! is_string( $input ) ) {
			return '';
		}

		// Decrypt the input and return it.
		$base_64 = $input . str_repeat( '=', strlen( $input ) % 4 );
		$decode  = base64_decode( $base_64 ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
		return $decode;
	}

	/**
	 * Get Business details.
	 *
	 * @since 4.0.0
	 * @param string $key options name.
	 * @return array<string,string,string,string,string,string,string,int> | string Array for business details or single detail in a string.
	 */
	public static function get_business_details( $key = '' ) {
		$details = get_option(
			'zipwp_user_business_details',
			array(
				'business_name'    => '',
				'business_address' => '',
				'business_phone'   => '',
				'email'   => '',
				'business_category'  => '',
				'business_category_name'  => '',
				'business_category_slug'  => '',
				'business_description' => '',
				'templates' => array(),
				'language' => 'en',
				'images' => array(),
				'image_keyword' => array(),
				'social_profiles' => array()
			)
		);

		$details = array(
			'business_name'    => ( ! empty( $details['business_name'] ) ) ? $details['business_name'] : '',
			'business_address' => ( ! empty( $details['business_address'] ) ) ? $details['business_address'] : '',
			'business_phone'   => ( ! empty( $details['business_phone'] ) ) ? $details['business_phone'] : '',
			'email'   => ( ! empty( $details['email'] ) ) ? $details['email'] : '',
			'business_category'  => ( ! empty( $details['business_category'] ) ) ? $details['business_category'] : '',
			'business_category_name'  => ( ! empty( $details['business_category_name'] ) ) ? $details['business_category_name'] : '',
			'business_category_slug'  => ( ! empty( $details['business_category_slug'] ) ) ? $details['business_category_slug'] : '',
			'business_description' => ( ! empty( $details['business_description'] ) ) ? $details['business_description'] : '',
			'templates' => ( ! empty( $details['templates'] ) ) ? $details['templates'] : array(),
			'language' => ( ! empty( $details['language'] ) ) ? $details['language'] : 'en',
			'images' => ( ! empty( $details['images'] ) ) ? $details['images'] : array(),
			'social_profiles' => ( ! empty( $details['social_profiles'] ) ) ? $details['social_profiles'] : array(),
			'image_keyword' => ( ! empty( $details['image_keyword'] ) ) ? $details['image_keyword'] : array(),
		);

		if ( ! empty( $key ) ) {
			return isset( $details[ $key ] ) ? $details[ $key ] : array();
		}

		return $details;
	}
}
