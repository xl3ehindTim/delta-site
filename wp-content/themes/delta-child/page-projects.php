<?php
/*
Template Name: Projects
*/

get_header();
?>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image"
         style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost/delta-site/wp-content/uploads/2024/04/BvOF-GLOW2023_A-Futures-of-GLOW-01-2560x1707-1.jpg);">
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
            <div class="row projects-container">
                <?php
                $query_args = array(
                    'post_type' => 'projects',
                    'posts_per_page' => 3,
                    'paged' => 1
                );

                $projects_query = new WP_Query($query_args);

                if ($projects_query->have_posts()):
                    while ($projects_query->have_posts()): $projects_query->the_post(); ?>
                        <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                            <a href="<?php the_permalink(); ?>">
                                <div class="card text-dark card-has-bg click-col">
                                    <img style="height: 550px; object-fit: cover;"
                                         class="card-img"
                                         src="<?php echo esc_url(get_field('hero_image')['url']) ?>">
                                    <div class="card-img-overlay d-flex flex-column">
                                        <div class="card-body">
                                            <!-- Needed to make the other content go to the bottom -->
                                        </div>
                                        <div id="card-footer" class="justify-content-between" style="display: flex;">
                                            <div class="card-footer-text">
                                                <h6 class="my-0 text-white d-block"><?php echo get_the_title(); ?></h6>
                                                <small class="text-white">
                                                    <?php echo get_field('subtitle') ?>
                                                </small>
                                            </div>
                                            <div class="card-footer-placeholder"></div>
                                            <div class="card-button">
                                                <span class="card-button-text">Read more</span>
                                                <span class="diagonal-arrow"></span>
                                            </div>
                                        </div>
                                        <div class="card-description">
                                            <?php echo get_field('description') ?>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    <?php endwhile;
                else: ?>
                    <p>No projects found.</p>
                <?php endif; ?>
            </div>

            <div class="pagination">
                <?php
                $total_pages = $projects_query->max_num_pages;
                if ($total_pages > 1):
                    for ($i = 1; $i <= $total_pages; $i++): ?>
                        <a href="#" class="page-numbers <?php echo $i == 1 ? 'active' : ''; ?>"
                           data-page="<?php echo $i; ?>"><?php echo $i; ?></a>
                    <?php endfor;
                endif;
                ?>
            </div>
        </div>
    </section>
</div>

<?php get_footer(); ?>

<?php wp_reset_postdata(); ?>
