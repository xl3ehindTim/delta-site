<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Astra
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

$posts = get_posts(
    array(
        'posts_per_page' => 3,
        'post_type' => 'projects'
    )
);

get_header(); ?>
<?php if (astra_page_layout() == 'left-sidebar'): ?>

    <?php get_sidebar(); ?>

<?php endif ?>
<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(wp-content/uploads/2024/04/BvOF-GLOW2023_A-Futures-of-GLOW-01-2560x1707-1.jpg);">
        <div class="hero-text">
            <h2 style="color: white;">Challenge yourself,<br />push boundaries</h2>
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <section id="about-us">
        <div class="container mt-3 mb-3 mt-lg-5 mb-lg-5 pb-3 pb-lg-5">
            <div class="row gx-5 d-flex align-items-center">
                <div class="col-12 col-md-6">
                    <h4 style="color: #E5007D;">About us</h4>
                    <h2 class="mt-1">Delta Excellence Program</h2>

                    <p class="mt-1">
                        Delta at Fontys ICT is a journey for the ambitious. Our students delve into real-world projects,
                        moving
                        beyond traditional education. Our path is one of innovation, personal growth, and excellence,
                        preparing
                        us for future challenges and opportunities.
                    </p>

                    <a href="about">
                        <button>
                            Read more
                            <i class="arrow right"></i>
                        </button>
                    </a>
                </div>

                <div class="col-12 col-md-6 mt-5 mt-lg-0 justify-content-center justify-content-md-end">
                    <img style="max-width: 100%;" src="wp-content/uploads/2024/05/IMG_0741-1.jpg" alt="Team" />
                </div>
            </div>
        </div>
    </section>

    <section id="projects">
        <div class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
            <h4 class="justify-content-center d-flex" style="color: #E5007D;">Portfolio</h4>
            <h2 class="justify-content-center d-flex">Dive into our projects</h2>

            <div class="row mt-4 mt-lg-5">
                <?php foreach ($posts as $post): ?>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                        <a href="<?php the_permalink(); ?>">
                            <div class="card text-dark card-has-bg click-col">
                                <img style="height: 500px; object-fit: cover; filter: brightness(85%);" class="card-img"
                                    src="<?php echo esc_url(get_field('hero_image')['url']) ?>">
                                <div class="card-img-overlay d-flex flex-column">
                                    <div class="card-body">
                                        <!-- Necessary to make the other content go to the bottom -->
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
                                                <span class="button-text">Read more</span>
                                                <span class="diagonal-arrow"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>

                    </div>
                <?php endforeach; ?>
            </div>

            <div class="justify-content-center d-flex mt-1 mb-3 mb-lg-5">
                <a href="projects">
                    <button>
                        Explore portfolio
                        <i class="arrow right"></i>
                    </button>
                </a>
            </div>
        </div>
    </section>

    <div class="mt-5 pb-5"></div>

    <div class="workplace"
        style="width: 100%; position: absolute; left: 0%; height: 100vh; background-size: cover; background-repeat: no-repeat; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(wp-content/uploads/2024/05/strijp-tq-fontys.jpg);">
        <div class="hero-text">
            <h2 style="color: white;">Our workplace</h2>
            <p class="mt-3 mb-3">Are you interested in the Delta program, or perhaps you want to know more about it?
                Come visit us
                at Achtseweg Zuid
                151C 5651 GW Eindhoven on TQ4.2</p>

            <a class="mt-5" target="_blank" href="https://portal.fhict.nl/Studentenplein/SitePages/Delta.aspx">
                <button class="button-white">
                    More for students
                    <i class="arrow right"></i>
                </button>
            </a>
        </div>
    </div>

    <div class="placeholder"></div>
</div>
</div><!-- #primary -->

<?php
get_footer();
?>

<script>
    const { clientHeight } = document.getElementsByClassName('workplace')[0]
    const el = document.getElementsByClassName('placeholder')[0]
    el.setAttribute('style', `height: ${clientHeight}px`);
</script>