<?php
/**
 * Includes theme defaults and starter functions
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
 namespace Newsmatic\CustomizerDefault;

 if( !function_exists( 'newsmatic_get_customizer_option' ) ) :
    /**
     * Gets customizer "theme_mods" value
     * 
     * @package Newsmatic
     * @since 1.0.0
     * 
     */
    function newsmatic_get_customizer_option( $key ) {
        return get_theme_mod( $key, newsmatic_get_customizer_default( $key ) );
    }
 endif;

 if( !function_exists( 'newsmatic_get_multiselect_tab_option' ) ) :
    /**
     * Gets customizer "multiselect combine tab" value
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_get_multiselect_tab_option( $key ) {
        $value = newsmatic_get_customizer_option( $key );
        if( !$value["desktop"] && !$value["tablet"] && !$value["mobile"] ) return apply_filters( "newsmatic_get_multiselect_tab_option", false );
        return apply_filters( "newsmatic_get_multiselect_tab_option", true );
    }
 endif;

 if( !function_exists( 'newsmatic_get_customizer_default' ) ) :
    /**
     * Gets customizer "theme_mods" value
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_get_customizer_default($key) {
        $array_defaults = apply_filters( 'newsmatic_get_customizer_defaults', array(
            'theme_color'   => '#1B8415',
            'site_background_color'  => json_encode(array(
                'type'  => 'solid',
                'solid' => '#F0F1F2',
                'gradient'  => null
            )),
            'global_button_text'    => array( "icon"  => "fas fa-angle-right", "text"   => esc_html__( 'Read More', 'newsmatic' ) ),
            'preloader_option'  => false,
            'website_layout'    => 'full-width--layout',
            'website_block_border_top_option' => true,
            'website_block_border_top_color' => json_encode(array(
                'type'  => 'solid',
                'solid' => '#1b8415',
                'gradient'  => 'linear-gradient( 135deg, #485563 10%, #29323c 100%)'
            )),
            'frontpage_sidebar_layout'  => 'right-sidebar',
            'frontpage_sidebar_sticky_option'    => false,
            'archive_sidebar_layout'    => 'right-sidebar',
            'archive_sidebar_sticky_option'    => false,
            'single_sidebar_layout' => 'right-sidebar',
            'single_sidebar_sticky_option'    => false,
            'page_sidebar_layout'   => 'right-sidebar',
            'page_sidebar_sticky_option'    => false,
            'preset_color_1'    => '#64748b',
            'preset_color_2'    => '#27272a',
            'preset_color_3'    => '#ef4444',
            'preset_color_4'    => '#eab308',
            'preset_color_5'    => '#84cc16',
            'preset_color_6'    => '#22c55e',
            'preset_color_7'    => '#06b6d4',
            'preset_color_8'    => '#0284c7',
            'preset_color_9'    => '#6366f1',
            'preset_color_10'    => '#84cc16',
            'preset_color_11'    => '#a855f7',
            'preset_color_12'    => '#f43f5e',
            'preset_gradient_1'   => 'linear-gradient( 135deg, #485563 10%, #29323c 100%)',
            'preset_gradient_2' => 'linear-gradient( 135deg, #FF512F 10%, #F09819 100%)',
            'preset_gradient_3'  => 'linear-gradient( 135deg, #00416A 10%, #E4E5E6 100%)',
            'preset_gradient_4'   => 'linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)',
            'preset_gradient_5' => 'linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)',
            'preset_gradient_6'  => 'linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)',
            'preset_gradient_7'   => 'linear-gradient( 135deg, #EB3349 10%, #F45C43 100%)',
            'preset_gradient_8' => 'linear-gradient( 135deg, #FFF720 10%, #3CD500 100%)',
            'preset_gradient_9'  => 'linear-gradient( 135deg, #FF96F9 10%, #C32BAC 100%)',
            'preset_gradient_10'   => 'linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%)',
            'preset_gradient_11' => 'linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)',
            'preset_gradient_12'  => 'linear-gradient( 135deg, #FF7AF5 10%, #513162 100%)',
            'post_title_hover_effects'  => 'two',
            'site_image_hover_effects'  => 'two',
            'site_breadcrumb_option'    => true,
            'site_breadcrumb_type'  => 'default',
            'site_breadcrumb_hook_on'   => 'main_container',
            'site_schema_ready' => true,
            'site_date_format'  => 'theme_format',
            'site_date_to_show' => 'published',
            'site_title_hover_textcolor'=> '#1B8415',
            'site_description_color'    => '#8f8f8f',
            'homepage_content_order'    => array( 
                array( 'value'  => 'full_width_section', 'option'   => false ),
                array( 'value'  => 'leftc_rights_section', 'option'    => false ),
                array( 'value'   => 'lefts_rightc_section', 'option' => false ),
                array( 'value'   => 'latest_posts', 'option'    => true ),
                array( 'value' => 'bottom_full_width_section', 'option'  => true )
            ),
            'newsmatic_site_logo_width'    => array(
                'desktop'   => 230,
                'tablet'    => 200,
                'smartphone'    => 200
            ),
            'site_title_typo'    => array(
                'font_family'   => array( 'value' => 'Roboto', 'label' => 'Roboto' ),
                'font_weight'   => array( 'value' => '700', 'label' => 'Bold 700' ),
                'font_size'   => array(
                    'desktop' => 45,
                    'tablet' => 43,
                    'smartphone' => 40
                ),
                'line_height'   => array(
                    'desktop' => 45,
                    'tablet' => 42,
                    'smartphone' => 40,
                ),
                'letter_spacing'   => array(
                    'desktop' => 0,
                    'tablet' => 0,
                    'smartphone' => 0
                ),
                'text_transform'    => 'capitalize',
                'text_decoration'    => 'none',
            ),
            'top_header_option' => true,
            'top_header_responsive_option' => true,
            'top_header_date_time_option'   => true,
            'top_header_right_content_type' => 'ticker-news',
            'top_header_menu_option' => true,
            'top_header_ticker_news_option' => true,
            'top_header_ticker_news_post_filter' => 'category',
            'top_header_ticker_news_categories' => '[]',
            'top_header_ticker_news_posts' => '[]',
            'top_header_ticker_news_date_filter' => 'all',
            'top_header_background_color_group' => json_encode(array(
                'type'  => 'solid',
                'solid' => '#1b8415',
                'gradient'  => null
            )),
            'header_custom_button_label' => array( "icon"  => "fas fa-record-vinyl", "text"   => esc_html__( 'Live Now', 'newsmatic' ) ),
            'header_custom_button_redirect_href_link'  => '',
            'header_custom_button_color_group' => array( 'color'   => "#ffffff", 'hover'   => "#ffffff" ),
            'header_custom_button_background_color_group' => json_encode(array(
                'type'  => 'gradient',
                'solid' => '#b2071d',
                'gradient'  => 'linear-gradient(135deg,rgb(178,7,29) 0%,rgb(1,1,1) 100%)'
            )),
            'header_custom_button_background_hover_color_group' => json_encode(array(
                'type'  => 'solid',
                'solid' => '#b2071d',
                'gradient'  => null
            )),
            'header_newsletter_option'   => true,
            'header_newsletter_label' => array( "icon"  => "far fa-envelope", "text"   => esc_html__( 'Newsletter', 'newsmatic' ) ),
            'header_newsletter_redirect_href_link'  => '',
            'header_random_news_option'   => true,
            'header_random_news_label' => array( "icon"  => "fas fa-bolt", "text"   => esc_html__( 'Random News', 'newsmatic' ) ),
            'header_random_news_filter'    => 'random',
            'header_ads_banner_responsive_option'  => array(
                'desktop'   => true,
                'tablet'   => true,
                'mobile'   => true
            ),
            'header_ads_banner_custom_image'  => '',
            'header_ads_banner_custom_url'  => '',
            'header_ads_banner_custom_target'  => '_self',
            'main_header_elements_order'    => 'social-logo-buttons',
            'top_header_social_option'  => true,
            'header_sidebar_toggle_option'  => true,
            'header_search_option'  => true,
            'header_theme_mode_toggle_option'  => true,
            'theme_header_sticky'  => true,
            'theme_header_custom_button_option'  => false,
            'header_vertical_padding'   => array(
                'desktop' => 35,
                'tablet' => 30,
                'smartphone' => 30
            ),
            'header_sidebar_toggle_color' => array( 'color' => '#525252', 'hover' => '#1B8415' ),
            'header_search_icon_color' => array( 'color' => '#525252', 'hover' => '#1B8415' ),
            'header_background_color_group' => json_encode(array(
                'type'  => 'solid',
                'solid' => null,
                'gradient'  => null,
                'image'     => array( 'media_id' => 0, 'media_url' => '' )
            )),
            'header_menu_hover_effect'  => 'none',
            'header_menu_color'    => array( 'color' => null, 'hover' => null ),
            'header_menu_background_color_group' => json_encode(array(
                'type'  => 'solid',
                'solid' => null,
                'gradient'  => null
            )),
            'header_menu_top_border'    => array( "type"  => "solid", "width"   => "1", "color"   => "#1B8415" ),
            'theme_header_live_search_option'   => true,
            'social_icons_target' => '_blank',
            'social_icons' => json_encode(array(
                array(
                    'icon_class'    => 'fab fa-facebook-f',
                    'icon_url'      => '',
                    'item_option'   => 'show'
                ),
                array(
                    'icon_class'    => 'fab fa-instagram',
                    'icon_url'      => '',
                    'item_option'   => 'show'
                ),
                array(
                    'icon_class'    => 'fab fa-twitter',
                    'icon_url'      => '',
                    'item_option'   => 'show'
                ),
                array(
                    'icon_class'    => 'fab fa-google-wallet',
                    'icon_url'      => '',
                    'item_option'   => 'show'
                ),
                array(
                    'icon_class'    => 'fab fa-youtube',
                    'icon_url'      => '',
                    'item_option'   => 'show'
                )
            )),
            'ticker_news_visible'   => 'all',
            'ticker_news_post_filter' => 'category',
            'ticker_news_categories' => '[]',
            'ticker_news_posts' => '[]',
            'ticker_news_date_filter' => 'all',
            'ticker_news_title' => array( "icon"  => "fas fa-bolt", "text"   => esc_html__( 'Headlines', 'newsmatic' ) ),
            'main_banner_option'    => true,
            'main_banner_slider_order_by'   => 'date-desc',
            'main_banner_post_filter' => 'category',
            'main_banner_slider_categories' => '[]',
            'main_banner_posts' => '[]',
            'main_banner_date_filter' => 'all',
            'main_banner_block_posts_order_by'  => 'rand-desc',
            'main_banner_block_posts_categories'   => '[]',
            'banner_section_order'  => array( 
                array( 'value'  => 'banner_slider', 'option'   => true ),
                array( 'value'  => 'tab_slider', 'option'    => true )
            ),
            'full_width_blocks'   => json_encode(array(
                array(
                    'type'  => 'news-grid',
                    'option'    => true,
                    'blockId'   => '',
                    'column'    => 'three',
                    'layout'    => 'four',
                    'title'     => esc_html__( 'Latest posts', 'newsmatic' ),
                    'thumbOption'    => true,
                    'categoryOption'    => true,
                    'authorOption'  => true,
                    'dateOption'    => true,
                    'commentOption' => true,
                    'excerptOption' => true,
                    'excerptLength' => 10,
                    'query' => array(
                        'order' => 'date-desc',
                        'count' => 3,
                        'postFilter' => 'category',
                        'dateFilter' => 'all',
                        'posts' => [],
                        'categories' => [],
                        'ids' => []
                    ),
                    'buttonOption' => false,
                    'viewallOption'=> false,
                    'viewallUrl'   => ''
                ),
                array(
                    'type'  => 'ad-block',
                    'option'    => false,
                    'title'     => esc_html__( 'Advertisement Banner', 'newsmatic' ),
                    'media' => ['media_url' => '','media_id'=> 0],
                    'url'   =>  '',
                    'targetAttr'    => '_blank',
                    'relAttr'   => 'nofollow'
                )
            )),
            'leftc_rights_blocks'   => json_encode(array(
                array(
                    'type'  => 'news-filter',
                    'option'    => true,
                    'blockId'   => '',
                    'layout'    => 'four',
                    'title'     => esc_html__( 'Latest posts', 'newsmatic' ),
                    'categoryOption'    => true,
                    'authorOption'  => true,
                    'dateOption'    => true,
                    'commentOption' => true,
                    'query' => array(
                        'order' => 'date-desc',
                        'count' => 6,
                        'postFilter' => 'category',
                        'dateFilter' => 'all',
                        'posts' => [],
                        'categories' => [],
                        'ids' => []
                    ),
                    'buttonOption'    => false,
                    'viewallOption'    => false,
                    'viewallUrl'   => ''
                )
            )),
            'lefts_rightc_blocks'   => json_encode(array(
                array(
                    'type'  => 'news-list',
                    'option'    => true,
                    'blockId'   => '',
                    'layout'    => 'two',
                    'column'    => 'two',
                    'title'     => esc_html__( 'Latest posts', 'newsmatic' ),
                    'thumbOption'    => true,
                    'categoryOption'    => true,
                    'authorOption'  => true,
                    'dateOption'    => true,
                    'commentOption' => true,
                    'excerptOption' => true,
                    'excerptLength' => 10,
                    'query' => array(
                        'order' => 'date-desc',
                        'count' => 4,
                        'postFilter' => 'category',
                        'dateFilter' => 'all',
                        'posts' => [],
                        'categories' => [],
                        'ids' => []
                    ),
                    'buttonOption'    => false,
                    'viewallOption'    => false,
                    'viewallUrl'   => ''
                )
            )),
            'bottom_full_width_blocks'   => json_encode(array(
                array(
                    'type'  => 'news-carousel',
                    'option'    => true,
                    'blockId'   => '',
                    'layout'    => 'three',
                    'title'     => esc_html__( 'You May Have Missed', 'newsmatic' ),
                    'categoryOption'    => true,
                    'authorOption'  => true,
                    'dateOption'    => true,
                    'commentOption' => false,
                    'excerptOption' => false,
                    'excerptLength' => 10,
                    'columns' => 4,
                    'query' => array(
                        'order' => 'rand-desc',
                        'count' => 8,
                        'postFilter' => 'category',
                        'dateFilter' => 'all',
                        'posts' => [],
                        'categories' => [],
                        'ids' => []
                    ),
                    'buttonOption'    => false,
                    'viewallOption'    => false,
                    'viewallUrl'   => '',
                    'dots' => true,
                    'loop' => false,
                    'arrows' => true,
                    'auto' => false
                )
            )),
            'opinons_section_option'    => false,
            'opinons_section_show_on'   => 'all',
            'footer_option' => false,
            'footer_widget_column'  => 'column-three',
            'footer_top_border'    => array( "type"  => "solid", "width"   => "5", "color"   => "#1B8415" ),
            'bottom_footer_option'  => true,
            'bottom_footer_menu_option'     => false,
            'bottom_footer_site_info'   => esc_html__( 'Newsmatic - News WordPress Theme %year%.', 'newsmatic' ),
            'single_post_element_order'    => array(
                array( 'value'  => 'categories', 'option' => true ),
                array( 'value'  => 'title', 'option' => true ),
                array( 'value'  => 'meta', 'option' => true ),
                array( 'value'  => 'thumbnail', 'option' => true )
            ),
            'single_post_meta_order'    => array(
                array( 'value'  => 'author', 'option' => true ),
                array( 'value'  => 'date', 'option' => true ),
                array( 'value'  => 'comments', 'option' => true ),
                array( 'value'  => 'read-time', 'option' => true )
            ),
            'single_post_related_posts_option'  => true,
            'single_post_related_posts_title'   => esc_html__( 'Related News', 'newsmatic' ),
            'archive_page_layout'   => 'one',
            'archive_page_title_prefix'   => false,
            'archive_post_element_order'    => array(
                array( 'value'  => 'title', 'option' => true ),
                array( 'value'  => 'meta', 'option' => true ),
                array( 'value'  => 'excerpt', 'option' => true ),
                array( 'value'  => 'button', 'option' => true )
            ),
            'archive_post_meta_order'    => array(
                array( 'value'  => 'author', 'option' => true ),
                array( 'value'  => 'date', 'option' => true ),
                array( 'value'  => 'comments', 'option' => true ),
                array( 'value'  => 'read-time', 'option' => true )
            ),
            'error_page_image'  => 0,
            'stt_responsive_option'    => array(
                'desktop'   => true,
                'tablet'   => true,
                'mobile'   => false
            ),
            'stt_text'  => array( "icon"  => "fas fa-angle-up", "text"   => '' ),
            'stt_alignment' => 'right',
            'stt_color_group' => array( 'color'   => "#fff", 'hover'   => "#fff" ),
            'stt_background_color_group' => array( 'color'   => "#1B8415", 'hover'   => "#1B8415" )
        ));
        $totalCats = get_categories();
        if( $totalCats ) :
            foreach( $totalCats as $singleCat ) :
                $array_defaults['category_' .absint($singleCat->term_id). '_color'] = newsmatic_get_rcolor_code();
            endforeach;
        endif;
        return $array_defaults[$key];
    }
 endif;
 