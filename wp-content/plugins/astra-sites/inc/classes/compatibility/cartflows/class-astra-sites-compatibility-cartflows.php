<?php
/**
 * Astra Sites Compatibility for 'Cartflows'
 *
 * @package Astra Sites
 * @since 3.4.6
 */

namespace AstraSites\Cartflows;

defined( 'ABSPATH' ) || exit;



if ( ! class_exists( 'Astra_Sites_Compatibility_Cartflows' ) ) :

	/**
	 * Cartflows Compatibility
	 *
	 * @since 3.4.6
	 */
	class Astra_Sites_Compatibility_Cartflows {

		/**
		 * Instance
		 *
		 * @access private
		 * @var object Class object.
		 * @since 3.4.6
		 */
		private static $instance;

		/**
		 * Initiator
		 *
		 * @since 3.4.6
		 * @return object initialized object of class.
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
		 * @since 3.4.6
		 */
		public function __construct() {
			add_action( 'astra_sites_after_plugin_activation', array( $this, 'disable_cartflows_redirect' ) );
		}

		/**
		 * Disable Cartflows redirect.
		 *
		 * @return void.
		 */
		public function disable_cartflows_redirect() {
			update_option( 'wcf_setup_skipped', true );
			delete_option( 'wcf_start_onboarding' );
		}
	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	Astra_Sites_Compatibility_Cartflows::get_instance();

endif;
