<?php
/*
Template Name: About
*/

$currentYear = date('Y');
$yearsOfExperience = $currentYear - 2005;
?>

<?php get_header(); ?>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<style>
    .auto-resizable-iframe {
        max-width: 100%;
        margin: 0px auto;
    }

    .auto-resizable-iframe > div {
        position: relative;
        padding-bottom: 56.31%;
        height: 0px;
    }

    .auto-resizable-iframe iframe {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 768px) {
        .text-center-mobile {
            text-align: center !important;
        }

        .timeline {
            border-left: 0;
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
            display: grid;
            align-items: center;
            display: none;
        }

        .timeline .event:after {
            box-shadow: unset;
        }

        .event {
            text-align: left;
            display: inline-block;
            text-align: left;
        }

        .event::before {
            display: grid;
            text-align: center !important;
            min-width: none;
            width: 100%;
        }

        .ms-4 {
            margin-left: 0 !important;
        }
    }
</style>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image"
         style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(<?php echo get_attachment_url_by_slug('about-hero'); ?>);">
        <div class="hero-text">
            <h1 style="color: white;">A journey for the ambitious</h1>
        </div>

        <div class="scroll-indicator">
            <div class="mouse-scroll"></div>
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <!-- Timeline & Story -->
    <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: relative; left: 0%;">
        <section id="delta-about" class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
            <div class="row d-flex flex-column flex-lg-row justify-content-between">
                <div class="col-lg-7 ms-4 mt-2 order-2 order-lg-2 text-center-mobile">
                    <h4 style="color: #E5007D;" class="mt-4">What is Delta?</h4>
                    <h2 class="pb-4">Our Story</h2>
                    <p>
                        Delta at Fontys University of Applied Sciences is a unique excellence program designed to
                        support ambitious and high-performing students. Established in 2005, it was created to
                        address the lack of advanced opportunities for talented ICT & Media students within the regular
                        curriculum. Delta students receive exemptions from the standard program to engage in
                        multidisciplinary
                        projects, gaining real-world experience and developing an impressive portfolio. This innovative
                        approach ensures they utilize their time efficiently, fostering their skills, knowledge,
                        and talents to their fullest potential.
                    </p>
                    <p>
                        The primary purpose of the Delta Program is to optimize the available study time for students,
                        enabling them to undertake numerous long-term and short-term projects, often in
                        collaboration with industry partners and startups. By doing so, the program not only enhances
                        students' technical and professional capabilities but also prepares them for future
                        challenges in their careers. The Delta program promotes self-directed learning, creativity, and
                        a proactive mindset, ultimately aiming to produce graduates who excel in their
                        fields and stand out in the competitive job market.
                    </p>
                </div>
                <div class="col-lg-4 order-1 order-lg-1">
                    <ul class="timeline">
                        <li class="event" data-date="2005">
                            <h3 style="color: #E5007D;" class="text-center-mobile">Delta Program launched</h3>
                        </li>
                        <li class="event" data-date="2012">
                            <h3 class="text-center-mobile">Expansion to include students from other ICT profiles</h3>
                        </li>
                        <li class="event" data-date="2015">
                            <h3 class="text-center-mobile">First successful startup from Delta</h3>
                        </li>
                        <li class="event" data-date="2016">
                            <h3 class="text-center-mobile">First semester of Open Learning</h3>
                        </li>
                        <li class="event" data-date="2024">
                            <h3 class="text-center-mobile" style="color: #E5007D;">Ongoing development</h3>
                        </li>
                    </ul>
                </div>
        </section>
    </div>

    <!-- Watch this and experience Delta -->
    <section id="delta-activities" class="container pb-3 pb-lg-3">
        <h2 class="justify-content-center d-flex pb-2">Watch this and experience Delta</h2>
        <div class="auto-resizable-iframe">
            <div>
                <iframe width="100%" height="100%"
                        src="https://www.youtube.com/embed/_Kl2SxNfjA8?start=6&end=69&controls=1"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    </section>

    <!-- Statistics -->
    <section id="delta-statistics" class="container mb-3 mt-lg-5 mb-lg-5 pb-3 pb-lg-5">
        <div class="row d-flex justify-content-center text-center">
            <div class="col-12 col-md-3 mt-md-0 d-flex justify-content-center">
                <div class="p-4 rounded w-75 shadow">
                    <h3 class="mb-0 pb-2 counter" data-target="150" data-plus="true" style="color: #E5007D;">0</h3>
                    <p class="font-weight-bold">Real world projects</p>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3 mt-md-0 d-flex justify-content-center">
                <div class="p-4 rounded w-75 shadow">
                    <h3 class="mb-0 pb-2 counter" data-target="<?php echo $yearsOfExperience; ?>"
                        style="color: #E5007D;">0</h3>
                    <p class="font-weight-bold">Years of experience</p>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3 mt-md-0 d-flex justify-content-center">
                <div class="p-4 rounded w-75 shadow">
                    <h3 class="mb-0 pb-2 counter" data-target="200" data-plus="true" style="color: #E5007D;">0</h3>
                    <p class="font-weight-bold">Students followed the Delta program</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Activities -->
    <section id="delta-activities" class="container pb-3 pb-lg-3">
        <h2 class="justify-content-center d-flex pb-2">Our Activities</h2>
        <p class="justify-content-center text-center d-flex pb-4 mb-4 px-0 px-md-5 mx-0 mx-md-5">
            Delta is not only an excellence program, it’s also a vibrant community. In addition to studying and working
            hard, Delta students enjoy spending time together and having fun!
            Each semester, students organize regular activities such as bi-weekly lunches, games, sports events, and
            social gatherings.
        </p>
        <div style="width: 100%;">
            <div class="row g-3">
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="<?php echo get_attachment_url_by_slug('activity-image-1'); ?>"
                             alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="<?php echo get_attachment_url_by_slug('activity-image-2'); ?>"
                             alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="<?php echo get_attachment_url_by_slug('activity-image-3'); ?>"
                             alt="Activity Description" class="img-cover">
                    </div>
                </div>
            </div>
            <div class="row g-3">
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="<?php echo get_attachment_url_by_slug('activity-image-4'); ?>"
                             alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="<?php echo get_attachment_url_by_slug('activity-image-5'); ?>"
                             alt="Activity Description" class="img-cover">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 d-flex">
                    <div class="image-container w-100 rounded">
                        <img src="<?php echo get_attachment_url_by_slug('activity-image-6'); ?>"
                             alt="Activity Description" class="img-cover">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Current Team -->
    <section id="delta-team" class="container mt-3 mb-3 mt-lg-5 mb-lg-5">
        <h2 class="d-flex justify-content-center pb-2">Meet the Delta's!</h2>
        <p class="d-flex justify-content-center text-center d-flex pb-4 mb-4 px-0 px-md-5 mx-0 mx-md-5">
            Meet the current Delta students. Each member brings unique skills and perspectives, contributing to the
            diverse and vibrant community that defines Delta.
            Together, they tackle various challenges and push the boundaries of their potential.
        </p>
        <img src="<?php echo get_attachment_url_by_slug('delta-team-photo'); ?>" alt="The Current Delta Team"
             class="rounded"/>
    </section>

</div>

<?php get_footer(); ?>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const counters = document.querySelectorAll('.counter');

        const animateCounters = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const speed = 1000; // Change speed here
                        const increment = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target;
                            if (counter.getAttribute('data-plus') === "true") {
                                counter.innerText += '+';
                            }
                            observer.unobserve(counter); // Stop observing after animation is complete
                        }
                    };
                    updateCount();
                }
            });
        };

        const observer = new IntersectionObserver(animateCounters, {
            threshold: 1 // Trigger when the element is visible
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    });
</script>