<?php
/**
 * Newsmatic Theme Customizer
 *
 * @package Newsmatic
 */
use Newsmatic\CustomizerDefault as ND;
/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function newsmatic_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
    $wp_customize->get_section( 'background_image' )->title = esc_html__( 'Background', 'newsmatic' );
    $wp_customize->remove_control( 'background_color' );
    
	require get_template_directory() . '/inc/customizer/custom-controls/section-heading/section-heading.php'; // section heading control
	require get_template_directory() . '/inc/customizer/custom-controls/repeater/repeater.php'; // repeater control
    require get_template_directory() . '/inc/customizer/custom-controls/radio-image/radio-image.php'; // radio image control
	require get_template_directory() . '/inc/customizer/custom-controls/redirect-control/redirect-control.php'; // redirect control
    require get_template_directory() . '/inc/customizer/base.php'; // base class
    // icon text control
    class Newsmatic_WP_Icon_Text_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'icon-text';
        public $icons;
        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['icons'] = $this->icons;
        }
    }

    // color group control
    class Newsmatic_WP_Color_Group_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'color-group';
    }

    // color image group control
    class Newsmatic_WP_Color_Image_Group_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'color-image-group';
    }

    // color picker control
    class Newsmatic_WP_Color_Picker_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'color-picker';
    }

    // preset color picker control
    class Newsmatic_WP_Preset_Color_Picker_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'preset-color-picker';
        public $variable = '--newsmatic-global-preset-color-1';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            if( $this->variable ) {
                $this->json['variable'] = $this->variable;
            }
        }
    }
    
    // preset gradient picker control
    class Newsmatic_WP_Preset_Gradient_Picker_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'preset-gradient-picker';
        public $variable = '--newsmatic-global-preset-gradient-color-1';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            if( $this->variable ) {
                $this->json['variable'] = $this->variable;
            }
        }
    }

    // gradient color picker control
    class Newsmatic_WP_Gradient_Color_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'gradient-color';
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
    }

    // multiselect control
    class Newsmatic_WP_Multiselect_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'multiselect';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // posts multiselect control
    class Newsmatic_WP_Posts_Multiselect_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'posts-multiselect';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // range control
    class Newsmatic_WP_Range_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'range';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['input_attrs'] = $this->input_attrs;
        }
    }

    // responsive range control
    class Newsmatic_WP_Responsive_Range_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'responsive-range';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['input_attrs'] = $this->input_attrs;
        }
    }

    // responsive box control
    class Newsmatic_WP_Responsive_Box_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'responsive-box';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['input_attrs'] = $this->input_attrs;
        }
    }

    // toggle control 
    class Newsmatic_WP_Toggle_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'toggle-button';
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
    }

    // checkbox control 
    class Newsmatic_WP_Checkbox_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'checkbox';
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
    }

    // simple toggle control 
    class Newsmatic_WP_Simple_Toggle_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'simple-toggle';
    }

    // block repeater control 
    class Newsmatic_WP_Block_Repeater_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'block-repeater';
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
    }

    // item sortable control 
    class Newsmatic_WP_Item_Sortable_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'item-sortable';
        public $fields;

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['fields'] = $this->fields;
        }
    }

    // typography control 
    class Newsmatic_WP_Typography_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'typography';
        public $fields;

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['fields'] = $this->fields;
        }
    }

    // box shadow control 
    class Newsmatic_WP_Box_Shadow_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'box-shadow';
    }

    // color group picker control - renders color and hover color control
    class Newsmatic_WP_Color_Group_Picker_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'color-group-picker';
    }

    // border control - renders border property control
    class Newsmatic_WP_Border_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'border';
    }

    // section tab control - renders section tab control
    class Newsmatic_WP_Section_Tab_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'section-tab';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // radio tab control
    class Newsmatic_WP_Radio_Tab_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'radio-tab';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // radio bubble control
    class Newsmatic_WP_Radio_Bubble_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'radio-bubble';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // radio tab control
    class Newsmatic_WP_Responsive_Multiselect_Tab_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'responsive-multiselect-tab';

        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // tab group control
    class Newsmatic_WP_Default_Color_Control extends WP_Customize_Color_Control {
        /**
         * Additional variabled
         * 
         */
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
    }

    // upsell control
    class Newsmatic_WP_Upsell_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'upsell';
        
        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // info box control
    class Newsmatic_WP_Info_Box_Control extends Newsmatic_WP_Base_Control {
        // control type
        public $type = 'info-box';
        
        /**
         * Add custom JSON parameters to use in the JS template.
         *
         * @since  1.0.0
         * @access public
         * @return void
         */
        public function to_json() {
            parent::to_json();
            $this->json['choices'] = $this->choices;
        }
    }

    // register control type
    $wp_customize->register_control_type( 'Newsmatic_WP_Radio_Image_Control' );

    // website layout heading
    $wp_customize->add_setting( 'theme_color_header', array(
        'sanitize_callback' => 'sanitize_text_field'
    ));
    $wp_customize->add_control( 
        new Newsmatic_WP_Section_Heading_Control( $wp_customize, 'theme_color_header', array(
            'label'	      => esc_html__( 'Theme Color', 'newsmatic' ),
            'section'     => 'colors',
            'settings'    => 'theme_color_header'
        ))
    );

    // active menu color
    $wp_customize->add_setting( 'theme_color', array(
        'default'   => ND\newsmatic_get_customizer_default( 'theme_color' ),
        'transport' => 'postMessage',
        'sanitize_callback' => 'newsmatic_sanitize_color_picker_control'
    ));
    $wp_customize->add_control( 
        new Newsmatic_WP_Color_Picker_Control( $wp_customize, 'theme_color', array(
            'label'	      => esc_html__( 'Theme Color', 'newsmatic' ),
            'section'     => 'colors',
            'settings'    => 'theme_color'
        ))
    );
    
    // site background color
    $wp_customize->add_setting( 'site_background_color', array(
        'default'   => ND\newsmatic_get_customizer_default( 'site_background_color' ),
        'transport' => 'postMessage',
        'sanitize_callback' => 'sanitize_text_field'
    ));
    $wp_customize->add_control( 
        new Newsmatic_WP_Color_Group_Control( $wp_customize, 'site_background_color', array(
            'label'	      => esc_html__( 'Background Color', 'newsmatic' ),
            'section'     => 'background_image',
            'settings'    => 'site_background_color',
            'priority'  => 1
        ))
    );
}
add_action( 'customize_register', 'newsmatic_customize_register' );

add_filter( NEWSMATIC_PREFIX . 'unique_identifier', function($identifier) {
    $n_delimeter = '-';
    $n_prefix = 'customize';
    $n_sufix = 'control';
    $identifier_id = [$n_prefix,$identifier,$n_sufix];
    return implode($n_delimeter,$identifier_id);
});

require get_template_directory() . '/inc/customizer/handlers.php'; // customizer handlers
require get_template_directory() . '/inc/customizer/customizer-up.php'; // customizer up
require get_template_directory() . '/inc/customizer/selective-refresh.php'; // selective refresh
require get_template_directory() . '/inc/customizer/sanitize-functions.php'; // sanitize functions