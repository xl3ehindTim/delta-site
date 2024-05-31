<?php
$args = array(
    'post_type' => 'project-group',
    'posts_per_page' => 100,
    'post_status' => 'publish',
    'meta_query' => array(
        array(
            'key' => 'students',
            'compare' => 'LIKE',
            'value' => get_the_ID(),
        ),
    ),
);

$project_groups = new WP_Query($args);

// $allProjects = array(); // Empty array to store all projects
// foreach ($project_groups->posts as $post) {
//     $projectsQuery = new WP_Query(
//         array(
//             'post_type' => 'projects',
//             'posts_per_page' => 100,
//             'post_status' => 'publish',
//             'meta_query' => array(
//                 array(
//                     'key' => 'project_groups',
//                     'value' => get_the_ID(),
//                     'compare' => 'LIKE',
//                 ),
//             ),
//         )
//     );

//   // Loop through projects in this group
//   foreach ($projectsQuery->posts as $project) {
//     $projectId = $project->ID; // Get the project ID

//     // Check if project ID exists in the allProjects array
//     if (!in_array($projectId, $allProjects)) {
//       $allProjects[] = $projectId; // Add unique project ID
//     }
//   }
// }

?>

<?php get_header(); ?>

<head>
    <meta property="og:title" content="<?php echo get_the_title(); ?>">
    <meta property="og:image" content=<?php echo esc_url(get_field('photo')['url']); ?>>
</head>


<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../../wp-content/uploads/static/home-team.jpg);">
        <div class="hero-text">
            <h1 style="color: white;">
                <?php echo get_the_title(); ?>
            </h1>
        </div>

        <div class="scroll-indicator">
            <div class="mouse-scroll"></div>
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <section class="wrapper">
        <div class="container">
            <h2>
                Participated projects
            </h2>

            <div class="row projects-container mt-5">
                <?php
                $allProjects = array(); // Empty array to store all projects
                foreach ($project_groups->posts as $post) {
                    $projectsQuery = new WP_Query(
                        array(
                            'post_type' => 'projects',
                            'posts_per_page' => 100,
                            'post_status' => 'publish',
                            'meta_query' => array(
                                array(
                                    'key' => 'project_groups',
                                    'value' => get_the_ID(),
                                    'compare' => 'LIKE',
                                ),
                            ),
                        )
                    );
                    // Loop through projects in this group
                    foreach ($projectsQuery->posts as $project) {
                        $projectId = $project->ID; // Get the project ID
                        // Check if project ID exists in the allProjects array
                        if (!in_array($projectId, $allProjects)) {
                            $allProjects[] = $projectId; // Add unique project ID
                        }
                    }
                }
                ?>

                <?php foreach ($allProjects as $project):
                    $project = get_post($project);
                    ?>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                        <a href="<?php the_permalink($project->ID); ?>">
                            <div class="card text-dark card-has-bg click-col">
                                <img style="height: 550px; object-fit: cover;" class="card-img"
                                    src="<?php echo esc_url(get_field('hero_image', $project->ID)['url']) ?>">
                                <div class="card-img-overlay d-flex flex-column">
                                    <div id="card-footer" class="justify-content-between" style="display: flex;">
                                        <div class="card-footer-text">
                                            <h6 class="my-0 text-white d-block" style="font-size:22px;">
                                                <?php echo get_the_title($project->ID); ?>
                                            </h6>
                                            <p class="text-white" style="font-size:16px;">
                                                <?php echo get_field('subtitle', $project->ID) ?>
                                            </p>
                                        </div>
                                        <div class="card-footer-placeholder"></div>
                                        <div class="card-button">
                                            <span class="card-button-text">
                                                <h6>Read more</h6>
                                            </span>
                                            <span class="diagonal-arrow"></span>
                                        </div>
                                    </div>
                                    <div class="card-description">
                                        <?php
                                        $shortDescription = substr(getFirstParagraph(get_field('description', $project->ID)), 0, 350);
                                        if (strlen(getFirstParagraph(get_field('description', $project->ID))) > 350) {
                                            $shortDescription .= "...";
                                        }
                                        echo $shortDescription;
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
</div><!-- #primary -->

<?php get_footer(); ?>