<?php


namespace ColibriWP\Theme;


use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Core\Tree;
use ColibriWP\Theme\Core\Utils;


class View {


    const CONTENT_ELEMENT = 'content';
    const SECTION_ELEMENT = 'section';
    const ROW_ELEMENT = 'row';
    const COLUMN_ELEMENT = 'column';

    /**
     * @param       $category
     * @param       $slug
     * @param array $data
     */

    public static function partial( $category, $slug, $data = array() ) {

        $category = Utils::camel2dashed( $category );
        $slug     = Utils::camel2dashed( $slug );


        static::prinDebugHTMLComment( 'Start Partial', "/{$category}/{$slug}" );
        static::make( "template-parts/{$category}/{$slug}", $data );
        static::prinDebugHTMLComment( 'Start Partial', "/{$category}/{$slug}" );

    }

    public static function prinDebugHTMLComment( $message = '', $details = '' ) {

        if ( defined( 'COLIBRI_THEME_DEBUG' ) && COLIBRI_THEME_DEBUG && ! is_customize_preview() ) {
            $message = $details ? trim( $message ) . " - " : '';
            $content = trim( strtoupper( $message ) . trim( $details ) );
            ?>
            <!--  <?php echo esc_attr( $content ); ?> -->
            <?php
        }
    }

    public static function make( $path, $data = array() ) {
        global $wp_query;

        $wp_query->query_vars['colibri_data'] = new Tree( $data );

        if ( file_exists( $path ) ) {
            load_template( $path );
        } else {
            get_template_part( $path );
        }


        $wp_query->query_vars['colibri_data'] = null;
    }

    public static function getData( $path, $default = null ) {
        global $wp_query;
        $colibri_data = $wp_query->query_vars['colibri_data'];
        if ( $colibri_data ) {
            /** @var Tree $colibri_data */
            return $colibri_data->findAt( $path, $default );
        }

        return $default;
    }

    public static function isFrontPage() {
        return is_front_page();
    }

    public static function printMenu( $attrs, $walker = "" ) {
        $attrs = array_merge( array(
            'id'      => null,
            'classes' => '',
        ), $attrs );

        $theme_location         = $attrs['id'];
        $customClasses          = $attrs['classes'];
        $drop_down_menu_classes = array( 'colibri-menu' );
        $drop_down_menu_classes = array_merge( $drop_down_menu_classes, array( $customClasses ) );


        if ( static::emptyMenu( $theme_location ) ) {
            echo 'No menu items';

            return;
        }

        wp_nav_menu( array(
            'theme_location'  => $theme_location,
            'menu_class'      => esc_attr( implode( " ", $drop_down_menu_classes ) ),
            'container_class' => 'colibri-menu-container',
            'fallback_cb'     => function () use ( $attrs ) {
                static::menuFallback( $attrs );
            },
            'walker'          => $walker,
        ) );
    }

    private static function emptyMenu( $theme_location ) {
        $theme_locations = get_nav_menu_locations();
        $menu_id         = 0;

        if ( array_key_exists( $theme_location, $theme_locations ) ) {
            $menu_id = $theme_locations[ $theme_location ];
        }

        $menu_items = wp_get_nav_menu_items( $menu_id );

        if ( $menu_items && count( $menu_items ) === 0 ) {
            return true;
        }

    }

    public static function menuFallback( $attrs, $walker = '' ) {

        $customClasses          = $attrs['classes'];
        $drop_down_menu_classes = array( 'colibri-menu' );
        $drop_down_menu_classes = array_merge( $drop_down_menu_classes, array( $customClasses ) );

        return wp_page_menu( array(
            "menu_class" => 'colibri-menu-container',
            'before'     => '<ul class="' . esc_attr( implode( " ", $drop_down_menu_classes ) ) . '">',
            'after'      => apply_filters( 'colibriwp_nomenu_after', '' ) . "</ul>",
            'walker'     => $walker,
        ) );
    }


    public static function printContentWrapperAttrs( $classes = array() ) {

        $classes = is_array( $classes ) ? $classes : array( $classes );
        $classes = array_merge( array( 'gridContainer', 'content' ), $classes );

        $classes = Hooks::colibri_apply_filters( 'content_wrapper_class', $classes );
        $classes = array_unique( $classes );

        printf( ' class="%s" ', esc_attr( implode( " ", $classes ) ) );
    }

    public static function printEntryThumb( $classes = "" ) {

        $placeholder_color = "#333";
        ?>
        <a href="<?php the_permalink(); ?>">
            <div class="image-container-frame">
                <?php
                if ( has_post_thumbnail() ) {
                    the_post_thumbnail( 'post-thumbnail', array(
                        "class" => $classes,
                    ) );
                } else {
                    ?>
                    <svg class="colibri-post-list-item-thumb-placeholder <?php echo esc_attr( $classes ); ?>"
                         width="890" height="580"
                         viewBox="0 0 890 580" preserveAspectRatio="none">
                        <rect width="890" height="580"
                              style="fill:<?php echo esc_attr( $placeholder_color ); ?>;"></rect>
                    </svg>
                    <?php
                }
                ?>
            </div>
        </a>
        <?php
    }

    public static function printPagination( $args = array(), $class = 'pagination' ) {
        if ( $GLOBALS['wp_query']->max_num_pages <= 1 ) {
            return;
        }

        $args = wp_parse_args( $args, array(
            'mid_size'           => 2,
            'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'colibri-wp' )
                                    . ' </span>',
            'prev_text'          => __( '<i class="fa fa-angle-left" aria-hidden="true"></i>', 'colibri-wp' ),
            'next_text'          => __( '<i class="fa fa-angle-right" aria-hidden="true"></i>', 'colibri-wp' ),
            'screen_reader_text' => __( 'Posts navigation', 'colibri-wp' ),
        ) );

        $links = paginate_links( $args );

        $next_link = get_previous_posts_link( __( '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            'colibri-wp' ) );
        $prev_link = get_next_posts_link( __( '<i class="fa fa-angle-right" aria-hidden="true"></i>',
            'colibri-wp' ) );

        $template = '<div class="navigation %1$s" role="navigation">' .
                    '  <h2 class="screen-reader-text">%2$s</h2>' .
                    '  <div class="nav-links">' .
                    '    <div class="prev-navigation">%3$s</div>' .
                    '    <div class="numbers-navigation">%4$s</div>' .
                    '    <div class="next-navigation">%5$s</div>' .
                    '  </div>' .
                    '</div>';

        echo sprintf( $template, esc_attr( $class ), $args['screen_reader_text'], $next_link, $links, $prev_link );
    }

    public static function printRowStart( $args ) {

        $args = array_merge( array(
            'inner_class' => array(),
            'outer_class' => array()
        ), $args );

        $outer_classes = array_merge( array(
            "h-row-container"
        ), $args['outer_class'] );

        $inner_classes = array_merge(
            array(
                'h-row'
            ),
            $args['inner_class']
        );
        static::printTwoLevelsDivStart( $outer_classes, $inner_classes );

    }

    private static function printTwoLevelsDivStart( $outer_classes = array(), $inner_classes = array() ) {
        $outer_classes = implode( ' ', $outer_classes );
        $inner_classes = implode( ' ', $inner_classes );


        static::printElementStart( 'div', array( 'class' => $outer_classes ) );
        static::printElementStart( 'div', array( 'class' => $inner_classes ) );
    }

    public static function printElementStart( $tag, $attrs = array() ) {
        $key_value_attrs = array();

        foreach ( $attrs as $key => $value ) {
            if ( is_array( $value ) ) {
                $value = implode( " ", array_unique( $value ) );
            }

            $value             = esc_attr( $value );
            $key               = sanitize_key( $key );
            $key_value_attrs[] = "{$key}='{$value}'";
        }

        $attrs_string = implode( " ", $key_value_attrs );

        echo "<{$tag} {$attrs_string}>";

    }

    public static function printRowEnd() {
        static::printTwoLevelsDivEnd();
    }

    private static function printTwoLevelsDivEnd() {
        self::printElementEnd( 'div' );
        self::printElementEnd( 'div' );
    }

    public static function printElementEnd( $tag ) {
        echo "</{$tag}>";

    }

    public static function printSectionStart( $args = array() ) {
        $args = array_merge( array(
            'inner_class' => array(),
            'outer_class' => array()
        ), $args );


        $outer_classes = array_merge( array(
            'd-flex',
            'h-section',
            'h-section-global-spacing',
            'position-relative',
        ), (array) $args['outer_class'] );

        $inner_classes = array_merge( array(
            'h-section-grid-container',
        ), (array) $args['inner_class'] );

        static::printTwoLevelsDivStart( $outer_classes, $inner_classes );
    }

    public static function printSectionEnd() {
        static::printTwoLevelsDivEnd();
    }

    public static function printContentStart( $args = array() ) {
        $class         = Utils::pathGet( $args, 'class', array() );
        $class         = array_merge( array( 'content', ' position-relative' ), $class );
        $args['class'] = $class;
        $args['id']    = Utils::pathGet( $args, 'id', 'content' );

        self::printElementStart( 'div', $args );

    }

    public static function printContentEnd() {
        static::printElementEnd( 'div' );
    }


    public static function printColumnStart( $args = array() ) {
        $class         = Utils::pathGet( $args, 'class', array() );
        $class         = array_merge( array( 'h-col' ), $class );
        $args['class'] = $class;
        self::printElementStart( 'div', $args );
    }

    public static function printColumnEnd() {
        static::printElementEnd( 'div' );
    }

    /**
     * @param string $wrapper
     * @param callable $to_print
     * @param array $args
     */
    public static function printIn( $wrapper, $to_print, $args = array() ) {
        $wrapper              = ucfirst( strtolower( $wrapper ) );
        $wrapperFunctionStart = "print{$wrapper}Start";
        $wrapperFunctionEnd   = "print{$wrapper}End";
        if ( method_exists( View::class, "{$wrapperFunctionStart}" ) ) {
            if ( method_exists( View::class, "{$wrapperFunctionEnd}" ) ) {
                echo "<!-- {$wrapper}:start -->\n";
                call_user_func( array( View::class, $wrapperFunctionStart ), $args );
                call_user_func( $to_print );
                call_user_func( array( View::class, $wrapperFunctionEnd ), $args );
                echo "\n<!-- {$wrapper}:end -->";
            }
        }
    }

    public static function printSkipToContent() {
        ?>
        <script>
            /(trident|msie)/i.test(navigator.userAgent) && document.getElementById && window.addEventListener && window.addEventListener("hashchange", function () {
                var t, e = location.hash.substring(1);
                /^[A-z0-9_-]+$/.test(e) && (t = document.getElementById(e)) && (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) || (t.tabIndex = -1), t.focus())
            }, !1);
        </script>
        <a class="skip-link screen-reader-text" href="#content">
            <?php Translations::escHtmlE( 'skip_to_content' ) ?>
        </a>
        <?php
    }
}
