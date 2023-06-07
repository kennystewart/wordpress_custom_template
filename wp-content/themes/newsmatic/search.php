<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package Newsmatic
 */
use Newsmatic\CustomizerDefault as ND;
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
					<div class="news-list layout--two">
					<?php
						/**
						 * hook - newsmatic_before_inner_content
						 * 
						 */
						do_action( 'newsmatic_before_inner_content' );
						
						if ( have_posts() ) : ?>
							<header class="page-header">
								<h1 class="page-title newsmatic-block-title">
									<?php
										/* translators: %s: search query. */
										printf( esc_html__( 'Search Results for : %s', 'newsmatic' ), '<span>' . get_search_query() . '</span>' );
									?>
								</h1>
							</header><!-- .page-header -->
							<div class="post-inner-wrapper">
								<div class="news-list-post-wrap column--one">
									<?php
										/* Start the Loop */
										while ( have_posts() ) :
											the_post();
											/**
											 * Run the loop for the search to output the results.
											 * If you want to overload this in a child theme then include a file
											 * called content-search.php and that will be used instead.
											 */
											get_template_part( 'template-parts/content', 'search' );

										endwhile;
										/**
										 * hook - newsmatic_pagination_link_hook
										 * 
										 * @package Newsmatic
										 * @since 1.0.0
										 */
										do_action( 'newsmatic_pagination_link_hook' );
									?>
								</div>
							</div>
							<?php
							else :
								get_template_part( 'template-parts/content', 'none' );
							endif;
							?>
					</div>
				</div>
				<div class="secondary-sidebar">
					<?php get_sidebar(); ?>
				</div>
			</div>
		</div>
	</main><!-- #main -->
	<?php get_sidebar(); ?>
</div><!-- #theme-content -->
<?php
get_footer();
