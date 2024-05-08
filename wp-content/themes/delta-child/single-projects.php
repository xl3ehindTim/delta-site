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
?>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</head>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(<?php echo esc_url($heroImage['url']) ?>);">
        <div class="hero-text">
            <h1 style="color: white;"><?php echo get_field('title') ?></h1>
        </div>
        <div class="arrow-down">
            <!-- TODO arrow down -->
        </div>
    </div>


    <div style="height: 100vh;"></div>

    <section id="project-information">
        <div class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
            <div class="row gx-5">
                <div class="col-12 col-md-7">
                    <h2 class="mb-3">
                        <?php echo get_field('subtitle') ?>
                    </h2>

                    <p>
                        <?php echo get_field('description') ?>
                    </p>

                    <?php if ($website):
                        ?>
                        <a href="<?php echo $website ?>" target="_blank">
                            <button>
                                View Website
                            </button>
                        </a>
                    <?php endif; ?>
                </div>

                <div class="col-12 col-md-5 d-flex align-items-center mt-5 mt-lg-0">
                    <img src="<?php echo esc_url($logo['url']) ?>"></img>
                </div>
            </div>
        </div>
    </section>

    <?php if ($images):
                        ?>
    <section id="images">
        <div class="container">
            <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 5%; height: 500px;">
                <div class="swiper" style="height: 500px; cursor: grab;">
                    <div class="swiper-wrapper">
                        <?php foreach ($images as $image_id):
                            $url = get_permalink($image_id);
                            ?>
                            <div class="swiper-slide" style="height: 500px; width: auto;">
                                <img src="<?php echo $url ?>"></img>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <div class="swiper-pagination" style="position: absolute; left: -5%; margin-bottom: -5vh;">
                </div>
            </div>
        </div>
    </section>

    <div style="height: 600px;"></div>
    <?php endif; ?>

    <section id="technical" class="mt-5  mb-5">
        <div class="container">
            <h3 class="mb-2">
                Going in depth
            </h3>

            <p>
                <?php echo $technicalDescription ?>
            </p>
        </div>
    </section>

    <section id="team" class="mt-5">
        <div class="container">
            <div class="d-flex justify-content-center mt-5">
                <h3>Meet the team!</h3>
            </div>

            <?php foreach ($students as $student_id):
                $student = get_post($student_id);
                $student_name = get_the_title($student_id);
                ?>
                <div>
                    <?php echo $student_name ?>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

</div>

<script>
    var swiper = new Swiper(".swiper", {
        slidesPerView: "auto",
        paginationClickable: true,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
</script>