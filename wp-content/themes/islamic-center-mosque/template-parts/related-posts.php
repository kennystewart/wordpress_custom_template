<?php
/**
 * Related posts based on categories and tags.
 * 
 */

$islamic_center_mosque_related_posts_taxonomy = get_theme_mod( 'islamic_center_mosque_related_posts_taxonomy', 'category' );

$islamic_center_mosque_post_args = array(
    'posts_per_page'    => absint( get_theme_mod( 'islamic_center_mosque_related_posts_count', '3' ) ),
    'orderby'           => 'rand',
    'post__not_in'      => array( get_the_ID() ),
);

$islamic_center_mosque_tax_terms = wp_get_post_terms( get_the_ID(), 'category' );
$islamic_center_mosque_terms_ids = array();
foreach( $islamic_center_mosque_tax_terms as $tax_term ) {
	$islamic_center_mosque_terms_ids[] = $tax_term->term_id;
}

$islamic_center_mosque_post_args['category__in'] = $islamic_center_mosque_terms_ids; 

if(get_theme_mod('islamic_center_mosque_related_post',true)==1){

$islamic_center_mosque_related_posts = new WP_Query( $islamic_center_mosque_post_args );

if ( $islamic_center_mosque_related_posts->have_posts() ) : ?>
    <div class="related-post">
        <h3 class="py-3"><?php echo esc_html(get_theme_mod('islamic_center_mosque_related_post_title','Related Post'));?></h3>
        <div class="row">
            <?php while ( $islamic_center_mosque_related_posts->have_posts() ) : $islamic_center_mosque_related_posts->the_post(); ?>
                <?php get_template_part('template-parts/grid-layout'); ?>
            <?php endwhile; ?>
        </div>
    </div>
<?php endif;
wp_reset_postdata();

}