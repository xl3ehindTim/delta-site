<?php
/**
 * Images batch import tasks.
 *
 * @package Astra Sites
 * @since 4.0.11
 */

if ( ! class_exists( 'Astra_Sites_Batch_Processing_Images' ) ) :

	/**
	 * Astra_Sites_Batch_Processing_Images
	 *
	 * @since 4.0.11
	 */
	class Astra_Sites_Batch_Processing_Images {

		/**
		 * Offset
		 *
		 * @var int
		 */
		private static $offset = 0;

		/**
		 * Chunk Size
		 *
		 * @var int
		 */
		private static $chunk_size = 10;

		/**
		 * Constructor
		 *
		 * @since 4.0.11
		 */
		public function __construct() {}

		/**
		 * Import
		 *
		 * @since 4.0.11
		 * @return void
		 */
		public function import() {

			if ( defined( 'WP_CLI' ) ) {
				WP_CLI::line( 'Processing "Images" Batch Import' );
			}

			self::$offset = get_option( 'st_attachments_offset', self::$chunk_size );

			Astra_Sites_Importer_Log::add( '---- Processing Images ----' );
			self::image_processing();
		}

		/**
		 * Process Images with the metadata.
		 *
		 * @since 4.0.11
		 * @return void
		 */
		public static function image_processing() {
			Astra_Sites_Importer_Log::add( '---- Processing Images Metadata ----' );
			$all_attachments = get_option( 'st_attachments', array() );

			if ( empty( $all_attachments ) ) {
				return;
			}

			$window = array_slice( $all_attachments, self::$offset, self::$chunk_size );

			foreach ( $window as $attachment_id ) {
				$file = get_attached_file( $attachment_id );
				if ( false !== $file ) {
					wp_generate_attachment_metadata( $attachment_id, $file );
				}
			}
			Astra_Sites_Importer_Log::add( '---- Processing Images Metadata Completed ----' );
			update_option( 'st_attachments_offset', self::$offset + self::$chunk_size );
		}
	}

endif;
