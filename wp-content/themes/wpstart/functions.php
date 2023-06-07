
<?php

add_action( 'after_setup_theme', 'yourtheme_theme_setup' );
if ( ! function_exists( 'yourtheme_theme_setup' ) ) {
    function yourtheme_theme_setup() {
        add_action( 'wp_enqueue_scripts', 'yourtheme_scripts' );
        add_action( 'admin_enqueue_scripts', 'yourtheme_admin_scripts' );
    }
}
if ( ! function_exists( 'yourtheme_scripts' ) ) {
    function yourtheme_scripts() {

        wp_enqueue_style( 'bootstrap-style', get_template_directory_uri() .'/assets/css/bootstrap.min.css', '1.0.0' );
        wp_enqueue_style( 'animate-style', get_template_directory_uri() .'/assets/css/animate.css', 'bootstrap-style', '1.0.0' );
        wp_enqueue_style( 'defassets-classynav-style', get_template_directory_uri() .'/assets/css/default-assets/classy-nav.css', 'animate-style', '1.0.0' );
        wp_enqueue_style( 'carousel-style', get_template_directory_uri() .'/assets/css/owl.carousel.min.css', 'def-assets-classynav-style', '1.0.0' );
        wp_enqueue_style( 'magnific-style', get_template_directory_uri() .'/assets/css/magnific-popup.css', 'carousel-style', '1.0.0' );
        wp_enqueue_style( 'fontawesome-style', get_template_directory_uri() .'/assets/css/font-awesome.min.css', 'magnific-style', '1.0.0' );
        wp_enqueue_style( 'maintheme-style', get_template_directory_uri() .'/style.css', 'fontawesome-style', '1.0.0' );

        wp_enqueue_script( 'jquery', get_template_directory_uri().'/assets/js/jquery.min.js', array( ), '1.0.0', true );
        wp_enqueue_script( 'popper', get_template_directory_uri().'/assets/js/popper.min.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'bootstrap', get_template_directory_uri().'/assets/js/bootstrap.min.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'hami.bundle', get_template_directory_uri().'/assets/js/hami.bundle.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'def.assets-active', get_template_directory_uri().'/assets/js/default-assets/active.js', array( 'jquery' ), '1.0.0', true );

    }
}
if ( ! function_exists( 'yourtheme_admin_scripts' ) ) {
    function yourtheme_admin_scripts() {
        wp_enqueue_script( 'yourtheme_custom', get_template_directory_uri().'/js/custom.js',
        array( 'jquery-ui-autocomplete', 'jquery' ), '1.0.0', true );
    }
}


?>