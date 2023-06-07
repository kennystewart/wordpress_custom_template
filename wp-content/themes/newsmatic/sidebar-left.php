<?php
/**
 * The left sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Newsmatic
 * @since 1.0.0
 */

if ( ! is_active_sidebar( 'left-sidebar' ) ) {
	return;
}
?>

<aside id="secondary-left" class="widget-area">
	<?php dynamic_sidebar( 'left-sidebar' ); ?>
</aside><!-- #secondary -->