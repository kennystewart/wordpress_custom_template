<?php
/**
 * Template part for displaying block content in filter block
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Newsmatic
 */
?>
<article class="filter-item <?php if(!has_post_thumbnail()) { echo esc_attr('no-feat-img');} ?>">
    <figure class="post-thumb-wrap">
        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
            <?php
                if( has_post_thumbnail() ) { 
                    the_post_thumbnail('newsmatic-featured', array(
                        'title' => the_title_attribute(array(
                            'echo'  => false
                        ))
                    ));
                }
            ?>
        </a>
        <?php if( $args->categoryOption ) newsmatic_get_post_categories( get_the_ID(), 2 ); ?>
    </figure>
    <div class="post-element">
        <h2 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
        <div class="post-meta">
            <?php if( $args->authorOption ) newsmatic_posted_by(); ?>
            <?php if( $args->dateOption ) newsmatic_posted_on(); ?>
            <?php if( $args->commentOption ) echo '<a href="'.esc_url( get_the_permalink()).'/#comments"><span class="post-comment">' .absint( get_comments_number() ). '</span></a>'; ?>
        </div>

            <div class="post-excerpt"><?php echo esc_html( wp_trim_words( wp_strip_all_tags( get_the_excerpt() ), 10 ) ); ?></div>
        <?php
            do_action( 'newsmatic_section_block_view_all_hook', array(
                'option'    => isset( $args->buttonOption ) ? $args->buttonOption : false
            ));
        ?>
    </div>
</article>