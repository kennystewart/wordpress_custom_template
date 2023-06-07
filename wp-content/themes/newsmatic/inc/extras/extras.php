<?php
/**
 * Handles the functionality required for the theme
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
use Newsmatic\CustomizerDefault as ND;

if ( ! function_exists( 'newsmatic_typography_value' ) ) :
	/**
	 * Adds two typography parameter
	 *
	 * @echo html markup attributes
	 */
	function newsmatic_typography_value( $id ) {
		$typo = ND\newsmatic_get_customizer_option( $id );
		$font_family = $typo['font_family']['value'];
		$font_weight = $typo['font_weight']['value'];
		$typo_value = $font_family.":".$font_weight;
		return apply_filters( 'newsmatic_combined_typo', $typo_value ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
	add_filter( 'newsmatic_typo_combine_filter', 'newsmatic_typography_value', 10, 1 );
endif;

if ( ! function_exists( 'newsmatic_schema_body_attributes' ) ) :
	/**
	 * Adds schema tags to the body tag.
	 *
	 * @echo html markup attributes
	 */
	function newsmatic_schema_body_attributes() {
		$site_schema_ready = ND\newsmatic_get_customizer_option( 'site_schema_ready' );
		if( ! $site_schema_ready ) return;
		$is_blog = ( is_home() || is_archive() || is_attachment() || is_tax() || is_single() );
		$itemtype = 'WebPage'; // default itemtype
		$itemtype = ( $is_blog ) ? 'Blog' : $itemtype; // itemtype for blog page
		$itemtype = ( is_search() ) ? 'SearchResultsPage' : $itemtype; // itemtype for earch results page
		$itemtype_final = apply_filters( 'newsmatic_schema_body_attributes_itemtype', $itemtype ); // itemtype
		echo apply_filters( 'newsmatic_schema_body_attributes', "itemtype='https://schema.org/" . esc_attr( $itemtype_final ) . "' itemscope='itemscope'" ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
endif;

if ( ! function_exists( 'newsmatic_schema_article_attributes' ) ) :
	/**
	 * Adds schema tags to the article tag.
	 *
	 * @echo html markup attributes
	 */
	function newsmatic_schema_article_attributes() {
		$site_schema_ready = ND\newsmatic_get_customizer_option( 'site_schema_ready' );
		if( ! $site_schema_ready ) return;
		$itemtype = 'Article'; // default itemtype.
		$itemtype_final = apply_filters( 'newsmatic_schema_article_attributes_itemtype', $itemtype ); // itemtype
		echo apply_filters( 'newsmatic_schema_article_attributes', "itemtype='https://schema.org/" . esc_attr( $itemtype_final ) . "' itemscope='itemscope'" ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
endif;

if ( ! function_exists( 'newsmatic_schema_article_name_attributes' ) ) :
	/**
	 * Adds schema tags to the article name tag.
	 *
	 * @echo html markup attributes
	 */
	function newsmatic_schema_article_name_attributes() {
		$site_schema_ready = ND\newsmatic_get_customizer_option( 'site_schema_ready' );
		if( ! $site_schema_ready ) return;
		$itemprop = 'name'; // default itemprop.
		$itemprop_final = apply_filters( 'newsmatic_schema_article_name_attributes_itemprop', $itemprop ); // itemprop
		return apply_filters( 'newsmatic_schema_article_name_attributes', "itemprop='" . esc_attr( $itemprop_final ) . "'" ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
endif;

if ( ! function_exists( 'newsmatic_schema_article_body_attributes' ) ) :
	/**
	 * Adds schema tags to the article body tag.
	 *
	 * 
	 * @echo html markup attributes
	 */
	function newsmatic_schema_article_body_attributes() {
		$site_schema_ready = ND\newsmatic_get_customizer_option( 'site_schema_ready' );
		if( ! $site_schema_ready ) return;
		$itemprop = 'articleBody'; // default itemprop.
		$itemprop_final = apply_filters( 'newsmatic_schema_article_body_attributes_itemprop', $itemprop ); // itemprop
		echo apply_filters( 'newsmatic_schema_article_body_attributes', "itemprop='" . esc_attr( $itemprop_final ) . "'" ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
endif;

if( ! function_exists( 'newsmatic_compare_wand' ) ) :
	/**
	 * Compares parameter valaues
	 * 
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_compare_wand($params) {
		$returnval = true;
		foreach($params as $val) {
			if( ! $val ) {
				$returnval = false;
				break;
			}
		}
		return $returnval;
	}
endif;

if( ! function_exists( 'newsmatic_function_exists' ) ) :
	/**
	 * Checks exists
	 * 
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_function_exists($function) {
		if( function_exists( $function ) ) return true;
		return;
	}
endif;

if( ! function_exists( 'newsmatic_get_date_format_array_args' ) ) :
	/**
	 * Generate date format array for query arguments
	 * 
	 * @package Newsmatic
	 * @since 1.0.0
	 */
	function newsmatic_get_date_format_array_args($date_key) {
		switch($date_key) {
			case 'today': $todayDate = getdate();
							return array(
								'year'  => $todayDate['year'],
								'month' => $todayDate['mon'],
								'day'   => $todayDate['mday'],
							);
						break;
			case 'this-week': return array(
								'year'  => date( 'Y' ),
								'week'  => date( 'W' )
							);
						break;
			case 'last-seven-days': return array(
							'after'  => '1 week ago'
						);
					break;
			case 'this-month': $todayDate = getdate();
							return array(
								'month' => $todayDate['mon']
							);
						break;
			case 'last-month': 
						$thisdate = getdate();
						if ($thisdate['mon'] != 1) :
							$lastmonth = $thisdate['mon'] - 1;
						else : 
							$lastmonth = 12;
						endif; 
						$thisyear = date('Y');
						if ($lastmonth != 12) :
							$thisyear = date('Y');
						else: 
							$thisyear = date('Y') - 1;
						endif;
							return array(
								'year'  => $thisyear,
								'month'  => $lastmonth
							);
						break;
			case 'last-week':
						$thisweek = date('W');
						if ($thisweek != 1) :
							$lastweek = $thisweek - 1;
						else : 
							$lastweek = 52;
						endif; 
						$thisyear = date('Y');
						if ($lastweek != 52) :
							$thisyear = date('Y');
						else: 
							$thisyear = date('Y') -1; 
						endif;
						return array(
							'year'  => $thisyear,
							'week'  => $lastweek
						);
				break;
			default: return [];
		}
	}
endif;

if( ! function_exists( 'newsmatic_is_elementor_activated' ) ) :
	/**
	 * check if elementor is active
	 * 
	 * @package Newsmatic
	 * @since  1.0.0
	 */
	function newsmatic_is_elementor_activated( $id ) {
		if( ! class_exists( '\Elementor\Plugin' ) ) {
			return;
		}

		if ( version_compare( ELEMENTOR_VERSION, '1.5.0', '<' ) ) {
			return ( 'builder' === Elementor\Plugin::$instance->db->get_edit_mode( $id ) );
		} else {
			$document = Elementor\Plugin::$instance->documents->get( $id );
			if ( $document ) {
				return $document->is_built_with_elementor();
			} else {
				return false;
			}
		}
	}
endif;

if( ! function_exists( 'newsmatic_numbering_with_pad_format' ) ) :
	/**
	 * convert single digit number to double digit
	 * 
	 * @package Newsmatic
	 * @since  1.0.0
	 */
	function newsmatic_numbering_with_pad_format( $number ) {
		if( $number > 9 ) return apply_filters( 'newsmatic_numbering_with_pad_format_filter', $number );
		$number = str_pad($number, 2, '0', STR_PAD_LEFT);
		return apply_filters( 'newsmatic_numbering_with_pad_format_filter', $number );
	}
endif;

if( !function_exists( 'newsmatic_get_customizer_sidebar_array' ) ) :
    /**
     * Gets customizer "sidebar layouts" array
     * 
     * @package Newsmatic
     * @since 1.0.0
     * 
     */
    function newsmatic_get_customizer_sidebar_array() {
        return array(
            'no-sidebar' => array(
                'label' => esc_html__( 'No Sidebar', 'newsmatic' ),
                'url'   => '%s/assets/images/customizer/no_sidebar.jpg'
            ),
            'left-sidebar' => array(
                'label' => esc_html__( 'Left Sidebar', 'newsmatic' ),
                'url'   => '%s/assets/images/customizer/left_sidebar.jpg'
            ),
            'right-sidebar' => array(
                'label' => esc_html__( 'Right Sidebar', 'newsmatic' ),
                'url'   => '%s/assets/images/customizer/right_sidebar.jpg'
            ),
            'both-sidebar' => array(
                'label' => esc_html__( 'Both Sidebar', 'newsmatic' ),
                'url'   => '%s/assets/images/customizer/both_sidebar.jpg'
            )
        );
    }
 endif;

 function newsmatic_is_paged_filtered() {
	if( ! isset( $_GET['newsmaticargs'] ) ) return;
	return true;
 }