<?php
/**
 * Top Header hooks and functions
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
use Newsmatic\CustomizerDefault as ND;
   if( ! function_exists( 'newsmatic_top_header_date_time_part' ) ) :
      /**
       * Top header menu element
      * 
      * @since 1.0.0
      */
      function newsmatic_top_header_date_time_part() {
      if( ! ND\newsmatic_get_customizer_option( 'top_header_date_time_option' ) ) return;
      ?>
         <div class="top-date-time">
            <span class="date"><?php echo date_i18n(get_option('date_format'), current_time('timestamp')); ?></span>
            <span class="time"></span>
         </div>
      <?php
      }
      add_action( 'newsmatic_top_header_hook', 'newsmatic_top_header_date_time_part', 10 );
   endif;

 if( ! function_exists( 'newsmatic_top_header_ticker_news_part' ) ) :
    /**
     * Top header ticker news element
     * 
     * @since 1.0.0
     */
    function newsmatic_top_header_ticker_news_part() {
      if( ! ND\newsmatic_get_customizer_option( 'top_header_ticker_news_option' ) || ND\newsmatic_get_customizer_option('top_header_right_content_type') != 'ticker-news' ) return;
      $top_header_ticker_news_post_filter = ND\newsmatic_get_customizer_option( 'top_header_ticker_news_post_filter' );
      if( $top_header_ticker_news_post_filter == 'category' ) {
            $ticker_args['posts_per_page'] = 4;
            $top_header_ticker_news_categories = json_decode( ND\newsmatic_get_customizer_option( 'top_header_ticker_news_categories' ) );
            if( ND\newsmatic_get_customizer_option( 'top_header_ticker_news_date_filter' ) != 'all' ) $ticker_args['date_query'] = newsmatic_get_date_format_array_args(ND\newsmatic_get_customizer_option( 'top_header_ticker_news_date_filter' ));
            if( $top_header_ticker_news_categories ) $ticker_args['category_name'] = newsmatic_get_categories_for_args($top_header_ticker_news_categories);
      } else if( $top_header_ticker_news_post_filter == 'title' ) {
            $top_header_ticker_news_posts = json_decode(ND\newsmatic_get_customizer_option( 'top_header_ticker_news_posts' ));
            if( $top_header_ticker_news_posts ) {
               $ticker_args['post_name__in'] = newsmatic_get_post_slugs_for_args($top_header_ticker_news_posts);
            }
      }
      ?>
         <div class="top-ticker-news">
            <ul class="ticker-item-wrap">
               <?php
               if( isset( $ticker_args ) ) :
                     $ticker_args['ignore_sticky_posts'] = true;
                     $ticker_query = new WP_Query( $ticker_args );
                     if( $ticker_query->have_posts() ) :
                        while( $ticker_query->have_posts() ) : $ticker_query->the_post();
                        ?>
                           <li class="ticker-item"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2></li>
                        <?php
                        endwhile;
                        wp_reset_postdata();
                     endif;
                  endif;
               ?>
            </ul>
			</div>
      <?php
    }
    add_action( 'newsmatic_top_header_hook', 'newsmatic_top_header_ticker_news_part', 10 );
 endif;

 if( ! function_exists( 'newsmatic_top_header_menu_part' ) ) :
   /**
    * Top header menu element
    * 
    * @since 1.0.0
    */
   function newsmatic_top_header_menu_part() {
     if( ! ND\newsmatic_get_customizer_option( 'top_header_menu_option' ) || ND\newsmatic_get_customizer_option('top_header_right_content_type') != 'nav-menu' ) return;
     ?>
        <div class="top-nav-menu">
            <?php
               wp_nav_menu(
                     array(
                        'theme_location' => 'menu-1',
                        'menu_id'        => 'top-menu',
                        'depth'  => 1
                     )
               );
            ?>
        </div>
     <?php
   }
   add_action( 'newsmatic_top_header_hook', 'newsmatic_top_header_menu_part', 10 );
endif;