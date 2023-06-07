<?php
/**
 * Custom Controls
 * 
 * @package Newsmatic
 * @since 1.0.0
 */

if( class_exists( 'WP_Customize_Control' ) ) :
    // base control class
    class Newsmatic_WP_Base_Control extends \WP_Customize_Control {
        /**
         * List of controls for this theme.
         * 
         * @since 1.0.0
         */
        protected $type_array =  array();
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
            if( $this->tab && $this->type != 'section-tab' ) {
                $this->json['tab'] = $this->tab;
            }
        }

        /**
         * Generate the unique identifier for the control
         * 
         */
        function identifier_id() {
            return apply_filters( 'newsmatic_unique_identifier', $this->type );
        }
        /**
         * Override control's content.
         *
         */
        public function render_content() {
    ?>
            <div class="<?php echo esc_attr( $this->identifier_id() ); ?>" data-setting="<?php if( isset( $this->setting->id ) ) echo esc_attr( $this->setting->id ); ?>"></div>
    <?php
        }
    }
endif;