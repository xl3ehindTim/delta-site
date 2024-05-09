<?php
/**
 * The template for displaying all single projects.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Astra
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

get_header(); ?>

<?php
$project_id = get_the_ID();
$heroImage = get_field('hero_image');
$technicalDescription = get_field('technical_description');
$website = get_field('website');
$logo = get_field('logo');
$students = get_field('students', $project_id);
$images = get_field('images', $project_id);
$test = null;
?>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</head>

<div id="primary" <?php astra_primary_class(); ?>>
    <!-- Hero -->
    <div class="hero-image"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(<?php echo esc_url($heroImage['url']) ?>);">
        <div class="hero-text">
            <h1 style="color: white;"><?php echo get_field('title') ?></h1>
        </div>
        <!-- <div class="arrow-down">
            <p style="margin-bottom: -5px; font-weight: 600;">Explore project</p>
            <i class="arrow down"></i>
        </div> -->
    </div>


    <div style="height: 100vh;"></div>

    <!-- Project info -->
    <section id="project-information">
        <div class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
            <div class="row gx-5">
                <div class="col-12 col-md-7">
                    <h2 class="mb-3">
                        <?php echo get_field('subtitle') ?>
                    </h2>

                    <?php echo get_field('description') ?>

                    <?php if ($website):
                        ?>
                        <a href="<?php echo $website ?>" target="_blank" style="text-decoration: none;">
                            <button>
                                View Website
                                <i class="arrow right"></i>
                            </button>
                        </a>
                    <?php endif; ?>
                </div>

                <?php if ($logo): ?>
                    <div class="col-12 col-md-5 d-flex align-items-center mt-5 mt-lg-0">
                        <img src="<?php echo esc_url($logo['url']) ?>"></img>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Images -->
    <?php if ($images):
        ?>
        <section id="images">
            <div class="container">
                <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%; height: 500px;">
                    <div class="swiper-images" style="height: 500px;">
                        <div class="swiper-wrapper" style="cursor: move;">
                            <?php foreach ($images as $image_id):
                                $url = get_permalink($image_id);
                                ?>
                                <div class="swiper-slide" style="height: 500px; width: auto;">
                                    <img src="<?php echo $url ?>"></img>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="swiper-pagination swiper-images-pagination"
                        style="position: absolute; margin-bottom: -5vh;">
                    </div>
                </div>
            </div>
        </section>

        <div style="height: 600px;"></div>
    <?php endif; ?>

    <!-- Technical description -->
    <?php if ($technicalDescription): ?>
        <section id="technical" class="mt-3 mb-3 mt-lg-5 mb-lg-5">
            <div class="container">
                <h3 class="mb-2">
                    Going in depth
                </h3>

                <?php echo $technicalDescription ?>
            </div>
        </section>
    <?php endif; ?>

    <!-- Team -->
    <?php if ($students):
        ?>
        <section id="team">
            <div class="container">
                <div class="d-flex justify-content-center mt-5">
                    <h3>Meet the team!</h3>
                </div>
                <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%; height: 225px;">
                    <div class="swiper-team" style="height: 225px;">
                        <div class="swiper-wrapper">
                            <?php foreach ($students as $student_id):
                                $photo = get_field('photo', $student_id);
                                $student_name = get_the_title($student_id);
                                ?>
                                <div class="student-slide swiper-slide" style="height: 225px; width: auto;">
                                    <img src="<?php echo esc_url($photo['url']) ?>"></img>
                                    <span class="student-name"><?php echo $student_name; ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="swiper-pagination swiper-team-pagination d-flex justify-content-center"
                        style="position: absolute; margin-bottom: -5vh;">
                    </div>
                </div>
            </div>
        </section>

        <div style="height: 300px;"></div>
    <?php endif; ?>

    <!-- Previous and next -->
    <div class="d-flex justify-content-between mt-5">
        <div>
            <?php echo previous_post_link('%link', '<button><i class="arrow left"></i>' . get_the_title(get_previous_post()) . '</button>'); ?>
        </div>
        <div>
            <?php echo next_post_link('%link', '<button>' . get_the_title(get_next_post()) . '<i class="arrow right"></i></button>'); ?>
        </div>
    </div>
</div>

<?php get_footer() ?>

<script>
    var imageSwiper = new Swiper(".swiper-images", {
        paginationClickable: true,
        // Default settings
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-images-pagination",
            clickable: true,
        },
        // Breakpoints for responsiveness
        breakpoints: {
            // width => 320px 
            320: {
                slidesPerView: 'auto',
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            },
            // width => 999px 
            999: {
                spaceBetweenSlides: 50,
                slidesOffsetBefore: 100,
                slidesOffsetAfter: 100,
            }
        }
    });

    var teamSwiper = new Swiper(".swiper-team", {
        slidesPerView: 6, // 6
        // watchOverflow: true,
        paginationClickable: true,
        // centeredSlides: true,
        spaceBetween: 20,
        slidesOffsetBefore: 100,
        slidesOffsetAfter: 100,
        pagination: {
            el: ".swiper-team-pagination",
            clickable: true,
        },
    });

    // teamSwiper.on('resize', function (instance) {
    //     document.getElementsByClassName('swiper-team')[0].classList.toggle('slider-active', instance.virtualSize < instance.size);
    // });
</script>