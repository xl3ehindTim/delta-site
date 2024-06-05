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
define('CHILD_THEME_DELTA_VERSION', '1.0.0');

/**
 * Enqueue styles
 */
function child_enqueue_styles()
{

    wp_enqueue_style('delta-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_DELTA_VERSION, 'all');

    // Bootstrap
    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css', array(), '5.2.3');

    // Swiperjs
    wp_enqueue_style('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', array(), '11');
    wp_enqueue_script('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', array(), '11');

    wp_enqueue_script('jquery');

}

add_action('wp_enqueue_scripts', 'child_enqueue_styles', 15);


// Pagination

function ajax_projects_pagination()
{
    $paged = isset($_POST['page']) ? $_POST['page'] : 1;

    $query_args = array(
        'post_type' => 'projects',
        'posts_per_page' => 9,
        'post_status' => 'publish',
        'paged' => $paged
    );

    $projects_query = new WP_Query($query_args);

    if ($projects_query->have_posts()):
        while ($projects_query->have_posts()):
            $projects_query->the_post(); ?>
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <a href="<?php the_permalink(); ?>">
                    <div class="card text-dark card-has-bg click-col">
                        <img style="height: 550px; object-fit: cover;" class="card-img"
                            src="<?php echo esc_url(get_field('hero_image')['url']) ?>">
                        <div class="card-img-overlay d-flex flex-column">
                            <div id="card-footer" class="justify-content-between" style="display: flex;">
                                <div class="card-footer-text">
                                    <h6 class="my-0 text-white d-block" style="font-size:22px;"><?php echo get_the_title(); ?></h6>
                                    <p class="text-white" style="font-size:16px;">
                                        <?php echo get_field('subtitle') ?>
                                    </p>
                                </div>
                                <!-- <a href="<?php the_permalink(); ?>"> -->
                                <div class="card-footer-placeholder"></div>
                                <div class="card-button">
                                    <span class="card-button-text">
                                        <h6>Read more</h6>
                                    </span>
                                    <span class="diagonal-arrow"></span>
                                </div>
                                <!-- </a> -->
                            </div>
                            <div class="card-description">
                                <?php
                                $shortDescription = substr(getFirstParagraph(get_field('description')), 0, 350);
                                if (strlen(getFirstParagraph(get_field('description'))) > 350) {
                                    $shortDescription .= "...";
                                }
                                echo $shortDescription;
                                ?>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        <?php endwhile;
    else: ?>
        <p>No projects found.</p>
    <?php endif;

    wp_reset_postdata();

    die();
}
add_action('wp_ajax_nopriv_ajax_projects_pagination', 'ajax_projects_pagination');
add_action('wp_ajax_ajax_projects_pagination', 'ajax_projects_pagination');
// end

function getFirstParagraph($text)
{
    // Use a regular expression to split the text into paragraphs
    $paragraphs = preg_split('/\r\n|\r|\n/', $text);

    // Remove empty paragraphs that may have been caused by extra line breaks
    $paragraphs = array_filter($paragraphs, function ($para) {
        return trim($para) !== '';
    });

    // Get the first non-empty paragraph
    $firstParagraph = reset($paragraphs);

    // Return the first paragraph trimmed of any extra whitespace
    return trim($firstParagraph);
}
add_action('getFirstParagraph', 'getFirstParagraph');

function get_attachment_url_by_slug($slug)
{
    $args = array(
        'post_type' => 'attachment',
        'name' => sanitize_title($slug),
        'posts_per_page' => 1,
        'post_status' => 'inherit',
    );
    $_header = get_posts($args);
    $header = $_header ? array_pop($_header) : null;
    return $header ? wp_get_attachment_url($header->ID) : '';
}