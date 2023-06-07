<?php

use ColibriWP\Theme\AssetsManager;
use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Core\Utils;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Theme;

require_once get_template_directory() . "/inc/vendor/autoload.php";


function colibriwp_page_builder_components( $components ) {
    $namespace = "ColibriWP\\Theme\\BuilderComponents";

    $components = array_merge( $components, array(

        'css'                => "{$namespace}\\CSSOutput",

        // header components
        'header'             => "{$namespace}\\Header",

        // footer components
        'footer'             => "{$namespace}\\Footer",

        // page content
        'main'               => "{$namespace}\\MainContent",
        'single'             => "{$namespace}\\SingleContent",
        'content'            => "{$namespace}\\PageContent",
        'front-page-content' => "{$namespace}\\FrontPageContent",
        // sidebar
        'sidebar'            => "{$namespace}\\Sidebar",
        // 404
        'page-not-found'     => "{$namespace}\\PageNotFound",

        // woo
        'main-woo'           => "{$namespace}\\WooContent",
    ) );

    return $components;
}

function colibriwp_default_components( $components ) {

    $namespace = "ColibriWP\\Theme\\Components";

    $components = array_merge( $components, array(

        // header components
        'header'               => "{$namespace}\\Header",
        'logo'                 => "{$namespace}\\Header\\Logo",
        'header-menu'          => "{$namespace}\\Header\\HeaderMenu",

        // inner page fragments
        'inner-nav-bar'        => "{$namespace}\\InnerHeader\\NavBar",
        'inner-top-bar'        => "{$namespace}\\InnerHeader\\TopBar",
        'inner-hero'           => "{$namespace}\\InnerHeader\\Hero",
        'inner-title'          => "{$namespace}\\InnerHeader\\Title",

        // front page fragments
        'front-hero'           => "{$namespace}\\FrontHeader\\Hero",
        'front-title'          => "{$namespace}\\FrontHeader\\Title",
        'front-subtitle'       => "{$namespace}\\FrontHeader\\Subtitle",
        'front-buttons'        => "{$namespace}\\FrontHeader\\ButtonsGroup",
        'top-bar-list-icons'   => "{$namespace}\\FrontHeader\\TopBarListIcons",
        'top-bar-social-icons' => "{$namespace}\\FrontHeader\\TopBarSocialIcons",
        'front-nav-bar'        => "{$namespace}\\FrontHeader\\NavBar",
        'front-top-bar'        => "{$namespace}\\FrontHeader\\TopBar",
        'front-image'          => "{$namespace}\\FrontHeader\\Image",


        // footer components
        'footer'               => "{$namespace}\\Footer",
        'front-footer'         => "{$namespace}\\Footer\\FrontFooter",

        // general components
        'css'                  => "{$namespace}\\CSSOutput",

        // page content
        'main'                 => "{$namespace}\\MainContent",
        'single'               => "{$namespace}\\SingleContent",
        'content'              => "{$namespace}\\PageContent",
        'front-page-content'   => "{$namespace}\\FrontPageContent",
        'search'               => "{$namespace}\\PageSearch",
        'page-not-found'       => "{$namespace}\\PageNotFound",

        // inner content fragments

        //main content
        'main-loop'            => "{$namespace}\\MainContent\ArchiveLoop",
        'post-loop'            => "{$namespace}\\MainContent\PostLoop",
        'archive-loop'         => "{$namespace}\\MainContent\ArchiveLoop",
        'single-template'      => "{$namespace}\\MainContent\SingleItemTemplate",

        // sidebar
        'sidebar'              => "{$namespace}\\Sidebar",

        // woo
        'main-woo'             => "{$namespace}\\WooContent",
    ) );

    return $components;
}

function colibriwp_register_components( $components = array() ) {
    if ( apply_filters( 'colibri_page_builder/installed', false ) ) {
        $components = colibriwp_page_builder_components( $components );
    } else {
        $components = colibriwp_default_components( $components );
    }

    return $components;
}

Hooks::colibri_add_action( 'components', 'colibriwp_register_components' );
Theme::load();


/**
 * @return Theme
 */
function colibriwp_theme() {
    return Theme::getInstance();
}


/**
 * @return AssetsManager
 */
function colibriwp_assets() {
    return colibriwp_theme()->getAssetsManager();
}


colibriwp_theme()
    ->add_theme_support( 'automatic-feed-links' )
    ->add_theme_support( 'title-tag' )
    ->add_theme_support( 'post-thumbnails' )
    ->add_theme_support( 'custom-logo', array(
        'flex-height' => true,
        'flex-width'  => true,
        'width'       => 150,
        'height'      => 70,
    ) )
    ->register_menus( array(
        'header-menu' => esc_html__( 'Header Menu', 'colibri-wp' ),
        'footer-menu' => esc_html__( 'Footer Menu', 'colibri-wp' ),
    ) )
    ->register_sidebars( array(
        array(
            'name'          => esc_html__( 'Blog sidebar widget area', 'colibri-wp' ),
            'id'            => 'colibri-sidebar-1',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'before_title'  => '<h5 class="widgettitle">',
            'after_title'   => '</h5>',
            'after_widget'  => '</div>',
        ),

        array(
            'name'          => esc_html__( 'Woo Commerce left sidebar widget area', 'colibri-wp' ),
            'id'            => 'colibri-ecommerce-left',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'before_title'  => '<h5 class="widgettitle">',
            'after_title'   => '</h5>',
            'after_widget'  => '</div>',
        ),
    ) );


if ( ! apply_filters( 'colibri_page_builder/installed', false ) ) {
    colibriwp_assets()
        ->registerTemplateScript(
            "colibri-theme",
            "/theme/theme.js",
            array( 'jquery', 'jquery-effects-slide', 'jquery-effects-core' )
        )
        ->registerStylesheet( "colibri-theme", "/theme/theme.css" )
        ->addGoogleFont( "Open Sans", array( "300", "400", "600", "700" ) )
        ->addGoogleFont(
            "Muli",
            array(
                "300",
                "300italic",
                "400",
                "400italic",
                "600",
                "600italic",
                "700",
                "700italic",
                "900",
                "900italic"
            )
        );
}

add_filter( 'colibri_page_builder/theme_supported', '__return_true' );


//blog options

function colibriwp_show_post_meta_setting_filter( $value ) {

    $value = get_theme_mod( 'blog_post_meta_enabled', $value );

    return ( $value == 1 );
}

add_filter( 'colibriwp_show_post_meta', 'colibriwp_show_post_meta_setting_filter' );


function colibriwp_posts_per_row_setting_filter( $value ) {

    $value = get_theme_mod( 'blog_posts_per_row', $value );

    return $value;
}

add_filter( 'colibriwp_posts_per_row', 'colibriwp_posts_per_row_setting_filter' );

function colibriwp_archive_post_highlight_setting_filter( $value ) {

    $value = get_theme_mod( 'blog_post_highlight_enabled', $value );

    return $value;
}

add_filter( 'colibriwp_archive_post_highlight', 'colibriwp_archive_post_highlight_setting_filter' );


function colibriwp_blog_sidebar_enabled_setting_filter( $value ) {
    $value = get_theme_mod( 'blog_sidebar_enabled', $value );

    return ( $value == 1 );
}

Hooks::colibri_add_filter( 'blog_sidebar_enabled', 'colibriwp_blog_sidebar_enabled_setting_filter' );

function colibriwp_override_with_thumbnail_image( $value ) {
    global $post;

    if ( isset( $post ) && $post->post_type === 'post' ) {
        $value = get_theme_mod( 'blog_show_post_featured_image',
            Defaults::get( 'blog_show_post_featured_image', false ) );
        $value = ( intval( $value ) === 1 );
    }

    return $value;
}

add_filter( 'colibriwp_override_with_thumbnail_image', 'colibriwp_override_with_thumbnail_image' );

function colibriwp_print_archive_entry_class( $class = "" ) {

    $classes = array( "post-list-item", "h-col-xs-12", "space-bottom" );
    $classes = array_merge( $classes, explode( " ", $class ) );
    $classes = get_post_class( $classes );

    $default     = get_theme_mod( 'blog_posts_per_row', Defaults::get( 'blog_posts_per_row' ) );
    $postsPerRow = max( 1, apply_filters( 'colibriwp_posts_per_row', $default ) );


    $classes[] = "h-col-sm-12 h-col-md-" . ( 12 / intval( $postsPerRow ) );

    $classes = apply_filters( 'colibriwp_archive_entry_class', $classes );

    $classesText = implode( " ", $classes );

    echo esc_attr( $classesText );
}

function colibriwp_print_masonry_col_class( $echo = false ) {

    global $wp_query;
    $index        = $wp_query->current_post;
    $hasBigClass  = ( is_sticky() || ( $index === 0 && apply_filters( 'colibriwp_archive_post_highlight', false ) ) );
    $showBigEntry = ( is_archive() || is_home() );

    $class = "";
    if ( $showBigEntry && $hasBigClass ) {
        $class = "col-md-12";
    } else {
        $default     = get_theme_mod( 'blog_posts_per_row', Defaults::get( 'blog_posts_per_row' ) );
        $postsPerRow = max( 1, apply_filters( 'colibriwp_posts_per_row', $default ) );

        $class = "col-sm-12.col-md-" . ( 12 / intval( $postsPerRow ) );
    }

    if ( $echo ) {
        echo esc_attr( $class );
    } else {
        return esc_attr( $class );
    }


}


Hooks::colibri_add_filter( 'info_page_tabs', 'colibriwp_get_started_info_page_tab' );

function colibriwp_get_started_info_page_tab( $tabs ) {

    $tabs['get-started'] = array(
        'title'       => \ColibriWP\Theme\Translations::translate( 'get_started' ),
        'tab_partial' => "admin/get-started"
    );

    return $tabs;
}


function colibriwp_theme_plugins( $plugins ) {
    $theme_plugins = array();

    if ( ! function_exists( 'get_plugins' ) ) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    $installed_plugins = get_plugins();
    $is_cf_7_installed = false;

    foreach ( array_keys( $installed_plugins ) as $plugin_path ) {
        if ( strpos( $plugin_path, 'contact-form-7' ) === 0 ) {
            $is_cf_7_installed = true;
            break;
        }
    }

    if ( ! $is_cf_7_installed ) {
        $theme_plugins = array_merge( $theme_plugins, array(
            'forminator' => array(
                'name'        => 'Forminator',
                'description' => \ColibriWP\Theme\Translations::translate( 'contact_form_plugin_description' )
            )
        ) );
    }

    $builder_plugin = 'colibri-page-builder';

    foreach ( $installed_plugins as $key => $plugin_data ) {
        if ( strpos( $key, 'colibri-page-builder-pro/' ) !== false ) {
            $builder_plugin = 'colibri-page-builder-pro';

        }

        if ( strpos( $key, 'wpforms-' ) !== false ) {
            unset( $theme_plugins['contact-form-7'] );
            $slug                   = Utils::arrayGetAt( explode( "/", $key ), 0 );
            $theme_plugins[ $slug ] = array(
                'name'        => Utils::pathGet( $plugin_data, 'Name', 'WP Forms' ),
                'description' => Utils::pathGet( $plugin_data, 'Description' ),
            );
        }
    }

    Hooks::colibri_add_filter( 'plugin_slug', function ( $slug ) use ( $builder_plugin ) {
        return $builder_plugin;
    } );

    $theme_plugins = array_merge( array(
        $builder_plugin => array(
            'name'        => $builder_plugin === 'colibri-page-builder-pro' ? 'Colibri Page Builder PRO' : 'Colibri Page Builder',
            'description' => \ColibriWP\Theme\Translations::translate( 'page_builder_plugin_description' ),
            'plugin_path' => "{$builder_plugin}/{$builder_plugin}.php"
        )
    ), $theme_plugins );

    return array_merge( $plugins, $theme_plugins );
}

Hooks::colibri_add_filter( 'theme_plugins', 'colibriwp_theme_plugins' );


add_filter( 'http_request_host_is_external', 'colibriwp_allow_internal_host', 10, 3 );
function colibriwp_allow_internal_host( $allow, $host, $url ) {
    if ( $host === 'extendstudio.net' ) {
        $allow = true;
    }

    return $allow;
}

add_action( 'wp_ajax_colibriwp_front_set_predesign', function () {
    $predesign_index = isset( $_REQUEST['index'] ) ? $_REQUEST['index'] : 0;
    $predesign_index = intval( $predesign_index );
    $meta            = array();

    foreach ( Defaults::get( 'front_page_designs', array() ) as $predesign ) {
        if ( intval( $predesign['index'] ) === $predesign_index ) {
            $meta = Utils::pathGet( $predesign, 'meta', array() );
            break;
        }
    }

    update_option( 'colibriwp_predesign_front_page_index', $predesign_index );
    update_option( 'colibriwp_predesign_front_page_meta', $meta );
} );

/* WooCommerce support for latest gallery */
if ( class_exists( 'WooCommerce' ) ) {
    colibriwp_theme()
        ->add_theme_support( 'woocommerce' )
        ->add_theme_support( 'wc-product-gallery-zoom' )
        ->add_theme_support( 'wc-product-gallery-lightbox' )
        ->add_theme_support( 'wc-product-gallery-slider' );
}

function colibriwp_override_main_row_class( $classes ) {
    return Defaults::get( 'templates.blog.row.layout-classes', $classes );
}

Hooks::colibri_add_filter( 'main_row_class', 'colibriwp_override_main_row_class', 10, 1 );
