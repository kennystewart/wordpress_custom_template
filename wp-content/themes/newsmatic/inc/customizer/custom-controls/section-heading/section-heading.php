<?php
/**
 * Section Heading Control
 * 
 * @package Newsmatic
 * @since 1.0.0
 */

if( class_exists( 'WP_Customize_Control' ) ) :
    class Newsmatic_WP_Section_Heading_Control extends \WP_Customize_Control {
        /**
         * Control type
         * 
         */
        public $type = 'section-heading';
        public $tab = 'general';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            if( $this->tab ) {
                $this->json['tab'] = $this->tab;
            }
        }

        /**
         * Enqueue scripts/styles.
         *
         * @since 3.4.0
         */
        public function enqueue() {
            wp_enqueue_style( 'newsmatic-customizer-section-heading', get_template_directory_uri() . '/inc/customizer/custom-controls/section-heading/section-heading.css', array(), NEWSMATIC_VERSION, 'all' );
        }

        /**
         * Render the control's content.
         *
         */
        public function render_content() {
    ?>
            <div class="customize-section-heading">
                <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
                <?php if( $this->description ) {
                    echo '<p class="customize-control-description">' .wp_kses_post( $this->description ). '</p>';
                } ?>
            </div>
            <?php
        }
    }
endif;