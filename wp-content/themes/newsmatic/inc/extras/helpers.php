<?php
/**
 * Includes the helper functions and hooks the theme. 
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
 use Newsmatic\CustomizerDefault as ND;

if( !function_exists( 'newsmatic_advertisement_block_html' ) ) :
    /**
     * Calls advertisement block
     * 
     * @since 1.0.0
     */
    function newsmatic_advertisement_block_html($options,$echo) {
        $media = $options->media;
        if( ! isset( $media->media_id ) ) return;
        ?>
        <div <?php if( isset( $options->blockId ) && !empty($options->blockId) ) echo 'id="' .esc_attr( $options->blockId ). '"'; ?> class="newsmatic-advertisement-block is-large">
            <?php
                if( $echo ) {
                    if( isset( $options->title ) && $options->title ) echo '<h2 class="newsmatic-block-title">' .esc_html( $options->title ). '</h2>';
                    if( $media->media_id != 0 ) {
                    ?>
                        <figure class="inner-ad-block">
                            <a href="<?php echo esc_url( $options->url ); ?>" target="<?php echo esc_attr( $options->targetAttr ); ?>" rel="<?php echo esc_attr( $options->relAttr ); ?>"><img src="<?php echo esc_url( wp_get_attachment_url( $media->media_id ) ); ?>"></a>
                        </figure>
                    <?php
                    }
                }
            ?>
        </div>
    <?php
    }
 endif;

 if( !function_exists( 'newsmatic_top_header_html' ) ) :
    /**
     * Calls top header hooks
     * 
     * @since 1.0.0
     */
    function newsmatic_top_header_html() {
        if( ! ND\newsmatic_get_customizer_option( 'top_header_option' ) ) return;
        require get_template_directory() . '/inc/hooks/top-header-hooks.php'; // top header hooks.
        echo '<div class="top-header">';
            echo '<div class="newsmatic-container">';
                echo '<div class="row">';
                /**
                 * hook - newsmatic_top_header_hook
                 * 
                 * @hooked - newsmatic_top_header_ticker_news_part - 10
                 * @hooked - newsmatic_top_header_social_part - 20
                 */
                if( has_action( 'newsmatic_top_header_hook' ) ) do_action( 'newsmatic_top_header_hook' );
                echo '</div>';
            echo '</div>';
        echo '</div>';
    }
endif;

if( !function_exists( 'newsmatic_header_html' ) ) :
    /**
     * Calls header hooks
     * 
     * @since 1.0.0
     */
    function newsmatic_header_html() {
        require get_template_directory() . '/inc/hooks/header-hooks.php'; // top header hooks.
        ?>
        <div class="main-header <?php echo esc_attr( 'order--' . ND\newsmatic_get_customizer_option( 'main_header_elements_order' ) ); ?>">
            <div class="site-branding-section">
                <div class="newsmatic-container">
                    <div class="row">
                        <?php
                            /**
                             * hook - newsmatic_header__site_branding_section_hook
                             * 
                             * @hooked - newsmatic_header_menu_part - 10
                             * @hooked - newsmatic_header_ads_banner_part - 20
                             */
                            if( has_action( 'newsmatic_header__site_branding_section_hook' ) ) do_action( 'newsmatic_header__site_branding_section_hook' );
                        ?>
                    </div>
                </div>
            </div>
            <div class="menu-section">
                <div class="newsmatic-container">
                    <div class="row">
                        <?php
                            /**
                             * hook - newsmatic_header__menu_section_hook
                             * 
                             * @hooked - newsmatic_header_menu_part - 10
                             * @hooked - newsmatic_header_search_part - 20
                             */
                            if( has_action( 'newsmatic_header__menu_section_hook' ) ) do_action( 'newsmatic_header__menu_section_hook' );
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
endif;

if( !function_exists( 'newsmatic_after_header_html' ) ) :
    /**
     * Calls after header hooks
     * 
     * @since 1.0.0
     */
    function newsmatic_after_header_html() {
        ?>
        <div class="after-header header-layout-banner-two">
            <div class="newsmatic-container">
                <div class="row">
                    <?php
                        /**
                         * hook - newsmatic_after_header_hook
                         * 
                         * @hooked - newsmatic_ticker_news_part - 10
                         */
                        if( has_action( 'newsmatic_after_header_hook' ) ) do_action( 'newsmatic_after_header_hook' );
                    ?>
                </div>
            </div>
        </div>
        <?php
    }
endif;

require get_template_directory() . '/inc/hooks/footer-hooks.php'; // footer hooks.
if( !function_exists( 'newsmatic_footer_sections_html' ) ) :
    /**
     * Calls footer hooks
     * 
     * @since 1.0.0
     */
    function newsmatic_footer_sections_html() {
        if( ! ND\newsmatic_get_customizer_option( 'footer_option' ) ) return;
        ?>
        <div class="main-footer boxed-width">
            <div class="footer-inner newsmatic-container">
                <div class="row">
                    <?php
                        /**
                         * hook - newsmatic_footer_hook
                         * 
                         * @hooked - newsmatic_footer_widgets_area_part - 10
                         */
                        if( has_action( 'newsmatic_footer_hook' ) ) do_action( 'newsmatic_footer_hook' );
                    ?>
                </div>
            </div>
        </div>
        <?php
    }
endif;

if( !function_exists( 'newsmatic_bottom_footer_sections_html' ) ) :
    /**
     * Calls bottom footer hooks
     * 
     * @since 1.0.0
     */
    function newsmatic_bottom_footer_sections_html() {
        if( ! ND\newsmatic_get_customizer_option( 'bottom_footer_option' ) ) return;
        require get_template_directory() . '/inc/hooks/bottom-footer-hooks.php'; // footer hooks.
        ?>
        <div class="bottom-footer">
            <div class="newsmatic-container">
                <div class="row">
                    <?php
                        /**
                         * hook - newsmatic_bottom_footer_sections_html
                         * 
                         * @hooked - newsmatic_bottom_footer_menu_part - 20
                         * @hooked - newsmatic_bottom_footer_copyright_part - 3020
                         */
                        if( has_action( 'newsmatic_botttom_footer_hook' ) ) do_action( 'newsmatic_botttom_footer_hook' );
                    ?>
                </div>
            </div>
        </div>
        <?php
    }
endif;
require get_template_directory() . '/inc/hooks/inner-hooks.php'; // inner hooks.
require get_template_directory() . '/inc/hooks/frontpage-sections-hooks.php'; // frontpage sections hooks.

if ( ! function_exists( 'newsmatic_breadcrumb_trail' ) ) :
    /**
     * Theme default breadcrumb function.
     *
     * @since 1.0.0
     */
    function newsmatic_breadcrumb_trail() {
        if ( ! function_exists( 'breadcrumb_trail' ) ) {
            // load class file
            require_once get_template_directory() . '/inc/breadcrumb-trail/breadcrumb-trail.php';
        }

        // arguments variable
        $breadcrumb_args = array(
            'container' => 'div',
            'show_browse' => false,
        );
        breadcrumb_trail( $breadcrumb_args );
    }
    add_action( 'newsmatic_breadcrumb_trail_hook', 'newsmatic_breadcrumb_trail' );
endif;

if( ! function_exists( 'newsmatic_breadcrumb_html' ) ) :
    /**
     * Theme breadcrumb
     *
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_breadcrumb_html() {
        $site_breadcrumb_option = ND\newsmatic_get_customizer_option( 'site_breadcrumb_option' );
        if ( ! $site_breadcrumb_option ) return;
        if ( is_front_page() || is_home() ) return;
        $site_breadcrumb_type = ND\newsmatic_get_customizer_option( 'site_breadcrumb_type' );
        $wrapper_on = ( ND\newsmatic_get_customizer_option( 'site_breadcrumb_hook_on' ) == 'main_container' );
        if( $wrapper_on ):
            ?>
            <div class="newsmatic-container">
                <div class="row">
                <?php
        endif; 
            ?>
                <div class="newsmatic-breadcrumb-wrap">
                    <?php
                        switch( $site_breadcrumb_type ) {
                            case 'yoast': if( newsmatic_compare_wand([newsmatic_function_exists( 'yoast_breadcrumb' )] ) ) yoast_breadcrumb();
                                    break;
                            case 'rankmath': if( newsmatic_compare_wand([newsmatic_function_exists( 'rank_math_the_breadcrumbs' )] ) ) rank_math_the_breadcrumbs();
                                    break;
                            case 'bcn': if( newsmatic_compare_wand([newsmatic_function_exists( 'bcn_display' )] ) ) bcn_display();
                                    break;
                            default: do_action( 'newsmatic_breadcrumb_trail_hook' );
                                    break;
                        }
                    ?>
                </div>
        <?php
        if( $wrapper_on ):
            ?>
                </div>
            </div>
            <?php
        endif;
    }
endif;
$site_breadcrumb_hook_on = ND\newsmatic_get_customizer_option( 'site_breadcrumb_hook_on' );
if( $site_breadcrumb_hook_on == 'main_container' ) {
    add_action( 'newsmatic_before_main_content', 'newsmatic_breadcrumb_html', 10 );
} else {
    add_action( 'newsmatic_before_inner_content', 'newsmatic_breadcrumb_html' );
}

if( ! function_exists( 'newsmatic_category_archive_featured_posts_html' ) ) :
    /**
     * Html for category archive page featured post
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_category_archive_featured_posts_html() {
        if( ! is_category() ) return;
        $sticky_posts  =  get_option( 'sticky_posts' );
        if( ! $sticky_posts ) return;
        $current_object = get_queried_object();
        $current_object_id = $current_object->term_id;
        foreach( $sticky_posts as $sticky_post_id ) :
            $cat_ids =  wp_get_post_categories( $sticky_post_id, array( 'fields' => 'ids' ) );
            if( in_array( $current_object_id, $cat_ids ) ) {
                $post_to_get = $sticky_post_id;
                break;
            }
        endforeach;
        if( ! isset($post_to_get) ) return;
        ?>
          <div class="newsmatic-container">
            <div class="row">
                <article class="featured-post is-sticky" data-id="<?php echo esc_attr( $post_to_get ); ?>">
                    <figure class="post-thumb-wrap">
                        <a href="<?php the_permalink($post_to_get); ?>" title="<?php the_title_attribute(array('post'  => $post_to_get)); ?>">
                            <?php if( has_post_thumbnail($post_to_get) ) {
                                    echo get_the_post_thumbnail($post_to_get, 'full', array(
                                        'title' => the_title_attribute(array(
                                            'post'  => $post_to_get,
                                            'echo'  => false
                                        ))
                                    ));
                                }
                            ?>
                        </a>
                        
                    </figure>
                    <div class="post-element">
                        <?php newsmatic_get_post_categories( $post_to_get, 2 ); ?>
                        <h2 class="post-title"><a href="<?php the_permalink($post_to_get); ?>" title="<?php the_title_attribute(array('post'  => $post_to_get)); ?>"><?php echo wp_kses_post( get_the_title($post_to_get) ); ?></a></h2>
                        <div class="post-meta">
                            <?php
                                newsmatic_posted_by($post_to_get);
                                newsmatic_posted_on($post_to_get);
                            ?>
                        </div>
                    </div>
                </article>
            </div>
          </div>
        <?php
    }
    add_action( 'newsmatic_before_main_content', 'newsmatic_category_archive_featured_posts_html', 20 );
endif;

if( ! function_exists( 'newsmatic_category_archive_author_html' ) ) :
    /**
     * Html for category archive page featured post
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_category_archive_author_html() {
        if( ! is_author() ) return;
        $author_id =  get_query_var( 'author' );
        ?>
          <div class="newsmatic-container newsmatic-author-section">
            <div class="row">
            <?php echo wp_kses_post( get_avatar($author_id, 125) ); ?>
            <div class="author-content">
                <h2 class="author-name"><?php echo esc_html( get_the_author_meta( 'display_name', $author_id ) ); ?></h2>
                <p class="author-desc"><?php echo wp_kses_post( get_the_author_meta('description', $author_id) ); ?></p>
            </div>
            </div>
          </div>
        <?php
    }
    add_action( 'newsmatic_before_main_content', 'newsmatic_category_archive_author_html', 20 );
endif;

if( ! function_exists( 'newsmatic_button_html' ) ) :
    /**
     * View all html
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_button_html( $args ) {
        if( ! $args['option'] ) return;
        $global_button_text = ND\newsmatic_get_customizer_option( 'global_button_text' );
        $classes = isset( $args['classes'] ) ? 'post-link-button' . ' ' .$args['classes'] : 'post-link-button';
        $link = isset( $args['link'] ) ? $args['link'] : get_the_permalink();
        $text = isset( $args['text'] ) ? $args['text'] : $global_button_text['text'];
        $icon = isset( $args['icon'] ) ? $args['icon'] : $global_button_text['icon'];
        echo apply_filters( 'newsmatic_button_html', sprintf( '<a class="%1$s" href="%2$s">%3$s<i class="%4$s"></i></a>', esc_attr( $classes ), esc_url( $link ), esc_html( $text ), esc_attr( $icon ) ) );
    }
    add_action( 'newsmatic_section_block_view_all_hook', 'newsmatic_button_html', 10, 1 );
endif;

if( ! function_exists( 'newsmatic_banner_excerpt_length' ) ) :
    /**
     * Banner Custom excerpt length
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_banner_excerpt_length( $length ) {
        return 15;
    }
endif;

if( ! function_exists( 'newsmatic_archive_excerpt_more_string' ) ) :
    /**
     * Excerpt more string filter
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_archive_excerpt_more_string( $more ) {
        return '...';
    }
    add_filter('excerpt_more', 'newsmatic_archive_excerpt_more_string');
endif;

if( ! function_exists( 'newsmatic_pagination_fnc' ) ) :
    /**
     * Renders pagination html
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_pagination_fnc() {
        if( is_null( paginate_links() ) ) {
            return;
        }
        echo '<div class="pagination">' .wp_kses_post( paginate_links( array( 'prev_text' => '<i class="fas fa-chevron-left"></i>', 'next_text' => '<i class="fas fa-chevron-right"></i>', 'type' => 'list' ) ) ). '</div>';
    }
    add_action( 'newsmatic_pagination_link_hook', 'newsmatic_pagination_fnc' );
 endif;

 if( ! function_exists( 'newsmatic_scroll_to_top_html' ) ) :
    /**
     * Scroll to top fnc
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_scroll_to_top_html() {
        if( ! ND\newsmatic_get_multiselect_tab_option('stt_responsive_option') ) return;
        $stt_text = ND\newsmatic_get_customizer_option( 'stt_text' );
        $icon = isset( $stt_text['icon'] ) ? $stt_text['icon'] : 'fas fa-ban';
        $icon_text = isset( $stt_text['text'] ) ? $stt_text['text'] : '';
        $stt_alignment = ND\newsmatic_get_customizer_option( 'stt_alignment' );
    ?>
        <div id="newsmatic-scroll-to-top" class="<?php echo esc_attr( 'align--' . $stt_alignment ); ?>">
            <?php if( $icon != 'fas fa-ban' ) : ?>
                <span class="icon-holder"><i class="<?php echo esc_attr( $icon ); ?>"></i></span>
            <?php endif;
                if( $icon_text ) echo '<span class="icon-text">' .esc_html( $icon_text ). '</span>';
            ?>
        </div><!-- #newsmatic-scroll-to-top -->
    <?php
    }
    add_action( 'newsmatic_after_footer_hook', 'newsmatic_scroll_to_top_html' );
 endif;

if( ! function_exists( 'newsmatic_loader_html' ) ) :
	/**
     * Preloader html
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
	function newsmatic_loader_html() {
        if( ! ND\newsmatic_get_customizer_option( 'preloader_option' ) ) return;
	?>
		<div class="newsmatic_loading_box">
			<div class="box">
				<div class="loader-10"></div>
			</div>
		</div>
	<?php
	}
    add_action( 'newsmatic_page_prepend_hook', 'newsmatic_loader_html', 1 );
endif;

 if( ! function_exists( 'newsmatic_custom_header_html' ) ) :
    /**
     * Site custom header html
     * 
     * @package Newsmatic
     * @since 1.0.0
     */
    function newsmatic_custom_header_html() {
        /**
         * Get custom header markup
         * 
         * @since 1.0.0 
         */
        the_custom_header_markup();
    }
    add_action( 'newsmatic_page_prepend_hook', 'newsmatic_custom_header_html', 20 );
 endif;