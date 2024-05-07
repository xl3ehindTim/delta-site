<?php
/**
 * The template for displaying all single projects.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header(); ?>

<?php
    $project_id = get_the_ID();
    $title = get_field('title');
    $subtitle = get_field('subtitle');
    $heroImage = get_field('hero_image');
    $description = get_field('description');
    $website = get_field('website');
    $logo = get_field('logo');
    $students = get_field('students', $project_id);
?>

<div id="primary" <?php astra_primary_class(); ?>>
    <div class="hero-image" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(<?php echo esc_url($heroImage['url']) ?>);">
        <div class="hero-text">
            <h1 style="color: white;"><?php echo $title ?></h1>
        </div>
        <div class="arrow-down">
            <!-- TODO arrow down -->
        </div>
    </div>

    <div style="height: 100vh;"></div>

    <div style="display: flex;">
        <div style="flex: 2; padding-right: 1rem;">
            <h2>
                <?php echo $subtitle ?>
            </h2>

            <br />
        
            <p>
                <?php echo $description ?>
            </p>

            <a href="<?php echo $website ?>" target="_blank">
                <button>
                    View Website
                </button>
            </a>
        </div>
        <div style="flex: 1; align-self: center; margin: 0 1rem;">
            <img src="<?php echo esc_url($logo['url']) ?>"></img>
        </div>
    </div>
    
    <!-- TODO replace with padding -->
    <br />

    <div style="display: flex; justify-content: center;">
        <h2>Meet the team!</h2>
    </div>
    <?php
        if ( $students ) {
            foreach( $students as $student_id ) {
                $student = get_post( $student_id ); 
                $student_name = get_the_title( $student_id );
                echo '<p>' . $student_name . '</p>'; 
            }
        }
    ?>
</div>