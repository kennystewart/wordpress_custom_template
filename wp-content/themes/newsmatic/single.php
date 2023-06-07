<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Newsmatic
 */

get_header();
?>
<div id="theme-content">
	<?php
		/**
		 * hook - newsmatic_before_main_content
		 * 
		 */
		do_action( 'newsmatic_before_main_content' );
	?>
	<main id="primary" class="site-main">
		<div class="newsmatic-container">
			<div class="row">
				<div class="secondary-left-sidebar">
					<?php
						get_sidebar('left');
					?>
				</div>
				<div class="primary-content">
					<?php
						/**
						 * hook - newsmatic_before_inner_content
						 * 
						 */
						do_action( 'newsmatic_before_inner_content' );
					?>
					<div class="post-inner-wrapper">
						<?php
							while ( have_posts() ) : the_post();
								// get template parts
								get_template_part( 'template-parts/content', 'single' );
							endwhile; // End of the loop.
						?>
					</div>
				</div>
				<div class="secondary-sidebar">
					<?php get_sidebar(); ?>
				</div>
			</div>
		</div>
	</main><!-- #main -->
</div><!-- #theme-content -->
<?php
get_footer();