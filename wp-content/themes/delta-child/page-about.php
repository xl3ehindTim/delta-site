<?php
/*
Template Name: About
*/
?>

<?php get_header(); ?>

<?php
$heroImage = get_field('hero_image');
?>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(<?php echo esc_url($heroImage['url']) ?>);">
        <div class="hero-text">
            <h1 style="color: white;">A Journey for the Ambitious</h1>
        </div>
        <!-- <div class="arrow-down">
            <i class="arrow down"></i>
        </div> -->
    </div>

    <div style="height: 100vh;"></div>

    <section id="delta-about" class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
        <div class="row d-flex justify-content-between">
        <div id="delta-timeline" class="col position-relative pe-3 me-5">
            <div class="row">
                <div class="col-md-12">
                    <ul class="timeline">
                        <li class="event" data-date="2005">
                            <h3>The beginning of Delta</h3>
                            <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem pariatur vero.</p>
                        </li>
                        <li class="event" data-date="0000">
                            <h3>Lorem Ipsum</h3>
                            <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem pariatur vero.</p>
                        </li>
                        <li class="event" data-date="0000">
                            <h3>Lorem Ipsum</h3>
                            <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem pariatur vero.</p>
                        </li>
                        <li class="event" data-date="0000">
                            <h3>Lorem Ipsum</h3>
                            <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem pariatur vero.</p>
                        </li>
                        <li class="event" data-date="2024">
                            <h3>Where we stand today</h3>
                            <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem pariatur vero.</p>
                        </li>
                </div>
            </div>
        </div>
        <div id="delta-story" class="col ms-3">
            <h3 class="text-danger">What is Delta?</h3>
            <h2>Our Story</h2>
            <p>Lorem ipsum dolor sit amet. Ex dicta dolor sit sint labore id velit illum a sunt illo a minus rerum 33 illum laborum est praesentium corporis. Est possimus distinctio sed praesentium voluptates est totam quasi et cumque facere aut aperiam esse ut unde consequatur sit ipsa facilis.</p>
            <p>Rem earum suscipit quo sint cumque sit dolorum voluptas quo eaque perspiciatis qui nostrum dolores qui molestias cumque. Est culpa provident non vitae deserunt qui voluptatem suscipit non blanditiis repellat a dolores ducimus. Qui animi quia a impedit accusamus in explicabo dolor?</p>
        </div>
        </div>
    </section>

    <!-- Timeline -->
    <section id="delta-about" class="container mt-3 mb-3 mt-lg-5 mb-lg-5 d-flex justify-content-between">
        <div id="delta-timeline" class="position-relative pe-3 me-5 ">
            <div class="timeline-stick position-absolute top-0 bottom-0 start-50 bg-danger" style="width: 4px;"></div>
            <div class="mb-4">
                <div class="d-flex align-items-center">
                    <span class="text-dark fw-bold me-2">2005</span>
                    <div class="bg-danger rounded-circle" style="width: 20px; height: 20px;"></div>
                </div>
                <div class="ms-5">
                    <h3>The beginning of Delta</h3>
                    <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem pariatur vero.</p>
                </div>
            </div>
            <!-- Additional timeline events -->
            <div class="mb-4">
                <div class="d-flex align-items-center">
                    <span class="text-dark fw-bold me-2">2024</span>
                    <div class="bg-danger rounded-circle" style="width: 20px; height: 20px;"></div>
                </div>
                <div class="ms-5">
                    <h3>Lorem Ipsum</h3>
                    <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem pariatur vero.</p>
                </div>
            </div>
        </div>
        <div id="delta-story" class="flex-grow-1 ms-3">
            <h3 class="text-danger">What is Delta?</h3>
            <h2>Our Story</h2>
            <p>Lorem ipsum dolor sit amet. Ex dicta dolor sit sint labore id velit illum a sunt illo a minus rerum 33 illum laborum est praesentium corporis. Est possimus distinctio sed praesentium voluptates est totam quasi et cumque facere aut aperiam esse ut unde consequatur sit ipsa facilis.</p>
            <p>Rem earum suscipit quo sint cumque sit dolorum voluptas quo eaque perspiciatis qui nostrum dolores qui molestias cumque. Est culpa provident non vitae deserunt qui voluptatem suscipit non blanditiis repellat a dolores ducimus. Qui animi quia a impedit accusamus in explicabo dolor?</p>
        </div>
    </section>

    <!-- Statistics -->
    <section id="delta-statistics" class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
        <div class="row text-center">
            <div class="col-4">
                <div class="p-4 bg-light rounded">
                    <h3 class="text-primary mb-0">40+</h3>
                    <p class="text-secondary">Real world projects</p>
                </div>
            </div>
            <div class="col-4">
                <div class="p-4 bg-light rounded">
                    <h3 class="text-primary mb-0">21</h3>
                    <p class="text-secondary">Years of experience</p>
                </div>
            </div>
            <div class="col-4">
                <div class="p-4 bg-light rounded">
                    <h3 class="text-primary mb-0">200+</h3>
                    <p class="text-secondary">Students followed the Delta program</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Activities -->
    <section id="delta-activities" class="container">
        <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%; height: 500px;"></div>
        <h2>Our Activities</h2>
        <p>Lorem ipsum dolor sit amet. Ex dicta dolor sit sint labore id velit illum a sunt illo a minus rerum 33 illum laborum est praesentium corporis. Est possimus distinctio sed praesentium voluptates est totam quasi et cumque facere aut aperiam esse ut unde consequatur sit ipsa facilis.</p>
        <div style="width: 1240px;">
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <img src="..\wp-content\uploads\about\activity-image-1.png" alt="Activity Description" class="img-fluid">
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <img src="..\wp-content\uploads\about\activity-image-2.png" alt="Activity Description" class="img-fluid">
                </div>
                <div class="col-lg-4 col-md-12 mb-4">
                    <img src="..\wp-content\uploads\about\activity-image-3.png" alt="Activity Description" class="img-fluid">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <img src="..\wp-content\uploads\about\activity-image-4.png" alt="Activity Description" class="img-fluid">
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <img src="..\wp-content\uploads\about\activity-image-5.png" alt="Activity Description" class="img-fluid">
                </div>
                <div class="col-lg-4 col-md-12 mb-4">
                    <img src="..\wp-content\uploads\about\activity-image-6.png" alt="Activity Description" class="img-fluid">
                </div>
            </div>
        </div>
    </section>


    <!-- Current Team -->
    <section id="delta-team" class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
        <h2>Current Team</h2>
        <p>Lorem ipsum dolor sit amet. Ex dicta dolor sit sint labore id velit illum a sunt illo a minus rerum 33 illum laborum est praesentium corporis. Est possimus distinctio sed praesentium voluptates est totam quasi et cumque facere aut operiam esse ut unde consequatur sit ipsa facilis.</p>
        <img src="" alt="The Current Delta Team" />
    </section>

</div>

<?php get_footer(); ?>