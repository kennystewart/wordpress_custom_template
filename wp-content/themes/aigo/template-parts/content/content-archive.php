<div class="hami-news-area section-padding-100-0">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-7 col-lg-8">
                <?php if( have_posts() ) : ?>

                    <?php while ( have_posts() ) : ?>
                        <?php the_post(); ?>
                        <?php //get_template_part( 'template-parts/content/content', get_theme_mod( 'display_excerpt_or_full_post', 'excerpt' ) ); ?>
                        <?php //include 'my-custom-category-view.php'; ?>	
                        <?php get_template_part( 'template-parts/content/content-archive/content-archive-patern' ); ?>
                    <?php endwhile; ?>

                <?php else : ?>
                    <?php get_template_part( 'template-parts/content/content-archive/content-archive-none' ); ?>
                <?php endif; ?>

            </div>
            <div class="col-12 col-md-5 col-lg-4">
                <?php get_template_part( 'template-parts/widget/right-sidebar-widget' ); ?>
            </div>
        </div>
    </div>
</div>
        
