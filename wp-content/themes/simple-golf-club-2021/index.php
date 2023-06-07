<?php
/**
 * The main template file
 * @since simple-golf-club-2021 1.0
 */

get_header(); ?>

<?php if ( is_home() && ! is_front_page() && ! empty( single_post_title( '', false ) ) ) : ?>
	<header class="page-header alignwide">
		<h1 class="page-title"><?php single_post_title(); ?></h1>
	</header><!-- .page-header -->
<?php endif; ?>

<?php
if ( have_posts() ) {

	// Load posts loop.
	while ( have_posts() ) {
		the_post();

                if( get_post_type() === 'sgc_event' ) {
                    get_template_part( 'template-parts/content/sgc_event_archive', get_theme_mod( 'display_excerpt_or_full_post', 'excerpt' ) );
                } else {
                    get_template_part( 'template-parts/content/content', get_theme_mod( 'display_excerpt_or_full_post', 'excerpt' ) );
                }
	}

	// Previous/next page navigation.
	twenty_twenty_one_the_posts_navigation();

} else {

	// If no content, include the "No posts found" template.
	get_template_part( 'template-parts/content/content-none' );

}

get_footer();
