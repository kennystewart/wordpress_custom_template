<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Newsmatic
 */
$archive_post_element_order = $args['archive_post_element_order'];
$archive_post_meta_order = $args['archive_post_meta_order'];
?>
<article id="post-<?php the_ID(); ?>" <?php post_class('post'); ?>>
	<figure class="post-thumb-wrap <?php if(!has_post_thumbnail()){ echo esc_attr('no-feat-img');} ?>">
        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
            <?php
                if( has_post_thumbnail() ) { 
                    the_post_thumbnail( 'newsmatic-list', array(
                        'title' => the_title_attribute(array(
                            'echo'  => false
                        ))
                    ));
                }
            ?>
        </a>
        <?php newsmatic_get_post_categories(get_the_ID(), 0); ?>
    </figure>
    <div class="post-element">
        <?php
            foreach( $archive_post_element_order as $element_order ) :
                if( $element_order['option'] ) {
                    switch( $element_order['value'] ) {
                        case 'title': ?> <h2 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
                        <?php
                            break;
                        case 'meta': ?> 
                                    <div class="post-meta">
                                        <?php
                                            foreach( $archive_post_meta_order as $meta_order ) :
                                                if( $meta_order['option'] ) {
                                                    switch( $meta_order['value'] ) {
                                                        case 'author': newsmatic_posted_by();
                                                                    break;
                                                        case 'date': newsmatic_posted_on();
                                                                    break;
                                                        case 'comments': newsmatic_comments_number();
                                                                    break;
                                                        case 'read-time': echo '<span class="read-time">' .newsmatic_post_read_time( get_the_content() ). ' ' .esc_html__( 'mins', 'newsmatic' ). '</span>';
                                                                    break;
                                                        default: '';
                                                    }
                                                }
                                            endforeach;
                                        ?>
                                    </div>
                        <?php
                                    break;
                            case 'excerpt': ?> <div class="post-excerpt"><?php the_excerpt(); ?></div>
                                    <?php
                                            break;
                            case 'button':
                                            do_action( 'newsmatic_section_block_view_all_hook', array(
                                                'option'    => $element_order['option']
                                            ));
                                            break;
                        default: '';
                    }
                }
            endforeach;
        ?>
    </div>
</article><!-- #post-<?php the_ID(); ?> -->