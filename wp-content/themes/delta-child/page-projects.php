<?php
/*
Template Name: Projects
*/

$posts = get_posts(
    array(
        'posts_per_page' => 7,
        'post_type' => 'projects'
    )
);
?>

<?php get_header(); ?>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost/delta-site/wp-content/uploads/2024/03/VC-Glow-03.jpeg);">
        <div class="hero-text">
            <h2 style="color: white;">Projects</h2>
        </div>
        <div class="arrow-down">
            <!-- TODO arrow down -->
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <section class="wrapper mt-5">
        <div class="container">
            <div class="row">
                <?php foreach ($posts as $post): ?>
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
        </div>
    </section>
</div>

<?php get_footer(); ?>
