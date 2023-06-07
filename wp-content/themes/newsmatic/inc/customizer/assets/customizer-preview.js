/* global wp, jQuery */
/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

 ( function( $ ) {
	const themeContstants = {
		prefix: 'newsmatic_'
	}
	const themeCalls = {
		newsmaticAjaxCall: function( action, id ) {
			$.ajax({
				method: "GET",
				url: newsmaticPreviewObject.ajaxUrl,
				data: ({
					action: action,
					_wpnonce: newsmaticPreviewObject._wpnonce
				}),
				success: function(response) {
					if( response ) {
						if( $( "head #" + id ).length > 0 ) {
							$( "head #" + id ).html( response )
						} else {
							$( "head" ).append( '<style id="' + id + '">' + response + '</style>' )
						}
					}
				}
			})
		},
		newsmaticGenerateStyleTag: function( code, id ) {
			if( code ) {
				if( $( "head #" + id ).length > 0 ) {
					$( "head #" + id ).html( code )
				} else {
					$( "head" ).append( '<style id="' + id + '">' + code + '</style>' )
				}
			}
		},
		newsmaticGenerateLinkTag: function( action, id ) {
			$.ajax({
				method: "GET",
				url: newsmaticPreviewObject.ajaxUrl,
				data: ({
					action: action,
					_wpnonce: newsmaticPreviewObject._wpnonce
				}),
				success: function(response) {
					if( response ) {
						if( $( "head #" + id ).length > 0 ) {
							$( "head #" + id ).attr( "href", response )
						} else {
							$( "head" ).append( '<link rel="stylesheet" id="' + id + '" href="' + response + '"></link>' )
						}
					}
				}
			})
		}
	}

	// site block border top
	wp.customize( 'website_block_border_top_option', function( value ) {
		value.bind( function(to) {
			if( to ) {
				$( "body" ).removeClass( "newsmatic_site_block_border_top" )
				$( "body" ).addClass( "newsmatic_site_block_border_top" )
			} else {
				$( "body" ).removeClass( "newsmatic_site_block_border_top" )
			}
		});
	});

	// post title hover class
	wp.customize( 'post_title_hover_effects', function( value ) {
		value.bind( function(to) {
				$( "body" ).removeClass( "newsmatic-title-none newsmatic-title-one newsmatic-title-two newsmatic-title-three newsmatic-title-four newsmatic-title-five" )
				$( "body" ).addClass( "newsmatic-title-" + to )
		});
	});

	// image hover class
	wp.customize( 'site_image_hover_effects', function( value ) {
		value.bind( function(to) {
				$( "body" ).removeClass( "newsmatic-image-hover--effect-none newsmatic-image-hover--effect-one newsmatic-image-hover--effect-two newsmatic-image-hover--effect-three newsmatic-image-hover--effect-four newsmatic-image-hover--effect-five" )
				$( "body" ).addClass( "newsmatic-image-hover--effect-" + to )
		});
	});

	// header elements order class
	wp.customize( 'main_header_elements_order', function( value ) {
		value.bind( function(to) {
				$( ".main-header" ).removeClass( "order--social-logo-buttons order--buttons-logo-social" )
				$( ".main-header" ).addClass( "order--" + to )
		});
	});

	// site block border top changes
	wp.customize( 'website_block_border_top_color', function( value ) {
		value.bind( function( to ) {
			ajaxFunctions.blockBorderStyles()
		});
	});

	// theme color bind changes
	wp.customize( 'theme_color', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-color-style', '--theme-color-red')
		});
	});

	// preset 1 bind changes
	wp.customize( 'preset_color_1', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-color-1-style', '--newsmatic-global-preset-color-1')
		});
	});

	// preset 2 bind changes
	wp.customize( 'preset_color_2', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-color-2-style', '--newsmatic-global-preset-color-2')
		});
	});

	// preset 3 bind changes
	wp.customize( 'preset_color_3', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-color-3-style', '--newsmatic-global-preset-color-3')
		});
	});

	// preset 4 bind changes
	wp.customize( 'preset_color_4', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-color-4-style', '--newsmatic-global-preset-color-4')
		});
	});

	// preset 5 bind changes
	wp.customize( 'preset_color_5', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-color-5-style', '--newsmatic-global-preset-color-5')
		});
	});

	// preset 6 bind changes
	wp.customize( 'preset_color_6', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-color-6-style', '--newsmatic-global-preset-color-6')
		});
	});

	// preset gradient 1 bind changes
	wp.customize( 'preset_gradient_1', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-gradient-color-1-style', '--newsmatic-global-preset-gradient-color-1')
		});
	});

	// preset gradient 2 bind changes
	wp.customize( 'preset_gradient_2', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-gradient-color-2-style', '--newsmatic-global-preset-gradient-color-2')
		});
	});

	// preset gradient 3 bind changes
	wp.customize( 'preset_gradient_3', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-gradient-color-3-style', '--newsmatic-global-preset-gradient-color-3')
		});
	});

	// preset gradient 4 bind changes
	wp.customize( 'preset_gradient_4', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-gradient-color-4-style', '--newsmatic-global-preset-gradient-color-4')
		});
	});

	// preset gradient 5 bind changes
	wp.customize( 'preset_gradient_5', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-gradient-color-5-style', '--newsmatic-global-preset-gradient-color-5')
		});
	});

	// preset gradient 6 bind changes
	wp.customize( 'preset_gradient_6', function( value ) {
		value.bind( function( to ) {
			helperFunctions.generateStyle(to, 'theme-preset-gradient-color-6-style', '--newsmatic-global-preset-gradient-color-6')
		});
	});

	// top header styles
	wp.customize( 'top_header_background_color_group', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.topHeaderStyles()
		});
	});

	// header custom button styles
	wp.customize( 'header_custom_button_color_group', function( value ) {
		value.bind( function(to) {
			themeCalls.newsmaticGenerateStyleTag( '.header-custom-button .ticker_label_title_string, .header-custom-button .icon { color: ' + helperFunctions.getFormatedColor(to.color) + '; } .header-custom-button:hover .ticker_label_title_string, .header-custom-button:hover .icon { color: ' + helperFunctions.getFormatedColor(to.hover) +  '; }', 'header-custom-button-preview-style')
		});
	});
	wp.customize( 'header_custom_button_background_color_group', function( value ) {
		value.bind( function(to) {
			var parsedTo = JSON.parse(to)
			if( parsedTo[parsedTo.type] != null ) themeCalls.newsmaticGenerateStyleTag( '.newsmatic_font_typography .header-custom-button { background: ' + helperFunctions.getFormatedColor(parsedTo[parsedTo.type]) + '; }', 'header-custom-button-background-preview-style')
		});
	});
	wp.customize( 'header_custom_button_background_hover_color_group', function( value ) {
		value.bind( function(to) {
			var parsedTo = JSON.parse(to)
			if( parsedTo[parsedTo.type] != null ) themeCalls.newsmaticGenerateStyleTag( '.newsmatic_font_typography .header-custom-button:hover { background: ' + helperFunctions.getFormatedColor(parsedTo[parsedTo.type]) + '; }', 'header-custom-button-background-hover-preview-style')
		});
	});

	// header styles
	wp.customize( 'header_sidebar_toggle_color', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.headerStyles()
		});
	});
	wp.customize( 'header_search_icon_color', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.headerStyles()
		});
	});
	wp.customize( 'header_vertical_padding', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.headerStyles()
		});
	});
	wp.customize( 'header_background_color_group', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.headerStyles()
		});
	});

	//  header menu styles
	wp.customize( 'header_menu_color', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.headerMenuStyles()
		});
	});
	wp.customize( 'header_menu_background_color_group', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.headerMenuStyles()
		});
	});

	// scroll to top butto styles 
	wp.customize( 'stt_responsive_option', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.sttButtonStyles()
		});
	});
	wp.customize( 'stt_color_group', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.sttButtonStyles()
		});
	});
	wp.customize( 'stt_background_color_group', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.sttButtonStyles()
		});
	});

	// header border
	wp.customize( 'header_menu_top_border', function( value ) {
		value.bind( function(to) {
			ajaxFunctions.headerBorderStyles()
		});
	});

	// header menu hover effect 
	wp.customize( 'header_menu_hover_effect', function( value ) {
		value.bind( function(to) {
			$( "#site-navigation" ).removeClass( "hover-effect--one hover-effect--none" )
			$( "#site-navigation" ).addClass( "hover-effect--" + to )
		});
	});

	// scroll to top align
	wp.customize( 'stt_alignment', function( value ) {
		value.bind( function(to) {
			$( "#newsmatic-scroll-to-top" ).removeClass( "align--left align--center align--right" )
			$( "#newsmatic-scroll-to-top" ).addClass( "align--" + to )
		});
	});

	// logo width
	wp.customize( 'newsmatic_site_logo_width', function( value ) {
		value.bind( function( to ) {
			ajaxFunctions.siteLogoStyles()
		});
	});

	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	});
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	});
	// blog description
	wp.customize( 'blogdescription_option', function( value ) {
		value.bind(function(to) {
			if( to ) {
				$( '.site-description' ).css( {
					clip: 'auto',
					position: 'relative',
				} );
			} else {
				$( '.site-description' ).css( {
					clip: 'rect(1px, 1px, 1px, 1px)',
					position: 'absolute',
				} );
			}
		})
	});

	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title' ).css( {
					clip: 'rect(1px, 1px, 1px, 1px)',
					position: 'absolute',
				} );
			} else {
				$( '.site-title' ).css( {
					clip: 'auto',
					position: 'relative',
				} );
				$( '.site-title a' ).css( {
					color: to,
				} );
			}
		} );
	});

	// site description color
	wp.customize( 'site_description_color', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).css( {
				color: to,
			});
		} );
	});

	// site title typo
	wp.customize( 'site_title_typo', function( value ) {
		value.bind( function( to ) {
			ajaxFunctions.typoFontsEnqueue()
			ajaxFunctions.siteTitleTypo()
		})
	})
	
	// bottom footer menu option
	wp.customize( 'bottom_footer_menu_option', function( value ) {
		value.bind( function( to ) {
			if( to ) {
				$( '.bottom-footer .bottom-menu' ).show()
			} else {
				$( '.bottom-footer .bottom-menu' ).hide()
			}
		});
	});

	// single post related posts title
	wp.customize( 'single_post_related_posts_title', function( value ) {
		value.bind( function( to ) {
			$( '.single-related-posts-section .newsmatic-block-title span' ).text( to );
		} );
	});

	// footer styles
	wp.customize( 'footer_top_border', function( value ) {
		value.bind( function( to ) {
			ajaxFunctions.footerStyles()
		});
	});

	// check if string is variable and formats 
	function newsmatic_get_color_format(color) {
		if( color.indexOf( '--newsmatic-global-preset' ) >= 0 ) {
			return( 'var( ' + color + ' )' );
		} else {
			return color;
		}
	}

	// constants
	const ajaxFunctions = {
		typoFontsEnqueue: function() {
			var action = themeContstants.prefix + "typography_fonts_url",id ="newsmatic-customizer-typo-fonts-css"
			themeCalls.newsmaticGenerateLinkTag( action, id )
		},
		blockBorderStyles : function() {
			var action = themeContstants.prefix + "customizer_site_block_border_top",id ="newsmatic-site-block-border-top-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		sttButtonStyles : function() {
			var action = themeContstants.prefix + "stt_buttons__styles",id ="newsmatic-site-stt-button-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		siteLogoStyles : function() {
			var action = themeContstants.prefix + "site_logo_styles",id ="newsmatic-site-logo-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		siteTitleTypo : function() {
			var action = themeContstants.prefix + "site_title_typo",id ="newsmatic-site-title-typo"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		topHeaderStyles : function() {
			var action = themeContstants.prefix + "top_header_styles",id ="newsmatic-top-header-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		headerStyles : function() {
			var action = themeContstants.prefix + "header_styles",id ="newsmatic-header-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		headerMenuStyles : function() {
			var action = themeContstants.prefix + "header_menu_styles",id ="newsmatic-header-menu-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		headerBorderStyles : function() {
			var action = themeContstants.prefix + "header_border_styles",id ="newsmatic-header-border-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		},
		footerStyles : function() {
			var action = themeContstants.prefix + "footer__styles",id ="newsmatic-footer-styles"
			themeCalls.newsmaticAjaxCall( action, id )
		}
	}

	// constants
	const helperFunctions = {
		generateStyle: function(color, id, variable) {
			if(color) {
				if( id == 'theme-color-style' ) {
					var styleText = 'body.newsmatic_main_body, body.newsmatic_dark_mode { ' + variable + ': ' + helperFunctions.getFormatedColor(color) + '}';
				} else {
					var styleText = 'body.newsmatic_main_body { ' + variable + ': ' + helperFunctions.getFormatedColor(color) + '}';
				}
				if( $( "head #" + id ).length > 0 ) {
					$( "head #" + id).text( styleText )
				} else {
					$( "head" ).append( '<style id="' + id + '">' + styleText + '</style>' )
				}
			}
		},
		getFormatedColor: function(color) {
			if( color == null ) return
			if( color.includes('preset') ) {
				return 'var(' + color + ')'
			} else {
				return color
			}
		}
	}
}( jQuery ) );