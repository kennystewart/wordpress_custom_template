<?php
/**
 * Header hooks and functions
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
use Newsmatic\CustomizerDefault as ND;

if( ! function_exists( 'newsmatic_top_header_social_part' ) ) :
    /**
     * Top header social element
     * 
     * @since 1.0.0
     */
    function newsmatic_top_header_social_part() {
      ?>
         <div class="social-icons-wrap"><?php if( ND\newsmatic_get_customizer_option( 'top_header_social_option' ) ) newsmatic_customizer_social_icons(); ?></div>
      <?php
    }
    add_action( 'newsmatic_header__site_branding_section_hook', 'newsmatic_top_header_social_part', 5 );
 endif;
 
 if( ! function_exists( 'newsmatic_header_site_branding_part' ) ) :
    /**
     * Header site branding element
     * 
     * @since 1.0.0
     */
     function newsmatic_header_site_branding_part() {
         ?>
            <div class="site-branding">
                <?php
                    the_custom_logo();
                    if ( is_front_page() && is_home() ) :
                ?>
                        <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                <?php
                    else :
                ?>
                        <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
                <?php
                    endif;
                    $newsmatic_description = get_bloginfo( 'description', 'display' );
                    if ( $newsmatic_description || is_customize_preview() ) :
                ?>
                    <p class="site-description"><?php echo apply_filters( 'newsmatic_bloginfo_description', esc_html( $newsmatic_description ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
                <?php endif; ?>
            </div><!-- .site-branding -->
         <?php
     }
    add_action( 'newsmatic_header__site_branding_section_hook', 'newsmatic_header_site_branding_part', 10 );
 endif;

 if( ! function_exists( 'newsmatic_header_ads_banner_part' ) ) :
    /**
     * Header ads banner element
     * 
     * @since 1.0.0
     */
     function newsmatic_header_ads_banner_part() {
        if( ! ND\newsmatic_get_multiselect_tab_option( 'header_ads_banner_responsive_option' ) ) return;
            $header_ads_banner_custom_image = ND\newsmatic_get_customizer_option( 'header_ads_banner_custom_image' );
            $header_ads_banner_custom_url = ND\newsmatic_get_customizer_option( 'header_ads_banner_custom_url' );
            $header_ads_banner_custom_target = ND\newsmatic_get_customizer_option( 'header_ads_banner_custom_target' );
            if( ! empty( $header_ads_banner_custom_image ) ) :
            ?>
                <div class="ads-banner">
                    <a href="<?php echo esc_url( $header_ads_banner_custom_url ); ?>" target="<?php echo esc_html( $header_ads_banner_custom_target ); ?>"><img src="<?php echo esc_url( wp_get_attachment_url( $header_ads_banner_custom_image ) ); ?>"></a>
                </div><!-- .ads-banner -->
            <?php
            endif;
    }
    add_action( 'newsmatic_after_header_hook', 'newsmatic_header_ads_banner_part', 10 );
 endif;

 if( ! function_exists( 'newsmatic_header_newsletter_part' ) ) :
    /**
     * Header newsletter element
     * 
     * @since 1.0.0
     */
     function newsmatic_header_newsletter_part() {
        if( ! ND\newsmatic_get_customizer_option( 'header_newsletter_option' ) ) return;
        $header_newsletter_label = ND\newsmatic_get_customizer_option( 'header_newsletter_label' );
        $header_newsletter_redirect_href_link = ND\newsmatic_get_customizer_option( 'header_newsletter_redirect_href_link' );
        ?>
            <div class="newsletter-element">
                <a href="<?php echo esc_url( $header_newsletter_redirect_href_link ); ?>" data-popup="redirect">
                    <?php
                        if( isset($header_newsletter_label['icon']) && !empty($header_newsletter_label['icon']) ) echo '<span class="title-icon"><i class="' .esc_attr($header_newsletter_label['icon']). '"></i></span>';
                        if( isset($header_newsletter_label['text']) && !empty($header_newsletter_label['text'])  ) echo '<span class="title-text">' .esc_html($header_newsletter_label['text']). '</span>';
                    ?>
                </a>
            </div><!-- .newsletter-element -->
        <?php
     }
    add_action( 'newsmatic_header__site_branding_section_hook', function() {
        echo '<div class="header-right-button-wrap">';
    }, 29 );
    add_action( 'newsmatic_header__site_branding_section_hook', 'newsmatic_header_newsletter_part', 30 );
 endif;

 if( ! function_exists( 'newsmatic_header_random_news_part' ) ) :
    /**
     * Header random news element
     * 
     * @since 1.0.0
     */
     function newsmatic_header_random_news_part() {
        if( ! ND\newsmatic_get_customizer_option( 'header_random_news_option' ) ) return;
        $header_random_news_label = ND\newsmatic_get_customizer_option( 'header_random_news_label' );
        $header_random_news_filter = ND\newsmatic_get_customizer_option( 'header_random_news_filter' );
        ?>
            <div class="random-news-element">
                <a href="<?php echo esc_url( add_query_arg( array( 'newsmaticargs' => 'custom', 'posts'  => esc_attr( $header_random_news_filter ) ), home_url() ) ); ?>">
                    <?php
                        if( isset($header_random_news_label['icon']) && !empty($header_random_news_label['icon']) ) echo '<span class="title-icon"><i class="' .esc_attr($header_random_news_label['icon']). '"></i></span>';
                        if( isset($header_random_news_label['text']) && !empty($header_random_news_label['text'])   ) echo '<span class="title-text">' .esc_html($header_random_news_label['text']). '</span>';
                    ?>
                </a>
            </div><!-- .random-news-element -->
        <?php
     }
    add_action( 'newsmatic_header__site_branding_section_hook', 'newsmatic_header_random_news_part', 30 );
    add_action( 'newsmatic_header__site_branding_section_hook', function() {
        echo '</div><!-- .header-right-button-wrap -->';
    }, 31 );
 endif;

 if( ! function_exists( 'newsmatic_header_sidebar_toggle_part' ) ) :
    /**
     * Header sidebar toggle element
     * 
     * @since 1.0.0
     */
     function newsmatic_header_sidebar_toggle_part() {
         if( ! ND\newsmatic_get_customizer_option( 'header_sidebar_toggle_option' ) ) return;
         ?>
            <div class="sidebar-toggle-wrap">
                <a class="sidebar-toggle-trigger" href="javascript:void(0);">
                    <div class="newsmatic_sidetoggle_menu_burger">
                      <span></span>
                      <span></span>
                      <span></span>
                  </div>
                </a>
                <div class="sidebar-toggle hide">
                <span class="sidebar-toggle-close"><i class="fas fa-times"></i></span>
                  <div class="newsmatic-container">
                    <div class="row">
                      <?php dynamic_sidebar( 'header-toggle-sidebar' ); ?>
                    </div>
                  </div>
                </div>
            </div>
         <?php
     }
    add_action( 'newsmatic_header__menu_section_hook', 'newsmatic_header_sidebar_toggle_part', 30 );
 endif;

 if( ! function_exists( 'newsmatic_header_menu_part' ) ) :
    /**
     * Header menu element
     * 
     * @since 1.0.0
     */
    function newsmatic_header_menu_part() {
      ?>
        <nav id="site-navigation" class="main-navigation <?php echo esc_attr( 'hover-effect--' . ND\newsmatic_get_customizer_option( 'header_menu_hover_effect' ) ); ?>">
            <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                <div id="newsmatic_menu_burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="menu_txt"><?php esc_html_e( 'Menu', 'newsmatic' ); ?></span></button>
            <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'menu-2',
                        'menu_id'        => 'header-menu',
                    )
                );
            ?>
        </nav><!-- #site-navigation -->
      <?php
    }
    add_action( 'newsmatic_header__menu_section_hook', 'newsmatic_header_menu_part', 40 );
 endif;

 if( ! function_exists( 'newsmatic_header_search_part' ) ) :
   /**
    * Header search element
    * 
    * @since 1.0.0
    */
    function newsmatic_header_search_part() {
        if( ! ND\newsmatic_get_customizer_option( 'header_search_option' ) ) return;
        ?>
            <div class="search-wrap">
                <button class="search-trigger">
                    <i class="fas fa-search"></i>
                </button>
                <div class="search-form-wrap hide">
                    <?php echo get_search_form(); ?>
                </div>
            </div>
        <?php
    }
   add_action( 'newsmatic_header__menu_section_hook', 'newsmatic_header_search_part', 50 );
endif;

if( ! function_exists( 'newsmatic_header_theme_mode_icon_part' ) ) :
    /**
     * Header theme mode element
     * 
     * @since 1.0.0
     */
     function newsmatic_header_theme_mode_icon_part() {
        if( ! ND\newsmatic_get_customizer_option( 'header_theme_mode_toggle_option' ) ) return;
        ?>
            <div class="mode_toggle_wrap">
                <input class="mode_toggle" type="checkbox">
            </div>
        <?php
     }
    add_action( 'newsmatic_header__menu_section_hook', 'newsmatic_header_theme_mode_icon_part', 60 );
 endif;

 if( ! function_exists( 'newsmatic_header_custom_button_part' ) ) :
    /**
     * Header theme mode element
     * 
     * @since 1.0.0
     */
     function newsmatic_header_custom_button_part() {
        if( ! ND\newsmatic_get_customizer_option( 'theme_header_custom_button_option' ) ) return;
        $header_custom_button_redirect_href_link = ND\newsmatic_get_customizer_option( 'header_custom_button_redirect_href_link' );
        $header_custom_button_label = ND\newsmatic_get_customizer_option( 'header_custom_button_label' );
        ?>
            <a class="header-custom-button" href="<?php echo esc_url($header_custom_button_redirect_href_link); ?>" target="_blank">
                <?php if( $header_custom_button_label['icon'] != "fas fa-ban" ) : ?>
                    <span class="icon">
                        <i class="<?php echo esc_attr($header_custom_button_label['icon']); ?>"></i>
                    </span>
                <?php endif;
                if( $header_custom_button_label['text'] ) :
                ?>
                    <span class="ticker_label_title_string"><?php echo esc_html( $header_custom_button_label['text'] ); ?></span>
                <?php endif; ?>
            </a>
        <?php
     }
    add_action( 'newsmatic_header__menu_section_hook', 'newsmatic_header_custom_button_part', 70 );
 endif;

 if( ! function_exists( 'newsmatic_ticker_news_part' ) ) :
    /**
     * Ticker news element
     * 
     * @since 1.0.0
     */
     function newsmatic_ticker_news_part() {
        $ticker_news_visible = ND\newsmatic_get_customizer_option( 'ticker_news_visible' );
        if( $ticker_news_visible === 'none' ) return;
        if( $ticker_news_visible === 'front-page' && ! is_front_page() ) {
            return;
        } else if( $ticker_news_visible === 'innerpages' && is_front_page()  ) {
            return;
        }
        $ticker_news_post_filter = ND\newsmatic_get_customizer_option( 'ticker_news_post_filter' );
        $orderArray = explode( '-', 'date-desc' );
        $ticker_args = array(
            'order' => esc_html( $orderArray[1] ),
            'orderby' => esc_html( $orderArray[0] )
        );
        if( $ticker_news_post_filter == 'category' ) {
            $ticker_args['posts_per_page'] = 6;
            $ticker_news_categories = json_decode( ND\newsmatic_get_customizer_option( 'ticker_news_categories' ) );
            if( ND\newsmatic_get_customizer_option( 'ticker_news_date_filter' ) != 'all' ) $ticker_args['date_query'] = newsmatic_get_date_format_array_args(ND\newsmatic_get_customizer_option( 'ticker_news_date_filter' ));
            if( $ticker_news_categories ) $ticker_args['category_name'] = newsmatic_get_categories_for_args($ticker_news_categories);
        } else if( $ticker_news_post_filter == 'title' ) {
            $ticker_news_posts = json_decode(ND\newsmatic_get_customizer_option( 'ticker_news_posts' ));
            if( $ticker_news_posts ) $ticker_args['post_name__in'] = newsmatic_get_post_slugs_for_args($ticker_news_posts);
        }
         ?>
            <div class="ticker-news-wrap newsmatic-ticker layout--two">
                <?php
                    $ticker_news_title = ND\newsmatic_get_customizer_option( 'ticker_news_title' );
                    if( $ticker_news_title ) {
                        ?>
                        <div class="ticker_label_title ticker-title newsmatic-ticker-label">
                            <?php if( $ticker_news_title['icon'] != "fas fa-ban" ) : ?>
                                <span class="icon">
                                    <i class="<?php echo esc_attr($ticker_news_title['icon']); ?>"></i>
                                </span>
                            <?php endif;
                                if( $ticker_news_title['text'] ) :
                             ?>
                                    <span class="ticker_label_title_string"><?php echo esc_html( $ticker_news_title['text'] ); ?></span>
                                <?php endif; ?>
                        </div>
                        <?php
                    }
                ?>
                <div class="newsmatic-ticker-box">
                  <?php
                    $newsmatic_direction = 'left';
                    $newsmatic_dir = 'ltr';
                    if( is_rtl() ){
                      $newsmatic_direction = 'right';
                      $newsmatic_dir = 'ltr';
                    }
                  ?>

                    <ul class="ticker-item-wrap" direction="<?php echo esc_attr($newsmatic_direction); ?>" dir="<?php echo esc_attr($newsmatic_dir); ?>">
                        <?php get_template_part( 'template-parts/ticker-news/template', 'two', $ticker_args ); ?>
                    </ul>
                </div>
                <div class="newsmatic-ticker-controls">
                    <button class="newsmatic-ticker-pause"><i class="fas fa-pause"></i></button>
                </div>
            </div>
         <?php
     }
    add_action( 'newsmatic_after_header_hook', 'newsmatic_ticker_news_part', 10 );
 endif;