<?php
/**
 * @package Islamic Center Mosque 
 * Setup the WordPress core custom header feature.
 *
 * @uses islamic_center_mosque_header_style()
*/
function islamic_center_mosque_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'islamic_center_mosque_custom_header_args', array(
		'header-text' 			 =>	false,
		'width'                  => 1200,
		'height'                 => 70,
		'flex-width'    		 => true,
		'flex-height'    		 => true,
		'wp-head-callback'       => 'islamic_center_mosque_header_style',
	) ) );
}
add_action( 'after_setup_theme', 'islamic_center_mosque_custom_header_setup' );

if ( ! function_exists( 'islamic_center_mosque_header_style' ) ) :
/**
 * Styles the header image and text displayed on the blog
 *
 * @see islamic_center_mosque_custom_header_setup().
 */
add_action( 'wp_enqueue_scripts', 'islamic_center_mosque_header_style' );

function islamic_center_mosque_header_style() {
	if ( get_header_image() ) :
	$custom_css = "
        .middle-header{
			background-image:url('".esc_url(get_header_image())."');
			background-position: center top;
		    background-size: 100% 100%;
		}";
	   	wp_add_inline_style( 'islamic-center-mosque-basic-style', $custom_css );
	endif;
}
endif;