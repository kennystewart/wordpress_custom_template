<?php
/**
 *
 * Theme Functions
 * 
 * @since simple-golf-club-2021 1.0
 */

define( 'SGC_COMPATIBLE', true );   // Let the Simple Golf CLub Plugin know this theme supports it

/** Enqueue Parent Theme and child elements **/
function sgc_twentytwentyone_enqueue_styles() {

    // Parent style id - replace your child theme name
    $parent_style = 'twentytwentyone';
    
    // Enqueue Parent theme's style
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );

    // Enqueue Child theme's style 
    wp_enqueue_style( 'sgc_twentytwentyone_child', 
            get_stylesheet_directory_uri() . '/style.css', array( $parent_style ) );
    wp_enqueue_style( 'sgc_twentytwentyone_partials', 
            get_stylesheet_directory_uri() . '/assets/css/partials.css', 'sgc_twentytwentyone_child' );
    
}
add_action( 'wp_enqueue_scripts', 'sgc_twentytwentyone_enqueue_styles' );

/** Enqueue Scripts */
function sgc_twentytwentyone_enqueue_scripts() {
    wp_enqueue_script( 'sgcc-event-player-checkin', get_stylesheet_directory_uri() . '/assets/js/sgc_checkin.js', array( 'jquery' ) );
}
add_action( 'wp_enqueue_scripts', 'sgc_twentytwentyone_enqueue_scripts' );

/** Check for Simple Golf Club Plugin **/
function sgc_twentytwentyone_check_admin_notice() {
    global $pagenow;
    
    // Only apply to these admin pages
    $admin_pages = [ 'index.php', 'edit.php', 'plugins.php', 'themes.php' ];
    if ( in_array($pagenow, $admin_pages) ) {
        if ( defined('SGC_VERSION') ) : ?>
 
            <div class="notice notice-success is-dismissible">
                <p><?php _e('<strong>Success!</strong> The <a href="" target="_blank">Simple Golf Club 2021 Child Theme</a> and <a href="https://wordpress.org/plugins/simple-golf-club/" target="_blank">Simple Golf Club Plugin</a> are both installed and activated. Enjoy Using SGC!', 'simple-golf-club-2021') ?></p>
            </div>
 
        <?php else : ?>
 
            <div class="notice notice-warning is-dismissible">
                <p><?php _e('<strong>Warning!</strong> SGC Child theme is intended to work with the <a href="https://wordpress.org/plugins/simple-golf-club/" target="_blank">Simple Golf Club Plugin</a>.<br>The SGC Plugin has either not been installed or is not activated. Please install and activate it before continuing.', 'simple-golf-club-2021') ?></p>
            </div>
             
        <?php endif;
    }
}
add_action( 'admin_notices', 'sgc_twentytwentyone_check_admin_notice' );

/** Set up theme support */
function sgc_twentytwentyone_theme_setup() {
    add_theme_support( "title-tag" );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( "wp-block-styles" ) ;
    add_theme_support( "responsive-embeds" );
    add_theme_support( "html5", array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption') );
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    ));
    add_theme_support( 'custom-header', array(
        'default-image'          => '',
        'width'                  => 300,
        'height'                 => 60,
        'flex-height'            => true,
        'flex-width'             => true,
        'default-text-color'     => '',
        'header-text'            => true,
        'uploads'                => true,
    ));
    add_theme_support( 'custom-background', array(
        'default-image'          => '',
        'default-preset'         => 'default',
        'default-size'           => 'cover',
        'default-repeat'         => 'no-repeat',
        'default-attachment'     => 'scroll',
    ));
    add_theme_support( "align-wide" );
    add_editor_style();
    add_theme_support( "post-thumbnails" );
}
add_action('after_setup_theme','sgc_twentytwentyone_theme_setup');

/**
 * Add a sidebar.
 */
function sgc_twentytwentyone_theme_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'footer Sidebar', 'simple-golf-club-2021' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Widgets in this area will be shown on all posts and pages.', 'simple-golf-club-2021' ),
        'before_widget' => '<li id="%1$s" class="widget %2$s">',
        'after_widget'  => '</li>',
        'before_title'  => '<h2 class="widgettitle">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'sgc_twentytwentyone_theme_widgets_init' );

/** Include twenty_twenty_one_entry_meta_footer */
include_once( get_stylesheet_directory() . '/inc/template-tags.php' );
