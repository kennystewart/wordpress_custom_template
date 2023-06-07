<?php
/**
 * Includes all the frontpage sections html functions
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
use Newsmatic\CustomizerDefault as ND;

if( ! function_exists( 'newsmatic_main_banner_part' ) ) :
    /**
     * Main Banner element
     * 
     * @since 1.0.0
     */
     function newsmatic_main_banner_part() {
        $main_banner_option = ND\newsmatic_get_customizer_option( 'main_banner_option' );
        if( ! $main_banner_option || is_paged() || newsmatic_is_paged_filtered() ) return;
        $main_banner_post_filter = ND\newsmatic_get_customizer_option( 'main_banner_post_filter' );
        $main_banner_slider_order_by = ND\newsmatic_get_customizer_option( 'main_banner_slider_order_by' );
        $orderArray = explode( '-', $main_banner_slider_order_by );
        $main_banner_slider_categories = json_decode( ND\newsmatic_get_customizer_option( 'main_banner_slider_categories' ) );
        $main_banner_args = array(
            'slider_args'  => array(
                'order' => esc_html( $orderArray[1] ),
                'orderby' => esc_html( $orderArray[0] ),
                'ignore_sticky_posts'   => true
            )
        );
        if( $main_banner_post_filter == 'category' ) {
            $main_banner_args['slider_args']['posts_per_page']= 4;
            if( ND\newsmatic_get_customizer_option( 'main_banner_date_filter' ) != 'all' ) $main_banner_args['slider_args']['date_query'] = newsmatic_get_date_format_array_args(ND\newsmatic_get_customizer_option( 'main_banner_date_filter' ));
            if( $main_banner_slider_categories ) $main_banner_args['slider_args']['category_name'] = newsmatic_get_categories_for_args($main_banner_slider_categories);
        } else if( $main_banner_post_filter == 'title' ) {
            $main_banner_posts = json_decode(ND\newsmatic_get_customizer_option( 'main_banner_posts' ));
            if( $main_banner_posts ) $main_banner_args['slider_args']['post_name__in'] = newsmatic_get_post_slugs_for_args($main_banner_posts);
        }
        $banner_section_order = ND\newsmatic_get_customizer_option( 'banner_section_order' );
        ?>
            <section id="main-banner-section" class="newsmatic-section banner-layout--four <?php echo esc_attr( implode( '--', array( $banner_section_order[0]['value'], $banner_section_order[1]['value'] ) ) ); ?>">
                <div class="newsmatic-container">
                    <div class="row">
                        <?php get_template_part( 'template-parts/main-banner/template', 'four', $main_banner_args ); ?>
                    </div>
                </div>
            </section>
        <?php
     }
endif;
add_action( 'newsmatic_main_banner_hook', 'newsmatic_main_banner_part', 10 );

if( ! function_exists( 'newsmatic_full_width_blocks_part' ) ) :
    /**
     * Full Width Blocks element
     * 
     * @since 1.0.0
     */
     function newsmatic_full_width_blocks_part() {
        $full_width_blocks = ND\newsmatic_get_customizer_option( 'full_width_blocks' );
        if( empty( $full_width_blocks ) || is_paged() || newsmatic_is_paged_filtered() ) return;
        $full_width_blocks = json_decode( $full_width_blocks );
        if( ! in_array( true, array_column( $full_width_blocks, 'option' ) ) ) {
            return;
        }
        ?>
            <section id="full-width-section" class="newsmatic-section full-width-section">
                <div class="newsmatic-container">
                    <div class="row">
                        <?php
                            foreach( $full_width_blocks as $block ) :
                                if( $block->option ) :
                                    $type = $block->type;
                                    switch($type) {
                                        case 'ad-block' : newsmatic_advertisement_block_html( $block, true );
                                                        break;
                                        default: $layout = $block->layout;
                                                $order = $block->query->order;
                                                $postCategories = $block->query->categories;
                                                $customexclude_ids = $block->query->ids;
                                                $orderArray = explode( '-', $order );
                                                $block_args = array(
                                                    'post_args' => array(
                                                        'post_type' => 'post',
                                                        'order' => esc_html( $orderArray[1] ),
                                                        'orderby' => esc_html( $orderArray[0] ),
                                                        'ignore_sticky_posts'   => true
                                                    ),
                                                    'options'    => $block
                                                );
                                                if( $block->query->postFilter == 'category' ) {
                                                    $block_args['post_args']['posts_per_page'] = absint( $block->query->count );
                                                    if( $customexclude_ids ) $block_args['post_args']['post__not_in'] = $customexclude_ids;
                                                    if( $postCategories ) $block_args['post_args']['category_name'] = newsmatic_get_categories_for_args($postCategories);
                                                    if( $block->query->dateFilter != 'all' ) $block_args['post_args']['date_query'] = newsmatic_get_date_format_array_args($block->query->dateFilter);
                                                } else if( $block->query->postFilter == 'title' ) {
                                                    if( $block->query->posts ) $block_args['post_args']['post_name__in'] = newsmatic_get_post_slugs_for_args($block->query->posts);
                                                }
                                                // get template file w.r.t par
                                                get_template_part( 'template-parts/' .esc_html( $type ). '/template', esc_html( $layout ), $block_args );
                                    }
                                endif;
                            endforeach;
                        ?>
                    </div>
                </div>
            </section>
        <?php
     }
     add_action( 'newsmatic_full_width_blocks_hook', 'newsmatic_full_width_blocks_part' );
endif;

if( ! function_exists( 'newsmatic_leftc_rights_blocks_part' ) ) :
    /**
     * Left Content Right Sidebar Blocks element
     * 
     * @since 1.0.0
     */
     function newsmatic_leftc_rights_blocks_part() {
        $leftc_rights_blocks = ND\newsmatic_get_customizer_option( 'leftc_rights_blocks' );
        if( empty( $leftc_rights_blocks ) || is_paged() || newsmatic_is_paged_filtered() ) return;
        $leftc_rights_blocks = json_decode( $leftc_rights_blocks );
        if( ! in_array( true, array_column( $leftc_rights_blocks, 'option' ) ) ) {
            return;
        }
        ?>
            <section id="leftc-rights-section" class="newsmatic-section leftc-rights-section">
                <div class="newsmatic-container">
                    <div class="row">
                        <div class="primary-content">
                            <?php
                                foreach( $leftc_rights_blocks as $block ) :
                                    if( $block->option ) :
                                        $type = $block->type;
                                        switch($type) {
                                            case 'ad-block' : newsmatic_advertisement_block_html( $block, true );
                                                            break;
                                            default: $layout = $block->layout;
                                                    $order = $block->query->order;
                                                    $postCategories = $block->query->categories;
                                                    $customexclude_ids = $block->query->ids;
                                                    $orderArray = explode( '-', $order );
                                                    $block_args = array(
                                                        'post_args' => array(
                                                            'post_type' => 'post',
                                                            'order' => esc_html( $orderArray[1] ),
                                                            'orderby' => esc_html( $orderArray[0] ),
                                                            'ignore_sticky_posts'   => true
                                                        ),
                                                        'options'    => $block
                                                    );
                                                    if( $block->query->postFilter == 'category' ) {
                                                        $block_args['post_args']['posts_per_page'] = absint( $block->query->count );
                                                        if( $customexclude_ids ) $block_args['post_args']['post__not_in'] = $customexclude_ids;
                                                        if( $postCategories ) $block_args['post_args']['category_name'] = newsmatic_get_categories_for_args($postCategories);
                                                        if( $block->query->dateFilter != 'all' ) $block_args['post_args']['date_query'] = newsmatic_get_date_format_array_args($block->query->dateFilter);
                                                    } else if( $block->query->postFilter == 'title' ) {
                                                        if( $block->query->posts ) $block_args['post_args']['post_name__in'] = newsmatic_get_post_slugs_for_args($block->query->posts);
                                                    }
                                                    // get template file w.r.t par
                                                    get_template_part( 'template-parts/' .esc_html( $type ). '/template', esc_html( $layout ), $block_args );
                                        }
                                    endif;
                                endforeach;
                            ?>
                        </div>
                        <div class="secondary-sidebar">
                            <?php dynamic_sidebar( 'front-right-sidebar' ); ?>
                        </div>
                    </div>
                </div>
            </section>
        <?php
     }
     add_action( 'newsmatic_leftc_rights_blocks_hook', 'newsmatic_leftc_rights_blocks_part', 10 );
endif;

if( ! function_exists( 'newsmatic_lefts_rightc_blocks_part' ) ) :
    /**
     * Left Sidebar Right Content Blocks element
     * 
     * @since 1.0.0
     */
     function newsmatic_lefts_rightc_blocks_part() {
        $lefts_rightc_blocks = ND\newsmatic_get_customizer_option( 'lefts_rightc_blocks' );
        if( empty( $lefts_rightc_blocks )|| is_paged() || newsmatic_is_paged_filtered() ) return;
        $lefts_rightc_blocks = json_decode( $lefts_rightc_blocks );
        if( ! in_array( true, array_column( $lefts_rightc_blocks, 'option' ) ) ) {
            return;
        }
        ?>
            <section id="lefts-rightc-section" class="newsmatic-section lefts-rightc-section">
                <div class="newsmatic-container">
                    <div class="row">
                        <div class="secondary-sidebar">
                            <?php dynamic_sidebar( 'front-left-sidebar' ); ?>
                        </div>
                        <div class="primary-content">
                            <?php
                                foreach( $lefts_rightc_blocks as $block ) :
                                    if( $block->option ) :
                                        $type = $block->type;
                                        switch($type) {
                                            case 'ad-block' : newsmatic_advertisement_block_html( $block, true );
                                                            break;
                                            default: $layout = $block->layout;
                                                    $order = $block->query->order;
                                                    $postCategories = $block->query->categories;
                                                    $customexclude_ids = $block->query->ids;
                                                    $orderArray = explode( '-', $order );
                                                    $block_args = array(
                                                        'post_args' => array(
                                                            'post_type' => 'post',
                                                            'order' => esc_html( $orderArray[1] ),
                                                            'orderby' => esc_html( $orderArray[0] ),
                                                            'ignore_sticky_posts'   => true
                                                        ),
                                                        'options'    => $block
                                                    );
                                                    if( $block->query->postFilter == 'category' ) {
                                                        $block_args['post_args']['posts_per_page'] = absint( $block->query->count );
                                                        if( $customexclude_ids ) $block_args['post_args']['post__not_in'] = $customexclude_ids;
                                                        if( $postCategories ) $block_args['post_args']['category_name'] = newsmatic_get_categories_for_args($postCategories);
                                                        if( $block->query->dateFilter != 'all' ) $block_args['post_args']['date_query'] = newsmatic_get_date_format_array_args($block->query->dateFilter);
                                                    } else if( $block->query->postFilter == 'title' ) {
                                                        if( $block->query->posts ) $block_args['post_args']['post_name__in'] = newsmatic_get_post_slugs_for_args($block->query->posts);
                                                    }
                                                    // get template file w.r.t par
                                                    get_template_part( 'template-parts/' .esc_html( $type ). '/template', esc_html( $layout ), $block_args );
                                        }
                                    endif;
                                endforeach;
                            ?>
                        </div>
                    </div>
                </div>
            </section>
        <?php
     }
     add_action( 'newsmatic_lefts_rightc_blocks_hook', 'newsmatic_lefts_rightc_blocks_part', 10 );
endif;

if( ! function_exists( 'newsmatic_bottom_full_width_blocks_part' ) ) :
    /**
     * Bottom Full Width Blocks element
     * 
     * @since 1.0.0
     */
     function newsmatic_bottom_full_width_blocks_part() {
        $bottom_full_width_blocks = ND\newsmatic_get_customizer_option( 'bottom_full_width_blocks' );
        if( empty( $bottom_full_width_blocks )|| is_paged() || newsmatic_is_paged_filtered() ) return;
        $bottom_full_width_blocks = json_decode( $bottom_full_width_blocks );
        if( ! in_array( true, array_column( $bottom_full_width_blocks, 'option' ) ) ) {
            return;
        }
        ?>
            <section id="bottom-full-width-section" class="newsmatic-section bottom-full-width-section">
                <div class="newsmatic-container">
                    <div class="row">
                        <?php
                            foreach( $bottom_full_width_blocks as $block ) :
                                if( $block->option ) :
                                    $type = $block->type;
                                    switch($type) {
                                        case 'ad-block' : newsmatic_advertisement_block_html( $block, true );
                                                        break;
                                        default: $layout = $block->layout;
                                                $order = $block->query->order;
                                                $postCategories = $block->query->categories;
                                                $customexclude_ids = $block->query->ids;
                                                $orderArray = explode( '-', $order );
                                                $block_args = array(
                                                    'post_args' => array(
                                                        'post_type' => 'post',
                                                        'order' => esc_html( $orderArray[1] ),
                                                        'orderby' => esc_html( $orderArray[0] ),
                                                        'ignore_sticky_posts'   => true
                                                    ),
                                                    'options'    => $block
                                                );
                                                if( $block->query->postFilter == 'category' ) {
                                                    $block_args['post_args']['posts_per_page'] = absint( $block->query->count );
                                                    if( $customexclude_ids ) $block_args['post_args']['post__not_in'] = $customexclude_ids;
                                                    if( $postCategories ) $block_args['post_args']['category_name'] = newsmatic_get_categories_for_args($postCategories);
                                                    if( $block->query->dateFilter != 'all' ) $block_args['post_args']['date_query'] = newsmatic_get_date_format_array_args($block->query->dateFilter);
                                                } else if( $block->query->postFilter == 'title' ) {
                                                    if( $block->query->posts ) $block_args['post_args']['post_name__in'] = newsmatic_get_post_slugs_for_args($block->query->posts);
                                                }
                                                // get template file w.r.t par
                                                get_template_part( 'template-parts/' .esc_html( $type ). '/template', esc_html( $layout ), $block_args );
                                    }
                                endif;
                            endforeach;
                        ?>
                    </div>
                </div>
            </section>
        <?php
     }
     add_action( 'newsmatic_bottom_full_width_blocks_hook', 'newsmatic_bottom_full_width_blocks_part', 10 );
endif;