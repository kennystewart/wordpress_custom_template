<div class="single-blog-post mb-50">
    <span class="post-date"><?php the_time('F jS, Y'); ?></span>
    <?php the_title( sprintf( '<a href="%s" class="post-title">', esc_url( get_permalink() ) ), '</a>' ); ?>

    <?php if ( ! post_password_required() && ! is_attachment() && has_post_thumbnail() ) {
        the_post_thumbnail();
    } ?>

    <div class="post-meta">
        <a href="#" class="post-author"><?php the_author_posts_link(); ?></a>
        <a href="#" class="post-tutorial">Tutorials</a>
    </div>

    <p><?php the_excerpt(); ?></p>
    
    <a href="#" class="btn continue-btn">Continue Reading <i class="arrow_right"></i>
    </a>
</div>