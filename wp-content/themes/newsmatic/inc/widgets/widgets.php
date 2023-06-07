<?php
/**
 * Handle the wigets files and hooks
 * 
 * @package Newsmatic
 * @since 1.0.0
 */

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function newsmatic_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'newsmatic' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// left sidebar
	register_sidebar(
		array(
			'name'          => esc_html__( 'Left Sidebar', 'newsmatic' ),
			'id'            => 'left-sidebar',
			'description'   => esc_html__( 'Add widgets here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// header toggle sidebar
	register_sidebar(
		array(
			'name'          => esc_html__( 'Header Toggle Sidebar', 'newsmatic' ),
			'id'            => 'header-toggle-sidebar',
			'description'   => esc_html__( 'Add widgets here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// front right sidebar
	register_sidebar(
		array(
			'name'          => esc_html__( 'Frontpage - Middle Right Sidebar', 'newsmatic' ),
			'id'            => 'front-right-sidebar',
			'description'   => esc_html__( 'Add widgets suitable for middle right here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// front left sidebar
	register_sidebar(
		array(
			'name'          => esc_html__( 'Frontpage - Middle Left Sidebar', 'newsmatic' ),
			'id'            => 'front-left-sidebar',
			'description'   => esc_html__( 'Add widgets suitable for middle left here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// footer sidebar - column 1
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Sidebar - Column 1', 'newsmatic' ),
			'id'            => 'footer-sidebar--column-1',
			'description'   => esc_html__( 'Add widgets here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// footer sidebar - column 2
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Sidebar - Column 2', 'newsmatic' ),
			'id'            => 'footer-sidebar--column-2',
			'description'   => esc_html__( 'Add widgets here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	// footer sidebar - column 3
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Sidebar - Column 3', 'newsmatic' ),
			'id'            => 'footer-sidebar--column-3',
			'description'   => esc_html__( 'Add widgets here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// footer sidebar - column 4
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Sidebar - Column 4', 'newsmatic' ),
			'id'            => 'footer-sidebar--column-4',
			'description'   => esc_html__( 'Add widgets here.', 'newsmatic' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title"><span>',
			'after_title'   => '</span></h2>',
		)
	);

	// Register custom widgets
    register_widget( 'Newsmatic_Widget_Title_Widget' ); // custom widget title
	register_widget( 'Newsmatic_Posts_List_Widget' ); // post lists widget
	register_widget( 'Newsmatic_Posts_Grid_Widget' ); // post grid widget
	register_widget( 'Newsmatic_Category_Collection_Widget' ); // category collection widget
	register_widget( 'Newsmatic_Author_Info_Widget' ); // author info widget
	register_widget( 'Newsmatic_Popular_Posts_Widget' ); // popular posts widget
	register_widget( 'Newsmatic_Carousel_Widget' ); // carousel widget
	register_widget( 'Newsmatic_Posts_Grid_Two_Column_Widget' ); // post grid two column widget
}
add_action( 'widgets_init', 'newsmatic_widgets_init' );

// includes files
require NEWSMATIC_INCLUDES_PATH .'widgets/widget-fields.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/category-collection.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/posts-list.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/posts-grid.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/author-info.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/popular-posts.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/carousel.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/widget-title.php';
require NEWSMATIC_INCLUDES_PATH .'widgets/posts-grid-two-column.php';

function newsmatic_widget_scripts($hook) {
    if( $hook !== "widgets.php" ) {
        return;
    }
    wp_enqueue_style( 'newsmatic-widget', get_template_directory_uri() . '/inc/widgets/assets/widgets.css', array(), NEWSMATIC_VERSION );
	wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/assets/lib/fontawesome/css/all.min.css', array(), '5.15.3', 'all' );
	wp_enqueue_media();
	wp_enqueue_script( 'newsmatic-widget', get_template_directory_uri() . '/inc/widgets/assets/widgets.js', array( 'jquery' ), NEWSMATIC_VERSION, true );
}
add_action( 'admin_enqueue_scripts', 'newsmatic_widget_scripts' );

if( ! function_exists( 'newsmatic_get_tabbed_icon_classes' ) ) :
	/**
	 * List of icons classes
	 * 
	 * @package Newsmatic
	 */
	function newsmatic_get_tabbed_icon_classes() {
		return apply_filters( 'newsmatic_tabbed_block_icons', array( "fas fa-ban","fas fa-clock","far fa-clock","fas fa-newspaper","far fa-newspaper","fas fa-poll","fas fa-poll-h","fas fa-ban","fas fa-fire","fas fa-fire-alt","fas fa-comments","fas fa-comment-dots","far fa-comment-dots","far fa-comment","far fa-comments","fas fa-comment-alt","far fa-comment-alt" ) );
	}
endif;