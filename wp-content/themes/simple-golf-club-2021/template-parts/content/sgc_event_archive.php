<?php
/**
 * Template part for displaying event archived posts
 * @since simple-golf-club-2021 1.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php if ( is_singular() ) : ?>
			<?php the_title( '<h1 class="entry-title default-max-width">', '</h1>' ); ?>
		<?php else : ?>
			<?php the_title( sprintf( '<h2 class="entry-title default-max-width"><a href="%s">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
		<?php endif; ?>
            <div class="default-max-width sgcc-event-date">
                <?php if (function_exists('sgc_event_getinfo')) :
                    $event_info = sgc_event_getinfo();
                    if( !empty($event_info) && !empty($event_info['time']) ) : ?>
                        <span class="date"><?php echo date( 'M d, Y', strtotime($event_info['time']) ) ?></span>
                        <span class="time"><?php echo date( 'g:i A', strtotime($event_info['time']) ) ?></span>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
		<?php twenty_twenty_one_post_thumbnail(); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
		the_content(
			twenty_twenty_one_continue_reading_text()
		);

		wp_link_pages(
			array(
				'before'   => '<nav class="page-links" aria-label="' . esc_attr__( 'Page',  'simple-golf-club-2021' ) . '">',
				'after'    => '</nav>',
				/* translators: %: Page number. */
				'pagelink' => esc_html__( 'Page %',  'simple-golf-club-2021' ),
			)
		);

		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer default-max-width">
		<?php twenty_twenty_one_entry_meta_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
