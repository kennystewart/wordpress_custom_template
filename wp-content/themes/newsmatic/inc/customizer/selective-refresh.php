<?php
/**
 * Includes functions for selective refresh
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
use Newsmatic\CustomizerDefault as ND;
if( ! function_exists( 'newsmatic_customize_selective_refresh' ) ) :
    /**
     * Adds partial refresh for the customizer preview
     * 
     */
    function newsmatic_customize_selective_refresh( $wp_customize ) {
        if ( ! isset( $wp_customize->selective_refresh ) ) return;
        // top header show hide
        $wp_customize->selective_refresh->add_partial(
            'top_header_option',
            array(
                'selector'        => '#masthead .top-header',
                'render_callback' => 'newsmatic_top_header_html'
            )
        );
        // top header social icons show hide
        $wp_customize->selective_refresh->add_partial(
            'top_header_social_option',
            array(
                'selector'        => '#masthead .main-header .social-icons-wrap',
                'render_callback' => 'newsmatic_top_header_social_part_selective_refresh'
            )
        );
        // header sidebar toggle show hide
        $wp_customize->selective_refresh->add_partial(
            'header_sidebar_toggle_option',
            array(
                'selector'        => '#masthead .sidebar-toggle-wrap',
                'render_callback' => 'newsmatic_header_sidebar_toggle_part_selective_refresh'
            )
        );
        // header search icon show hide
        $wp_customize->selective_refresh->add_partial(
            'header_search_option',
            array(
                'selector'        => '#masthead .search-wrap',
                'render_callback' => 'newsmatic_header_search_part_selective_refresh'
            )
        );
        // theme mode toggle show hide
        $wp_customize->selective_refresh->add_partial(
            'header_theme_mode_toggle_option',
            array(
                'selector'        => '#masthead .mode_toggle_wrap',
                'render_callback' => 'newsmatic_header_theme_mode_icon_part_selective_refresh'
            )
        );
        // site title
        $wp_customize->selective_refresh->add_partial(
            'blogname',
            array(
                'selector'        => '.site-title a',
                'render_callback' => 'newsmatic_customize_partial_blogname',
            )
        );
        // site description
        $wp_customize->selective_refresh->add_partial(
            'blogdescription',
            array(
                'selector'        => '.site-description',
                'render_callback' => 'newsmatic_customize_partial_blogdescription',
            )
        );
        
        // social icons target attribute
        $wp_customize->selective_refresh->add_partial(
            'social_icons_target',
            array(
                'selector'        => '.top-header .social-icons-wrap',
                'render_callback' => 'newsmatic_customizer_social_icons',
            )
        );

        // social icons
        $wp_customize->selective_refresh->add_partial(
            'social_icons',
            array(
                'selector'        => '.top-header .social-icons-wrap',
                'render_callback' => 'newsmatic_customizer_social_icons',
            )
        );

        // post read more button label
        $wp_customize->selective_refresh->add_partial(
            'global_button_text',
            array(
                'selector'        => 'article .post-link-button',
                'render_callback' => 'newsmatic_customizer_read_more_button',
            )
        );

        // scroll to top label
        $wp_customize->selective_refresh->add_partial(
            'stt_text',
            array(
                'selector'        => '#newsmatic-scroll-to-top',
                'render_callback' => 'newsmatic_customizer_stt_button',
            )
        );

        // ticker news title
        $wp_customize->selective_refresh->add_partial(
            'ticker_news_title',
            array(
                'selector'        => '.ticker-news-wrap .ticker_label_title',
                'render_callback' => 'newsmatic_customizer_ticker_label',
            )
        );

        // newsletter label
        $wp_customize->selective_refresh->add_partial(
            'header_newsletter_label',
            array(
                'selector'        => '.newsletter-element',
                'render_callback' => 'newsmatic_customizer_newsletter_button_label',
            )
        );

        // random news label
        $wp_customize->selective_refresh->add_partial(
            'header_random_news_label',
            array(
                'selector'        => '.random-news-element',
                'render_callback' => 'newsmatic_customizer_random_news_button_label',
            )
        );

        // single post related posts option
        $wp_customize->selective_refresh->add_partial(
            'single_post_related_posts_option',
            array(
                'selector'        => '.single-related-posts-section-wrap',
                'render_callback' => 'newsmatic_single_related_posts',
            )
        );
        
        // footer option
        $wp_customize->selective_refresh->add_partial(
            'footer_option',
            array(
                'selector'        => 'footer .main-footer',
                'render_callback' => 'newsmatic_footer_sections_html',
                'container_inclusive'=> true
            )
        );

        // footer column option
        $wp_customize->selective_refresh->add_partial(
            'footer_widget_column',
            array(
                'selector'        => 'footer .main-footer',
                'render_callback' => 'newsmatic_footer_sections_html',
            )
        );

        // bottom footer option
        $wp_customize->selective_refresh->add_partial(
            'bottom_footer_option',
            array(
                'selector'        => 'footer .bottom-footer',
                'render_callback' => 'newsmatic_bottom_footer_sections_html',
            )
        );

        // bottom footer menu option
        $wp_customize->selective_refresh->add_partial(
            'bottom_footer_menu_option',
            array(
                'selector'        => 'footer .bottom-footer .bottom-menu',
                'render_callback' => 'newsmatic_bottom_footer_menu_part_selective_refresh',
            )
        );
    }
    add_action( 'customize_register', 'newsmatic_customize_selective_refresh' );
endif;

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function newsmatic_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function newsmatic_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

// global button label
function newsmatic_customizer_read_more_button() {
    $global_button_text = ND\newsmatic_get_customizer_option( 'global_button_text' );
    return ( esc_html( $global_button_text['text'] ) . '<i class="' .esc_attr( $global_button_text['icon'] ). '"></i>' );
}

// scroll to top button label
function newsmatic_customizer_stt_button() {
    $stt_text = ND\newsmatic_get_customizer_option( 'stt_text' );
    if( $stt_text['icon'] == 'fas fa-ban' ) return( '<span class="icon-text">' .esc_html( $stt_text['text'] ). '</span>' );
    return( '<span class="icon-holder"><i class="' .esc_attr( $stt_text['icon'] ). '"></i></span><span class="icon-text">' .esc_html( $stt_text['text'] ). '</span>' );
}

// ticker label latest tab
function newsmatic_customizer_ticker_label() {
    $ticker_news_title = ND\newsmatic_get_customizer_option( 'ticker_news_title' );
    return ( '<span class="icon"><i class="' .esc_attr( $ticker_news_title['icon'] ). '"></i></span><span class="ticker_label_title_string">' .esc_html( $ticker_news_title['text'] ). '</span>' );
}

// newsletter button label
function newsmatic_customizer_newsletter_button_label() {
    $header_newsletter_label = ND\newsmatic_get_customizer_option( 'header_newsletter_label' );
    ob_start();
        if( isset($header_newsletter_label['icon']) ) echo '<span class="title-icon"><i class="' .esc_attr($header_newsletter_label['icon']). '"></i></span>';
        if( isset($header_newsletter_label['text']) ) echo '<span class="title-text">' .esc_html($header_newsletter_label['text']). '</span>';
    $content = ob_get_clean();
    return $content;
}

// random news button label
function newsmatic_customizer_random_news_button_label() {
    $header_random_news_label = ND\newsmatic_get_customizer_option( 'header_random_news_label' );
    ob_start();
        if( isset($header_random_news_label['icon']) ) echo '<span class="title-icon"><i class="' .esc_attr($header_random_news_label['icon']). '"></i></span>';
        if( isset($header_random_news_label['text']) ) echo '<span class="title-text">' .esc_html($header_random_news_label['text']). '</span>';
    $content = ob_get_clean();
    return $content;
}

// top header social icons part
function newsmatic_top_header_social_part_selective_refresh() {
    if( ! ND\newsmatic_get_customizer_option( 'top_header_social_option' ) ) return;
    ?>
       <div class="social-icons-wrap">
          <?php newsmatic_customizer_social_icons(); ?>
       </div>
    <?php
}

function newsmatic_header_sidebar_toggle_part_selective_refresh() {
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
             <div class="newsmatic-container">
               <div class="row">
                 <?php dynamic_sidebar( 'header-toggle-sidebar' ); ?>
               </div>
             </div>
           </div>
       </div>
    <?php
}

function newsmatic_header_search_part_selective_refresh() {
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

function newsmatic_header_theme_mode_icon_part_selective_refresh() {
    if( ! ND\newsmatic_get_customizer_option( 'header_theme_mode_toggle_option' ) ) return;
    ?>
        <div class="mode_toggle_wrap">
            <input class="mode_toggle" type="checkbox">
        </div>
    <?php
 }

// bottom footer menu part
function newsmatic_bottom_footer_menu_part_selective_refresh() {
    if( ! ND\newsmatic_get_customizer_option( 'bottom_footer_menu_option' ) ) return;
    ?>
       <div class="bottom-menu">
          <?php
          if( has_nav_menu( 'menu-3' ) ) :
             wp_nav_menu(
                array(
                   'theme_location' => 'menu-3',
                   'menu_id'        => 'bottom-footer-menu',
                   'depth' => 1
                )
             );
             else :
                if ( is_user_logged_in() && current_user_can( 'edit_theme_options' ) ) {
                   ?>
                      <a href="<?php echo esc_url( admin_url( '/nav-menus.php?action=locations' ) ); ?>"><?php esc_html_e( 'Setup Bottom Footer Menu', 'newsmatic' ); ?></a>
                   <?php
                }
             endif;
          ?>
       </div>
    <?php
 }