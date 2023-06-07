<?php
/**
 * News Filter template four
 * 
 * @package Newsmatic Pro
 * @since 1.0.0
 */
extract( $args );
$postCategories = ( isset( $options->query->categories ) && ! empty( $options->query->categories ) ) ? newsmatic_get_categories_for_args( $options->query->categories ) : '';
$postCategories = explode( ",", $postCategories );
array_unshift( $postCategories, 'All' );
?>
<div <?php if( isset( $options->blockId ) && !empty($options->blockId) ) echo 'id="' .esc_attr( $options->blockId ). '"'; ?> class="news-filter <?php echo esc_attr( 'layout--' . $options->layout );?>" data-args="<?php echo esc_attr( json_encode( $options ) ); ?>">
    <div class="news-filter-post-wrap">
        <div class="post_title_filter_wrap">
            <?php 
                do_action( 'newsmatic_section_block_view_all_hook', array(
                    'option'=> isset( $options->viewallOption ) ? $options->viewallOption : false,
                    'classes' => 'view-all-button',
                    'link'  => isset( $options->viewallUrl ) ? $options->viewallUrl : '',
                    'text'  => false
                ));
                
                if( $options->title ) : ?>
                    <h2 class="newsmatic-block-title">
                        <span><?php echo newsmatic_wrap_last_word( $options->title ); ?></span>
                    </h2>
            <?php endif; ?>
            <?php if( $postCategories ) : ?>
                <div class="filter-tab-wrapper">
                <?php
                        foreach( $postCategories as $postCat => $postCatVal ) :
                    ?>
                            <div class="tab-title<?php if( $postCat < 1 ) echo esc_attr( ' isActive' ); ?>" data-tab="<?php echo ( $postCat > 0 ) ? esc_attr( $postCatVal ) : 'newsmatic-filter-all'; ?>"><?php echo esc_html( $postCatVal ); ?></div>
                    <?php
                        endforeach;
                ?>
                </div>
            <?php endif; ?>
        </div>
        <?php
        if( $postCategories ) :
        ?>
            <div class="filter-tab-content-wrapper">
                <div class="tab-content content-newsmatic-filter-all">
                    <div class="row-wrap">
                        <?php
                            unset( $post_args['category_name'] );
                            $post_query = new WP_Query( $post_args );
                            $total_posts = $post_query->post_count;
                            if( $post_query->have_posts() ) :
                                while( $post_query->have_posts() ) : $post_query->the_post();
                                $current_post = $post_query->current_post;
                                        if( $current_post === 0 ) echo '<div class="featured-post">';
                                            if( $current_post === 2 ) {
                                                ?>
                                                <div class="trailing-post">
                                                <?php
                                            }
                                                // get template file w.r.t par
                                                get_template_part( 'template-parts/news-filter/content', 'one', $options );
                                            if( $total_posts === $current_post + 1 ) echo '</div><!-- .trailing-post -->';
                                        if( $current_post === 1 ) echo '</div><!-- .featured-post-->';
                                endwhile;
                                wp_reset_postdata();
                            endif;
                        ?>
                    </div><!-- .row-wrap -->
                </div>
            </div>
            <?php
        endif;
        ?>
    </div>
</div>