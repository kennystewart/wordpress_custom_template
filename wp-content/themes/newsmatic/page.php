<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Newsmatic
 */
use Newsmatic\CustomizerDefault as ND;
get_header();

if( is_front_page() ) :
	/**
	 * hook - newsmatic_main_banner_hook
	 * 
	 * hooked - newsmatic_main_banner_part - 10
	 */
	do_action( 'newsmatic_main_banner_hook' );

	$homepage_content_order = ND\newsmatic_get_customizer_option( 'homepage_content_order' );
	foreach( $homepage_content_order as $content_order_key => $content_order ) :
		if( $content_order['option'] ) :
			switch( $content_order['value'] ) {
				case "full_width_section": 
									/**
									 * hook - newsmatic_full_width_blocks_hook
									 * 
									 * hooked- newsmatic_full_width_blocks_part
									 * @since 1.0.0
									 * 
									 */
									do_action( 'newsmatic_full_width_blocks_hook' );
								break;
				case "leftc_rights_section": 
									/**
									 * hook - newsmatic_leftc_rights_blocks_hook
									 * 
									 * hooked- newsmatic_leftc_rights_blocks_part
									 * @since 1.0.0
									 * 
									 */
									do_action( 'newsmatic_leftc_rights_blocks_hook' );
								break;
				case "lefts_rightc_section": 
									/**
									 * hook - newsmatic_lefts_rightc_blocks_hook
									 * 
									 * hooked- newsmatic_lefts_rightc_blocks_part
									 * @since 1.0.0
									 * 
									 */
									do_action( 'newsmatic_lefts_rightc_blocks_hook' );
								break;
				case "bottom_full_width_section": 
									/**
									 * hook - newsmatic_bottom_full_width_blocks_hook
									 * 
									 * hooked- newsmatic_bottom_full_width_blocks_part
									 * @since 1.0.0
									 * 
									 */
									do_action( 'newsmatic_bottom_full_width_blocks_hook' );
								break;
					default: ?>
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
												while ( have_posts() ) :
													the_post();

													get_template_part( 'template-parts/content', 'page' );

													// If comments are open or we have at least one comment, load up the comment template.
													if ( comments_open() || get_comments_number() ) :
														comments_template();
													endif;

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
			}
		endif;
	endforeach;
else :
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
								while ( have_posts() ) :
									the_post();

									get_template_part( 'template-parts/content', 'page' );

									// If comments are open or we have at least one comment, load up the comment template.
									if ( comments_open() || get_comments_number() ) :
										comments_template();
									endif;

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
endif;
get_footer();
