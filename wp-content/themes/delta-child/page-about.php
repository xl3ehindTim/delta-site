<?php
/*
Template Name: About
*/
?>

<?php get_header(); ?>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../wp-content/uploads/about/about-hero.png);">
        <div class="hero-text">
            <h1 style="color: white;">A Journey for the Ambitious</h1>
        </div>
        <!-- <div class="arrow-down mt-4">
            <i class="arrow down"></i>
        </div> -->
    </div>

    <div style="height: 110vh;"></div>

    <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%;">
        <section id="delta-about" class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
            <div class="row d-flex justify-content-between">
                <div id="delta-timeline" class="col-4">
                    <ul class="timeline">
                        <li class="event" data-date="2005">
                            <h3 style="color: #E5007D;">The beginning of Delta</h3>
                            <!-- <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem
                                        pariatur vero.</p> -->
                        </li>
                        <li class="event" data-date="0000">
                            <h3>Lorem Ipsum</h3>
                            <!-- <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem
                                        pariatur vero.</p> -->
                        </li>
                        <li class="event" data-date="0000">
                            <h3>Lorem Ipsum</h3>
                            <!-- <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem
                                        pariatur vero.</p> -->
                        </li>
                        <li class="event" data-date="0000">
                            <h3>Lorem Ipsum</h3>
                            <!-- <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem
                                        pariatur vero.</p> -->
                        </li>
                        <li class="event" data-date="2024">
                            <h3>Where we stand today</h3>
                            <!-- <p>Lorem ipsum dolor sit amet. Aut voluptate odit sed veritatis repellendus rem
                                        pariatur vero.</p> -->
                        </li>
                </div>
                <div id="delta-story" class="col-7 ms-4 mt-2">
                    <h4 style="color: #E5007D;" class="mt-4">What is Delta?</h4>
                    <h2 class="pb-4">Our Story</h2>
                    <p>Lorem ipsum dolor sit amet. Ex dicta dolor sit sint labore id velit illum a sunt illo a minus
                        rerum 33 illum laborum est praesentium corporis. Est possimus distinctio sed praesentium
                        voluptates est totam quasi et cumque facere aut aperiam esse ut unde consequatur sit ipsa
                        facilis.</p>
                    <p>Rem earum suscipit quo sint cumque sit dolorum voluptas quo eaque perspiciatis qui nostrum
                        dolores qui molestias cumque. Est culpa provident non vitae deserunt qui voluptatem suscipit non
                        blanditiis repellat a dolores ducimus. Qui animi quia a impedit accusamus in explicabo dolor?
                    </p>
                </div>
            </div>
        </section>
    </div>

    <div class="height-placeholder"></div>
    
    <!-- Statistics -->
    <section id="delta-statistics" class="container mb-3 mt-lg-5 mb-lg-5 pb-3 pb-lg-5">
        <div class="row d-flex justify-content-center text-center">
        <div class="col-12 col-md-3 mt-md-0 d-flex justify-content-center">
                <div class="p-4 rounded w-75 shadow">
                    <h3 class="mb-0 pb-2" style="color: #E5007D;">40+</h3>
                    <p class="font-weight-bold">Real world projects</p>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3 mt-md-0 d-flex justify-content-center">
                <div class="p-4 rounded w-75 shadow">
                    <h3 class="mb-0 pb-2" style="color: #E5007D;">21</h3>
                    <p class="font-weight-bold">Years of experience</p>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3 mt-md-0 d-flex justify-content-center">
                <div class="p-4 rounded w-75 shadow">
                    <h3 class="mb-0 pb-2" style="color: #E5007D;">200+</h3>
                    <p class="font-weight-bold">Students followed the Delta program</p>
                </div>
            </div>
        </div>
    </section>

    <!-- <div style="height: 10vh;"></div> -->

    <!-- Activities -->
    <section id="delta-activities" class="container pb-3 pb-lg-3">
        <!-- <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%; height: 500px;"></div> -->
        <h2 class="justify-content-center d-flex pb-2">Our Activities</h2>
        <p class="justify-content-center text-center d-flex pb-4 mb-4">Lorem ipsum dolor sit amet. Ex dicta dolor sit sint labore id velit
            illum a sunt illo a minus rerum 33 illum laborum est praesentium corporis. Est possimus distinctio sed
            praesentium voluptates est totam quasi et cumque facere aut aperiam esse ut unde consequatur sit ipsa
            facilis.</p>
        <div style="width: 100%;">
            <div class="row g-3">
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="../wp-content/uploads/about/activity-image-1.png" alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="../wp-content/uploads/about/activity-image-2.png" alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="../wp-content/uploads/about/activity-image-3.png" alt="Activity Description" class="img-cover">
                    </div>
                </div>
            </div>
            <div class="row g-3">
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="../wp-content/uploads/about/activity-image-4.png" alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="../wp-content/uploads/about/activity-image-5.png" alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="../wp-content/uploads/about/activity-image-6.png" alt="Activity Description" class="img-cover">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- <div style="height: 10vh;"></div> -->

    <!-- Current Team -->
    <section id="delta-team" class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
        <h2 class="justify-content-center d-flex pb-2">Meet the Delta's!</h2>
        <p class="justify-content-center text-center d-flex pb-4 mb-4">Lorem ipsum dolor sit amet. Ex dicta dolor sit sint labore id velit
            illum a sunt illo a minus rerum 33 illum laborum est praesentium corporis. Est possimus distinctio sed
            praesentium voluptates est totam quasi et cumque facere aut operiam esse ut unde consequatur sit ipsa
            facilis.</p>
        <img src="../wp-content/uploads/about/delta-group-photo.png" alt="The Current Delta Team" class="rounded"/>
    </section>

    <div style="height: 10vh;"></div>

</div>

<?php get_footer(); ?>

<script>
    const timelineElement = document.getElementsByClassName('timeline')[0];
    const placeholderElement = document.getElementsByClassName('height-placeholder')[0];
    placeholderElement.setAttribute('style', `height: ${timelineElement.clientHeight + 150}px`)
</script>