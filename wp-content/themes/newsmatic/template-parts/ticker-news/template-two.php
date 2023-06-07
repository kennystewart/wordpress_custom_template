<?php
/**
 * Ticker news template two
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
use Newsmatic\CustomizerDefault as ND;
$ticker_query = new WP_Query( $args );
if( $ticker_query->have_posts() ) :
    while( $ticker_query->have_posts() ) : $ticker_query->the_post();
    ?>
        <li class="ticker-item">
            <figure class="feature_image">
                <?php
                    if( has_post_thumbnail()  ) : ?>
                        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                            <?php
                                the_post_thumbnail('newsmatic-thumb', array(
                                            'title' => the_title_attribute(array(
                                                'echo'  => false
                                            ))
                                        ));
                                    ?>
                        </a>
                <?php 
                    endif;
                ?>
            </figure>
            <div class="title-wrap">
                <h2 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
                <?php newsmatic_posted_on(); ?>
            </div>
        </li>
    <?php
    endwhile;
    wp_reset_postdata();
endif;