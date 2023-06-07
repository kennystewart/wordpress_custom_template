<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Newsmatic
 */
use Newsmatic\CustomizerDefault as ND;
/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function newsmatic_body_classes( $classes ) {
	global $post;

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}
	
	$classes[] = esc_attr( 'newsmatic-title-' . ND\newsmatic_get_customizer_option( 'post_title_hover_effects'  ) ); // post title hover effects
	$classes[] = esc_attr( 'newsmatic-image-hover--effect-' . ND\newsmatic_get_customizer_option( 'site_image_hover_effects' ) ); // site image hover effects
	$classes[] = esc_attr( 'site-' . ND\newsmatic_get_customizer_option( 'website_layout' ) ); // site layout
	if( ND\newsmatic_get_customizer_option( 'website_block_border_top_option' ) ) $classes[] = esc_attr( 'newsmatic_site_block_border_top' ); // block border top
	
	// page layout
	if( is_page() || is_404() || is_search() ) :
		if( is_front_page() ) {
			$frontpage_sidebar_layout = ND\newsmatic_get_customizer_option( 'frontpage_sidebar_layout' );
			$frontpage_sidebar_sticky_option = ND\newsmatic_get_customizer_option( 'frontpage_sidebar_sticky_option' );
			if( $frontpage_sidebar_sticky_option ) $classes[] = esc_attr( 'sidebar-sticky' );
			$classes[] = esc_attr( $frontpage_sidebar_layout );
		} else {
			$page_sidebar_layout = ND\newsmatic_get_customizer_option( 'page_sidebar_layout' );
			$page_sidebar_sticky_option = ND\newsmatic_get_customizer_option( 'page_sidebar_sticky_option' );
			if( $page_sidebar_sticky_option ) $classes[] = esc_attr( 'sidebar-sticky' );
			$classes[] = esc_attr( $page_sidebar_layout );
		}
	endif;

	// single post layout
	if( is_single() ) :
		$single_sidebar_layout = ND\newsmatic_get_customizer_option( 'single_sidebar_layout' );
		$single_sidebar_sticky_option = ND\newsmatic_get_customizer_option( 'single_sidebar_sticky_option' );
		if( $single_sidebar_sticky_option ) $classes[] = esc_attr( 'sidebar-sticky' );
		$classes[] = esc_attr( $single_sidebar_layout );
	endif;

	// archive layout
	if( is_archive() || is_home() ) :
		$archive_sidebar_layout = ND\newsmatic_get_customizer_option( 'archive_sidebar_layout' );
		$archive_page_layout = ND\newsmatic_get_customizer_option( 'archive_page_layout' );
		$archive_sidebar_sticky_option = ND\newsmatic_get_customizer_option( 'archive_sidebar_sticky_option' );
		if( $archive_sidebar_sticky_option ) $classes[] = esc_attr( 'sidebar-sticky' );
		$classes[] = esc_attr( 'post-layout--'. $archive_page_layout );
		$classes[] = esc_attr( $archive_sidebar_layout );
	endif;

	$classes[] = 'newsmatic_main_body newsmatic_font_typography';
	return $classes;
}
add_filter( 'body_class', 'newsmatic_body_classes' );


/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function newsmatic_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'newsmatic_pingback_header' );

//define constant
define( 'NEWSMATIC_INCLUDES_PATH', get_template_directory() . '/inc/' );

/**
 * Enqueue theme scripts and styles.
 */
function newsmatic_scripts() {
	global $wp_query;
	require_once get_theme_file_path( 'inc/wptt-webfont-loader.php' );
	wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/assets/lib/fontawesome/css/all.min.css', array(), '5.15.3', 'all' );
	wp_enqueue_style( 'slick', get_template_directory_uri() . '/assets/lib/slick/slick.css', array(), '1.8.1', 'all' );
	wp_enqueue_style( 'newsmatic-typo-fonts', wptt_get_webfont_url( newsmatic_typo_fonts_url() ), array(), null );
	// enqueue inline style
	wp_enqueue_style( 'newsmatic-style', get_stylesheet_uri(), array(), NEWSMATIC_VERSION );
	wp_add_inline_style( 'newsmatic-style', newsmatic_current_styles() );
	wp_enqueue_style( 'newsmatic-main-style', get_template_directory_uri().'/assets/css/main.css', array(), NEWSMATIC_VERSION );
	wp_enqueue_style( 'newsmatic-loader-style', get_template_directory_uri().'/assets/css/loader.css', array(), NEWSMATIC_VERSION );
	wp_enqueue_style( 'newsmatic-responsive-style', get_template_directory_uri().'/assets/css/responsive.css', array(), NEWSMATIC_VERSION );
	wp_style_add_data( 'newsmatic-style', 'rtl', 'replace' );
	wp_enqueue_script( 'slick', get_template_directory_uri() . '/assets/lib/slick/slick.min.js', array( 'jquery' ), '1.8.1', true );
	wp_enqueue_script( 'js-marquee', get_template_directory_uri() . '/assets/lib/js-marquee/jquery.marquee.min.js', array( 'jquery' ), '1.6.0', true );
	wp_enqueue_script( 'newsmatic-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), NEWSMATIC_VERSION, true );
	wp_enqueue_script( 'newsmatic-theme', get_template_directory_uri() . '/assets/js/theme.js', array( 'jquery' ), NEWSMATIC_VERSION, true );
	wp_enqueue_script( 'waypoint', get_template_directory_uri() . '/assets/lib/waypoint/jquery.waypoint.min.js', array( 'jquery' ), '4.0.1', true );

	$scriptVars['_wpnonce'] = wp_create_nonce( 'newsmatic-nonce' );
	$scriptVars['ajaxUrl'] 	= admin_url('admin-ajax.php');
	$scriptVars['stt']	= ND\newsmatic_get_multiselect_tab_option('stt_responsive_option');
	$scriptVars['stickey_header']= ND\newsmatic_get_customizer_option('theme_header_sticky');
	$scriptVars['livesearch']= ND\newsmatic_get_customizer_option('theme_header_live_search_option');
	// newsmatic scripts
	wp_localize_script( 'newsmatic-theme', 'newsmaticObject' , $scriptVars);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'newsmatic_scripts' );

if( ! function_exists( 'newsmatic_current_styles' ) ) :
	/**
	 * Generates the current changes in styling of the theme.
	 * 
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_current_styles() {
		// enqueue inline style
		ob_start();
			// inline style call
			$nPresetCode = function($var,$id) {
				newsmatic_assign_preset_var($var,$id);
			};
			$nPresetCode( "--newsmatic-global-preset-color-1", "preset_color_1" );
			$nPresetCode( "--newsmatic-global-preset-color-2", "preset_color_2" );
			$nPresetCode( "--newsmatic-global-preset-color-3", "preset_color_3" );
			$nPresetCode( "--newsmatic-global-preset-color-4", "preset_color_4" );
			$nPresetCode( "--newsmatic-global-preset-color-5", "preset_color_5" );
			$nPresetCode( "--newsmatic-global-preset-color-6", "preset_color_6" );
			$nPresetCode( "--newsmatic-global-preset-color-7", "preset_color_7" );
			$nPresetCode( "--newsmatic-global-preset-color-8", "preset_color_8" );
			$nPresetCode( "--newsmatic-global-preset-color-9", "preset_color_9" );
			$nPresetCode( "--newsmatic-global-preset-color-10", "preset_color_10" );
			$nPresetCode( "--newsmatic-global-preset-color-11", "preset_color_11" );
			$nPresetCode( "--newsmatic-global-preset-color-12", "preset_color_12" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-1", "preset_gradient_1" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-2", "preset_gradient_2" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-3", "preset_gradient_3" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-4", "preset_gradient_4" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-5", "preset_gradient_5" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-6", "preset_gradient_6" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-7", "preset_gradient_7" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-8", "preset_gradient_8" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-9", "preset_gradient_9" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-10", "preset_gradient_10" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-11", "preset_gradient_11" );
			$nPresetCode( "--newsmatic-global-preset-gradient-color-12", "preset_gradient_12" );
			if( ND\newsmatic_get_customizer_option('website_block_border_top_option') ) :
				newsmatic_assign_var( "--theme-block-top-border-color", "website_block_border_top_color" );
			endif;
			newsmatic_header_padding('--header-padding', 'header_vertical_padding');
			$nBackgroundCode = function($identifier,$id) {
				newsmatic_get_background_style($identifier,$id);
			};
			$nBackgroundCode('.newsmatic_main_body .site-header.layout--default .top-header','top_header_background_color_group');
			$nBackgroundCode('.newsmatic_main_body .site-header.layout--default .menu-section','header_menu_background_color_group');
			$nBackgroundCode('.newsmatic_font_typography .header-custom-button','header_custom_button_background_color_group');
			$nBackgroundCode('.newsmatic_font_typography .header-custom-button:hover','header_custom_button_background_hover_color_group');
			$nSpacingCode = function($identifier,$id, $property = 'padding') {
				newsmatic_get_responsive_spacing_style($identifier,$id, $property);
			};
			$nTypoCode = function($identifier,$id) {
				newsmatic_get_typo_style($identifier,$id);
			};
			$nTypoCode( "--site-title", 'site_title_typo' );
			newsmatic_site_logo_width_fnc("body .site-branding img.custom-logo", 'newsmatic_site_logo_width');
			$nColorGroupCode = function($identifier,$id,$property='color') {
				newsmatic_color_options_one($identifier,$id,$property);
			};
			$nColorCode = function($identifier,$id) {
				newsmatic_text_color_var($identifier,$id);
			};
			$nColorCode('--menu-color','header_menu_color');
			$nColorCode('--sidebar-toggle-color','header_sidebar_toggle_color');
			$nColorCode('--search-color','header_search_icon_color');
			newsmatic_get_background_style_var('--site-bk-color', 'site_background_color');
			$nColorCode('--move-to-top-background-color','stt_background_color_group');
			$nColorCode('--move-to-top-color','stt_color_group');
			newsmatic_visibility_options('.ads-banner','header_ads_banner_responsive_option');
			newsmatic_visibility_options('body #newsmatic-scroll-to-top.show','stt_responsive_option');
			newsmatic_border_option('body .site-header.layout--default .menu-section .row', 'header_menu_top_border', 'border-top');
			newsmatic_border_option('body .site-footer.dark_bk','footer_top_border', 'border-top');
			$nBackgroundCode('body .site-header.layout--default .site-branding-section', 'header_background_color_group');

			$nColorCode('--custom-btn-color','header_custom_button_color_group');

			
			newsmatic_theme_color('--theme-color-red','theme_color');
			newsmatic_category_colors_styles();
		$current_styles = ob_get_clean();
		return apply_filters( 'newsmatic_current_styles', wp_strip_all_tags($current_styles) );
	}
endif;

if( ! function_exists( 'newsmatic_customizer_social_icons' ) ) :
	/**
	 * Functions get social icons
	 * 
	 */
	function newsmatic_customizer_social_icons() {
		$social_icons = ND\newsmatic_get_customizer_option( 'social_icons' );
		$social_icons_target = ND\newsmatic_get_customizer_option( 'social_icons_target' );
		$decoded_social_icons = json_decode( $social_icons );
		echo '<div class="social-icons">';
			foreach( $decoded_social_icons as $icon ) :
				if( $icon->item_option === 'show' ) {
		?>
					<a class="social-icon" href="<?php echo esc_url( $icon->icon_url ); ?>" target="<?php echo esc_attr( $social_icons_target ); ?>"><i class="<?php echo esc_attr( $icon->icon_class ); ?>"></i></a>
		<?php
				}
			endforeach;
		echo '</div>';
	}
endif;

if( ! function_exists( 'newsmatic_get_multicheckbox_categories_array' ) ) :
	/**
	 * Return array of categories prepended with "*" key.
	 * 
	 */
	function newsmatic_get_multicheckbox_categories_array() {
		$categories_list = get_categories();
		foreach( $categories_list as $cat ) :
			$cats_array[esc_html( $cat->slug )]= esc_html( $cat->name )  . ' (' .absint( $cat->count ). ')';
		endforeach;
		return $cats_array;
	}
endif;

if( ! function_exists( 'newsmatic_get_multicheckbox_categories_simple_array' ) ) :
	/**
	 * Return array of categories prepended with "*" key.
	 * 
	 */
	function newsmatic_get_multicheckbox_categories_simple_array() {
		$categories_list = get_categories();
		foreach( $categories_list as $cat ) :
			$cats_array[] = array( 
				'value'	=> esc_html( $cat->slug ),
				'label'	=> esc_html(str_replace(array('\'', '"'), '', $cat->name))  . ' (' .absint( $cat->count ). ')'
			);
		endforeach;
		return $cats_array;
	}
endif;

if( ! function_exists( 'newsmatic_get_multicheckbox_posts_simple_array' ) ) :
	/**
	 * Return array of posts prepended with "*" key.
	 * 
	 */
	function newsmatic_get_multicheckbox_posts_simple_array() {
		$posts_list = get_posts(array('numberposts'=>4));
		foreach( $posts_list as $postItem ) :
			$posts_array[] = array( 
				'value'	=> esc_html( $postItem->post_name ),
				'label'	=> esc_html(str_replace(array('\'', '"'), '', $postItem->post_title))
			);
		endforeach;
		return $posts_array;
	}
endif;

if( ! function_exists( 'newsmatic_get_date_filter_choices_array' ) ) :
	/**
	 * Return array of date filter choices.
	 * 
	 */
	function newsmatic_get_date_filter_choices_array() {
		return apply_filters( 'newsmatic_get_date_filter_choices_array_filter', array(
			array(
				'value' => 'all',
				'label' => esc_html__('All', 'newsmatic' )
			),
			array(
				'value' => 'last-seven-days',
				'label' => esc_html__('Last 7 days', 'newsmatic' )
			),
			array(
				'value' => 'today',
				'label' => esc_html__('Today', 'newsmatic' )
			),
			array(
				'value' => 'this-week',
				'label' => esc_html__('This Week', 'newsmatic' )
			),
			array(
				'value' => 'last-week',
				'label' => esc_html__('Last Week', 'newsmatic' )
			),
			array(
				'value' => 'this-month',
				'label' => esc_html__('This Month', 'newsmatic' )
			),
			array(
				'value' => 'last-month',
				'label' => esc_html__('Last Month', 'newsmatic' )
			)
		));
	}
endif;

if( ! function_exists( 'newsmatic_get_random_news_filter_choices_array' ) ) :
	/**
	 * Return array of random news filter choices.
	 * 
	 */
	function newsmatic_get_random_news_filter_choices_array() {
		return apply_filters( 'newsmatic_get_date_filter_choices_array_filter', array(
			array(
				'value' => 'random',
				'label' => esc_html__('Random', 'newsmatic' )
			),
			array(
				'value' => 'last-seven-days',
				'label' => esc_html__('Last 7 days', 'newsmatic' )
			),
			array(
				'value' => 'today',
				'label' => esc_html__('Today', 'newsmatic' )
			),
			array(
				'value' => 'this-week',
				'label' => esc_html__('This Week', 'newsmatic' )
			),
			array(
				'value' => 'last-week',
				'label' => esc_html__('Last Week', 'newsmatic' )
			),
			array(
				'value' => 'this-month',
				'label' => esc_html__('This Month', 'newsmatic' )
			),
			array(
				'value' => 'last-month',
				'label' => esc_html__('Last Month', 'newsmatic' )
			),
			array(
				'value' => 'this-year',
				'label' => esc_html__('This Year', 'newsmatic' )
			)
		));
	}
endif;

if( ! function_exists( 'newsmatic_get_array_key_string_to_int' ) ) :
	/**
	 * Return array of int values.
	 * 
	 */
	function newsmatic_get_array_key_string_to_int( $array ) {
		if( ! isset( $array ) || empty( $array ) ) return;
		$filtered_array = array_map( function($arr) {
			if( is_numeric( $arr ) ) return (int) $arr;
		}, $array);
		return apply_filters( 'newsmatic_array_with_int_values', $filtered_array );
	}
endif;

/**
 * Return string with "implode" execution in param
 * 
 */
 function newsmatic_get_categories_for_args($array) {
	if( ! $array ) return apply_filters( 'newsmatic_categories_for_argument', '' );
	foreach( $array as $value ) {
		$string_array[] = $value->value;
	}
	return apply_filters( 'newsmatic_categories_for_argument', implode( ',', $string_array ) );
}

/**
 * Return array with execution in param
 * 
 */
function newsmatic_get_post_slugs_for_args($array) {
	if( ! $array ) return apply_filters( 'newsmatic_posts_slugs_for_argument', '' );
	foreach( $array as $value ) {
		$string_array[] = $value->value;
	}
	return apply_filters( 'newsmatic_posts_slugs_for_argument', $string_array );
}

if( !function_exists( 'newsmatic_typo_fonts_url' ) ) :
	/**
	 * Filter and Enqueue typography fonts
	 * 
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_typo_fonts_url() {
		$filter = NEWSMATIC_PREFIX . 'typo_combine_filter';
		$action = function($filter,$id) {
			return apply_filters(
				$filter,
				$id
			);
		};
		$site_title_typo_value = $action($filter,'site_title_typo');
		$typo1 = "Roboto:300,400,500,700,900";
		$typo2 = "Inter:300,400,500,600";
		$typo3 = "Jost:300,400,500,600,700";

		$get_fonts = apply_filters( 'newsmatic_get_fonts_toparse', [$site_title_typo_value, $typo1, $typo2, $typo3] );
		$font_weight_array = array();

		foreach ( $get_fonts as $fonts ) {
			$each_font = explode( ':', $fonts );
			if ( ! isset ( $font_weight_array[$each_font[0]] ) ) {
				$font_weight_array[$each_font[0]][] = $each_font[1];
			} else {
				if ( ! in_array( $each_font[1], $font_weight_array[$each_font[0]] ) ) {
					$font_weight_array[$each_font[0]][] = $each_font[1];
				}
			}
		}
		$final_font_array = array();
		foreach ( $font_weight_array as $font => $font_weight ) {
			$each_font_string = $font.':'.implode( ',', $font_weight );
			$final_font_array[] = $each_font_string;
		}

		$final_font_string = implode( '|', $final_font_array );
		$google_fonts_url = '';
		$subsets   = 'cyrillic,cyrillic-ext';
		if ( $final_font_string ) {
			$query_args = array(
				'family' => urlencode( $final_font_string ),
				'subset' => urlencode( $subsets )
			);
			$google_fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
		}
		return $google_fonts_url;
	}
endif;

if(! function_exists('newsmatic_get_color_format')):
    function newsmatic_get_color_format($color) {
      if( str_contains( $color, '--newsmatic-global-preset' ) ) {
        return( 'var( ' .esc_html( $color ). ' )' );
      } else {
        return $color;
      }
    }
endif;

if( ! function_exists( 'newsmatic_get_rcolor_code' ) ) :
	/**
	 * Returns randon color code
	 * 
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_get_rcolor_code() {
		$color_array = ["#1B8415"];
		$color_key = array_rand( $color_array, 1 );
		return apply_filters( 'newsmatic_apply_random_color_shuffle_value', $color_array[$color_key] );
	}
endif;

require get_template_directory() . '/inc/theme-starter.php'; // theme starter functions.
require get_template_directory() . '/inc/customizer/customizer.php'; // Customizer additions.
require get_template_directory() . '/inc/extras/helpers.php'; // helpers files.
require get_template_directory() . '/inc/extras/extras.php'; // extras files.
require get_template_directory() . '/inc/widgets/widgets.php'; // widget handlers
include get_template_directory() . '/inc/styles.php';
include get_template_directory() . '/inc/admin/class-theme-info.php';
/**
 * Wrap last word with span
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
function newsmatic_wrap_last_word($string) {
    // Breaks string to pieces
    $pieces = explode(" ", $string);
    // Modifies the last word
    $pieces[count($pieces)-1] = '<sub>' . $pieces[count($pieces)-1] . '</sub>';
    // Returns the glued pieces
    return implode(" ", $pieces);
}

if( ! function_exists( 'newsmatic_filter_posts_load_tab_content' ) ) :
	/**
	 * Filter posts ajax function
	 *
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_filter_posts_load_tab_content() {
		check_ajax_referer( 'newsmatic-nonce', 'security' );
		$options = isset( $_GET['options'] ) ? json_decode( wp_unslash( $_GET['options'] ) ): '';
		if( empty( $options ) ) return;
		$query = $options->query;
		$layout = $options->layout;
		$orderArray = explode( '-', $query->order );
		$posts_args = array(
			'posts_per_page'   => absint( $query->count ),
			'order' => esc_html( $orderArray[1] ),
			'orderby' => esc_html( $orderArray[0] ),
			'category_name' => esc_html( $options->category_name ),
			'ignore_sticky_posts'    => true
		);
		if( $query->ids ) $post_args['post__not_in'] = newsmatic_get_array_key_string_to_int( $query->ids );
		$n_posts = new WP_Query( $posts_args );
		$total_posts = $n_posts->post_count;
		if( $n_posts -> have_posts() ):
				ob_start();
				echo '<div class="tab-content content-' .esc_html( $options->category_name ). '">';
					while( $n_posts->have_posts() ) : $n_posts->the_post();
						$res['loaded'] = true;
						$current_post = $n_posts->current_post;
						if( $layout == 'four' ) {
							if( $current_post === 0 ) echo '<div class="featured-post">';
							if( $current_post === 2 ) {
								?>
								<div class="trailing-post">
								<?php
							}
						} else {
							if( ($current_post % 5) === 0 ) echo '<div class="row-wrap">';
								if( $current_post === 0 ) echo '<div class="featured-post">';
									if( $current_post === 1 || $current_post === 5 ) {
										?>
										<div class="trailing-post <?php if($current_post === 5) echo esc_attr('bottom-trailing-post'); ?>">
										<?php
									}
						}
										// get template file w.r.t par
										get_template_part( 'template-parts/news-filter/content', 'one', $options );
						if( $layout == 'four' ) {
							if( $total_posts === $current_post + 1 ) echo '</div><!-- .trailing-post -->';
								if( $current_post === 1 ) echo '</div><!-- .featured-post-->';
						} else {
									if( $current_post === 4 || ( $total_posts === $current_post + 1 ) ) echo '</div><!-- .trailing-post -->';
								if( $current_post === 0 ) echo '</div><!-- .featured-post-->';
							if( ($current_post % 5) === 4 || ( $total_posts === $current_post + 1 ) ) echo '</div><!-- .row-wrap -->';
						}
					endwhile;
				echo '</div>';	
				$res['posts'] = ob_get_clean();
			else :
				$res['loaded'] = false;
				$res['posts'] = esc_html__( 'No posts found', 'newsmatic' );
			endif;
			echo json_encode( $res );
			wp_die();
	}
	add_action( 'wp_ajax_newsmatic_filter_posts_load_tab_content', 'newsmatic_filter_posts_load_tab_content');
	add_action( 'wp_ajax_nopriv_newsmatic_filter_posts_load_tab_content', 'newsmatic_filter_posts_load_tab_content' );
endif;
if( ! function_exists( 'newsmatic_search_posts_content' ) ) :
	/**
	 * Posts ajax function with search query
	 *
	 * @package Newsmatic Pro
	 * @since 1.0.0
	 */
	function newsmatic_search_posts_content() {
		check_ajax_referer( 'newsmatic-nonce', 'security' );
		$search_key = isset( $_POST['search_key'] ) ? sanitize_text_field( stripslashes( $_POST['search_key'] ) ): '';
		$query_vars = [
			'post_type'	=> 'post',
			'post_status'	=> 'publish',
			'posts_per_page'	=> 4,
			's'	=> esc_html($search_key)
		];
		$n_posts = new WP_Query( $query_vars );
		$res['loaded'] = false;
		if ( $n_posts->have_posts() ) :
			ob_start();
			echo '<div class="search-results-wrap">';
				echo '<div class="search-posts-wrap">';
				$res['loaded'] = true;
					/* Start the Loop */
					while ( $n_posts->have_posts() ) :
						$n_posts->the_post();
						?>
							<div class="article-item">
								<figure class="post-thumb-wrap <?php if( ! has_post_thumbnail() ){ echo esc_attr( 'no-feat-img' ); } ?>">
									<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
										<?php
											if( has_post_thumbnail() ) { 
												the_post_thumbnail( 'thumbnail', array(
													'title' => the_title_attribute(array(
														'echo'  => false
													))
												));
											}
										?>
									</a>
								</figure>
								<div class="post-element">
									<h2 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
									<?php newsmatic_posted_on(); ?>
								</div>
							</div>
						<?php
					endwhile;
				echo '</div><!-- .search-posts-wrap -->';
			echo '</div><!-- .search-results-wrap -->';
			$res['posts'] = ob_get_clean();
		else :
			ob_start();
				?>
				<div class="search-results-wrap no-posts-found">
					<h2 class="no-posts-found-title"><?php echo esc_html__( '404 Not Found', 'newsmatic' ); ?></h2>
					<p class="no-posts-found-description"><?php echo esc_html__( 'It looks like nothing was found at this location. Maybe try another search?', 'newsmatic' ); ?></p>
				</div><!-- .search-results-wrap -->
				<?php
			$res['posts'] = ob_get_clean();
		endif;
		echo json_encode( $res );
		wp_die();
	}
	add_action( 'wp_ajax_newsmatic_search_posts_content', 'newsmatic_search_posts_content');
	add_action( 'wp_ajax_nopriv_newsmatic_search_posts_content', 'newsmatic_search_posts_content' );
endif;

if( ! function_exists( 'newsmatic_lazy_load_value' ) ) :
	/**
	 * Echos lazy load attribute value.
	 * 
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_lazy_load_value() {
		echo esc_attr( apply_filters( 'newsmatic_lazy_load_value', 'lazy' ) );
	}
endif;

if( ! function_exists( 'newsmatic_add_menu_description' ) ) :
	// merge menu description element to the menu 
	function newsmatic_add_menu_description( $item_output, $item, $depth, $args ) {
		if($args->theme_location != 'menu-2') return $item_output;
		
		if ( !empty( $item->description ) ) {
			$item_output = str_replace( $args->link_after . '</a>', '<span class="menu-item-description">' . $item->description . '</span>' . $args->link_after . '</a>', $item_output );
		}
		return $item_output;
	}
	add_filter( 'walker_nav_menu_start_el', 'newsmatic_add_menu_description', 10, 4 );
endif;

if( ! function_exists( 'newsmatic_bool_to_string' ) ) :
	// boolean value to string 
	function newsmatic_bool_to_string( $bool ) {
		$string = ( $bool ) ? '1' : '0';
		return $string;
	}
endif;