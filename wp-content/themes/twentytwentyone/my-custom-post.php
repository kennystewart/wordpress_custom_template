<?php

/*
 * Template Name: My custom post template
 * Template Post Type: post
 */
get_header();   

?>

<main id="site-content" class="mcpt-post" role="main">
<?php
    if ( have_posts() ) {
    while ( have_posts() ) {
    the_post(); 
    ?>
    <h2><?php the_title(); ?></h2>
    <div id="content-top">
        <div id="content-top-left"><?php the_excerpt(); ?></div>
        <div id="content-top-right"><?php the_post_thumbnail(); ?></div>
    </div>
    <div id="content-main">
        <div id="content-main-left">
            <span class="metakey">Author: </span><?php the_author_posts_link(); ?><br>
            <span class="metakey">Publish Date: </span><?php the_time('F jS, Y'); ?><br>
            <span class="metakey">Category: </span><?php the_category(', '); ?>
        </div>
        <div id="content-main-right"><?php the_content(); ?></div>
    </div>
    <?php }
}
?>
</main><!-- #site-content -->

<style>
    .mcpt-post {    width: 80%;   margin: 0 auto; }
    h2 {    text-align: center; }
    div#content-top-left {  width: 30%; float: left; font-size: 26px; font-family: book antiqua; font-style: italic;  padding: 30px; color: grey; }
    div#content-top-right {    width: 70%;   float: left;  }
    div#content-main-left {    width: 30%;   float: left; padding: 30px; font-family: book antiqua; }
    div#content-main-right {    width: 70%;   float: left; padding-top: 30px; font-family: tahoma;  color: slategray; }
    span.metakey {  color: grey; }
</style>

<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>
<?php get_footer(); ?>