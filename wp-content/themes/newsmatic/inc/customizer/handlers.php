<?php
use Newsmatic\CustomizerDefault as ND;
/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
add_action( 'customize_preview_init', function() {
    wp_enqueue_script( 
        'newsmatic-customizer-preview',
        get_template_directory_uri() . '/inc/customizer/assets/customizer-preview.min.js',
        ['customize-preview'],
        NEWSMATIC_VERSION,
        true
    );
    // newsmatic scripts
	wp_localize_script( 
        'newsmatic-customizer-preview',
        'newsmaticPreviewObject', array(
            '_wpnonce'	=> wp_create_nonce( 'newsmatic-customizer-nonce' ),
            'ajaxUrl' => admin_url('admin-ajax.php')
        )
    );
});

add_action( 'customize_controls_enqueue_scripts', function() {
    $buildControlsDeps = apply_filters(  'newsmatic_customizer_build_controls_dependencies', array(
        'react',
        'wp-blocks',
        'wp-editor',
        'wp-element',
        'wp-i18n',
        'wp-polyfill',
        'jquery',
        'wp-components'
    ));
	wp_enqueue_style( 
        'newsmatic-customizer-control',
        get_template_directory_uri() . '/inc/customizer/assets/customizer-controls.min.css', 
        array('wp-components'),
        NEWSMATIC_VERSION,
        'all'
    );
    wp_enqueue_script( 
        'newsmatic-customizer-control',
        get_template_directory_uri() . '/inc/customizer/assets/customizer-extends.min.js',
        $buildControlsDeps,
        NEWSMATIC_VERSION,
        true
    );
    // newsmatic scripts
    wp_localize_script( 
        'newsmatic-customizer-control', 
        'customizerControlsObject', array(
            'categories'    => newsmatic_get_multicheckbox_categories_simple_array(),
            'posts'    => newsmatic_get_multicheckbox_posts_simple_array(),
            '_wpnonce'	=> wp_create_nonce( 'newsmatic-customizer-controls-live-nonce' ),
            'ajaxUrl' => admin_url('admin-ajax.php')
        )
    );
});

if( !function_exists( 'newsmatic_customizer_about_theme_panel' ) ) :
    /**
     * Register blog archive section settings
     * 
     */
    function newsmatic_customizer_about_theme_panel( $wp_customize ) {
        /**
         * About theme section
         * 
         * @since 1.0.0
         */
        $wp_customize->add_section( NEWSMATIC_PREFIX . 'about_section', array(
            'title' => esc_html__( 'About Theme', 'newsmatic' ),
            'priority'  => 1
        ));

        // upgrade info box
        $wp_customize->add_setting( 'upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Info_Box_Control( $wp_customize, 'upgrade_info', array(
                'label'	      => esc_html__( 'Premium Version', 'newsmatic' ),
                'description' => esc_html__( 'Our premium version of newsmatic includes unlimited news sections with advanced control fields. No limititation on any field and dedicated support.', 'newsmatic' ),
                'section'     => NEWSMATIC_PREFIX . 'about_section',
                'settings'    => 'upgrade_info',
                'choices' => array(
                    array(
                        'label' => esc_html__( 'View Premium', 'newsmatic' ),
                        'url'   => esc_url( '//blazethemes.com/theme/newsmatic-pro/' )
                    )
                )
            ))
        );

        // theme documentation info box
        $wp_customize->add_setting( 'site_documentation_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Info_Box_Control( $wp_customize, 'site_documentation_info', array(
                'label'	      => esc_html__( 'Theme Documentation', 'newsmatic' ),
                'description' => esc_html__( 'We have well prepared documentation which includes overall instructions and recommendations that are required in this theme.', 'newsmatic' ),
                'section'     => NEWSMATIC_PREFIX . 'about_section',
                'settings'    => 'site_documentation_info',
                'choices' => array(
                    array(
                        'label' => esc_html__( 'View Documentation', 'newsmatic' ),
                        'url'   => esc_url( '//doc.blazethemes.com/newsmatic' )
                    )
                )
            ))
        );

        // theme documentation info box
        $wp_customize->add_setting( 'site_support_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Info_Box_Control( $wp_customize, 'site_support_info', array(
                'label'	      => esc_html__( 'Theme Support', 'newsmatic' ),
                'description' => esc_html__( 'We provide 24/7 support regarding any theme issue. Our support team will help you to solve any kind of issue. Feel free to contact us.', 'newsmatic' ),
                'section'     => NEWSMATIC_PREFIX . 'about_section',
                'settings'    => 'site_support_info',
                'choices' => array(
                    array(
                        'label' => esc_html__( 'Support Form', 'newsmatic' ),
                        'url'   => esc_url( '//blazethemes.com/support' )
                    )
                )
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_about_theme_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_global_panel' ) ) :
    /**
     * Register global options settings
     * 
     */
    function newsmatic_customizer_global_panel( $wp_customize ) {
        /**
         * Global panel
         * 
         * @package Newsmatic
         * @since 1.0.0
         */
        $wp_customize->add_panel( 'newsmatic_global_panel', array(
            'title' => esc_html__( 'Global', 'newsmatic' ),
            'priority'  => 5
        ));

        // section- seo/misc settings section
        $wp_customize->add_section( 'newsmatic_seo_misc_section', array(
            'title' => esc_html__( 'SEO / Misc', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));

        // site schema ready option
        $wp_customize->add_setting( 'site_schema_ready', array(
            'default'   => ND\newsmatic_get_customizer_default( 'site_schema_ready' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport'    => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Toggle_Control( $wp_customize, 'site_schema_ready', array(
                'label'	      => esc_html__( 'Make website schema ready', 'newsmatic' ),
                'section'     => 'newsmatic_seo_misc_section',
                'settings'    => 'site_schema_ready'
            ))
        );

        // site date to show
        $wp_customize->add_setting( 'site_date_to_show', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'site_date_to_show' )
        ));
        $wp_customize->add_control( 'site_date_to_show', array(
            'type'      => 'select',
            'section'   => 'newsmatic_seo_misc_section',
            'label'     => esc_html__( 'Date to display', 'newsmatic' ),
            'description' => esc_html__( 'Whether to show date published or modified date.', 'newsmatic' ),
            'choices'   => array(
                'published'  => __( 'Published date', 'newsmatic' ),
                'modified'   => __( 'Modified date', 'newsmatic' )
            )
        ));

        // site date format
        $wp_customize->add_setting( 'site_date_format', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'site_date_format' )
        ));
        $wp_customize->add_control( 'site_date_format', array(
            'type'      => 'select',
            'section'   => 'newsmatic_seo_misc_section',
            'label'     => esc_html__( 'Date format', 'newsmatic' ),
            'description' => esc_html__( 'Date format applied to single and archive pages.', 'newsmatic' ),
            'choices'   => array(
                'theme_format'  => __( 'Default by theme', 'newsmatic' ),
                'default'   => __( 'Wordpress default date', 'newsmatic' )
            )
        ));

        // preset colors header
        $wp_customize->add_setting( 'preset_colors_heading', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'preset_colors_heading', array(
                'label'	      => esc_html__( 'Theme Presets', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_colors_heading'
            ))
        );

        // primary preset color
        $wp_customize->add_setting( 'preset_color_1', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_1' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_1', array(
                'label'	      => esc_html__( 'Color 1', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_1',
                'variable'   => '--newsmatic-global-preset-color-1'
            ))
        );

        // secondary preset color
        $wp_customize->add_setting( 'preset_color_2', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_2' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_2', array(
                'label'	      => esc_html__( 'Color 2', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_2',
                'variable'   => '--newsmatic-global-preset-color-2'
            ))
        );

        // tertiary preset color
        $wp_customize->add_setting( 'preset_color_3', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_3' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_3', array(
                'label'	      => esc_html__( 'Color 3', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_3',
                'variable'   => '--newsmatic-global-preset-color-3'
            ))
        );

        // primary preset link color
        $wp_customize->add_setting( 'preset_color_4', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_4' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_4', array(
                'label'	      => esc_html__( 'Color 4', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_4',
                'variable'   => '--newsmatic-global-preset-color-4'
            ))
        );

        // secondary preset link color
        $wp_customize->add_setting( 'preset_color_5', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_5' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_5', array(
                'label'	      => esc_html__( 'Color 5', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_5',
                'variable'   => '--newsmatic-global-preset-color-5'
            ))
        );
        
        // tertiary preset link color
        $wp_customize->add_setting( 'preset_color_6', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_6' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_6', array(
                'label'	      => esc_html__( 'Color 6', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_6',
                'variable'   => '--newsmatic-global-preset-color-6'
            ))
        );

        // tertiary preset link color
        $wp_customize->add_setting( 'preset_color_7', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_7' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_7', array(
                'label'       => esc_html__( 'Color 7', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_7',
                'variable'   => '--newsmatic-global-preset-color-7'
            ))
        );

        // tertiary preset link color
        $wp_customize->add_setting( 'preset_color_8', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_8' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_8', array(
                'label'       => esc_html__( 'Color 8', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_8',
                'variable'   => '--newsmatic-global-preset-color-8'
            ))
        );

        // tertiary preset link color
        $wp_customize->add_setting( 'preset_color_9', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_9' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_9', array(
                'label'       => esc_html__( 'Color 9', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_9',
                'variable'   => '--newsmatic-global-preset-color-9'
            ))
        );

        // tertiary preset link color
        $wp_customize->add_setting( 'preset_color_10', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_10' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_10', array(
                'label'       => esc_html__( 'Color 10', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_10',
                'variable'   => '--newsmatic-global-preset-color-10'
            ))
        );

        // tertiary preset link color
        $wp_customize->add_setting( 'preset_color_11', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_11' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_11', array(
                'label'       => esc_html__( 'Color 11', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_11',
                'variable'   => '--newsmatic-global-preset-color-11'
            ))
        );

        // tertiary preset link color
        $wp_customize->add_setting( 'preset_color_12', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_color_12' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Color_Picker_Control( $wp_customize, 'preset_color_12', array(
                'label'       => esc_html__( 'Color 12', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_color_12',
                'variable'   => '--newsmatic-global-preset-color-12'
            ))
        );

        // gradient preset colors header
        $wp_customize->add_setting( 'gradient_preset_colors_heading', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'gradient_preset_colors_heading', array(
                'label'	      => esc_html__( 'Gradient Presets', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'gradient_preset_colors_heading'
            ))
        );

        // gradient color 1
        $wp_customize->add_setting( 'preset_gradient_1', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_1' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_1', array(
                'label'	      => esc_html__( 'Gradient 1', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_1',
                'variable'   => '--newsmatic-global-preset-gradient-color-1'
            ))
        );
        
        // gradient color 2
        $wp_customize->add_setting( 'preset_gradient_2', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_2' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_2', array(
                'label'	      => esc_html__( 'Gradient 2', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_2',
                'variable'   => '--newsmatic-global-preset-gradient-color-2'
            ))
        );

        // gradient color 3
        $wp_customize->add_setting( 'preset_gradient_3', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_3' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_3', array(
                'label'	      => esc_html__( 'Gradient 3', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_3',
                'variable'   => '--newsmatic-global-preset-gradient-color-3'
            ))
        );

        // gradient color 4
        $wp_customize->add_setting( 'preset_gradient_4', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_4' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_4', array(
                'label'	      => esc_html__( 'Gradient 4', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_4',
                'variable'   => '--newsmatic-global-preset-gradient-color-4'
            ))
        );

        // gradient color 5
        $wp_customize->add_setting( 'preset_gradient_5', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_5' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_5', array(
                'label'	      => esc_html__( 'Gradient 5', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_5',
                'variable'   => '--newsmatic-global-preset-gradient-color-5'
            ))
        );

        // gradient color 6
        $wp_customize->add_setting( 'preset_gradient_6', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_6' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_6', array(
                'label'	      => esc_html__( 'Gradient 6', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_6',
                'variable'   => '--newsmatic-global-preset-gradient-color-6'
            ))
        );

        // gradient color 7
        $wp_customize->add_setting( 'preset_gradient_7', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_7' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_7', array(
                'label'       => esc_html__( 'Gradient 7', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_7',
                'variable'   => '--newsmatic-global-preset-gradient-color-7'
            ))
        );

        // gradient color 8
        $wp_customize->add_setting( 'preset_gradient_8', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_8' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_8', array(
                'label'       => esc_html__( 'Gradient 8', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_8',
                'variable'   => '--newsmatic-global-preset-gradient-color-8'
            ))
        );

        // gradient color 9
        $wp_customize->add_setting( 'preset_gradient_9', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_9' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_9', array(
                'label'       => esc_html__( 'Gradient 9', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_9',
                'variable'   => '--newsmatic-global-preset-gradient-color-9'
            ))
        );

        // gradient color 10
        $wp_customize->add_setting( 'preset_gradient_10', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_10' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_10', array(
                'label'       => esc_html__( 'Gradient 10', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_10',
                'variable'   => '--newsmatic-global-preset-gradient-color-10'
            ))
        );

        // gradient color 11
        $wp_customize->add_setting( 'preset_gradient_11', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_11' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_11', array(
                'label'       => esc_html__( 'Gradient 11', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_11',
                'variable'   => '--newsmatic-global-preset-gradient-color-11'
            ))
        );

        // gradient color 12
        $wp_customize->add_setting( 'preset_gradient_12', array(
            'default'   => ND\newsmatic_get_customizer_default( 'preset_gradient_12' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Preset_Gradient_Picker_Control( $wp_customize, 'preset_gradient_12', array(
                'label'       => esc_html__( 'Gradient 12', 'newsmatic' ),
                'section'     => 'colors',
                'settings'    => 'preset_gradient_12',
                'variable'   => '--newsmatic-global-preset-gradient-color-12'
            ))
        );

        // section- category colors section
        $wp_customize->add_section( 'newsmatic_category_colors_section', array(
            'title' => esc_html__( 'Category Colors', 'newsmatic' ),
            'priority'  => 40
        ));

        $totalCats = get_categories();
        if( $totalCats ) :
            foreach( $totalCats as $singleCat ) :
                // category colors control
                $wp_customize->add_setting( 'category_' .absint($singleCat->term_id). '_color', array(
                    'default'   => ND\newsmatic_get_customizer_default('category_' .absint($singleCat->term_id). '_color'),
                    'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
                ));
                $wp_customize->add_control(
                    new Newsmatic_WP_Color_Picker_Control( $wp_customize, 'category_' .absint($singleCat->term_id). '_color', array(
                        'label'     => esc_html($singleCat->name),
                        'section'   => 'newsmatic_category_colors_section',
                        'settings'  => 'category_' .absint($singleCat->term_id). '_color'
                    ))
                );
            endforeach;
        endif;

        // section- preloader section
        $wp_customize->add_section( 'newsmatic_preloader_section', array(
            'title' => esc_html__( 'Preloader', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));
        
        // preloader option
        $wp_customize->add_setting( 'preloader_option', array(
            'default'   => ND\newsmatic_get_customizer_default('preloader_option'),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'preloader_option', array(
                'label'	      => esc_html__( 'Enable site preloader', 'newsmatic' ),
                'section'     => 'newsmatic_preloader_section',
                'settings'    => 'preloader_option'
            ))
        );

        // section- website styles section
        $wp_customize->add_section( 'newsmatic_website_styles_section', array(
            'title' => esc_html__( 'Website Styles', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));

        // website block top border style heading
        $wp_customize->add_setting( 'website_block_top_border_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'website_block_top_border_header', array(
                'label'	      => esc_html__( 'Block Top Border Style', 'newsmatic' ),
                'section'     => 'newsmatic_website_styles_section',
                'settings'    => 'website_block_top_border_header'
            ))
        );

        // website block top border
        $wp_customize->add_setting( 'website_block_border_top_option', array(
            'default'   => ND\newsmatic_get_customizer_default('website_block_border_top_option'),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'website_block_border_top_option', array(
                'label'	      => esc_html__( 'Website block top border', 'newsmatic' ),
                'section'     => 'newsmatic_website_styles_section',
                'settings'    => 'website_block_border_top_option'
            ))
        );

        // border color
        $wp_customize->add_setting( 'website_block_border_top_color', array(
            'default'   => ND\newsmatic_get_customizer_default( 'website_block_border_top_color' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Group_Control( $wp_customize, 'website_block_border_top_color', array(
                'label'	      => esc_html__( 'Border Color', 'newsmatic' ),
                'section'     => 'newsmatic_website_styles_section',
                'settings'    => 'website_block_border_top_color'
            ))
        );

        // section- website layout section
        $wp_customize->add_section( 'newsmatic_website_layout_section', array(
            'title' => esc_html__( 'Website Layout', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));
        
        // website layout heading
        $wp_customize->add_setting( 'website_layout_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'website_layout_header', array(
                'label'	      => esc_html__( 'Website Layout', 'newsmatic' ),
                'section'     => 'newsmatic_website_layout_section',
                'settings'    => 'website_layout_header'
            ))
        );

        // website layout
        $wp_customize->add_setting( 'website_layout',
            array(
            'default'           => ND\newsmatic_get_customizer_default( 'website_layout' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            )
        );
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Image_Control( $wp_customize, 'website_layout',
            array(
                'section'  => 'newsmatic_website_layout_section',
                'choices'  => array(
                    'boxed--layout' => array(
                        'label' => esc_html__( 'Boxed', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/boxed-width.jpg'
                    ),
                    'full-width--layout' => array(
                        'label' => esc_html__( 'Full Width', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/full-width.jpg'
                    )
                )
            )
        ));
        
        // section- animation section
        $wp_customize->add_section( 'newsmatic_animation_section', array(
            'title' => esc_html__( 'Animation / Hover Effects', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));
        
        // post title animation effects 
        $wp_customize->add_setting( 'post_title_hover_effects', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'post_title_hover_effects' ),
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 'post_title_hover_effects', array(
            'type'      => 'select',
            'section'   => 'newsmatic_animation_section',
            'label'     => esc_html__( 'Post title hover effects', 'newsmatic' ),
            'description' => esc_html__( 'Applied to post titles listed in archive pages.', 'newsmatic' ),
            'choices'   => array(
                'none' => __( 'None', 'newsmatic' ),
                'two'  => __( 'Effect one', 'newsmatic' )  
            )
        ));

        // site image animation effects 
        $wp_customize->add_setting( 'site_image_hover_effects', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'site_image_hover_effects' ),
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 'site_image_hover_effects', array(
            'type'      => 'select',
            'section'   => 'newsmatic_animation_section',
            'label'     => esc_html__( 'Image hover effects', 'newsmatic' ),
            'description' => esc_html__( 'Applied to post thumbanails listed in archive pages.', 'newsmatic' ),
            'choices'   => array(
                'none' => __( 'None', 'newsmatic' ),
                'two'  => __( 'Effect One', 'newsmatic' )
            )
        ));

        // section- social icons section
        $wp_customize->add_section( 'newsmatic_social_icons_section', array(
            'title' => esc_html__( 'Social Icons', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));
        
        // social icons setting heading
        $wp_customize->add_setting( 'social_icons_settings_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'social_icons_settings_header', array(
                'label'	      => esc_html__( 'Social Icons Settings', 'newsmatic' ),
                'section'     => 'newsmatic_social_icons_section',
                'settings'    => 'social_icons_settings_header'
            ))
        );

        // social icons target attribute value
        $wp_customize->add_setting( 'social_icons_target', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'social_icons_target' ),
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 'social_icons_target', array(
            'type'      => 'select',
            'section'   => 'newsmatic_social_icons_section',
            'label'     => esc_html__( 'Social Icon Link Open in', 'newsmatic' ),
            'description' => esc_html__( 'Sets the target attribute according to the value.', 'newsmatic' ),
            'choices'   => array(
                '_blank' => esc_html__( 'Open link in new tab', 'newsmatic' ),
                '_self'  => esc_html__( 'Open link in same tab', 'newsmatic' )
            )
        ));

        // social icons items
        $wp_customize->add_setting( 'social_icons', array(
            'default'   => ND\newsmatic_get_customizer_default( 'social_icons' ),
            'sanitize_callback' => 'newsmatic_sanitize_repeater_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Custom_Repeater( $wp_customize, 'social_icons', array(
                'label'         => esc_html__( 'Social Icons', 'newsmatic' ),
                'description'   => esc_html__( 'Hold bar icon and drag vertically to re-order the icons', 'newsmatic' ),
                'section'       => 'newsmatic_social_icons_section',
                'settings'      => 'social_icons',
                'row_label'     => 'inherit-icon_class',
                'add_new_label' => esc_html__( 'Add New Icon', 'newsmatic' ),
                'fields'        => array(
                    'icon_class'   => array(
                        'type'          => 'fontawesome-icon-picker',
                        'label'         => esc_html__( 'Social Icon', 'newsmatic' ),
                        'description'   => esc_html__( 'Select from dropdown.', 'newsmatic' ),
                        'default'       => esc_attr( 'fab fa-instagram' )

                    ),
                    'icon_url'  => array(
                        'type'      => 'url',
                        'label'     => esc_html__( 'URL for icon', 'newsmatic' ),
                        'default'   => ''
                    ),
                    'item_option'             => 'show'
                )
            ))
        );

        // section- buttons section
        $wp_customize->add_section( 'newsmatic_buttons_section', array(
            'title' => esc_html__( 'Buttons', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));

        // read more button label
        $wp_customize->add_setting( 'global_button_text', array(
            'default' => ND\newsmatic_get_customizer_default( 'global_button_text' ),
            'sanitize_callback' => 'newsmatic_sanitize_custom_text_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Icon_Text_Control( $wp_customize, 'global_button_text', array(
                'label'     => esc_html__( 'Button label', 'newsmatic' ),
                'section'     => 'newsmatic_buttons_section',
                'settings'    => 'global_button_text',
                'icons' => array( "fas fa-ban", "fas fa-angle-right", "fas fa-arrow-alt-circle-right", "far fa-arrow-alt-circle-right", "fas fa-angle-double-right", "fas fa-long-arrow-alt-right", "fas fa-arrow-right", "fas fa-arrow-circle-right", "fas fa-chevron-circle-right", "fas fa-caret-right", "fas fa-hand-point-right", "fas fa-caret-square-right", "far fa-caret-square-right" )
            ))
        );
        
        // section- sidebar options section
        $wp_customize->add_section( 'newsmatic_sidebar_options_section', array(
            'title' => esc_html__( 'Sidebar Options', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));

        // frontpage sidebar layout heading
        $wp_customize->add_setting( 'frontpage_sidebar_layout_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'frontpage_sidebar_layout_header', array(
                'label'	      => esc_html__( 'Frontpage Sidebar Layouts', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'frontpage_sidebar_layout_header'
            ))
        );

        // frontpage sidebar layout
        $wp_customize->add_setting( 'frontpage_sidebar_layout',
            array(
            'default'           => ND\newsmatic_get_customizer_default( 'frontpage_sidebar_layout' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            )
        );
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Image_Control( $wp_customize, 'frontpage_sidebar_layout',
            array(
                'section'  => 'newsmatic_sidebar_options_section',
                'choices'  => newsmatic_get_customizer_sidebar_array()
            )
        ));

        // frontpage sidebar sticky option
        $wp_customize->add_setting( 'frontpage_sidebar_sticky_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'frontpage_sidebar_sticky_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'frontpage_sidebar_sticky_option', array(
                'label'	      => esc_html__( 'Enable sidebar sticky', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'frontpage_sidebar_sticky_option'
            ))
        );

        // archive sidebar layouts heading
        $wp_customize->add_setting( 'archive_sidebar_layout_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'archive_sidebar_layout_header', array(
                'label'	      => esc_html__( 'Archive Sidebar Layouts', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'archive_sidebar_layout_header'
            ))
        );

        // archive sidebar layout
        $wp_customize->add_setting( 'archive_sidebar_layout',
            array(
            'default'           => ND\newsmatic_get_customizer_default( 'archive_sidebar_layout' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            )
        );
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Image_Control( $wp_customize, 'archive_sidebar_layout',
            array(
                'section'  => 'newsmatic_sidebar_options_section',
                'choices'  => newsmatic_get_customizer_sidebar_array()
            )
        ));

        // archive sidebar sticky option
        $wp_customize->add_setting( 'archive_sidebar_sticky_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'archive_sidebar_sticky_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'archive_sidebar_sticky_option', array(
                'label'	      => esc_html__( 'Enable sidebar sticky', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'archive_sidebar_sticky_option'
            ))
        );

        // single sidebar layouts heading
        $wp_customize->add_setting( 'single_sidebar_layout_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'single_sidebar_layout_header', array(
                'label'	      => esc_html__( 'Post Sidebar Layouts', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'single_sidebar_layout_header'
            ))
        );

        // single sidebar layout
        $wp_customize->add_setting( 'single_sidebar_layout',
            array(
            'default'           => ND\newsmatic_get_customizer_default( 'single_sidebar_layout' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            )
        );
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Image_Control( $wp_customize, 'single_sidebar_layout',
            array(
                'section'  => 'newsmatic_sidebar_options_section',
                'choices'  => newsmatic_get_customizer_sidebar_array()
            )
        ));

        // single sidebar sticky option
        $wp_customize->add_setting( 'single_sidebar_sticky_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'single_sidebar_sticky_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'single_sidebar_sticky_option', array(
                'label'	      => esc_html__( 'Enable sidebar sticky', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'single_sidebar_sticky_option'
            ))
        );

        // page sidebar layouts heading
        $wp_customize->add_setting( 'page_sidebar_layout_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'page_sidebar_layout_header', array(
                'label'	      => esc_html__( 'Page Sidebar Layouts', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'page_sidebar_layout_header'
            ))
        );

        // page sidebar layout
        $wp_customize->add_setting( 'page_sidebar_layout',
            array(
            'default'           => ND\newsmatic_get_customizer_default( 'page_sidebar_layout' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            )
        );
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Image_Control( $wp_customize, 'page_sidebar_layout',
            array(
                'section'  => 'newsmatic_sidebar_options_section',
                'choices'  => newsmatic_get_customizer_sidebar_array()
            )
        ));

        // page sidebar sticky option
        $wp_customize->add_setting( 'page_sidebar_sticky_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'page_sidebar_sticky_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'page_sidebar_sticky_option', array(
                'label'	      => esc_html__( 'Enable sidebar sticky', 'newsmatic' ),
                'section'     => 'newsmatic_sidebar_options_section',
                'settings'    => 'page_sidebar_sticky_option'
            ))
        );

        // section- breadcrumb options section
        $wp_customize->add_section( 'newsmatic_breadcrumb_options_section', array(
            'title' => esc_html__( 'Breadcrumb Options', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));

        // breadcrumb option
        $wp_customize->add_setting( 'site_breadcrumb_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'site_breadcrumb_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'site_breadcrumb_option', array(
                'label'	      => esc_html__( 'Show breadcrumb trails', 'newsmatic' ),
                'section'     => 'newsmatic_breadcrumb_options_section',
                'settings'    => 'site_breadcrumb_option'
            ))
        );

        // breadcrumb type 
        $wp_customize->add_setting( 'site_breadcrumb_type', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'site_breadcrumb_type' )
        ));
        $wp_customize->add_control( 'site_breadcrumb_type', array(
            'type'      => 'select',
            'section'   => 'newsmatic_breadcrumb_options_section',
            'label'     => esc_html__( 'Breadcrumb type', 'newsmatic' ),
            'description' => esc_html__( 'If you use other than "default" one you will need to install and activate respective plugins Breadcrumb NavXT, Yoast SEO and Rank Math SEO', 'newsmatic' ),
            'choices'   => array(
                'default' => __( 'Default', 'newsmatic' ),
                'bcn'  => __( 'NavXT', 'newsmatic' ),
                'yoast'  => __( 'Yoast SEO', 'newsmatic' ),
                'rankmath'  => __( 'Rank Math', 'newsmatic' )
            )
        ));

        // breadcrumb hook on
        $wp_customize->add_setting( 'site_breadcrumb_hook_on', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'site_breadcrumb_hook_on' )
        ));
        $wp_customize->add_control( 'site_breadcrumb_hook_on', array(
            'type'      => 'select',
            'section'   => 'newsmatic_breadcrumb_options_section',
            'label'     => esc_html__( 'Display Breadcrumb On', 'newsmatic' ),
            'choices'   => array(
                'main_container' => __( 'Before Main Container - Full Width', 'newsmatic' ),
                'inner_container'  => __( 'Before Inner Container', 'newsmatic' )
            )
        ));

        // section- scroll to top options
        $wp_customize->add_section( 'newsmatic_stt_options_section', array(
            'title' => esc_html__( 'Scroll To Top', 'newsmatic' ),
            'panel' => 'newsmatic_global_panel'
        ));

        // scroll to top section tab
        $wp_customize->add_setting( 'stt_section_tab', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'   => 'general'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Tab_Control( $wp_customize, 'stt_section_tab', array(
                'section'     => 'newsmatic_stt_options_section',
                'choices'  => array(
                    array(
                        'name'  => 'general',
                        'title'  => esc_html__( 'General', 'newsmatic' )
                    ),
                    array(
                        'name'  => 'design',
                        'title'  => esc_html__( 'Design', 'newsmatic' )
                    )
                )
            ))
        );

        // Resposive vivibility option
        $wp_customize->add_setting( 'stt_responsive_option', array(
            'default' => ND\newsmatic_get_customizer_default( 'stt_responsive_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_responsive_multiselect_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Responsive_Multiselect_Tab_Control( $wp_customize, 'stt_responsive_option', array(
                'label'	      => esc_html__( 'Scroll To Top Visibility', 'newsmatic' ),
                'section'     => 'newsmatic_stt_options_section',
                'settings'    => 'stt_responsive_option'
            ))
        );

        // stt button label
        $wp_customize->add_setting( 'stt_text', array(
            'default' => ND\newsmatic_get_customizer_default('stt_text'),
            'sanitize_callback' => 'newsmatic_sanitize_custom_text_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Icon_Text_Control( $wp_customize, 'stt_text', array(
                'label'     => esc_html__( 'Button label', 'newsmatic' ),
                'section'     => 'newsmatic_stt_options_section',
                'settings'    => 'stt_text',
                'icons' => array( "fas fa-ban", "fas fa-angle-up", "fas fa-arrow-alt-circle-up", "far fa-arrow-alt-circle-up", "fas fa-angle-double-up", "fas fa-long-arrow-alt-up", "fas fa-arrow-up", "fas fa-arrow-circle-up", "fas fa-chevron-circle-up", "fas fa-caret-up", "fas fa-hand-point-up", "fas fa-caret-square-up", "far fa-caret-square-up" )
            ))
        );

        // archive pagination type
        $wp_customize->add_setting( 'stt_alignment', array(
            'default' => ND\newsmatic_get_customizer_default( 'stt_alignment' ),
            'sanitize_callback' => 'sanitize_text_field',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Tab_Control( $wp_customize, 'stt_alignment', array(
                'label'	      => esc_html__( 'Button Align', 'newsmatic' ),
                'section'     => 'newsmatic_stt_options_section',
                'settings'    => 'stt_alignment',
                'choices' => array(
                    array(
                        'value' => 'left',
                        'label' => esc_html__('Left', 'newsmatic' )
                    ),
                    array(
                        'value' => 'center',
                        'label' => esc_html__('Center', 'newsmatic' )
                    ),
                    array(
                        'value' => 'right',
                        'label' => esc_html__('Right', 'newsmatic' )
                    )
                )
            ))
        );

        // stt label color
        $wp_customize->add_setting( 'stt_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'stt_color_group' ),
            'sanitize_callback' => 'newsmatic_sanitize_color_group_picker_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Color_Group_Picker_Control( $wp_customize, 'stt_color_group', array(
                'label'     => esc_html__( 'Icon Text', 'newsmatic' ),
                'section'   => 'newsmatic_stt_options_section',
                'settings'  => 'stt_color_group',
                'tab'   => 'design'
            ))
        );

        // breadcrumb link color
        $wp_customize->add_setting( 'stt_background_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'stt_background_color_group' ),
            'sanitize_callback' => 'newsmatic_sanitize_color_group_picker_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Color_Group_Picker_Control( $wp_customize, 'stt_background_color_group', array(
                'label'     => esc_html__( 'Background', 'newsmatic' ),
                'section'   => 'newsmatic_stt_options_section',
                'settings'  => 'stt_background_color_group',
                'tab'   => 'design'
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_global_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_site_identity_panel' ) ) :
    /**
     * Register site identity settings
     * 
     */
    function newsmatic_customizer_site_identity_panel( $wp_customize ) {
        /**
         * Register "Site Identity Options" panel
         * 
         */
        $wp_customize->add_panel( 'newsmatic_site_identity_panel', array(
            'title' => esc_html__( 'Site Identity', 'newsmatic' ),
            'priority' => 5
        ));
        $wp_customize->get_section( 'title_tagline' )->panel = 'newsmatic_site_identity_panel'; // assing title tagline section to site identity panel
        $wp_customize->get_section( 'title_tagline' )->title = esc_html__( 'Logo & Site Icon', 'newsmatic' ); // modify site logo label

        /**
         * Site Title Section
         * 
         * panel - newsmatic_site_identity_panel
         */
        $wp_customize->add_section( 'newsmatic_site_title_section', array(
            'title' => esc_html__( 'Site Title & Tagline', 'newsmatic' ),
            'panel' => 'newsmatic_site_identity_panel',
            'priority'  => 30,
        ));
        $wp_customize->get_control( 'blogname' )->section = 'newsmatic_site_title_section';
        $wp_customize->get_control( 'display_header_text' )->section = 'newsmatic_site_title_section';
        $wp_customize->get_control( 'display_header_text' )->label = esc_html__( 'Display site title', 'newsmatic' );
        $wp_customize->get_control( 'blogdescription' )->section = 'newsmatic_site_title_section';
        
        // site logo width
        $wp_customize->add_setting( 'newsmatic_site_logo_width', array(
            'default'   => ND\newsmatic_get_customizer_default( 'newsmatic_site_logo_width' ),
            'sanitize_callback' => 'newsmatic_sanitize_responsive_range',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Responsive_Range_Control( $wp_customize, 'newsmatic_site_logo_width', array(
                    'label'	      => esc_html__( 'Logo Width (px)', 'newsmatic' ),
                    'section'     => 'title_tagline',
                    'settings'    => 'newsmatic_site_logo_width',
                    'unit'        => 'px',
                    'input_attrs' => array(
                    'max'         => 400,
                    'min'         => 1,
                    'step'        => 1,
                    'reset' => true
                )
            ))
        );

        // site title section tab
        $wp_customize->add_setting( 'site_title_section_tab', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'   => 'general'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Tab_Control( $wp_customize, 'site_title_section_tab', array(
                'section'     => 'newsmatic_site_title_section',
                'priority'  => 1,
                'choices'  => array(
                    array(
                        'name'  => 'general',
                        'title'  => esc_html__( 'General', 'newsmatic' )
                    ),
                    array(
                        'name'  => 'design',
                        'title'  => esc_html__( 'Design', 'newsmatic' )
                    )
                )
            ))
        );

        // blog description option
        $wp_customize->add_setting( 'blogdescription_option', array(
            'default'        => true,
            'sanitize_callback' => 'sanitize_text_field',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 'blogdescription_option', array(
            'label'    => esc_html__( 'Display site description', 'newsmatic' ),
            'section'  => 'newsmatic_site_title_section',
            'type'     => 'checkbox',
            'priority' => 50
        ));

        $wp_customize->get_control( 'header_textcolor' )->section = 'newsmatic_site_title_section';
        $wp_customize->get_control( 'header_textcolor' )->priority = 60;
        $wp_customize->get_control( 'header_textcolor' )->label = esc_html__( 'Site Title Color', 'newsmatic' );

        // header text hover color
        $wp_customize->add_setting( 'site_title_hover_textcolor', array(
            'default' => ND\newsmatic_get_customizer_default( 'site_title_hover_textcolor' ),
            'sanitize_callback' => 'sanitize_hex_color',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Default_Color_Control( $wp_customize, 'site_title_hover_textcolor', array(
                'label'      => esc_html__( 'Site Title Hover Color', 'newsmatic' ),
                'section'    => 'newsmatic_site_title_section',
                'settings'   => 'site_title_hover_textcolor',
                'priority'    => 70,
                'tab'   => 'design'
            ))
        );

        // site description color
        $wp_customize->add_setting( 'site_description_color', array(
            'default' => ND\newsmatic_get_customizer_default( 'site_description_color' ),
            'sanitize_callback' => 'sanitize_hex_color',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Default_Color_Control( $wp_customize, 'site_description_color', array(
                'label'      => esc_html__( 'Site Description Color', 'newsmatic' ),
                'section'    => 'newsmatic_site_title_section',
                'settings'   => 'site_description_color',
                'priority'    => 70,
                'tab'   => 'design'
            ))
        );

        // site title typo
        $wp_customize->add_setting( 'site_title_typo', array(
            'default'   => ND\newsmatic_get_customizer_default( 'site_title_typo' ),
            'sanitize_callback' => 'newsmatic_sanitize_typo_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Typography_Control( $wp_customize, 'site_title_typo', array(
                'label'	      => esc_html__( 'Site Title Typography', 'newsmatic' ),
                'section'     => 'newsmatic_site_title_section',
                'settings'    => 'site_title_typo',
                'tab'   => 'design',
                'fields'    => array( 'font_family', 'font_weight', 'font_size', 'line_height', 'letter_spacing', 'text_transform', 'text_decoration')
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_site_identity_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_top_header_panel' ) ) :
    /**
     * Register header options settings
     * 
     */
    function newsmatic_customizer_top_header_panel( $wp_customize ) {
        /**
         * Top header section
         * 
         */
        $wp_customize->add_section( 'newsmatic_top_header_section', array(
            'title' => esc_html__( 'Top Header', 'newsmatic' ),
            'priority'  => 68
        ));
        
        // section tab
        $wp_customize->add_setting( 'top_header_section_tab', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'   => 'general'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Tab_Control( $wp_customize, 'top_header_section_tab', array(
                'section'     => 'newsmatic_top_header_section',
                'choices'  => array(
                    array(
                        'name'  => 'general',
                        'title'  => esc_html__( 'General', 'newsmatic' )
                    ),
                    array(
                        'name'  => 'design',
                        'title'  => esc_html__( 'Design', 'newsmatic' )
                    )
                )
            ))
        );
        
        // Top header option
        $wp_customize->add_setting( 'top_header_option', array(
            'default'         => ND\newsmatic_get_customizer_default( 'top_header_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Toggle_Control( $wp_customize, 'top_header_option', array(
                'label'	      => esc_html__( 'Show top header', 'newsmatic' ),
                'description' => esc_html__( 'Toggle to enable or disable top header bar', 'newsmatic' ),
                'section'     => 'newsmatic_top_header_section',
                'settings'    => 'top_header_option'
            ))
        );

        // Top header date time option
        $wp_customize->add_setting( 'top_header_date_time_option', array(
            'default'         => ND\newsmatic_get_customizer_default( 'top_header_date_time_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'top_header_date_time_option', array(
                'label'	      => esc_html__( 'Show date and time', 'newsmatic' ),
                'section'     => 'newsmatic_top_header_section',
                'settings'    => 'top_header_date_time_option',
            ))
        );

        // top header right content type
        $wp_customize->add_setting( 'top_header_right_content_type', array(
            'default' => ND\newsmatic_get_customizer_default( 'top_header_right_content_type' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control'
        ));
        
        $wp_customize->add_control( 'top_header_right_content_type', array(
            'type'      => 'select',
            'section'   => 'newsmatic_top_header_section',
            'label'     => __( 'Ticker news / Nav menu choices', 'newsmatic' ),
            'choices'   => array(
                'ticker-news' => esc_html__( 'Ticker News', 'newsmatic' ),
                'nav-menu' => esc_html__( 'Nav Menu', 'newsmatic' )
            )
        ));

        // Top header ticker news option
        $wp_customize->add_setting( 'top_header_menu_option', array(
            'default'         => ND\newsmatic_get_customizer_default( 'top_header_menu_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'top_header_menu_option', array(
                'label'	      => esc_html__( 'Show nav menu', 'newsmatic' ),
                'section'     => 'newsmatic_top_header_section',
                'settings'    => 'top_header_menu_option',
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'top_header_right_content_type' )->value() == 'nav-menu' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Top header ticker news option
        $wp_customize->add_setting( 'top_header_ticker_news_option', array(
            'default'         => ND\newsmatic_get_customizer_default( 'top_header_ticker_news_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'top_header_ticker_news_option', array(
                'label'	      => esc_html__( 'Show ticker news', 'newsmatic' ),
                'section'     => 'newsmatic_top_header_section',
                'settings'    => 'top_header_ticker_news_option',
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'top_header_right_content_type' )->value() == 'ticker-news' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Ticker News posts filter
        $wp_customize->add_setting( 'top_header_ticker_news_post_filter', array(
            'default' => ND\newsmatic_get_customizer_default( 'top_header_ticker_news_post_filter' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Bubble_Control( $wp_customize, 'top_header_ticker_news_post_filter', array(
                'section'     => 'newsmatic_top_header_section',
                'settings'    => 'top_header_ticker_news_post_filter',
                'choices' => array(
                    array(
                        'value' => 'category',
                        'label' => esc_html__('By category', 'newsmatic' )
                    ),
                    array(
                        'value' => 'title',
                        'label' => esc_html__('By title', 'newsmatic' )
                    )
                ),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'top_header_ticker_news_option' )->value() && $setting->manager->get_setting( 'top_header_right_content_type' )->value() == 'ticker-news' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Ticker News categories
        $wp_customize->add_setting( 'top_header_ticker_news_categories', array(
            'default' => ND\newsmatic_get_customizer_default( 'top_header_ticker_news_categories' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Multiselect_Control( $wp_customize, 'top_header_ticker_news_categories', array(
                'label'     => esc_html__( 'Posts Categories', 'newsmatic' ),
                'section'   => 'newsmatic_top_header_section',
                'settings'  => 'top_header_ticker_news_categories',
                'choices'   => newsmatic_get_multicheckbox_categories_simple_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'top_header_ticker_news_option' )->value() && $setting->manager->get_setting( 'top_header_ticker_news_post_filter' )->value() == 'category' && $setting->manager->get_setting( 'top_header_right_content_type' )->value() == 'ticker-news' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Ticker News posts
        $wp_customize->add_setting( 'top_header_ticker_news_posts', array(
            'default' => ND\newsmatic_get_customizer_default( 'top_header_ticker_news_posts' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Posts_Multiselect_Control( $wp_customize, 'top_header_ticker_news_posts', array(
                'label'     => esc_html__( 'Posts', 'newsmatic' ),
                'section'   => 'newsmatic_top_header_section',
                'settings'  => 'top_header_ticker_news_posts',
                'choices'   => newsmatic_get_multicheckbox_posts_simple_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'top_header_ticker_news_option' )->value() && $setting->manager->get_setting( 'top_header_ticker_news_post_filter' )->value() == 'title' && $setting->manager->get_setting( 'top_header_right_content_type' )->value() == 'ticker-news' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Ticker News date filter
        $wp_customize->add_setting( 'top_header_ticker_news_date_filter', array(
            'default' => ND\newsmatic_get_customizer_default( 'top_header_ticker_news_date_filter' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Bubble_Control( $wp_customize, 'top_header_ticker_news_date_filter', array(
                'section'     => 'newsmatic_top_header_section',
                'settings'    => 'top_header_ticker_news_date_filter',
                'choices' => newsmatic_get_date_filter_choices_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'top_header_ticker_news_option' )->value() && $setting->manager->get_setting( 'top_header_ticker_news_post_filter' )->value() == 'category' && $setting->manager->get_setting( 'top_header_right_content_type' )->value() == 'ticker-news' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Top header background colors group control
        $wp_customize->add_setting( 'top_header_background_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'top_header_background_color_group' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Group_Control( $wp_customize, 'top_header_background_color_group', array(
                'label'	      => esc_html__( 'Background', 'newsmatic' ),
                'section'     => 'newsmatic_top_header_section',
                'settings'    => 'top_header_background_color_group',
                'tab'   => 'design'
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_top_header_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_header_panel' ) ) :
    /**
     * Register header options settings
     * 
     */
    function newsmatic_customizer_header_panel( $wp_customize ) {
        /**
         * Header panel
         * 
         */
        $wp_customize->add_panel( 'newsmatic_header_panel', array(
            'title' => esc_html__( 'Theme Header', 'newsmatic' ),
            'priority'  => 69
        ));
        
        // Header ads banner section
        $wp_customize->add_section( 'newsmatic_header_ads_banner_section', array(
            'title' => esc_html__( 'Ads Banner', 'newsmatic' ),
            'panel' => 'newsmatic_header_panel',
            'priority'  => 5
        ));

        // Header Ads Banner setting heading
        $wp_customize->add_setting( 'newsmatic_header_ads_banner_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));

        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'newsmatic_header_ads_banner_header', array(
                'label'	      => esc_html__( 'Ads Banner Setting', 'newsmatic' ),
                'section'     => 'newsmatic_header_ads_banner_section',
                'settings'    => 'newsmatic_header_ads_banner_header'
            ))
        );

        // Resposive vivibility option
        $wp_customize->add_setting( 'header_ads_banner_responsive_option', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_ads_banner_responsive_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_responsive_multiselect_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Responsive_Multiselect_Tab_Control( $wp_customize, 'header_ads_banner_responsive_option', array(
                'label'	      => esc_html__( 'Ads Banner Visibility', 'newsmatic' ),
                'section'     => 'newsmatic_header_ads_banner_section',
                'settings'    => 'header_ads_banner_responsive_option'
            ))
        );

        // ads image field
        $wp_customize->add_setting( 'header_ads_banner_custom_image', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_ads_banner_custom_image' ),
            'sanitize_callback' => 'absint',
        ));
        $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'header_ads_banner_custom_image', array(
            'section' => 'newsmatic_header_ads_banner_section',
            'mime_type' => 'image',
            'label' => esc_html__( 'Ads Image', 'newsmatic' ),
            'description' => esc_html__( 'Recommended size for ad image is 900 (width) * 350 (height)', 'newsmatic' )
        )));

        // ads url field
        $wp_customize->add_setting( 'header_ads_banner_custom_url', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_ads_banner_custom_url' ),
            'sanitize_callback' => 'esc_url_raw',
        ));
          
        $wp_customize->add_control( 'header_ads_banner_custom_url', array(
            'type'  => 'url',
            'section'   => 'newsmatic_header_ads_banner_section',
            'label'     => esc_html__( 'Ads url', 'newsmatic' )
        ));

        // ads link show on
        $wp_customize->add_setting( 'header_ads_banner_custom_target', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_ads_banner_custom_target' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control'
        ));
        
        $wp_customize->add_control( 'header_ads_banner_custom_target', array(
            'type'      => 'select',
            'section'   => 'newsmatic_header_ads_banner_section',
            'label'     => __( 'Open Ads link on', 'newsmatic' ),
            'choices'   => array(
                '_self' => esc_html__( 'Open in same tab', 'newsmatic' ),
                '_blank' => esc_html__( 'Open in new tab', 'newsmatic' )
            )
        ));

        // Header content section
        $wp_customize->add_section( 'newsmatic_main_header_section', array(
            'title' => esc_html__( 'Main Header', 'newsmatic' ),
            'panel' => 'newsmatic_header_panel',
            'priority'  => 10
        ));

        // section tab
        $wp_customize->add_setting( 'main_header_section_tab', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'   => 'general'
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Tab_Control( $wp_customize, 'main_header_section_tab', array(
                'section'     => 'newsmatic_main_header_section',
                'choices'  => array(
                    array(
                        'name'  => 'general',
                        'title'  => esc_html__( 'General', 'newsmatic' )
                    ),
                    array(
                        'name'  => 'design',
                        'title'  => esc_html__( 'Design', 'newsmatic' )
                    )
                )
            ))
        );

        // header elements order
        $wp_customize->add_setting( 'main_header_elements_order', array(
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'default'   => ND\newsmatic_get_customizer_default( 'main_header_elements_order' ),
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 'main_header_elements_order', array(
            'type'      => 'select',
            'section'   => 'newsmatic_main_header_section',
            'label'     => esc_html__( 'Elements Display Order', 'newsmatic' ),
            'description' => esc_html__( 'You can change the position of the social icons and buttons.', 'newsmatic' ),
            'choices'   => array(
                'social-logo-buttons'  => __( 'Social Icon - Site Logo - Buttons', 'newsmatic' ),
                'buttons-logo-social'   => __( 'Buttons - Site Logo - Social Icon', 'newsmatic' )
            )
        ));

        // redirect site logo section
        $wp_customize->add_setting( 'header_site_logo_redirects', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));

        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'header_site_logo_redirects', array(
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_site_logo_redirects',
                'choices'     => array(
                    'header-social-icons' => array(
                        'type'  => 'section',
                        'id'    => 'title_tagline',
                        'label' => esc_html__( 'Manage Site Logo', 'newsmatic' )
                    )
                )
            ))
        );

        // redirect site title section
        $wp_customize->add_setting( 'header_site_title_redirects', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));

        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'header_site_title_redirects', array(
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_site_title_redirects',
                'choices'     => array(
                    'header-social-icons' => array(
                        'type'  => 'section',
                        'id'    => 'newsmatic_site_title_section',
                        'label' => esc_html__( 'Manage site & Tagline', 'newsmatic' )
                    )
                )
            ))
        );

        // top header social option
        $wp_customize->add_setting( 'top_header_social_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'top_header_social_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'top_header_social_option', array(
                'label'	      => esc_html__( 'Show social icons', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'top_header_social_option',
            ))
        );

        // Redirect header social icons link
        $wp_customize->add_setting( 'top_header_social_icons_redirects', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));

        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'top_header_social_icons_redirects', array(
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'top_header_social_icons_redirects',
                'choices'     => array(
                    'header-social-icons' => array(
                        'type'  => 'section',
                        'id'    => 'newsmatic_social_icons_section',
                        'label' => esc_html__( 'Manage social icons', 'newsmatic' )
                    )
                )
            ))
        );

        // header sidebar toggle button option
        $wp_customize->add_setting( 'header_sidebar_toggle_option', array(
            'default'         => ND\newsmatic_get_customizer_default( 'header_sidebar_toggle_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'header_sidebar_toggle_option', array(
                'label'	      => esc_html__( 'Show sidebar toggle button', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_sidebar_toggle_option'
            ))
        );

        // redirect sidebar toggle button link
        $wp_customize->add_setting( 'header_sidebar_toggle_button_redirects', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));

        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'header_sidebar_toggle_button_redirects', array(
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_sidebar_toggle_button_redirects',
                'choices'     => array(
                    'header-social-icons' => array(
                        'type'  => 'section',
                        'id'    => 'sidebar-widgets-header-toggle-sidebar',
                        'label' => esc_html__( 'Manage sidebar from here', 'newsmatic' )
                    )
                )
            ))
        );

        // header search option
        $wp_customize->add_setting( 'header_search_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_search_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'header_search_option', array(
                'label'	      => esc_html__( 'Show search icon', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_search_option'
            ))
        );

        // live search redirect
        $wp_customize->add_setting( 'website_search_live_search_redirects', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));

        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'website_search_live_search_redirects', array(
                'section'     => 'newsmatic_main_header_section',
                'choices'     => array(
                    'header-social-icons' => array(
                        'type'  => 'section',
                        'id'    => 'newsmatic_header_live_search_section',
                        'label' => esc_html__( 'Manage live search', 'newsmatic' )
                    )
                )
            ))
        );
        
        // header theme mode toggle option
        $wp_customize->add_setting( 'header_theme_mode_toggle_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_theme_mode_toggle_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'header_theme_mode_toggle_option', array(
                'label'	      => esc_html__( 'Show dark/light toggle icon', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_theme_mode_toggle_option'
            ))
        );

        // header sticky option
        $wp_customize->add_setting( 'theme_header_sticky', array(
            'default'   => ND\newsmatic_get_customizer_default( 'theme_header_sticky' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'theme_header_sticky', array(
                'label'	      => esc_html__( 'Enable header section sticky', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'theme_header_sticky'
            ))
        );

        // header top and bottom padding
        $wp_customize->add_setting( 'header_vertical_padding', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_vertical_padding' ),
            'sanitize_callback' => 'newsmatic_sanitize_responsive_range',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Responsive_Range_Control( $wp_customize, 'header_vertical_padding', array(
                    'label'	      => esc_html__( 'Vertical Padding (px)', 'newsmatic' ),
                    'section'     => 'newsmatic_main_header_section',
                    'settings'    => 'header_vertical_padding',
                    'unit'        => 'px',
                    'tab'   => 'design',
                    'input_attrs' => array(
                    'max'         => 500,
                    'min'         => 1,
                    'step'        => 1,
                    'reset' => true
                )
            ))
        );

        // header toggle sidebar color
        $wp_customize->add_setting( 'header_sidebar_toggle_color', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_sidebar_toggle_color' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_group_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Group_Picker_Control( $wp_customize, 'header_sidebar_toggle_color', array(
                'label'	      => esc_html__( 'Toggle Bar Color', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_sidebar_toggle_color',
                'tab'   => 'design'
            ))
        );

        // header search icon color
        $wp_customize->add_setting( 'header_search_icon_color', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_search_icon_color' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'newsmatic_sanitize_color_group_picker_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Group_Picker_Control( $wp_customize, 'header_search_icon_color', array(
                'label'	      => esc_html__( 'Search Icon Color', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_search_icon_color',
                'tab'   => 'design'
            ))
        );

        // Header background colors setting heading
        $wp_customize->add_setting( 'header_background_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_background_color_group' ),
            'sanitize_callback' => 'newsmatic_sanitize_color_image_group_control',
            'transport' => 'postMessage'
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Image_Group_Control( $wp_customize, 'header_background_color_group', array(
                'label'	      => esc_html__( 'Background', 'newsmatic' ),
                'section'     => 'newsmatic_main_header_section',
                'settings'    => 'header_background_color_group',
                'tab'   => 'design'
            ))
        );

        // Header newsletter section
        $wp_customize->add_section( 'newsmatic_header_newsletter_section', array(
            'title' => esc_html__( 'Newsletter / Subscribe Button', 'newsmatic' ),
            'panel' => 'newsmatic_header_panel',
            'priority'  => 15
        ));

        // Header newsletter heading
        $wp_customize->add_setting( 'newsmatic_header_newsletter_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'newsmatic_header_newsletter_header', array(
                'label'	      => esc_html__( 'Newsletter/Subscribe Setting', 'newsmatic' ),
                'section'     => 'newsmatic_header_newsletter_section',
                'settings'    => 'newsmatic_header_newsletter_header'
            ))
        );

        // header newsletter button option
        $wp_customize->add_setting( 'header_newsletter_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_newsletter_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'header_newsletter_option', array(
                'label'	      => esc_html__( 'Show newsletter button', 'newsmatic' ),
                'section'     => 'newsmatic_header_newsletter_section',
                'settings'    => 'header_newsletter_option'
            ))
        );

        // newsletter label
        $wp_customize->add_setting( 'header_newsletter_label', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_newsletter_label' ),
            'sanitize_callback' => 'newsmatic_sanitize_custom_text_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Icon_Text_Control( $wp_customize, 'header_newsletter_label', array(
                'label'     => esc_html__( 'Button Label', 'newsmatic' ),
                'section'     => 'newsmatic_header_newsletter_section',
                'settings'    => 'header_newsletter_label',
                'icons' => array( "fas fa-ban", "far fa-envelope", "fas fa-mail-bulk", "fas fa-envelope", "fas fa-thumbs-up", "far fa-thumbs-up" )
            ))
        );

        // newsletter redirect url
        $wp_customize->add_setting( 'header_newsletter_redirect_href_link', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_newsletter_redirect_href_link' ),
            'sanitize_callback' => 'newsmatic_sanitize_url',
        ));
        $wp_customize->add_control( 'header_newsletter_redirect_href_link', array(
            'label' => esc_html__( 'Redirect URL.', 'newsmatic' ),
            'description'   => esc_html__( 'Add url for the button to redirect.', 'newsmatic' ),
            'section'   => 'newsmatic_header_newsletter_section',
            'type'  => 'url'
        ));

        // Header random news section
        $wp_customize->add_section( 'newsmatic_header_random_news_section', array(
            'title' => esc_html__( 'Random News', 'newsmatic' ),
            'panel' => 'newsmatic_header_panel',
            'priority'  => 15
        ));

        // Header random news heading
        $wp_customize->add_setting( 'newsmatic_header_random_news_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'newsmatic_header_random_news_header', array(
                'label'	      => esc_html__( 'Random News Setting', 'newsmatic' ),
                'section'     => 'newsmatic_header_random_news_section',
                'settings'    => 'newsmatic_header_random_news_header'
            ))
        );

        // header random news button option
        $wp_customize->add_setting( 'header_random_news_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_random_news_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'header_random_news_option', array(
                'label'	      => esc_html__( 'Show random news button', 'newsmatic' ),
                'section'     => 'newsmatic_header_random_news_section',
                'settings'    => 'header_random_news_option'
            ))
        );

        // newsletter label
        $wp_customize->add_setting( 'header_random_news_label', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_random_news_label' ),
            'sanitize_callback' => 'newsmatic_sanitize_custom_text_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Icon_Text_Control( $wp_customize, 'header_random_news_label', array(
                'label'     => esc_html__( 'Button Label', 'newsmatic' ),
                'section'     => 'newsmatic_header_random_news_section',
                'settings'    => 'header_random_news_label',
                'icons' => array( "fas fa-ban", "fas fa-bolt", "fas fa-newspaper", "far fa-newspaper", "fas fa-rss", "fas fa-calendar-week", "far fa-calendar", "far fa-calendar-alt", "fas fa-calendar-alt" )
            ))
        );

        // random news filter
        $wp_customize->add_setting( 'header_random_news_filter', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_random_news_filter' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Bubble_Control( $wp_customize, 'header_random_news_filter', array(
                'label'	      => esc_html__( 'Type of posts to dislay', 'newsmatic' ),
                'section'     => 'newsmatic_header_random_news_section',
                'settings'    => 'header_random_news_filter',
                'choices' => newsmatic_get_random_news_filter_choices_array()
            ))
        );

        /**
         * Menu Options Section
         * 
         * panel - newsmatic_header_options_panel
         */
        $wp_customize->add_section( 'newsmatic_header_menu_option_section', array(
            'title' => esc_html__( 'Menu Options', 'newsmatic' ),
            'panel' => 'newsmatic_header_panel',
            'priority'  => 30,
        ));

        // header menu hover effect
        $wp_customize->add_setting( 'header_menu_hover_effect', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_menu_hover_effect' ),
            'sanitize_callback' => 'sanitize_text_field',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Tab_Control( $wp_customize, 'header_menu_hover_effect', array(
                'label'	      => esc_html__( 'Hover Effect', 'newsmatic' ),
                'section'     => 'newsmatic_header_menu_option_section',
                'settings'    => 'header_menu_hover_effect',
                'choices' => array(
                    array(
                        'value' => 'none',
                        'label' => esc_html__('None', 'newsmatic' )
                    ),
                    array(
                        'value' => 'one',
                        'label' => esc_html__('One', 'newsmatic' )
                    )
                )
            ))
        );

        // header menu text color
        $wp_customize->add_setting( 'header_menu_color', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_menu_color' ),
            'sanitize_callback' => 'newsmatic_sanitize_color_group_picker_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Color_Group_Picker_Control( $wp_customize, 'header_menu_color', array(
                'label'     => esc_html__( 'Text Color', 'newsmatic' ),
                'section'   => 'newsmatic_header_menu_option_section',
                'settings'  => 'header_menu_color',
                'tab'   => 'design'
            ))
        );

        // menu border top
        $wp_customize->add_setting( 'header_menu_top_border', array( 
            'default' => ND\newsmatic_get_customizer_default( 'header_menu_top_border' ),
            'sanitize_callback' => 'newsmatic_sanitize_array',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Border_Control( $wp_customize, 'header_menu_top_border', array(
                'label'       => esc_html__( 'Border Top', 'newsmatic' ),
                'section'     => 'newsmatic_header_menu_option_section',
                'settings'    => 'header_menu_top_border'
            ))
        );
        
        // header menu background color group
        $wp_customize->add_setting( 'header_menu_background_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_menu_background_color_group' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Group_Control( $wp_customize, 'header_menu_background_color_group', array(
                'label'	      => esc_html__( 'Background', 'newsmatic' ),
                'section'     => 'newsmatic_header_menu_option_section',
                'settings'    => 'header_menu_background_color_group'
            ))
        );

        /**
         * Custom Button Section
         * 
         * panel - newsmatic_header_options_panel
         */
        $wp_customize->add_section( 'newsmatic_header_custom_button_section', array(
            'title' => esc_html__( 'Custom Button', 'newsmatic' ),
            'panel' => 'newsmatic_header_panel',
            'priority'  => 40,
        ));

        // main banner section tab
        $wp_customize->add_setting( 'newsmatic_header_custom_button_section_tab', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'   => 'general'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Tab_Control( $wp_customize, 'newsmatic_header_custom_button_section_tab', array(
                'section'     => 'newsmatic_header_custom_button_section',
                'priority'  => 1,
                'choices'  => array(
                    array(
                        'name'  => 'general',
                        'title'  => esc_html__( 'General', 'newsmatic' )
                    ),
                    array(
                        'name'  => 'design',
                        'title'  => esc_html__( 'Design', 'newsmatic' )
                    )
                )
            ))
        );

        // header custom button option
        $wp_customize->add_setting( 'theme_header_custom_button_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'theme_header_custom_button_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Toggle_Control( $wp_customize, 'theme_header_custom_button_option', array(
                'label'	      => esc_html__( 'Show header custom button', 'newsmatic' ),
                'section'     => 'newsmatic_header_custom_button_section',
                'settings'    => 'theme_header_custom_button_option'
            ))
        );

        // custom button label
        $wp_customize->add_setting( 'header_custom_button_label', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_custom_button_label' ),
            'sanitize_callback' => 'newsmatic_sanitize_custom_text_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Icon_Text_Control( $wp_customize, 'header_custom_button_label', array(
                'label'     => esc_html__( 'Button Label', 'newsmatic' ),
                'section'     => 'newsmatic_header_custom_button_section',
                'settings'    => 'header_custom_button_label',
                'icons' => array( "fas fa-ban", "fab fa-youtube", "fab fa-youtube-square", "fas fa-film", "fas fa-record-vinyl", "fas fa-volume-up", "fas fa-circle", "far fa-circle", "fab fa-vimeo", "fab fa-vimeo-v", "fas fa-podcast" )
            ))
        );

        // custom button redirect url
        $wp_customize->add_setting( 'header_custom_button_redirect_href_link', array(
            'default' => ND\newsmatic_get_customizer_default( 'header_custom_button_redirect_href_link' ),
            'sanitize_callback' => 'newsmatic_sanitize_url',
        ));
        $wp_customize->add_control( 'header_custom_button_redirect_href_link', array(
            'label' => esc_html__( 'Redirect URL.', 'newsmatic' ),
            'description'   => esc_html__( 'Add url for the button to redirect.', 'newsmatic' ),
            'section'   => 'newsmatic_header_custom_button_section',
            'type'  => 'url'
        ));

        // custom button label color
        $wp_customize->add_setting( 'header_custom_button_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_custom_button_color_group' ),
            'sanitize_callback' => 'newsmatic_sanitize_color_group_picker_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Color_Group_Picker_Control( $wp_customize, 'header_custom_button_color_group', array(
                'label'     => esc_html__( 'Icon / Text Color', 'newsmatic' ),
                'section'   => 'newsmatic_header_custom_button_section',
                'settings'  => 'header_custom_button_color_group',
                'tab'   => 'design'
            ))
        );

        // custom button background color
        $wp_customize->add_setting( 'header_custom_button_background_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_custom_button_background_color_group' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Group_Control( $wp_customize, 'header_custom_button_background_color_group', array(
                'label'	      => esc_html__( 'Background', 'newsmatic' ),
                'section'     => 'newsmatic_header_custom_button_section',
                'settings'    => 'header_custom_button_background_color_group',
                'tab'   => 'design'
            ))
        );


        // custom button background hover color
        $wp_customize->add_setting( 'header_custom_button_background_hover_color_group', array(
            'default'   => ND\newsmatic_get_customizer_default( 'header_custom_button_background_hover_color_group' ),
            'transport' => 'postMessage',
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Color_Group_Control( $wp_customize, 'header_custom_button_background_hover_color_group', array(
                'label'	      => esc_html__( 'Background Hover', 'newsmatic' ),
                'section'     => 'newsmatic_header_custom_button_section',
                'settings'    => 'header_custom_button_background_hover_color_group',
                'tab'   => 'design'
            ))
        );

        /**
         * Live Search Section
         * 
         * panel - newsmatic_header_options_panel
         */
        $wp_customize->add_section( 'newsmatic_header_live_search_section', array(
            'title' => esc_html__( 'Live Search', 'newsmatic' ),
            'panel' => 'newsmatic_header_panel',
            'priority'  => 50
        ));

        // header live search option
        $wp_customize->add_setting( 'theme_header_live_search_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'theme_header_live_search_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Toggle_Control( $wp_customize, 'theme_header_live_search_option', array(
                'label'	      => esc_html__( 'Enable live search', 'newsmatic' ),
                'section'     => 'newsmatic_header_live_search_section'
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_header_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_ticker_news_panel' ) ) :
    // Register header options settings
    function newsmatic_customizer_ticker_news_panel( $wp_customize ) {
        // Header ads banner section
        $wp_customize->add_section( 'newsmatic_ticker_news_section', array(
            'title' => esc_html__( 'Ticker News', 'newsmatic' ),
            'priority'  => 70
        ));

        // Header menu hover effect
        $wp_customize->add_setting( 'ticker_news_visible', array(
            'default' => ND\newsmatic_get_customizer_default( 'ticker_news_visible' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control'
        ));
        
        $wp_customize->add_control( 'ticker_news_visible', array(
            'type'      => 'select',
            'section'   => 'newsmatic_ticker_news_section',
            'priority'  => 10,
            'label'     => esc_html__( 'Show ticker on', 'newsmatic' ),
            'choices'   => array(
                'all' => esc_html__( 'Show in all', 'newsmatic' ),
                'front-page' => esc_html__( 'Frontpage', 'newsmatic' ),
                'innerpages' => esc_html__( 'Show only in innerpages', 'newsmatic' ),
                'none' => esc_html__( 'Hide in all pages', 'newsmatic' ),
            ),
        ));

        // Ticker News content setting heading
        $wp_customize->add_setting( 'ticker_news_content_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'ticker_news_content_header', array(
                'label'	      => esc_html__( 'Content Setting', 'newsmatic' ),
                'section'     => 'newsmatic_ticker_news_section',
                'priority'  => 30,
                'settings'    => 'ticker_news_content_header',
                'type'        => 'section-heading',
            ))
        );
        
        // Ticker News title
        $wp_customize->add_setting( 'ticker_news_title', array(
            'default' => ND\newsmatic_get_customizer_default( 'ticker_news_title' ),
            'sanitize_callback' => 'newsmatic_sanitize_custom_text_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Icon_Text_Control( $wp_customize, 'ticker_news_title', array(
                'label'     => esc_html__( 'Ticker title', 'newsmatic' ),
                'section'     => 'newsmatic_ticker_news_section',
                'priority'  => 40,
                'settings'    => 'ticker_news_title',
                'icons' => array( "fas fa-ban", "fas fa-bolt", "fas fa-rss", "fas fa-newspaper", "far fa-newspaper", "fas fa-rss-square", "fas fa-fire", "fas fa-wifi", "fab fa-gripfire", "fab fa-free-code-camp", "fas fa-globe-americas" )
            ))
        );

        // Ticker News posts filter
        $wp_customize->add_setting( 'ticker_news_post_filter', array(
            'default' => ND\newsmatic_get_customizer_default( 'ticker_news_post_filter' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Bubble_Control( $wp_customize, 'ticker_news_post_filter', array(
                'section'     => 'newsmatic_ticker_news_section',
                'settings'    => 'ticker_news_post_filter',
                'priority'  => 50,
                'choices' => array(
                    array(
                        'value' => 'category',
                        'label' => esc_html__('By category', 'newsmatic' )
                    ),
                    array(
                        'value' => 'title',
                        'label' => esc_html__('By title', 'newsmatic' )
                    )
                )
            ))
        );

        // Ticker News categories
        $wp_customize->add_setting( 'ticker_news_categories', array(
            'default' => ND\newsmatic_get_customizer_default( 'ticker_news_categories' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Multiselect_Control( $wp_customize, 'ticker_news_categories', array(
                'label'     => esc_html__( 'Posts Categories', 'newsmatic' ),
                'section'   => 'newsmatic_ticker_news_section',
                'settings'  => 'ticker_news_categories',
                'priority'  => 60,
                'choices'   => newsmatic_get_multicheckbox_categories_simple_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'ticker_news_post_filter' )->value() == 'category' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Ticker News posts
        $wp_customize->add_setting( 'ticker_news_posts', array(
            'default' => ND\newsmatic_get_customizer_default( 'ticker_news_posts' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Posts_Multiselect_Control( $wp_customize, 'ticker_news_posts', array(
                'label'     => esc_html__( 'Posts', 'newsmatic' ),
                'section'   => 'newsmatic_ticker_news_section',
                'settings'  => 'ticker_news_posts',
                'priority'  => 70,
                'choices'   => newsmatic_get_multicheckbox_posts_simple_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'ticker_news_post_filter' )->value() == 'title' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // Ticker News date filter
        $wp_customize->add_setting( 'ticker_news_date_filter', array(
            'default' => ND\newsmatic_get_customizer_default( 'ticker_news_date_filter' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Bubble_Control( $wp_customize, 'ticker_news_date_filter', array(
                'section'     => 'newsmatic_ticker_news_section',
                'settings'    => 'ticker_news_date_filter',
                'priority'  => 80,
                'choices' => newsmatic_get_date_filter_choices_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'ticker_news_post_filter' )->value() == 'category' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_ticker_news_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_main_banner_panel' ) ) :
    /**
     * Register main banner section settings
     * 
     */
    function newsmatic_customizer_main_banner_panel( $wp_customize ) {
        /**
         * Main Banner section
         * 
         */
        $wp_customize->add_section( 'newsmatic_main_banner_section', array(
            'title' => esc_html__( 'Main Banner', 'newsmatic' ),
            'priority'  => 70
        ));

        // main banner section tab
        $wp_customize->add_setting( 'main_banner_section_tab', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'   => 'general'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Tab_Control( $wp_customize, 'main_banner_section_tab', array(
                'section'     => 'newsmatic_main_banner_section',
                'priority'  => 1,
                'choices'  => array(
                    array(
                        'name'  => 'general',
                        'title'  => esc_html__( 'General', 'newsmatic' )
                    ),
                    array(
                        'name'  => 'design',
                        'title'  => esc_html__( 'Design', 'newsmatic' )
                    )
                )
            ))
        );

        // Main Banner option
        $wp_customize->add_setting( 'main_banner_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'main_banner_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Toggle_Control( $wp_customize, 'main_banner_option', array(
                'label'	      => esc_html__( 'Show main banner', 'newsmatic' ),
                'section'     => 'newsmatic_main_banner_section',
                'settings'    => 'main_banner_option',
                'priority'  => 5,
            ))
        );

        // main banner slider setting heading
        $wp_customize->add_setting( 'main_banner_slider_settings_header', array(
            'sanitize_callback' => 'sanitize_text_field',
            'transport' => 'postMessage'
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'main_banner_slider_settings_header', array(
                'label'	      => esc_html__( 'Slider Setting', 'newsmatic' ),
                'section'     => 'newsmatic_main_banner_section',
                'settings'    => 'main_banner_slider_settings_header',
                'priority'  => 15,
            ))
        );

        // Main Banner slider orderby
        $wp_customize->add_setting( 'main_banner_slider_order_by', array(
            'default' => ND\newsmatic_get_customizer_default( 'main_banner_slider_order_by' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control'
        ));
        $wp_customize->add_control( 'main_banner_slider_order_by', array(
            'type'      => 'select',
            'section'   => 'newsmatic_main_banner_section',
            'label'     => esc_html__( 'Orderby', 'newsmatic' ),
            'priority'  => 20,
            'choices'   => array(
                'date-desc' => esc_html__( 'Newest - Oldest', 'newsmatic' ),
                'date-asc' => esc_html__( 'Oldest - Newest', 'newsmatic' ),
                'title-asc' => esc_html__( 'A - Z', 'newsmatic' ),
                'title-desc' => esc_html__( 'Z - A', 'newsmatic' ),
                'rand-desc' => esc_html__( 'Random', 'newsmatic' )
            ),
        ));

        // main banner posts filter
        $wp_customize->add_setting( 'main_banner_post_filter', array(
            'default' => ND\newsmatic_get_customizer_default( 'main_banner_post_filter' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Bubble_Control( $wp_customize, 'main_banner_post_filter', array(
                'section'     => 'newsmatic_main_banner_section',
                'settings'    => 'main_banner_post_filter',
                'priority'  => 25,
                'choices' => array(
                    array(
                        'value' => 'category',
                        'label' => esc_html__('By category', 'newsmatic' )
                    ),
                    array(
                        'value' => 'title',
                        'label' => esc_html__('By title', 'newsmatic' )
                    )
                )
            ))
        );
        
        // Main Banner slider categories
        $wp_customize->add_setting( 'main_banner_slider_categories', array(
            'default' => ND\newsmatic_get_customizer_default( 'main_banner_slider_categories' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Multiselect_Control( $wp_customize, 'main_banner_slider_categories', array(
                'label'     => esc_html__( 'Posts Categories', 'newsmatic' ),
                'section'   => 'newsmatic_main_banner_section',
                'settings'  => 'main_banner_slider_categories',
                'priority'  => 30,
                'choices'   => newsmatic_get_multicheckbox_categories_simple_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'main_banner_post_filter' )->value() == 'category' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // main banner date filter
        $wp_customize->add_setting( 'main_banner_date_filter', array(
            'default' => ND\newsmatic_get_customizer_default( 'main_banner_date_filter' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Bubble_Control( $wp_customize, 'main_banner_date_filter', array(
                'section'     => 'newsmatic_main_banner_section',
                'settings'    => 'main_banner_date_filter',
                'priority'  => 35,
                'choices' => newsmatic_get_date_filter_choices_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'main_banner_post_filter' )->value() == 'category' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );

        // main banner posts
        $wp_customize->add_setting( 'main_banner_posts', array(
            'default' => ND\newsmatic_get_customizer_default( 'main_banner_posts' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Posts_Multiselect_Control( $wp_customize, 'main_banner_posts', array(
                'label'     => esc_html__( 'Posts', 'newsmatic' ),
                'section'   => 'newsmatic_main_banner_section',
                'settings'  => 'main_banner_posts',
                'priority'  => 40,
                'choices'   => newsmatic_get_multicheckbox_posts_simple_array(),
                'active_callback'   => function( $setting ) {
                    if ( $setting->manager->get_setting( 'main_banner_post_filter' )->value() == 'title' ) {
                        return true;
                    }
                    return false;
                }
            ))
        );
        
        // Main banner block posts setting heading
        $wp_customize->add_setting( 'main_banner_block_posts_settings_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'main_banner_block_posts_settings_header', array(
                'label'	      => esc_html__( 'Block Posts Setting', 'newsmatic' ),
                'section'     => 'newsmatic_main_banner_section',
                'settings'    => 'main_banner_block_posts_settings_header',
                'priority'  => 45,
            ))
        );

        // Main Banner block posts slider orderby
        $wp_customize->add_setting( 'main_banner_block_posts_order_by', array(
            'default' => ND\newsmatic_get_customizer_default( 'main_banner_block_posts_order_by' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control'
        ));
        $wp_customize->add_control( 'main_banner_block_posts_order_by', array(
            'type'      => 'select',
            'section'   => 'newsmatic_main_banner_section',
            'label'     => esc_html__( 'Orderby', 'newsmatic' ),
            'priority'  => 50,
            'choices'   => array(
                'date-desc' => esc_html__( 'Newest - Oldest', 'newsmatic' ),
                'date-asc' => esc_html__( 'Oldest - Newest', 'newsmatic' ),
                'title-asc' => esc_html__( 'A - Z', 'newsmatic' ),
                'title-desc' => esc_html__( 'Z - A', 'newsmatic' ),
                'rand-desc' => esc_html__( 'Random', 'newsmatic' )
            )
        ));

        // Main Banner block posts categories
        $wp_customize->add_setting( 'main_banner_block_posts_categories', array(
            'default' => ND\newsmatic_get_customizer_default( 'main_banner_block_posts_categories' ),
            'sanitize_callback' => 'sanitize_text_field'
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Multiselect_Control( $wp_customize, 'main_banner_block_posts_categories', array(
                'label'     => esc_html__( 'Block posts categories', 'newsmatic' ),
                'section'   => 'newsmatic_main_banner_section',
                'settings'  => 'main_banner_block_posts_categories',
                'priority'  => 55,
                'choices'   => newsmatic_get_multicheckbox_categories_simple_array()
            ))
        );
        
        // banner section order
        $wp_customize->add_setting( 'banner_section_order', array(
            'default'   => ND\newsmatic_get_customizer_default( 'banner_section_order' ),
            'sanitize_callback' => 'newsmatic_sanitize_sortable_control'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Item_Sortable_Control( $wp_customize, 'banner_section_order', array(
                'label'         => esc_html__( 'Column Re-order', 'newsmatic' ),
                'section'       => 'newsmatic_main_banner_section',
                'settings'      => 'banner_section_order',
                'tab'   => 'design',
                'fields'    => array(
                    'banner_slider'  => array(
                        'label' => esc_html__( 'Banner Slider Column', 'newsmatic' )
                    ),
                    'tab_slider'  => array(
                        'label' => esc_html__( 'Grid Trailing Posts', 'newsmatic' )
                    )
                )
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_main_banner_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_footer_panel' ) ) :
    /**
     * Register footer options settings
     * 
     */
    function newsmatic_customizer_footer_panel( $wp_customize ) {
        /**
         * Theme Footer Section
         * 
         * panel - newsmatic_footer_panel
         */
        $wp_customize->add_section( 'newsmatic_footer_section', array(
            'title' => esc_html__( 'Theme Footer', 'newsmatic' ),
            'priority'  => 74
        ));
        
        // section tab
        $wp_customize->add_setting( 'footer_section_tab', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'   => 'general'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Tab_Control( $wp_customize, 'footer_section_tab', array(
                'section'     => 'newsmatic_footer_section',
                'choices'  => array(
                    array(
                        'name'  => 'general',
                        'title'  => esc_html__( 'General', 'newsmatic' )
                    ),
                    array(
                        'name'  => 'design',
                        'title'  => esc_html__( 'Design', 'newsmatic' )
                    )
                )
            ))
        );

        // Footer Option
        $wp_customize->add_setting( 'footer_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'footer_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport'   => 'postMessage'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Toggle_Control( $wp_customize, 'footer_option', array(
                'label'	      => esc_html__( 'Enable footer section', 'newsmatic' ),
                'section'     => 'newsmatic_footer_section',
                'settings'    => 'footer_option',
                'tab'   => 'general'
            ))
        );

        /// Add the footer layout control.
        $wp_customize->add_setting( 'footer_widget_column', array(
            'default'           => ND\newsmatic_get_customizer_default( 'footer_widget_column' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            'transport'   => 'postMessage'
            )
        );
        $wp_customize->add_control( new Newsmatic_WP_Radio_Image_Control(
            $wp_customize,
            'footer_widget_column',
            array(
                'section'  => 'newsmatic_footer_section',
                'tab'   => 'general',
                'choices'  => array(
                    'column-one' => array(
                        'label' => esc_html__( 'Column One', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/footer_column_one.jpg'
                    ),
                    'column-two' => array(
                        'label' => esc_html__( 'Column Two', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/footer_column_two.jpg'
                    ),
                    'column-three' => array(
                        'label' => esc_html__( 'Column Three', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/footer_column_three.jpg'
                    ),
                    'column-four' => array(
                        'label' => esc_html__( 'Column Four', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/footer_column_four.jpg'
                    )
                )
            )
        ));
        
        // Redirect widgets link
        $wp_customize->add_setting( 'footer_widgets_redirects', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'footer_widgets_redirects', array(
                'label'	      => esc_html__( 'Widgets', 'newsmatic' ),
                'section'     => 'newsmatic_footer_section',
                'settings'    => 'footer_widgets_redirects',
                'tab'   => 'general',
                'choices'     => array(
                    'footer-column-one' => array(
                        'type'  => 'section',
                        'id'    => 'sidebar-widgets-footer-sidebar--column-1',
                        'label' => esc_html__( 'Manage footer widget one', 'newsmatic' )
                    ),
                    'footer-column-two' => array(
                        'type'  => 'section',
                        'id'    => 'sidebar-widgets-footer-sidebar--column-2',
                        'label' => esc_html__( 'Manage footer widget two', 'newsmatic' )
                    ),
                    'footer-column-three' => array(
                        'type'  => 'section',
                        'id'    => 'sidebar-widgets-footer-sidebar--column-3',
                        'label' => esc_html__( 'Manage footer widget three', 'newsmatic' )
                    ),
                    'footer-column-four' => array(
                        'type'  => 'section',
                        'id'    => 'sidebar-widgets-footer-sidebar--column-4',
                        'label' => esc_html__( 'Manage footer widget four', 'newsmatic' )
                    )
                )
            ))
        );

        // footer border top
        $wp_customize->add_setting( 'footer_top_border', array( 
            'default' => ND\newsmatic_get_customizer_default( 'footer_top_border' ),
            'sanitize_callback' => 'newsmatic_sanitize_array',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Border_Control( $wp_customize, 'footer_top_border', array(
                'label'       => esc_html__( 'Border Top', 'newsmatic' ),
                'section'     => 'newsmatic_footer_section',
                'settings'    => 'footer_top_border',
                'tab'   => 'design'
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_footer_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_bottom_footer_panel' ) ) :
    /**
     * Register bottom footer options settings
     * 
     */
    function newsmatic_customizer_bottom_footer_panel( $wp_customize ) {
        /**
         * Bottom Footer Section
         * 
         * panel - newsmatic_footer_panel
         */
        $wp_customize->add_section( 'newsmatic_bottom_footer_section', array(
            'title' => esc_html__( 'Bottom Footer', 'newsmatic' ),
            'priority'  => 75
        ));

        // Bottom Footer Option
        $wp_customize->add_setting( 'bottom_footer_option', array(
            'default'         => ND\newsmatic_get_customizer_default( 'bottom_footer_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Toggle_Control( $wp_customize, 'bottom_footer_option', array(
                'label'	      => esc_html__( 'Enable bottom footer', 'newsmatic' ),
                'section'     => 'newsmatic_bottom_footer_section',
                'settings'    => 'bottom_footer_option'
            ))
        );

        // Main Banner slider categories option
        $wp_customize->add_setting( 'bottom_footer_menu_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'bottom_footer_menu_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'bottom_footer_menu_option', array(
                'label'	      => esc_html__( 'Show bottom footer menu', 'newsmatic' ),
                'section'     => 'newsmatic_bottom_footer_section',
                'settings'    => 'bottom_footer_menu_option'
            ))
        );

        // copyright text
        $wp_customize->add_setting( 'bottom_footer_site_info', array(
            'default'    => ND\newsmatic_get_customizer_default( 'bottom_footer_site_info' ),
            'sanitize_callback' => 'wp_kses_post'
        ));
        $wp_customize->add_control( 'bottom_footer_site_info', array(
                'label'	      => esc_html__( 'Copyright Text', 'newsmatic' ),
                'type'  => 'textarea',
                'description' => esc_html__( 'Add %year% to retrieve current year.', 'newsmatic' ),
                'section'     => 'newsmatic_bottom_footer_section'
            )
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_bottom_footer_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_front_sections_panel' ) ) :
    /**
     * Register front sections settings
     * 
     */
    function newsmatic_customizer_front_sections_panel( $wp_customize ) {
        // Front sections panel
        $wp_customize->add_panel( 'newsmatic_front_sections_panel', array(
            'title' => esc_html__( 'Front sections', 'newsmatic' ),
            'priority'  => 71
        ));

        // full width content section
        $wp_customize->add_section( 'newsmatic_full_width_section', array(
            'title' => esc_html__( 'Full Width', 'newsmatic' ),
            'panel' => 'newsmatic_front_sections_panel',
            'priority'  => 10
        ));

        // full width repeater control
        $wp_customize->add_setting( 'full_width_blocks', array(
            'default'   => ND\newsmatic_get_customizer_default( 'full_width_blocks' ),
            'sanitize_callback' => 'newsmatic_sanitize_repeater_control'
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Block_Repeater_Control( $wp_customize, 'full_width_blocks', array(
                'label'	      => esc_html__( 'Blocks to show in this section', 'newsmatic' ),
                'description' => esc_html__( 'Hold bar icon at right of block item and drag vertically to re-order blocks', 'newsmatic' ),
                'section'     => 'newsmatic_full_width_section',
                'priority'     => 10,
                'settings'    => 'full_width_blocks'
            ))
        );

        // Left content -right sidebar section
        $wp_customize->add_section( 'newsmatic_leftc_rights_section', array(
            'title' => esc_html__( 'Left Content  - Right Sidebar', 'newsmatic' ),
            'panel' => 'newsmatic_front_sections_panel',
            'priority'  => 10
        ));

        // redirect to manage sidebar
        $wp_customize->add_setting( 'leftc_rights_section_sidebar_redirect', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));
    
        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'leftc_rights_section_sidebar_redirect', array(
                'label'	      => esc_html__( 'Widgets', 'newsmatic' ),
                'section'     => 'newsmatic_leftc_rights_section',
                'settings'    => 'leftc_rights_section_sidebar_redirect',
                'tab'   => 'general',
                'priority'  => 5,
                'choices'     => array(
                    'footer-column-one' => array(
                        'type'  => 'section',
                        'id'    => 'sidebar-widgets-front-right-sidebar',
                        'label' => esc_html__( 'Manage right sidebar', 'newsmatic' )
                    )
                )
            ))
        );

        // Block Repeater control
        $wp_customize->add_setting( 'leftc_rights_blocks', array(
            'sanitize_callback' => 'newsmatic_sanitize_repeater_control',
            'default'   => ND\newsmatic_get_customizer_default( 'leftc_rights_blocks' )
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Block_Repeater_Control( $wp_customize, 'leftc_rights_blocks', array(
                'label'	      => esc_html__( 'Blocks to show in this section', 'newsmatic' ),
                'description' => esc_html__( 'Hold bar icon at right of block item and drag vertically to re-order blocks', 'newsmatic' ),
                'section'     => 'newsmatic_leftc_rights_section',
                'priority'  => 10,
                'settings'    => 'leftc_rights_blocks'
            ))
        );

        /**
         * Left sidebar - Right content section
         * 
         */
        $wp_customize->add_section( 'newsmatic_lefts_rightc_section', array(
            'title' => esc_html__( 'Left Sidebar - Right Content', 'newsmatic' ),
            'panel' => 'newsmatic_front_sections_panel',
            'priority'  => 10
        ));

        // redirect to manage sidebar
        $wp_customize->add_setting( 'lefts_rightc_section_sidebar_redirect', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'lefts_rightc_section_sidebar_redirect', array(
                'label'	      => esc_html__( 'Widgets', 'newsmatic' ),
                'section'     => 'newsmatic_lefts_rightc_section',
                'settings'    => 'lefts_rightc_section_sidebar_redirect',
                'tab'   => 'general',
                'priority'  => 5,
                'choices'     => array(
                    'footer-column-one' => array(
                        'type'  => 'section',
                        'id'    => 'sidebar-widgets-front-left-sidebar',
                        'label' => esc_html__( 'Manage left sidebar', 'newsmatic' )
                    )
                )
            ))
        );

        // Block Repeater control
        $wp_customize->add_setting( 'lefts_rightc_blocks', array(
            'sanitize_callback' => 'newsmatic_sanitize_repeater_control',
            'default'   => ND\newsmatic_get_customizer_default( 'lefts_rightc_blocks' )
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Block_Repeater_Control( $wp_customize, 'lefts_rightc_blocks', array(
                'label'	      => esc_html__( 'Blocks to show in this section', 'newsmatic' ),
                'priority'  => 10,
                'description' => esc_html__( 'Hold bar icon at right of block item and drag vertically to re-order blocks', 'newsmatic' ),
                'section'     => 'newsmatic_lefts_rightc_section',
                'settings'    => 'lefts_rightc_blocks'
            ))
        );

        // Bottom Full Width content section
        $wp_customize->add_section( 'newsmatic_bottom_full_width_section', array(
            'title' => esc_html__( 'Bottom Full Width', 'newsmatic' ),
            'panel' => 'newsmatic_front_sections_panel',
            'priority'  => 50
        ));

        // bottom full width blocks control
        $wp_customize->add_setting( 'bottom_full_width_blocks', array(
            'sanitize_callback' => 'newsmatic_sanitize_repeater_control',
            'default'   => ND\newsmatic_get_customizer_default( 'bottom_full_width_blocks' )
        ));
        
        $wp_customize->add_control( 
            new Newsmatic_WP_Block_Repeater_Control( $wp_customize, 'bottom_full_width_blocks', array(
                'label'	      => esc_html__( 'Blocks to show in this section', 'newsmatic' ),
                'description' => esc_html__( 'Hold bar icon at right of block item and drag vertically to re-order blocks', 'newsmatic' ),
                'section'     => 'newsmatic_bottom_full_width_section',
                'priority'  => 10,
                'settings'    => 'bottom_full_width_blocks'
            ))
        );

        // front sections reorder section
        $wp_customize->add_section( 'newsmatic_front_sections_reorder_section', array(
            'title' => esc_html__( 'Reorder sections', 'newsmatic' ),
            'panel' => 'newsmatic_front_sections_panel',
            'priority'  => 60
        ));

        /**
         * Frontpage sections options
         * 
         * @package Newsmatic
         * @since 1.0.0
         */
        $wp_customize->add_setting( 'homepage_content_order', array(
            'default'   => ND\newsmatic_get_customizer_default( 'homepage_content_order' ),
            'sanitize_callback' => 'newsmatic_sanitize_sortable_control'
        ));
        $wp_customize->add_control(
            new Newsmatic_WP_Item_Sortable_Control( $wp_customize, 'homepage_content_order', array(
                'label'         => esc_html__( 'Section Re-order', 'newsmatic' ),
                'description'   => esc_html__( 'Hold item and drag vertically to re-order the items', 'newsmatic' ),
                'section'       => 'newsmatic_front_sections_reorder_section',
                'settings'      => 'homepage_content_order',
                'priority'  => 30,
                'fields'    => array(
                    'full_width_section'  => array(
                        'label' => esc_html__( 'Full width Section', 'newsmatic' )
                    ),
                    'leftc_rights_section'  => array(
                        'label' => esc_html__( 'Left Content - Right Sidebar', 'newsmatic' )
                    ),
                    'lefts_rightc_section'  => array(
                        'label' => esc_html__( 'Left Sidebar - Right Content', 'newsmatic' )
                    ),
                    'bottom_full_width_section'  => array(
                        'label' => esc_html__( 'Bottom Full width Section', 'newsmatic' )
                    ),
                    'latest_posts'  => array(
                        'label' => esc_html__( 'Latest Posts / Page Content', 'newsmatic' )
                    )
                )
            ))
        );
    }
    add_action( 'customize_register', 'newsmatic_customizer_front_sections_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_blog_post_archive_panel' ) ) :
    /**
     * Register global options settings
     * 
     */
    function newsmatic_customizer_blog_post_archive_panel( $wp_customize ) {
        // Blog/Archive/Single panel
        $wp_customize->add_panel( 'newsmatic_blog_post_archive_panel', array(
            'title' => esc_html__( 'Blog / Archive / Single', 'newsmatic' ),
            'priority'  => 72
        ));
        
        // blog / archive section
        $wp_customize->add_section( 'newsmatic_blog_archive_section', array(
            'title' => esc_html__( 'Blog / Archive', 'newsmatic' ),
            'panel' => 'newsmatic_blog_post_archive_panel',
            'priority'  => 10
        ));

        // archive post layouts
        $wp_customize->add_setting( 'archive_page_layout',
            array(
            'default'           => ND\newsmatic_get_customizer_default( 'archive_page_layout' ),
            'sanitize_callback' => 'newsmatic_sanitize_select_control',
            )
        );
        $wp_customize->add_control( 
            new Newsmatic_WP_Radio_Image_Control( $wp_customize, 'archive_page_layout', array(
                'section'  => 'newsmatic_blog_archive_section',
                'priority' => 10,
                'choices'  => array(
                    'one' => array(
                        'label' => esc_html__( 'Layout One', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/archive_one.jpg'
                    ),
                    'two' => array(
                        'label' => esc_html__( 'Layout Two', 'newsmatic' ),
                        'url'   => '%s/assets/images/customizer/archive_two.jpg'
                    )
                )
            )
        ));

        // archive title prefix option
        $wp_customize->add_setting( 'archive_page_title_prefix', array(
            'default' => ND\newsmatic_get_customizer_default( 'archive_page_title_prefix' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'archive_page_title_prefix', array(
                'label'	      => esc_html__( 'Show archive title prefix', 'newsmatic' ),
                'priority'    => 30,
                'section'     => 'newsmatic_blog_archive_section',
                'settings'    => 'archive_page_title_prefix'
            ))
        );
        // Redirect continue reading button
        $wp_customize->add_setting( 'archive_button_redirect', array(
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Redirect_Control( $wp_customize, 'archive_button_redirect', array(
                'section'     => 'newsmatic_blog_archive_section',
                'priority'    => 40,
                'settings'    => 'archive_button_redirect',
                'choices'     => array(
                    'header-social-icons' => array(
                        'type'  => 'section',
                        'id'    => 'newsmatic_buttons_section',
                        'label' => esc_html__( 'Edit button styles', 'newsmatic' )
                    )
                )
            ))
        );

        //  single post section
        $wp_customize->add_section( 'newsmatic_single_post_section', array(
            'title' => esc_html__( 'Single Post', 'newsmatic' ),
            'panel' => 'newsmatic_blog_post_archive_panel',
            'priority'  => 20
        ));

        // single post related news heading
        $wp_customize->add_setting( 'single_post_related_posts_header', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'single_post_related_posts_header', array(
                'label'	      => esc_html__( 'Related News', 'newsmatic' ),
                'section'     => 'newsmatic_single_post_section',
                'settings'    => 'single_post_related_posts_header'
            ))
        );

        // related news option
        $wp_customize->add_setting( 'single_post_related_posts_option', array(
            'default'   => ND\newsmatic_get_customizer_default( 'single_post_related_posts_option' ),
            'sanitize_callback' => 'newsmatic_sanitize_toggle_control',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 
            new Newsmatic_WP_Simple_Toggle_Control( $wp_customize, 'single_post_related_posts_option', array(
                'label'	      => esc_html__( 'Show related news', 'newsmatic' ),
                'section'     => 'newsmatic_single_post_section',
                'settings'    => 'single_post_related_posts_option'
            ))
        );

        // related news title
        $wp_customize->add_setting( 'single_post_related_posts_title', array(
            'default' => ND\newsmatic_get_customizer_default( 'single_post_related_posts_title' ),
            'sanitize_callback' => 'sanitize_text_field',
            'transport' => 'postMessage'
        ));
        $wp_customize->add_control( 'single_post_related_posts_title', array(
            'type'      => 'text',
            'section'   => 'newsmatic_single_post_section',
            'label'     => esc_html__( 'Related news title', 'newsmatic' )
        ));
    }
    add_action( 'customize_register', 'newsmatic_customizer_blog_post_archive_panel', 10 );
endif;

if( !function_exists( 'newsmatic_customizer_page_panel' ) ) :
    /**
     * Register global options settings
     * 
     */
    function newsmatic_customizer_page_panel( $wp_customize ) {
        // page panel
        $wp_customize->add_panel( 'newsmatic_page_panel', array(
            'title' => esc_html__( 'Pages', 'newsmatic' ),
            'priority'  => 73
        ));
        
        // 404 section
        $wp_customize->add_section( 'newsmatic_404_section', array(
            'title' => esc_html__( '404', 'newsmatic' ),
            'panel' => 'newsmatic_page_panel',
            'priority'  => 20
        ));
        // 404 image field
        $wp_customize->add_setting( 'error_page_image', array(
            'default' => ND\newsmatic_get_customizer_default( 'error_page_image' ),
            'sanitize_callback' => 'absint',
        ));
        $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'error_page_image', array(
            'section' => 'newsmatic_404_section',
            'mime_type' => 'image',
            'label' => esc_html__( '404 Image', 'newsmatic' ),
            'description' => esc_html__( 'Upload image that shows you are on 404 error page', 'newsmatic' )
        )));
    }
    add_action( 'customize_register', 'newsmatic_customizer_page_panel', 10 );
endif;

// extract to the customizer js
$newsmaticAddAction = function() {
    $action_prefix = "wp_ajax_" . "newsmatic_";
    // retrieve posts with search key
    add_action( $action_prefix . 'get_multicheckbox_posts_simple_array', function() {
        check_ajax_referer( 'newsmatic-customizer-controls-live-nonce', 'security' );
        $searchKey = isset($_POST['search']) ? sanitize_text_field(wp_unslash($_POST['search'])): '';
        $posts_list = get_posts(array('numberposts'=>-1, 's'=>esc_html($searchKey)));
        foreach( $posts_list as $postItem ) :
            $posts_array[] = array( 
                'value'	=> esc_html( $postItem->post_name ),
                'label'	=> esc_html( $postItem->post_title )
            );
        endforeach;
        wp_send_json_success($posts_array);
        wp_die();
    });
    // site border top
    add_action( $action_prefix . 'customizer_site_block_border_top', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
        ob_start();
            newsmatic_assign_var( "--theme-block-top-border-color", "website_block_border_top_color" );
        $site_block_border_top = ob_get_clean();
        echo apply_filters( 'site_block_border_top', wp_strip_all_tags($site_block_border_top) );
        wp_die();
    });
    // site logo styles
    add_action( $action_prefix . 'site_logo_styles', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
            newsmatic_site_logo_width_fnc("body .site-branding img.custom-logo", 'newsmatic_site_logo_width');
		$site_logo_styles = ob_get_clean();
		echo apply_filters( 'newsmatic_site_logo_styles', wp_strip_all_tags($site_logo_styles) );
		wp_die();
	});
    // site title typo
    add_action( $action_prefix . 'site_title_typo', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
            newsmatic_get_typo_style( "--site-title", 'site_title_typo' );
		$site_title_typo = ob_get_clean();
		echo apply_filters( 'newsmatic_site_title_typo', wp_strip_all_tags($site_title_typo) );
		wp_die();
	});
    // top header styles
    add_action( $action_prefix . 'top_header_styles', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
            newsmatic_get_background_style('.newsmatic_main_body .site-header.layout--default .top-header','top_header_background_color_group');
		$top_header_styles = ob_get_clean();
		echo apply_filters( 'newsmatic_top_header_styles', wp_strip_all_tags($top_header_styles) );
		wp_die();
	});
    // header styles
    add_action( $action_prefix . 'header_styles', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
            newsmatic_get_background_style('body .site-header.layout--default .site-branding-section', 'header_background_color_group');
            newsmatic_text_color_var('--sidebar-toggle-color','header_sidebar_toggle_color');
            newsmatic_text_color_var('--search-color','header_search_icon_color');
			newsmatic_header_padding('--header-padding', 'header_vertical_padding');
		$header_styles = ob_get_clean();
		echo apply_filters( 'newsmatic_header_styles', wp_strip_all_tags($header_styles) );
		wp_die();
	});
    // header menu styles
    add_action( $action_prefix . 'header_menu_styles', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
            newsmatic_text_color_var('--menu-color','header_menu_color');
            newsmatic_get_background_style('.newsmatic_main_body .site-header.layout--default .menu-section','header_menu_background_color_group');
		$header_menu_styles = ob_get_clean();
		echo apply_filters( 'newsmatic_header_menu_styles', wp_strip_all_tags($header_menu_styles) );
		wp_die();
	});
    // header border styles
    add_action( $action_prefix . 'header_border_styles', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
            newsmatic_border_option('body .site-header.layout--default .menu-section .row', 'header_menu_top_border', 'border-top');
        $header_border_bottom_styles = ob_get_clean();
		echo apply_filters( 'newsmatic_header_border_styles', wp_strip_all_tags($header_border_bottom_styles) );
		wp_die();
	});
    // stt buttons styles
    add_action( $action_prefix . 'stt_buttons__styles', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
			newsmatic_visibility_options('body #newsmatic-scroll-to-top.show','stt_responsive_option');
			newsmatic_border_option('body #newsmatic-scroll-to-top', 'stt_border');
			newsmatic_text_color_var('--move-to-top-color','stt_color_group');
			newsmatic_text_color_var('--move-to-top-background-color','stt_background_color_group');
        $newsmatic_stt_buttons__styles = ob_get_clean();
		echo apply_filters( 'newsmatic_stt_buttons__styles', wp_strip_all_tags($newsmatic_stt_buttons__styles) );
		wp_die();
	});
    // footer styles
    add_action( $action_prefix . 'footer__styles', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
			newsmatic_border_option('body .site-footer.dark_bk','footer_top_border', 'border-top');
        $newsmatic_footer__styles = ob_get_clean();
		echo apply_filters( 'newsmatic_footer__styles', wp_strip_all_tags($newsmatic_footer__styles) );
		wp_die();
	});
    // typography fonts url
    add_action( $action_prefix . 'typography_fonts_url', function() {
        check_ajax_referer( 'newsmatic-customizer-nonce', 'security' );
		// enqueue inline style
		ob_start();
			echo esc_url( newsmatic_typo_fonts_url() );
        $newsmatic_typography_fonts_url = ob_get_clean();
		echo apply_filters( 'newsmatic_typography_fonts_url', esc_url($newsmatic_typography_fonts_url) );
		wp_die();
	});
};
$newsmaticAddAction();

// Imports previous customizer settings on exists
add_action( "wp_ajax_newsmatic__import_custmomizer_setting", function() {
    check_ajax_referer( 'newsmatic-customizer-controls-nonce', 'security' );
    $n_setting = wp_get_theme()->get_stylesheet();
    $old_setting = get_option( 'theme_mods_newsmatic' );
    if( ! $old_setting ) return;
    $current_setting = get_option( 'theme_mods_' . $n_setting );
    if( update_option( 'theme_mods_' .$n_setting. '-old', $current_setting ) ) {
        if( update_option( 'theme_mods_' . $n_setting, $old_setting ) ) {
            return true;
        }
    }
    return;
    wp_die();
});

add_action( 'wp_ajax_newsmatic_customizer_reset_to_default', function () {
    check_ajax_referer( 'newsmatic-customizer-controls-nonce', 'security' );
    /**
     * Filter the settings that will be removed.
     *
     * @param array $settings Theme modifications.
     * @return array
     * @since 1.1.0
     */
    remove_theme_mods();
    wp_send_json_success();
});