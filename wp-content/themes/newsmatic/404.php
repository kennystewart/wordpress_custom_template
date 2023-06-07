<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
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
					<section class="error-404 not-found">
						<?php
							/**
							 * hook - newsmatic_before_inner_content
							 * 
							 */
							do_action( 'newsmatic_before_inner_content' );
						?>
						<div class="post-inner-wrapper">
							<header class="page-header">
								<h1 class="page-title newsmatic-block-title"><?php echo esc_html__( '404 Not Found', 'newsmatic' ); ?></h1>
							</header><!-- .page-header -->

							<div class="page-content">
								<?php
									$error_page_image = ND\newsmatic_get_customizer_option( 'error_page_image' );
									if( $error_page_image != 0 ) {
										echo wp_get_attachment_image( $error_page_image, 'full' );
									} 
								?>
								<p><?php echo esc_html__( 'It looks like nothing was found at this location. Maybe try a search?', 'newsmatic' ); ?></p>
							</div><!-- .page-content -->

							<div class="page-footer">
								<a class="button-404" href="<?php echo esc_url( home_url() ); ?>"><?php echo esc_html__( 'Go back to home', 'newsmatic' ); ?></a>
							</div>
						</div><!-- .post-inner-wrapper -->
					</section><!-- .error-404 -->
				</div>
				<div class="secondary-sidebar">
					<?php
						get_sidebar();
					?>
				</div>
			</div>
		</div>
	</main><!-- #main -->
</div><!-- #theme-content -->
<?php
get_footer();
