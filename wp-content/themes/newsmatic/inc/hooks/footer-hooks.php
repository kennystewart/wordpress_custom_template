<?php
/**
 * Footer hooks and functions
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
use Newsmatic\CustomizerDefault as ND;
if( ! function_exists( 'newsmatic_footer_widgets_area_part' ) ) :
   /**
    * Footer widgets area
    * 
    * @since 1.0.0
    */
   function newsmatic_footer_widgets_area_part() {
        $footer_widget_column = ND\newsmatic_get_customizer_option( 'footer_widget_column' );
    ?>
            <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                <?php dynamic_sidebar( 'footer-sidebar--column-1' ); ?>
            </div>
        <?php
            if( $footer_widget_column !== 'column-one' ) {
            ?>
                <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                    <?php dynamic_sidebar( 'footer-sidebar--column-2' ); ?>
                </div>
        <?php
            }

            if( $footer_widget_column === 'column-four' || $footer_widget_column === 'column-three' ) {
            ?>
                <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                    <?php dynamic_sidebar( 'footer-sidebar--column-3' ); ?>
                </div>
        <?php
            }

            if( $footer_widget_column === 'column-four' ) {
                ?>
                    <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                        <?php dynamic_sidebar( 'footer-sidebar--column-4' ); ?>
                    </div>
        <?php
            }
   }
   add_action( 'newsmatic_footer_hook', 'newsmatic_footer_widgets_area_part', 10 );
endif;