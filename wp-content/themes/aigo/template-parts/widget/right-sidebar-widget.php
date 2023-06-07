<?php
/**
 * Displays the Blog page's right sidebar widget area.
 *
 * @package WordPress
 */

if ( is_active_sidebar( 'blog-right-sidebar' ) ) : ?>

	<aside class="widget-area">
		<?php dynamic_sidebar( 'blog-right-sidebar' ); ?>
	</aside><!-- .widget-area -->

	<?php
endif;
