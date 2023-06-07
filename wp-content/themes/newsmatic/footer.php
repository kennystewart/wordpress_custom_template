<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Newsmatic
 */

 /**
  * hook - newsmatic_before_footer_section
  * 
  */
  do_action( 'newsmatic_before_footer_section' );
?>
	<footer id="colophon" class="site-footer dark_bk">
		<?php
			/**
			 * Function - newsmatic_footer_sections_html
			 * 
			 * @since 1.0.0
			 * 
			 */
			newsmatic_footer_sections_html();

			/**
			 * Function - newsmatic_bottom_footer_sections_html
			 * 
			 * @since 1.0.0
			 * 
			 */
			newsmatic_bottom_footer_sections_html();
		?>
	</footer><!-- #colophon -->
	<?php
		/**
		* hook - newsmatic_after_footer_hook
		*
		* @hooked - newsmatic_scroll_to_top
		*
		*/
		if( has_action( 'newsmatic_after_footer_hook' ) ) {
			do_action( 'newsmatic_after_footer_hook' );
		}
	?>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>