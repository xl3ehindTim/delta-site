<?php
/*
Template Name: Projects
*/

$posts = get_posts(
    array(
        'posts_per_page' => 12,
        'post_type' => 'projects'
    )
);
?>

<?php get_header(); ?>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost/delta-site/wp-content/uploads/2024/03/VC-Glow-03.jpeg);">
        <div class="hero-text">
            <h2 style="color: white;">Projects</h2>
        </div>
        <div class="arrow-down">
            <!-- TODO arrow down -->
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <div class="mt-3 mb-3 mt-lg-5 mb-lg-5">
        <div style="justify-content: center;">
            <div class="delta-card-container">
                <?php foreach ($posts as $post):
                    setup_postdata($post);
        
                    $title = get_field('title');
                    $subtitle = get_field('subtitle');
                    $description = get_field('description');
                    $heroImage = get_field('hero_image');
                    $projectLink = get_permalink();
                ?>
                <div class="delta-card">
                    <div class="delta-card-image" style="background-image: url('<?php echo esc_url($heroImage['url']) ?>');"></div>
                    
                    <div class="delta-title-container">
                        <h2><?php echo $title ?></h2>
                        <h3><?php echo $subtitle ?></h3>
                    </div>
                    <div class="delta-card-information">
                        <p class="delta-description">
                            <?php
                                // Shorten description to 300 characters and add ellipsis
                                $shortDescription = substr($description, 0, 300);
                                if (strlen($description) > 300) {
                                    $shortDescription .= "...";
                                }
                                echo $shortDescription;
                            ?>
                        </p>
                    </div>
                
                    <div>
                        <button class="delta-button"><span class="delta-button-text">Read more</span><span class="diagonal-arrow"></span></button>
                    </div>
                   
                </div>

                <?php endforeach; ?>
                 
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
