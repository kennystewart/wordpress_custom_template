<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Newsmatic
 */
use Newsmatic\CustomizerDefault as ND;
?>
<section class="no-results not-found">
	<header class="page-header">
		<?php if( is_search() ) : ?>
			<h1 class="page-title newsmatic-block-title"><?php echo newsmatic_wrap_last_word( esc_html( str_replace( '%key%', get_search_query(), sprintf( esc_html__( 'Nothing Found for - %1s', 'newsmatic' ), '%key%' ) ) ) ); ?></h1>
		<?php else : ?>
			<h1 class="page-title newsmatic-block-title"><?php echo newsmatic_wrap_last_word( esc_html__( 'Nothing Found', 'newsmatic' ) ); ?></h1>
		<?php  endif;  ?>
	</header><!-- .page-header -->

	<div class="page-content">
		<?php
		if ( is_home() && current_user_can( 'publish_posts' ) ) :
			printf(
				'<p>' . wp_kses(
					/* translators: 1: link to WP admin new post page. */
					__( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'newsmatic' ),
					array(
						'a' => array(
							'href' => array(),
						),
					)
				) . '</p>',
				esc_url( admin_url( 'post-new.php' ) )
			);
		elseif ( is_search() ) :
			?>
			<p><?php echo esc_html__( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'newsmatic' ); ?></p>
			<?php
			get_search_form();

		else :
			?>
			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'newsmatic' ); ?></p>
			<?php
			get_search_form();

		endif;
		?>
	</div><!-- .page-content -->
</section><!-- .no-results -->
