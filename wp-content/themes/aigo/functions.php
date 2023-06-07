
<?php

/**
 * LOAD NECCESSARY CSS & JS FILES
 * 
 * @author: D.C.Hunter
 * date   : 2023.06.02:15.15.10
 */

/**
 * UTILITIES
 * 
 * @author: D.C.Hunter
 * @date   : 2023.06.04:12.15.00
 * 
 * 1. console.log() function as console_log()
 */
function console($log) {

    // check type for the variable $log and conditional process according to the result
    // related function is 'gettype($log)'

    if( is_array($log) ) {
        // echo 'This is array variable';
        $log = json_encode($log);
        $log = str_replace('"', '', $log);
        echo '<script>console.log("array:'.$log.'");</script>';
    } else if( is_object($log) ) {
        // echo 'This is object variable';
        $log = json_encode($log);
        $log = str_replace('"', '', $log);
        echo '<script>console.log("object:'.$log.'");</script>';
    } else {
        // echo 'This is String variable';
        $log = str_replace('"', '', $log);
        echo '<script>console.log("'.$log.'");</script>';
    }
}

add_action( 'after_setup_theme', 'yourtheme_theme_setup' );
if ( ! function_exists( 'yourtheme_theme_setup' ) ) {
    function yourtheme_theme_setup() {
        add_action( 'wp_enqueue_scripts', 'yourtheme_scripts' );
        add_action( 'admin_enqueue_scripts', 'yourtheme_admin_scripts' );
    }
}
if ( ! function_exists( 'yourtheme_scripts' ) ) {
    function yourtheme_scripts() {

        // wp_enqueue_style( 'bootstrap-style', get_template_directory_uri() .'/assets/css/bootstrap.min.css', '1.0.0' );
        // wp_enqueue_style( 'animate-style', get_template_directory_uri() .'/assets/css/animate.css', 'bootstrap-style', '1.0.0' );
        // wp_enqueue_style( 'defassets-classynav-style', get_template_directory_uri() .'/assets/css/default-assets/classy-nav.css', 'animate-style', '1.0.0' );
        // wp_enqueue_style( 'carousel-style', get_template_directory_uri() .'/assets/css/owl.carousel.min.css', 'def-assets-classynav-style', '1.0.0' );
        // wp_enqueue_style( 'magnific-style', get_template_directory_uri() .'/assets/css/magnific-popup.css', 'carousel-style', '1.0.0' );
        // wp_enqueue_style( 'fontawesome-style', get_template_directory_uri() .'/assets/css/font-awesome.min.css', 'magnific-style', '1.0.0' );
        // wp_enqueue_style( 'maintheme-style', get_template_directory_uri() .'/style.css', 'fontawesome-style', '1.0.0' );
        wp_enqueue_style( 'maintheme-style', get_template_directory_uri() .'/style.css', '1.0.0' );
        wp_enqueue_style( 'customtheme-style', get_template_directory_uri() .'/style-custom.css', 'maintheme-style', '1.0.0' );

        wp_enqueue_script( 'jquery', get_template_directory_uri().'/assets/js/jquery.min.js', array( ), '1.0.0', true );
        wp_enqueue_script( 'popper', get_template_directory_uri().'/assets/js/popper.min.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'bootstrap', get_template_directory_uri().'/assets/js/bootstrap.min.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'hami.bundle', get_template_directory_uri().'/assets/js/hami.bundle.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'def.assets-active', get_template_directory_uri().'/assets/js/default-assets/active.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'jquery.validate', get_template_directory_uri().'/assets/js/jquery.validate.min.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'maps.googleapis.com', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'google.map', get_template_directory_uri().'/assets/js/google-map.js', array( 'jquery' ), '1.0.0', true );
        wp_enqueue_script( 'main', get_template_directory_uri().'/assets/js/main.js', array( 'jquery' ), '1.0.0', true );


    }
}
if ( ! function_exists( 'yourtheme_admin_scripts' ) ) {
    function yourtheme_admin_scripts() {
        wp_enqueue_script( 'yourtheme_custom', get_template_directory_uri().'/js/custom.js',
        array( 'jquery-ui-autocomplete', 'jquery' ), '1.0.0', true );
    }
}

/**
 * MAIN-MENU SETTING
 * 
 * @author: D.C.Hunter
 * date   : 2023.06.02:15.00.00
 * 
 * A menu will appear on the screen only after the location is registered,
 * so we set main-menu as primary in register_main_menu and used this in main-menu.php. 
 * 
 * To customize the menu item's class that has child items, used nav_menu_submenu_css_class filter.
 */
function register_main_menu() {
    register_nav_menu('primary', __('Primary Menu', 'aigo'));
}
add_action('after_setup_theme', 'register_main_menu');

function custom_submenu_class( $classes, $args ) {
    $classes[] = 'dropdown';
    return $classes;
}
add_filter( 'nav_menu_submenu_css_class', 'custom_submenu_class', 10, 2 );


/**
 * BLOG SETTING
 * 
 * @author: D.C.Hunter
 * date   : 2023.06.02:15.30.10
 * 
 */
function change_post_thumbnail_class( $html, $post_id, $post_thumbnail_id, $size, $attr ) {
    // Below line is original code and very neccessary & useful, 
    // but in this project we need a single classname 'post-thumbnail' not multiple class informations, 
    // so we marked below code line and appended the additional code lines that return only classname 'post-thumbnail'.   
    // ========== $html = str_replace( 'class="', 'class="post_thumbnail ', $html ); ==========
    $first_pos = strpos($html, 'class="');
    $last_pos  = strpos($html, '"', $first_pos + 7); //here 7 is the length of the string 'class="'.
    $class_infors = substr($html, $first_pos, $last_pos - $first_pos + 1);
   
    $html = str_replace( $class_infors, 'class="post-thumbnail"', $html );
    return $html;
}
add_filter( 'post_thumbnail_html', 'change_post_thumbnail_class', 10, 5 );


if(!function_exists('blog_tagtaxes_function')){
    function blog_tagtaxes_function($order){

        //order by name
        $args = array(
            "hide_empty" => false,
            "orderby" => "name",
            "order" => $order
        );

        //retrieve tags
        $tags = get_tags($args);

        //printing tag name
        foreach($tags as $tag){
            echo '<li>
                <a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a>
            </li>';
        }

    }
    add_action('blog_tagtaxes', 'blog_tagtaxes_function');

    
}
/**
 * SHORT-CODE REGISTE
 * 
 * @author: D.C.Hunter
 * date   : 2023.06.03:14.20.10
 * 
 */
add_action( 'init', 'register_shortcodes');
function register_shortcodes(){
    add_shortcode('manual_custom_contactus', 'manual_custom_contactus_function');
    add_shortcode('blog_right_sidebar', 'blog_right_sidebar_function');

 }
function manual_custom_contactus_function() {
    get_template_part( 'template-parts/content/content-manual-custom-contactus' );
    return;
}
function blog_right_sidebar_function() {
    get_template_part( 'template-parts/widget/right-sidebar-widget-area' );
    return;
}

/**
 * REGISTER WIDGET AREA
 *
 * @author: D.C.Hunter
 * date   : 2023.06.03:16.52.05
 * 
 * first. Blog page's right-sidebar
 */
function aigo_widgets_init() {

	register_sidebar(
		array(
			'name'          => esc_html__( 'BlogRightSideBar', 'aigo' ),
			'id'            => 'blog-right-sidebar',
			'description'   => esc_html__( 'Add widget here to appear in Blog page\'s right sidebar.', 'aigo' ),
			'before_widget' => '',
			'after_widget'  => '',
			'before_title'  => '',
			'after_title'   => '',
		)
	);

   
}
add_action( 'widgets_init', 'aigo_widgets_init' );


/**
 * BLOG SEARCH ENGINE
 *
 * @author: D.C.Hunter
 * date   : 2023.06.04:15.14.05
 * 
 */
function wpdocs_search_by_title_only( $search, $wp_query ) {

    global $wpdb;

    if ( empty( $search ) ) {
        return $search; // skip processing - no search term in query
    }

    $q = $wp_query->query_vars;
    $n = ! empty( $q['exact'] ) ? '' : '%';
    $search = '';
    $searchand = '';

    foreach ( (array) $q['search_terms'] as $term ) {
        $term = esc_sql( $wpdb->esc_like( $term ) );
        $search .= "{$searchand}($wpdb->posts.post_title LIKE '{$n}{$term}{$n}')";
        $searchand = ' AND ';
    }

    if ( ! empty( $search ) ) {
        $search = " AND ({$search}) ";
        if ( ! is_user_logged_in() )
            $search .= " AND ($wpdb->posts.post_password = '') ";
    }

    return $search;
}
add_filter( 'posts_search', 'wpdocs_search_by_title_only', 500, 2 );


/**
 * GENERATE BREADCRUMBS
 * 
 * @author: D.C.Hunter
 * date   : 2023.06.04:17.44.05
 */
function make_cats_plan($arr_cats) {

    $start_index = 0;
    $length = count($arr_cats);

    $result = array_map(function($b, $index) use ($start_index, $length) {

        $cat_id    = $b->cat_ID;
        $link      = get_category_link( $cat_id );

        if( $index == $length - 1 ) {
            return('<li class="breadcrumb-item active" aria-current="page">'.$b->cat_name.'</li>');
        } else {
            return('<li class="breadcrumb-item active" aria-current="page">
                <a href="'.$link.'">'.$b->cat_name.'</a></li>');
        }

    }, $arr_cats, array_keys($arr_cats));

    return implode("", $result);
}

function get_breadcrumb() {

    echo 
    '<ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="'.home_url().'">
                <i class="icon_house_alt"></i> Home </a>
        </li>';
            
        if (is_archive()) {
            if( ! have_posts() ) {
                return;
            }

            if(is_category()) {

                $arr_cats = get_the_category(); //category hierachical list for the assigned post
                $category = get_queried_object(); //category for the assigned archive page
    
                // trim the tail of $arr_cats until it matches the end of $category
                while( $category->cat_ID != $arr_cats[count($arr_cats)-1]->cat_ID ) {
                    array_splice($arr_cats, count($arr_cats)-1, 1);
                }
    
                echo make_cats_plan($arr_cats);
            } elseif (is_tag()) {

                $arr_cats = get_the_category(); //category hierachical list for the assigned post
                $category = $arr_cats[0];
                $cat_id   = $category->cat_ID;
                $link     = get_category_link( $cat_id );
                $cat_bredcrumb = '<li class="breadcrumb-item active" aria-current="page">
                                <a href="'.$link.'">'.$category->cat_name.'</a></li>';

                $tag = get_queried_object(); //tag for the assigned archive page
                $cat_bredcrumb .= '<li class="breadcrumb-item active" aria-current="page">'.$tag->name.'</li>';

                echo $cat_bredcrumb;
            }
        } else if(is_single()) {

            $category = get_the_category()[0]; //category for the assigned post
            $cat_id   = $category->term_id;
            $link     = get_category_link( $cat_id );
            $cat_bredcrumb = '<li class="breadcrumb-item active" aria-current="page">
                            <a href="'.$link.'">'.$category->name.'</a></li>';

            $pg_title = get_the_title();
            $cat_bredcrumb .= '<li class="breadcrumb-item active" aria-current="page">'.$pg_title.'</li>';
                
            echo $cat_bredcrumb;

        } elseif (is_page()) {

            $pg_title = get_the_title();
            $cat_bredcrumb = '<li class="breadcrumb-item active" aria-current="page">'.$pg_title.'</li>';
                
            echo $cat_bredcrumb;

        } elseif (is_search()) {
            
            if( ! have_posts() ) {
                return;
            }

            $search_page_id = get_option('page_for_posts');
            $search_page = get_post($search_page_id);
            $post_id = $search_page->ID;
            $category = get_the_terms( $post_id, 'category' )[0];

            $cat_id   = $category->term_id;
            $link     = get_category_link( $cat_id );
            $cat_bredcrumb = '<li class="breadcrumb-item active" aria-current="page">
                            <a href="'.$link.'">'.$category->name.'</a></li>';

            $search = 'Search Results for "'.esc_html( get_search_query( false ) ).'"';
            $cat_bredcrumb .= '<li class="breadcrumb-item active" aria-current="page">'.$search.'</li>';
            
            echo $cat_bredcrumb;
        }

    echo
    '</ol>';
}
