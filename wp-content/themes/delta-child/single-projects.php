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
	$projectGroups = get_field('project_groups');
?>

<head>
    <meta property="og:title" content="<?php echo get_the_title(); ?>">
    <meta property="og:description" content="<?php echo strip_tags(get_field('description')); ?>">
    <meta property="og:image" content=<?php echo esc_url(get_field('hero_image')['url']); ?>>
</head>

<div id="primary" <?php astra_primary_class(); ?>>
    <?php include_hero_section(); ?>

		<?php include_project_information(); ?>

		<?php include_media_slider(); ?>

		<?php include_technical_information(); ?>

		<?php include_team_section(); ?>

		<?php include_page_navigation(); ?>
</div>

<?php get_footer() ?>

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
                $perma_link = get_permalink($studentId);

                $studentData = [
                    'group' => $projectGroupId->ID,
                    'title' => $title,
                    'photo' => $photo,
                    'permalink' => $perma_link,
                ];

                $allStudents[] = $studentData;
            }
        }
    }

    // Echo data into variable
    echo json_encode($allStudents);
    ?>;
    console.log(students)
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
            let slideContent = `
            <div class="student-slide swiper-slide" style="height: 225px; width: auto;">
                <a href="${student?.permalink}">
                    <img src="${student?.photo?.link}">
                    <span class="student-name">
                        ${student?.title}
                    </span>
                </a>
            </div>
            `;
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

<?php
/**
 * Section functions
 */

function include_hero_section() {
		$hero_image = get_field('hero_image');
    ?>
    <div class="hero-image"
      style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(<?php echo esc_url($hero_image['url']); ?>);">
      <div class="hero-text">
        <h1 style="color: white;"><?php echo get_the_title(); ?></h1>
      </div>
      <div class="scroll-indicator">
            <div class="mouse-scroll"></div>
        </div>
      </div>
  
    <div style="height: 100vh;"></div>
    <?php
  }

	function include_project_information() {
		$subtitle = get_field('subtitle');
        $description = get_field('description');
        $website = get_field('website');
		$logo = get_field('logo');
		?>
			<div class="project-info container mt-3 mb-3 mt-lg-5 mb-lg-5">
				<div class="row gx-5">
					<div class="col-12 col-md-7">
						<h2 class="mb-3">
							<?php echo $subtitle; ?>
						</h2>
						<div>
							<?php echo $description; ?>
						</div>
  
						<?php if ($website): ?>
							<a href="<?php echo $website; ?>" target="_blank" style="text-decoration: none;">
								<button>
									View Website
									<i class="arrow right"></i>
								</button>
							</a>
						<?php endif; ?>
					</div>
                        
						<?php if ($logo): ?>
							<div class="col-12 col-md-5 d-flex align-items-center mt-5 mt-lg-0 justify-content-center justify-content-md-end">
                                <img style="max-width: 300px; max-height: 250px;" src="<?php echo esc_url($logo['url']) ?>" alt="Project Logo" />
                            </div>
					<?php endif; ?>
				</div>
			</div>
		<?php
	}

	function include_media_slider() {
		$media = get_field('media');
		if (!$media) {
			return; 
		}
		?>
			<section id="media">
            <div class="container">
                <div class="mt-3 mb-3 mt-lg-5 mb-lg-5" style="width: 100%; position: absolute; left: 0%; height: 500px;">
                    <div class="swiper-media" style="height: 500px;">
                        <div class="swiper-wrapper">
                            <?php foreach ($media as $media_id):
                                $url = get_permalink($media_id);
                                ?>
                                <div class="swiper-slide" style="height: 500px; width: auto;">
                                <?php 
                                    if (wp_attachment_is( 'image', $media_id)) {
                                        ?> 
                                         <img src="<?php echo $url ?>"></img>
                                        <?php
                                    }

                                    if (wp_attachment_is( 'video', $media_id)) {
                                        ?>
                                            <video style="height: 500px; width: auto;" controls src="<?php echo $url ?>"></video>
                                        <?php
                                    }
                                ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="swiper-pagination swiper-media-pagination"
                        style="position: absolute; margin-bottom: -5vh;">
                    </div>
                </div>
            </div>
        </section>

				<div style="height: 600px;"></div>

				<script>
    /**
     * Image swiper
     */
    var imageSwiper = new Swiper(".swiper-media", {
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-media-pagination",
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
		<?php
	}

function include_technical_information() {
	$technical_description = get_field('technical_description');
	if (!$technical_description) {
		return;
	}

	?>
		<section id="technical" class="mt-3 mb-3 mt-lg-5 mb-lg-5">
			<div class="container">
				<h3 class="mb-2">
					Dive deeper
				</h3>

				<?php echo $technical_description ?>
            </div>
		</section>
	<?php
}

function include_page_navigation() {
	?>
    <div class="d-flex justify-content-between mt-5">
        <div>
            <?php echo next_post_link('%link', '<button><i class="arrow left"></i>' . get_the_title(get_next_post()) . '</button>'); ?>
        </div>
        <div>
            <?php echo previous_post_link('%link', '<button>' . get_the_title(get_previous_post()) . '<i class="arrow right"></i></button>'); ?>
        </div>
    </div>
	<?php
}
function include_team_section() {
	$project_groups = get_field('project_groups');
	if (!$project_groups) return;

	?>
		<section id="team">
			<div class="container">
				<div class="d-flex justify-content-center mt-5">
						<h3>Meet the team!</h3>
				</div>

				<!-- Term selection if > 1 groups -->
				<?php if (count($project_groups) > 1): ?>
					<div class="d-flex flex-row justify-content-center">
						<?php foreach ($project_groups as $projectGroup):
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
	<?php
}
?>