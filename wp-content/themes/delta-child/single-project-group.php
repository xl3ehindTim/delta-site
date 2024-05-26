<?php
/**
 * The template for displaying all single project groups.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Astra
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Get projects linked to project group
$projects = new WP_Query(
    array(
        'post_type' => 'projects',
        'posts_per_page' => 1,
        'meta_query' => array(
            array(
                'key' => 'project_groups',
                'value' => get_the_ID(),
                'compare' => 'LIKE',
            ),
        ),
    )
);

$permaLink = get_permalink($projects->posts[0]->ID);
$heroImage = get_field('hero_image', $projects->posts[0]->ID);

get_header(); ?>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(<?php echo esc_url($heroImage['url']) ?>);">
        <div class="hero-text">
            <h1 style="color: white;"><?php echo get_the_title(); ?></h1>
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <section class="wrapper">
        <div class="container">
            <h2>
                Projectgroup students
            </h2>
        </div>
    </section>

    <?php
    include_team_section();
    ?>

    <section class="wrapper">
        <div class="container">
            <a href="<?php echo $permaLink ?>">
                <button class="mt-5">
                    View project
                    <i class="arrow right"></i>
                </button>
            </a>
        </div>
    </section>
</div>

<?php
get_footer();
?>

<?php
function include_team_section()
{
    $students = get_field('students');
    if (!$students)
        return;
    ?>
    <section id="team">
        <div class="container">
            <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%; height: 225px;">
                <div class="swiper-container" style="height: 225px;">
                    <div class="swiper-wrapper">
                        <!-- Dynamic Content -->
                        <?php foreach ($students as $student):
                            $name = get_the_title($student->ID);
                            $photo = get_field('photo', $student->ID);
                            ?>
                            <div class="student-slide swiper-slide" style="height: 225px; width: auto;">
                                <img src=<?php echo esc_url($photo['url']); ?>>
                                <span class="student-name">
                                    <?php echo $name ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <div class="swiper-pagination swiper-container-pagination" style="position: absolute; margin-bottom: -5vh;">
                </div>
            </div>
        </div>
    </section>

    <div style="height: 300px;"></div>
    <?php
}
?>

<script>
    swiper = new Swiper('.swiper-container', {
        slidesPerView: 6,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-container-pagination",
            clickable: true,
        },
        breakpoints: {
            // width => 320px 
            320: {
                slidesPerView: 2,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            // width => 999px 
            999: {
                slidesOffsetBefore: 100,
                slidesOffsetAfter: 100,
            }
        }
    })
</script>