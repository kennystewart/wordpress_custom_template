<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package Islamic Center Mosque 
 */

get_header(); ?>

<div class="container">
	<main id="maincontent" role="main">
		<div class="page-content">
	    	<h1><?php esc_html_e('404 Not Found','islamic-center-mosque');?></h1>
			<p class="text-404"><?php esc_html_e('Looks like you have taken a wrong turn, Dont worry, it happens to the best of us.','islamic-center-mosque');?></p>
			<div class="more-btn mt-4 mb-4">
			    <a class="p-3" href="<?php echo esc_url(home_url()); ?>"><?php echo esc_html(get_theme_mod('islamic_center_mosque_button_text',__('Go Back','islamic-center-mosque')));?><span class="screen-reader-text"><?php echo esc_html(get_theme_mod('islamic_center_mosque_button_text',__('Go Back','islamic-center-mosque')));?></span></a>
			</div>
		</div>
		<div class="clearfix"></div>
	</main>
</div>

<?php get_footer(); ?>