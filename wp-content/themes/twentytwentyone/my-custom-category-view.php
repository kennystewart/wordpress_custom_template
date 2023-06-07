<div class="article" id="post-<?php the_ID(); ?>">
    <div class="featured-image"><!-- FEATURED IMAGE -->
        <?php the_post_thumbnail(); ?>
    </div>
    <div class="content"><!-- ARTICLE HEADER -->
        <?php the_title( '<h3><a href="' . esc_url( get_permalink() ) . '">', '</a></h3>' ); ?>
        <div class="intro-text"><?php the_excerpt(); ?></div>
        <div class="post-meta">
            <div><span class="metakey">Author: </span><?php the_author_posts_link(); ?></div>
            <div><span class="metakey">Publish Date: </span><?php the_time('F jS, Y'); ?></div>
            <div><span class="metakey">Category: </span><?php the_category(', '); ?></div>
        </div>
    </div>
</div>
