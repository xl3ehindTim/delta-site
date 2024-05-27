<?php
/*
Template Name: Projects
*/

get_header();
?>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../wp-content/uploads/static/projects-hero.jpg);">
        <div class="hero-text">
            <h2 style="color: white;">Projects</h2>
        </div>

        <div class="scroll-indicator">
            <div class="mouse-scroll"></div>
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <section class="wrapper mt-5">
        <div class="container">
            <div class="row projects-container">
                <?php
                $query_args = array(
                    'post_type' => 'projects',
                    'posts_per_page' => 9,
                    'post_status' => 'publish',
                    'paged' => 1
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
                                                <h6 class="my-0 text-white d-block" style="font-size:22px;">
                                                    <?php echo get_the_title(); ?></h6>
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
                                            // Shorten description to 700 characters and add ellipsis
                                            $shortDescription = substr(get_field('description'), 0, 700);
                                            if (strlen(get_field('description')) > 700) {
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

<!-- Show project description on phone -->
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function () {
        var cards = document.querySelectorAll('.card');

        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                card.classList.toggle('show-description');
            });
        });
    });

</script>

<!-- Pagination -->
<script type="text/javascript">
    jQuery(document).ready(function ($) {
        function loadProjects(page) {
            $.ajax({
                url: '<?php echo admin_url('admin-ajax.php'); ?>',
                type: 'POST',
                data: {
                    action: 'ajax_projects_pagination',
                    page: page
                },
                success: function (response) {
                    $('.projects-container').html(response);
                    $('.pagination a').removeClass('active');
                    $('.pagination a[data-page="' + page + '"]').addClass('active');
                }
            });
        }

        $(document).on('click', '.pagination a', function (e) {
            e.preventDefault();
            var page = $(this).attr('data-page');
            loadProjects(page);
        });
    });
</script>

<?php wp_reset_postdata(); ?>