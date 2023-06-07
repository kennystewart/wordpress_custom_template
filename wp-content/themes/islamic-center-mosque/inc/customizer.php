<?php
/**
 * Islamic Center Mosque  Theme Customizer
 *
 * @package Islamic Center Mosque 
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */

function islamic_center_mosque_custom_controls() {
	load_template( trailingslashit( get_template_directory() ) . '/inc/custom-controls.php' );
}
add_action( 'customize_register', 'islamic_center_mosque_custom_controls' );

function islamic_center_mosque_customize_register( $wp_customize ) {

	$wp_customize->get_setting( 'blogname' )->transport = 'postMessage'; 
	$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

	//Selective Refresh
	$wp_customize->selective_refresh->add_partial( 'blogname', array( 
		'selector' => '.logo .site-title a', 
	 	'render_callback' => 'islamic_center_mosque_Customize_partial_blogname',
	)); 

	$wp_customize->selective_refresh->add_partial( 'blogdescription', array( 
		'selector' => 'p.site-description', 
		'render_callback' => 'islamic_center_mosque_Customize_partial_blogdescription',
	));

	// add home page setting pannel
	$wp_customize->add_panel( 'islamic_center_mosque_panel_id', array(
		'capability' => 'edit_theme_options',
		'theme_supports' => '',
		'title' => esc_html__( 'Homepage Settings', 'islamic-center-mosque' ),
		'priority' => 10,
	));

	// Layout
	$wp_customize->add_section( 'islamic_center_mosque_left_right', array(
    	'title' => esc_html__('General Settings', 'islamic-center-mosque'),
		'panel' => 'islamic_center_mosque_panel_id'
	) );

	$wp_customize->add_setting('islamic_center_mosque_width_option',array(
        'default' => 'Full Width',
        'sanitize_callback' => 'islamic_center_mosque_sanitize_choices'
	));
	$wp_customize->add_control(new Islamic_Center_Mosque_Image_Radio_Control($wp_customize, 'islamic_center_mosque_width_option', array(
        'type' => 'select',
        'label' => esc_html__('Width Layouts','islamic-center-mosque'),
        'description' => esc_html__('Here you can change the width layout of Website.','islamic-center-mosque'),
        'section' => 'islamic_center_mosque_left_right',
        'choices' => array(
            'Full Width' => esc_url(get_template_directory_uri()).'/assets/images/full-width.png',
            'Wide Width' => esc_url(get_template_directory_uri()).'/assets/images/wide-width.png',
            'Boxed' => esc_url(get_template_directory_uri()).'/assets/images/boxed-width.png',
    ))));

	$wp_customize->add_setting('islamic_center_mosque_theme_options',array(
        'default' => 'Right Sidebar',
        'sanitize_callback' => 'islamic_center_mosque_sanitize_choices'
	));
	$wp_customize->add_control('islamic_center_mosque_theme_options',array(
        'type' => 'select',
        'label' => esc_html__('Post Sidebar Layout','islamic-center-mosque'),
        'description' => esc_html__('Here you can change the sidebar layout for posts. ','islamic-center-mosque'),
        'section' => 'islamic_center_mosque_left_right',
        'choices' => array(
            'Left Sidebar' => esc_html__('Left Sidebar','islamic-center-mosque'),
            'Right Sidebar' => esc_html__('Right Sidebar','islamic-center-mosque'),
            'One Column' => esc_html__('One Column','islamic-center-mosque'),
            'Grid Layout' => esc_html__('Grid Layout','islamic-center-mosque')
        ),
	) );

	$wp_customize->add_setting('islamic_center_mosque_page_layout',array(
        'default' => 'One_Column',
        'sanitize_callback' => 'islamic_center_mosque_sanitize_choices'
	));
	$wp_customize->add_control('islamic_center_mosque_page_layout',array(
        'type' => 'select',
        'label' => esc_html__('Page Sidebar Layout','islamic-center-mosque'),
        'description' => esc_html__('Here you can change the sidebar layout for pages. ','islamic-center-mosque'),
        'section' => 'islamic_center_mosque_left_right',
        'choices' => array(
            'Left_Sidebar' => esc_html__('Left Sidebar','islamic-center-mosque'),
            'Right_Sidebar' => esc_html__('Right Sidebar','islamic-center-mosque'),
            'One_Column' => esc_html__('One Column','islamic-center-mosque')
        ),
	) );

	// Selective Refresh
	$wp_customize->selective_refresh->add_partial( 'islamic_center_mosque_woocommerce_shop_page_sidebar', array( 'selector' => '.post-type-archive-product #sidebar', 
		'render_callback' => 'islamic_center_mosque_customize_partial_islamic_center_mosque_woocommerce_shop_page_sidebar', ) );

    // Woocommerce Shop Page Sidebar
	$wp_customize->add_setting( 'islamic_center_mosque_woocommerce_shop_page_sidebar',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_woocommerce_shop_page_sidebar',array(
		'label' => esc_html__( 'Shop Page Sidebar','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_left_right'
    )));

    // Selective Refresh
	$wp_customize->selective_refresh->add_partial( 'islamic_center_mosque_woocommerce_single_product_page_sidebar', array( 'selector' => '.single-product #sidebar', 
		'render_callback' => 'islamic_center_mosque_customize_partial_islamic_center_mosque_woocommerce_single_product_page_sidebar', ) );

    //Woocommerce Single Product page Sidebar
	$wp_customize->add_setting( 'islamic_center_mosque_woocommerce_single_product_page_sidebar',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_woocommerce_single_product_page_sidebar',array(
		'label' => esc_html__( 'Single Product Sidebar','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_left_right'
    )));

    // Pre-Loader
	$wp_customize->add_setting( 'islamic_center_mosque_loader_enable',array(
        'default' => 0,
        'transport' => 'refresh',
        'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_loader_enable',array(
        'label' => esc_html__( 'Pre-Loader','islamic-center-mosque' ),
        'section' => 'islamic_center_mosque_left_right'
    )));

	$wp_customize->add_setting('islamic_center_mosque_preloader_bg_color', array(
		'default'           => '#2BB673',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'islamic_center_mosque_preloader_bg_color', array(
		'label'    => __('Pre-Loader Background Color', 'islamic-center-mosque'),
		'section'  => 'islamic_center_mosque_left_right',
	)));

	$wp_customize->add_setting('islamic_center_mosque_preloader_border_color', array(
		'default'           => '#ffffff',
		'sanitize_callback' => 'sanitize_hex_color',
	));
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'islamic_center_mosque_preloader_border_color', array(
		'label'    => __('Pre-Loader Border Color', 'islamic-center-mosque'),
		'section'  => 'islamic_center_mosque_left_right',
	)));

	//Topbar
	$wp_customize->add_section( 'islamic_center_mosque_header_section' , array(
  		'title' => __( 'Header Section', 'islamic-center-mosque' ),
		'panel' => 'islamic_center_mosque_panel_id'
	) );

	$wp_customize->add_setting( 'islamic_center_mosque_topbar_hide_show',array(
    	'default' => 0,
      	'transport' => 'refresh',
      	'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ));
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_topbar_hide_show',array(
      	'label' => esc_html__( 'Show / Hide Topbar','islamic-center-mosque' ),
      	'section' => 'islamic_center_mosque_header_section'
    )));

    $wp_customize->add_setting('islamic_center_mosque_phone_number',array(
		'default'=> '',
		'sanitize_callback'	=> 'islamic_center_mosque_sanitize_phone_number'
	));	
	$wp_customize->add_control('islamic_center_mosque_phone_number',array(
		'label'	=> __('Add Phone number','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => __( '+00 123 456 7890', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_header_section',
		'type'=> 'text'
	));

	$wp_customize->add_setting('islamic_center_mosque_lite_email',array(
		'default' => '',
		'sanitize_callback' => 'sanitize_email'
	));

	$wp_customize->add_control('islamic_center_mosque_lite_email',array(
		'label' => __('Add Email','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => __( 'support@gmail.com', 'islamic-center-mosque' ),
        ),
		'section' => 'islamic_center_mosque_header_section',
		'setting' => 'islamic_center_mosque_lite_email',
		'type'    => 'text'
	));
	
	// Middle header
    $wp_customize->add_setting( 'islamic_center_mosque_cart_hide_show',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ));  
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_cart_hide_show',
       array(
		'label' => esc_html__( 'Show / Hide Cart','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_header_section'
    )));

	//Slider
	$wp_customize->add_section( 'islamic_center_mosque_slidersettings' , array(
    	'title'      => __( 'Slider Settings', 'islamic-center-mosque' ),
		'panel' => 'islamic_center_mosque_panel_id'
	) );

	$wp_customize->add_setting( 'islamic_center_mosque_slider_hide_show',array(
      'default' => 0,
      'transport' => 'refresh',
      'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ));  
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_slider_hide_show',array(
      'label' => esc_html__( 'Show / Hide Slider','islamic-center-mosque' ),
      'section' => 'islamic_center_mosque_slidersettings'
    )));

     //Selective Refresh
    $wp_customize->selective_refresh->add_partial('islamic_center_mosque_slider_hide_show',array(
		'selector'        => '.slider-btn a',
		'render_callback' => 'islamic_center_mosque_customize_partial_islamic_center_mosque_slider_hide_show',
	));

	for ( $count = 1; $count <= 3; $count++ ) {
		$wp_customize->add_setting( 'islamic_center_mosque_slider_page' . $count, array(
			'default'           => '',
			'sanitize_callback' => 'islamic_center_mosque_sanitize_dropdown_pages'
		) );
		$wp_customize->add_control( 'islamic_center_mosque_slider_page' . $count, array(
			'label'    => __( 'Select Slider Page', 'islamic-center-mosque' ),
			'description' => __('Slider image size (1400 x 550)','islamic-center-mosque'),
			'section'  => 'islamic_center_mosque_slidersettings',
			'type'     => 'dropdown-pages'
		) );
	}

	$wp_customize->add_setting( 'islamic_center_mosque_slider_speed', array(
		'default'  => 4000,
		'sanitize_callback'	=> 'sanitize_text_field'
	) );
	$wp_customize->add_control( 'islamic_center_mosque_slider_speed', array(
		'label' => esc_html__('Slider Transition Speed','islamic-center-mosque'),
		'section' => 'islamic_center_mosque_slidersettings',
		'type'  => 'text',
	) );

	//Slider height
	$wp_customize->add_setting('islamic_center_mosque_slider_height',array(
		'default'=> '',
		'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('islamic_center_mosque_slider_height',array(
		'label'	=> __('Slider Height','islamic-center-mosque'),
		'description'	=> __('Specify the slider height (px).','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => __( '500px', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_slidersettings',
		'type'=> 'text'
	)); 

	// Event Section
	$wp_customize->add_section('islamic_center_mosque_events_section',array(
		'title'	=> __('Events Section','islamic-center-mosque'),
		'panel' => 'islamic_center_mosque_panel_id',
	));

	$wp_customize->add_setting( 'islamic_center_mosque_events_heading', array(
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field'
	) );
	$wp_customize->add_control( 'islamic_center_mosque_events_heading', array(
		'label'    => __( 'Add Section Heading', 'islamic-center-mosque' ),
		'input_attrs' => array(
            'placeholder' => __( 'Upcoming Event', 'islamic-center-mosque' ),
        ),
		'section'  => 'islamic_center_mosque_events_section',
		'type'     => 'text'
	) );
	
	$args = array('numberposts' => -1);
	$post_list = get_posts($args);
	$i = 0;
	$pst[]='Select';  
	foreach($post_list as $post){
		$pst[$post->post_title] = $post->post_title;
	}

	for ( $count = 1; $count < 4; $count++ ) {

		$wp_customize->add_setting( 'islamic_center_mosque_tab_pages' . $count, array(
			'sanitize_callback' => 'islamic_center_mosque_sanitize_choices'
		));
		$wp_customize->add_control( 'islamic_center_mosque_tab_pages' . $count, array(
			'label'    => __( 'Select Post', 'islamic-center-mosque' ),
			'section'  => 'islamic_center_mosque_events_section',
			'type'    => 'select',
			'choices' => $pst,
		));
	}

	$wp_customize->add_setting('islamic_center_mosque_event_button_text1',array(
		'default'=> 'View Details',
		'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('islamic_center_mosque_event_button_text1',array(
		'label'	=> __('Add Post Event Button Text','islamic-center-mosque'),
		'input_attrs' => array(
    	'placeholder' => __( 'View Details', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_events_section',
		'type'=> 'text',
	));

	$wp_customize->add_setting('islamic_center_mosque_event_button_text2',array(
		'default'=> 'Particiapte',
		'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('islamic_center_mosque_event_button_text2',array(
		'label'	=> __('Add Event Button Text','islamic-center-mosque'),
		'input_attrs' => array(
    	'placeholder' => __( 'Particiapte', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_events_section',
		'type'=> 'text',
	)); 

	$wp_customize->add_setting('islamic_center_mosque_event_button_link_text2',array(
		'default'=> '',
		'sanitize_callback'	=> 'esc_url_raw'
	));
	$wp_customize->add_control('islamic_center_mosque_event_button_link_text2',array(
		'label'	=> esc_html__('Add Button Link','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => esc_html__( 'www.example.com', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_events_section',
		'type'=> 'url'
	));

	$wp_customize->add_setting('islamic_center_mosque_product_clock_timer_end', array(
		'default'=> '',
		'sanitize_callback' => 'sanitize_text_field',
	));
	$wp_customize->add_control('islamic_center_mosque_product_clock_timer_end', array(
		'label' => __('Enter End Date of Timer','islamic-center-mosque'),
		'section' => 'islamic_center_mosque_events_section',
		'description' => __('Timer get the current date and time. So you just need to add the end date. Please Use the following format to add the date "Month date year hours:minutes:seconds" example "June 3 2023 11:00:00".','islamic-center-mosque'),
		'type'=> 'text',
	));

	//Blog Post
	$wp_customize->add_panel( 'islamic_center_mosque_blog_post_parent_panel', array(
		'title' => esc_html__( 'Blog Post Settings', 'islamic-center-mosque' ),
		'panel' => 'islamic_center_mosque_panel_id',
		'priority' => 20,
	));

	// Add example section and controls to the middle (second) panel
	$wp_customize->add_section( 'islamic_center_mosque_post_settings', array(
		'title' => esc_html__( 'Post Settings', 'islamic-center-mosque' ),
		'panel' => 'islamic_center_mosque_blog_post_parent_panel',
	));

	//Selective Refresh
	$wp_customize->selective_refresh->add_partial('islamic_center_mosque_toggle_postdate', array( 
		'selector' => '.post-main-box h2 a', 
		'render_callback' => 'islamic_center_mosque_Customize_partial_islamic_center_mosque_toggle_postdate', 
	));

	$wp_customize->add_setting( 'islamic_center_mosque_toggle_postdate',array(
        'default' => 1,
        'transport' => 'refresh',
        'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_toggle_postdate',array(
        'label' => esc_html__( 'Post Date','islamic-center-mosque' ),
        'section' => 'islamic_center_mosque_post_settings'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_toggle_author',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_toggle_author',array(
		'label' => esc_html__( 'Author','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_post_settings'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_toggle_comments',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_toggle_comments',array(
		'label' => esc_html__( 'Comments','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_post_settings'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_toggle_time',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_toggle_time',array(
		'label' => esc_html__( 'Time','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_post_settings'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_featured_image_hide_show',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
	));
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_featured_image_hide_show', array(
		'label' => esc_html__( 'Featured Image','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_post_settings'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_toggle_tags',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
	));
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_toggle_tags', array(
		'label' => esc_html__( 'Tags','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_post_settings'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_excerpt_number', array(
		'default'              => 30,
		'type'                 => 'theme_mod',
		'transport' 		   => 'refresh',
		'sanitize_callback'    => 'islamic_center_mosque_sanitize_number_range',
		'sanitize_js_callback' => 'absint',
	) );
	$wp_customize->add_control( 'islamic_center_mosque_excerpt_number', array(
		'label'       => esc_html__( 'Excerpt length','islamic-center-mosque' ),
		'section'     => 'islamic_center_mosque_post_settings',
		'type'        => 'range',
		'settings'    => 'islamic_center_mosque_excerpt_number',
		'input_attrs' => array(
			'step'             => 5,
			'min'              => 0,
			'max'              => 50,
		),
	) );

	$wp_customize->add_setting('islamic_center_mosque_meta_field_separator',array(
		'default'=> '|',
		'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('islamic_center_mosque_meta_field_separator',array(
		'label'	=> __('Add Meta Separator','islamic-center-mosque'),
		'description' => __('Add the seperator for meta box. Example: "|", "/", etc.','islamic-center-mosque'),
		'section'=> 'islamic_center_mosque_post_settings',
		'type'=> 'text'
	));

    $wp_customize->add_setting('islamic_center_mosque_excerpt_settings',array(
        'default' => 'Excerpt',
        'transport' => 'refresh',
        'sanitize_callback' => 'islamic_center_mosque_sanitize_choices'
	));
	$wp_customize->add_control('islamic_center_mosque_excerpt_settings',array(
        'type' => 'select',
        'label' => esc_html__('Post Content','islamic-center-mosque'),
        'section' => 'islamic_center_mosque_post_settings',
        'choices' => array(
        	'Content' => esc_html__('Content','islamic-center-mosque'),
            'Excerpt' => esc_html__('Excerpt','islamic-center-mosque'),
            'No Content' => esc_html__('No Content','islamic-center-mosque')
        ),
	) );

    // Button Settings
	$wp_customize->add_section( 'islamic_center_mosque_button_settings', array(
		'title' => esc_html__( 'Button Settings', 'islamic-center-mosque' ),
		'panel' => 'islamic_center_mosque_blog_post_parent_panel',
	));

	//Selective Refresh
	$wp_customize->selective_refresh->add_partial('islamic_center_mosque_button_text', array( 
		'selector' => '.post-main-box .more-btn a', 
		'render_callback' => 'islamic_center_mosque_Customize_partial_islamic_center_mosque_button_text', 
	));

    $wp_customize->add_setting('islamic_center_mosque_button_text',array(
		'default'=> esc_html__('Read More','islamic-center-mosque'),
		'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('islamic_center_mosque_button_text',array(
		'label'	=> esc_html__('Add Button Text','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => esc_html__( 'Read More', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_button_settings',
		'type'=> 'text'
	));

	// Related Post Settings
	$wp_customize->add_section( 'islamic_center_mosque_related_posts_settings', array(
		'title' => esc_html__( 'Related Posts Settings', 'islamic-center-mosque' ),
		'panel' => 'islamic_center_mosque_blog_post_parent_panel',
	));

	//Selective Refresh
	$wp_customize->selective_refresh->add_partial('islamic_center_mosque_related_post_title', array( 
		'selector' => '.related-post h3', 
		'render_callback' => 'islamic_center_mosque_Customize_partial_islamic_center_mosque_related_post_title', 
	));

    $wp_customize->add_setting( 'islamic_center_mosque_related_post',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ) );
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_related_post',array(
		'label' => esc_html__( 'Related Post','islamic-center-mosque' ),
		'section' => 'islamic_center_mosque_related_posts_settings'
    )));

    $wp_customize->add_setting('islamic_center_mosque_related_post_title',array(
		'default'=> '',
		'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('islamic_center_mosque_related_post_title',array(
		'label'	=> esc_html__('Add Related Post Title','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => esc_html__( 'Related Post', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_related_posts_settings',
		'type'=> 'text'
	));

   	$wp_customize->add_setting('islamic_center_mosque_related_posts_count',array(
		'default'=> 3,
		'sanitize_callback'	=> 'islamic_center_mosque_sanitize_number_absint'
	));
	$wp_customize->add_control('islamic_center_mosque_related_posts_count',array(
		'label'	=> esc_html__('Add Related Post Count','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => esc_html__( '3', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_related_posts_settings',
		'type'=> 'number'
	));

	//Responsive Media Settings
	$wp_customize->add_section('islamic_center_mosque_responsive_media',array(
		'title'	=> esc_html__('Responsive Media','islamic-center-mosque'),
		'panel' => 'islamic_center_mosque_panel_id',
	));

    $wp_customize->add_setting( 'islamic_center_mosque_resp_slider_hide_show',array(
      	'default' => 0,
     	'transport' => 'refresh',
      	'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ));  
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_resp_slider_hide_show',array(
      	'label' => esc_html__( 'Show / Hide Slider','islamic-center-mosque' ),
      	'section' => 'islamic_center_mosque_responsive_media'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_sidebar_hide_show',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ));  
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_sidebar_hide_show',array(
      	'label' => esc_html__( 'Show / Hide Sidebar','islamic-center-mosque' ),
      	'section' => 'islamic_center_mosque_responsive_media'
    )));

    $wp_customize->add_setting( 'islamic_center_mosque_resp_scroll_top_hide_show',array(
		'default' => 1,
		'transport' => 'refresh',
		'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ));  
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_resp_scroll_top_hide_show',array(
      	'label' => esc_html__( 'Show / Hide Scroll To Top','islamic-center-mosque' ),
      	'section' => 'islamic_center_mosque_responsive_media'
    )));

	//Footer Text
	$wp_customize->add_section('islamic_center_mosque_footer',array(
		'title'	=> esc_html__('Footer Settings','islamic-center-mosque'),
		'panel' => 'islamic_center_mosque_panel_id',
	));	

	//Selective Refresh
	$wp_customize->selective_refresh->add_partial('islamic_center_mosque_footer_text', array( 
		'selector' => '.copyright p', 
		'render_callback' => 'islamic_center_mosque_Customize_partial_islamic_center_mosque_footer_text', 
	));
	
	$wp_customize->add_setting('islamic_center_mosque_footer_text',array(
		'default'=> '',
		'sanitize_callback'	=> 'sanitize_text_field'
	));	
	$wp_customize->add_control('islamic_center_mosque_footer_text',array(
		'label'	=> esc_html__('Copyright Text','islamic-center-mosque'),
		'input_attrs' => array(
            'placeholder' => esc_html__( 'Copyright 2021, .....', 'islamic-center-mosque' ),
        ),
		'section'=> 'islamic_center_mosque_footer',
		'type'=> 'text'
	));

	$wp_customize->add_setting('islamic_center_mosque_copyright_alingment',array(
        'default' => 'center',
        'sanitize_callback' => 'islamic_center_mosque_sanitize_choices'
	));
	$wp_customize->add_control(new Islamic_Center_Mosque_Image_Radio_Control($wp_customize, 'islamic_center_mosque_copyright_alingment', array(
        'type' => 'select',
        'label' => esc_html__('Copyright Alignment','islamic-center-mosque'),
        'section' => 'islamic_center_mosque_footer',
        'settings' => 'islamic_center_mosque_copyright_alingment',
        'choices' => array(
            'left' => esc_url(get_template_directory_uri()).'/assets/images/copyright1.png',
            'center' => esc_url(get_template_directory_uri()).'/assets/images/copyright2.png',
            'right' => esc_url(get_template_directory_uri()).'/assets/images/copyright3.png'
    ))));

    $wp_customize->add_setting( 'islamic_center_mosque_hide_show_scroll',array(
    	'default' => 1,
      	'transport' => 'refresh',
      	'sanitize_callback' => 'islamic_center_mosque_switch_sanitization'
    ));  
    $wp_customize->add_control( new Islamic_Center_Mosque_Toggle_Switch_Custom_Control( $wp_customize, 'islamic_center_mosque_hide_show_scroll',array(
      	'label' => esc_html__( 'Show / Hide Scroll to Top','islamic-center-mosque' ),
      	'section' => 'islamic_center_mosque_footer'
    )));

    //Selective Refresh
	$wp_customize->selective_refresh->add_partial('islamic_center_mosque_scroll_to_top_icon', array( 
		'selector' => '.scrollup i', 
		'render_callback' => 'islamic_center_mosque_Customize_partial_islamic_center_mosque_scroll_to_top_icon', 
	));

    $wp_customize->add_setting('islamic_center_mosque_scroll_top_alignment',array(
        'default' => 'Right',
        'sanitize_callback' => 'islamic_center_mosque_sanitize_choices'
	));
	$wp_customize->add_control(new Islamic_Center_Mosque_Image_Radio_Control($wp_customize, 'islamic_center_mosque_scroll_top_alignment', array(
        'type' => 'select',
        'label' => esc_html__('Scroll To Top','islamic-center-mosque'),
        'section' => 'islamic_center_mosque_footer',
        'settings' => 'islamic_center_mosque_scroll_top_alignment',
        'choices' => array(
            'Left' => esc_url(get_template_directory_uri()).'/assets/images/layout1.png',
            'Center' => esc_url(get_template_directory_uri()).'/assets/images/layout2.png',
            'Right' => esc_url(get_template_directory_uri()).'/assets/images/layout3.png'
    ))));
}

add_action( 'customize_register', 'islamic_center_mosque_customize_register' );

/**
 * Singleton class for handling the theme's customizer integration.
 *
 * @since  1.0.0
 * @access public
 */
final class Islamic_Center_Mosque_Customize {

	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self;
			$instance->setup_actions();
		}

		return $instance;
	}

	/**
	 * Constructor method.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function __construct() {}

	/**
	 * Sets up initial actions.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function setup_actions() {

		// Register panels, sections, settings, controls, and partials.
		add_action( 'customize_register', array( $this, 'sections' ) );

		// Register scripts and styles for the controls.
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_control_scripts' ), 0 );
	}

	/**
	 * Sets up the customizer sections.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param  object  $manager
	 * @return void
	*/
	public function sections( $manager ) {

		// Load custom sections.
		load_template( trailingslashit( get_template_directory() ) . '/inc/section-pro.php' );

		// Register custom section types.
		$manager->register_section_type( 'Islamic_Center_Mosque_Customize_Section_Pro' );

		// Register sections.
		$manager->add_section( new Islamic_Center_Mosque_Customize_Section_Pro( $manager,'islamic_center_mosque_go_pro', array(
			'priority'   => 1,
			'title'    => esc_html__( 'ISLAMIC CENTER PRO', 'islamic-center-mosque' ),
			'pro_text' => esc_html__( 'UPGRADE PRO', 'islamic-center-mosque' ),
			'pro_url'  => esc_url('https://www.vwthemes.com/themes/mosque-wordpress-theme/'),
		) )	);
	}

	/**
	 * Loads theme customizer CSS.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function enqueue_control_scripts() {

		wp_enqueue_script( 'islamic-center-mosque-customize-controls', trailingslashit( get_template_directory_uri() ) . '/assets/js/customize-controls.js', array( 'customize-controls' ) );

		wp_enqueue_style( 'islamic-center-mosque-customize-controls', trailingslashit( get_template_directory_uri() ) . '/assets/css/customize-controls.css' );
	}
}

// Doing this customizer thang!
Islamic_Center_Mosque_Customize::get_instance();