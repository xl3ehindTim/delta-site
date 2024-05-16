<?php
/**
 * Delta Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Delta
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_DELTA_VERSION', '1.0.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {

	wp_enqueue_style( 'delta-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_DELTA_VERSION, 'all' );

	// Bootstrap
	wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css', array(), '5.2.3' );

	// Swiperjs
	wp_enqueue_style( 'swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', array(), '11' ); 
	wp_enqueue_script( 'swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', array(), '11' ); 

}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );


// Pagination

function enqueue_custom_scripts() {
    wp_enqueue_script('custom-pagination', get_template_directory_uri() . '/js/custom-pagination.js', array('jquery'), null, true);

    wp_localize_script('custom-pagination', 'ajaxpagination', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');


function ajax_projects_pagination() {
    $paged = isset($_POST['page']) ? $_POST['page'] : 1;
    
    $query_args = array(
        'post_type' => 'projects',
        'posts_per_page' => 3,
        'paged' => $paged
    );

    $projects_query = new WP_Query($query_args);

    if ($projects_query->have_posts()) :
        while ($projects_query->have_posts()) : $projects_query->the_post(); ?>
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <a href="<?php the_permalink(); ?>">
                    <div class="card text-dark card-has-bg click-col">
                        <img style="height: 550px; object-fit: cover; filter: brightness(85%);" class="card-img"
                             src="<?php echo esc_url(get_field('hero_image')['url']) ?>">
                        <div class="card-img-overlay d-flex flex-column">
                            <div class="card-body">
                                <!-- Needed to make the other content go to the bottom -->
                            </div>
                            <div id="card-footer" class="justify-content-between" style="display: flex;">
                                <div>
                                    <h6 class="my-0 text-white d-block"><?php echo get_the_title(); ?></h6>
                                    <small class="text-white">
                                        <?php echo get_field('subtitle') ?>
                                    </small>
                                </div>
                                <div class="d-flex align-items-end">
                                    <button class="project-card-button">
                                        <div class="button-text">Read more</div>
                                        <div class="arrow-container">
                                            <div class="arrow-container">
                                                <span class="diagonal-arrow" ></span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        <?php endwhile;
    endif;

    wp_reset_postdata();

    die();
}
add_action('wp_ajax_nopriv_ajax_projects_pagination', 'ajax_projects_pagination');
add_action('wp_ajax_ajax_projects_pagination', 'ajax_projects_pagination');
// end