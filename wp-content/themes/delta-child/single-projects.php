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
$images = get_field('images', $project_id);
$projectGroups = get_field('project_groups');
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
                    <div
                        class="col-12 col-md-5 d-flex align-items-center mt-5 mt-lg-0  justify-content-center justify-content-md-end">
                        <img style="max-width: 300px;" src="<?php echo esc_url($logo['url']) ?>"></img>
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
    <?php if ($projectGroups): ?>
        <section id="team">
            <div class="container">
                <div class="d-flex justify-content-center mt-5">
                    <h3>Meet the team!</h3>
                </div>

                <?php if (count($projectGroups) > 1): ?>
                    <div class="d-flex flex-row justify-content-center">
                        <?php foreach ($projectGroups as $projectGroup):
                            $projectGroupId = $projectGroup->ID;
                            $publishedAt = new DateTime(get_post_field('post_date', $projectGroupId));
                            $publishedYear = $publishedAt->format('Y');
                            $publishedMonth = $publishedAt->format('m');

                            // Determine semester based on published month
                            $semester = ($publishedMonth <= 6) ? 'Spring' : 'Fall';
                            ?>

                            <div class="p-2 bd-highlight term-selection" style="cursor: pointer;" data-id="<?php echo $projectGroupId ?>">
                                <?php echo $semester . ' ' . $publishedYear ?>
                            </div>

                        <?php endforeach ?>
                    </div>
                <?php endif; ?>

                <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%; height: 225px;">
                    <div class="swiper-container" style="height: 225px;">
                        <div class="swiper-wrapper">
                            <!-- Dynamic Content -->
                        </div>
                    </div>
                    <div class="swiper-pagination swiper-container-pagination"
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
            <?php echo next_post_link('%link', '<button><i class="arrow left"></i>' . get_the_title(get_next_post()) . '</button>'); ?>
        </div>
        <div>
            <?php echo previous_post_link('%link', '<button>' . get_the_title(get_previous_post()) . '<i class="arrow right"></i></button>'); ?>
        </div>
    </div>
</div>

<?php get_footer() ?>

<script>
    var imageSwiper = new Swiper(".swiper-images", {
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-images-pagination",
            clickable: true,
        },
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
</script>

<script>
    /**
     * This script dynamically loads the students into the swiper element based on the selected term
     */
    let swiper = null;
    const projectGroups = <?php echo json_encode($projectGroups); ?>;

    // Load project students for later usage
    const students = <?php
    $allStudents = [];

    foreach ($projectGroups as $projectGroupId) {
        $students = get_field('students', $projectGroupId);

        if ($students) {
            foreach ($students as $studentId) {
                $title = get_the_title($studentId);
                $photo = get_field('photo', $studentId);

                $studentData = [
                    'group' => $projectGroupId->ID,
                    'title' => $title,
                    'photo' => $photo,
                ];

                $allStudents[] = $studentData;
            }
        }
    }

    // Echo data into variable
    echo json_encode($allStudents);
    ?>;

    // Get term selection elements
    var termSelect = document.querySelectorAll('.term-selection');
    function initSwiper(students, groupId) {
        var filteredStudents = students?.filter((student) => student.group == groupId);

        if (!swiper) {
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
        }

        // Clear existing slides (if any)
        swiper.removeAllSlides();

        var selectedElement = document.querySelector(`div[data-id="${groupId}"]`)
        termSelect.forEach(element => element?.classList?.remove('active-term'));
        selectedElement?.classList?.add('active-term');

        // Loop over students and add slides
        filteredStudents?.forEach(student => {
            let slideContent = '<div class="swiper-slide" style="height: 225px; width: auto;"><img src="' + student?.photo?.link + '"></div>';
            swiper.appendSlide(slideContent);
        });
    }

    // Init swiper
    initSwiper(students, projectGroups[0]?.ID);

    // Add event listeners
    termSelect.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            initSwiper(students, this.dataset.id)
        });
    });
</script>