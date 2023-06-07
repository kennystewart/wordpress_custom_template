<div class="hami-sidebar-area pl-md-4 mb-50">
    <div class="single-widget-area mb-50">
        <?php echo get_search_form(); ?>
    </div>
    <div class="single-widget-area mb-50">
        <h4 class="widget-title mb-30">Categories</h4>
        <ul class="catagories-list"> 
            <?php
                //retrieving all posts using empty args
                $args = array(
                  "hide_empty" => false//to get all categories
                );
                $categories = get_categories($args);

                //printing category name
                foreach($categories as $category){
                    echo '
                        <li>
                          <a href="' . get_category_link( $category->term_id ) . '">
                            <i class="fa fa-angle-double-right" aria-hidden="true"></i> '. $category->name .'
                          </a>
                        </li>';
                }
            ?> 
        </ul>
    </div>
    <div class="single-widget-area mb-50">
        <h4 class="widget-title mb-30">Recent Posts</h4>

        <?php
            $args = array( 'numberposts' => 3, 'order'=> 'DESC', 'orderby' => 'publish' );
            $postslist = get_posts( $args );
            foreach ($postslist as $post) :  setup_postdata($post); ?>
                <div class="single-recent-post d-flex">
                  <div class="post-thumb">
                      <a href="<?php the_permalink(); ?>">
                          <img src="img/bg-img/10.jpg" alt="">
                      </a>
                  </div>
                  <div class="post-content">
                      <a href="<?php the_permalink(); ?>" class="post-title"><?php the_title(); ?></a>
                      <p class="post-date"><?php the_time('F jS, Y'); ?></p>
                  </div>
              </div>

        <?php endforeach; ?>
        
    </div>
    <!-- <div class="single-widget-area mb-50">
        <a href="#">
            <img src="img/core-img/banner.png" alt="">
        </a>
    </div> -->
    <div class="single-widget-area mb-50">
        <h4 class="widget-title mb-30">Popular Tags</h4>
        <ul class="popular-tags">
            <?php do_action('blog_tagtaxes', 'ASC'); ?>
        </ul>
    </div>
</div>