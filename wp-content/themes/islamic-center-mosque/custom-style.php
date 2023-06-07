<?php

	$islamic_center_mosque_custom_css= "";

	/*---------------------------Width Layout -------------------*/

	$islamic_center_mosque_theme_lay = get_theme_mod( 'islamic_center_mosque_width_option','Full Width');
    if($islamic_center_mosque_theme_lay == 'Boxed'){
		$islamic_center_mosque_custom_css .='body{';
			$islamic_center_mosque_custom_css .='max-width: 1140px; width: 100%; padding-right: 15px; padding-left: 15px; margin-right: auto; margin-left: auto;';
		$islamic_center_mosque_custom_css .='}';
		$islamic_center_mosque_custom_css .='.scrollup i{';
			$islamic_center_mosque_custom_css .='right: 100px;';
		$islamic_center_mosque_custom_css .='}';
		$islamic_center_mosque_custom_css .='.row.outer-logo{';
			$islamic_center_mosque_custom_css .='margin-left: 0px;';
		$islamic_center_mosque_custom_css .='}';
	}else if($islamic_center_mosque_theme_lay == 'Wide Width'){
		$islamic_center_mosque_custom_css .='body{';
			$islamic_center_mosque_custom_css .='width: 100%;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;';
		$islamic_center_mosque_custom_css .='}';
		$islamic_center_mosque_custom_css .='.scrollup i{';
			$islamic_center_mosque_custom_css .='right: 30px;';
		$islamic_center_mosque_custom_css .='}';
		$islamic_center_mosque_custom_css .='.row.outer-logo{';
			$islamic_center_mosque_custom_css .='margin-left: 0px;';
		$islamic_center_mosque_custom_css .='}';
	}else if($islamic_center_mosque_theme_lay == 'Full Width'){
		$islamic_center_mosque_custom_css .='body{';
			$islamic_center_mosque_custom_css .='max-width: 100%;';
		$islamic_center_mosque_custom_css .='}';
	}

	/*---------------------------Slider Height ------------*/

	$islamic_center_mosque_slider_height = get_theme_mod('islamic_center_mosque_slider_height');
	if($islamic_center_mosque_slider_height != false){
		$islamic_center_mosque_custom_css .='#slider img{';
			$islamic_center_mosque_custom_css .='height: '.esc_attr($islamic_center_mosque_slider_height).';';
		$islamic_center_mosque_custom_css .='}';
	}

	/*----------------Responsive Media -----------------------*/

	$islamic_center_mosque_resp_slider = get_theme_mod( 'islamic_center_mosque_resp_slider_hide_show',false);
	if($islamic_center_mosque_resp_slider == true && get_theme_mod( 'islamic_center_mosque_slider_hide_show', false) == false){
    	$islamic_center_mosque_custom_css .='#slider{';
			$islamic_center_mosque_custom_css .='display:none;';
		$islamic_center_mosque_custom_css .='} ';
	}
    if($islamic_center_mosque_resp_slider == true){
    	$islamic_center_mosque_custom_css .='@media screen and (max-width:575px) {';
		$islamic_center_mosque_custom_css .='#slider{';
			$islamic_center_mosque_custom_css .='display:block;';
		$islamic_center_mosque_custom_css .='} }';
	}else if($islamic_center_mosque_resp_slider == false){
		$islamic_center_mosque_custom_css .='@media screen and (max-width:575px) {';
		$islamic_center_mosque_custom_css .='#slider{';
			$islamic_center_mosque_custom_css .='display:none;';
		$islamic_center_mosque_custom_css .='} }';
		$islamic_center_mosque_custom_css .='@media screen and (max-width:575px){';
		$islamic_center_mosque_custom_css .='.page-template-custom-home-page.admin-bar .homepageheader{';
			$islamic_center_mosque_custom_css .='margin-top: 45px;';
		$islamic_center_mosque_custom_css .='} }';
	}

	$islamic_center_mosque_resp_sidebar = get_theme_mod( 'islamic_center_mosque_sidebar_hide_show',true);
    if($islamic_center_mosque_resp_sidebar == true){
    	$islamic_center_mosque_custom_css .='@media screen and (max-width:575px) {';
		$islamic_center_mosque_custom_css .='#sidebar{';
			$islamic_center_mosque_custom_css .='display:block;';
		$islamic_center_mosque_custom_css .='} }';
	}else if($islamic_center_mosque_resp_sidebar == false){
		$islamic_center_mosque_custom_css .='@media screen and (max-width:575px) {';
		$islamic_center_mosque_custom_css .='#sidebar{';
			$islamic_center_mosque_custom_css .='display:none;';
		$islamic_center_mosque_custom_css .='} }';
	}

	$islamic_center_mosque_resp_scroll_top = get_theme_mod( 'islamic_center_mosque_resp_scroll_top_hide_show',true);
	if($islamic_center_mosque_resp_scroll_top == true && get_theme_mod( 'islamic_center_mosque_hide_show_scroll',true) == false){
    	$islamic_center_mosque_custom_css .='.scrollup i{';
			$islamic_center_mosque_custom_css .='visibility:hidden !important;';
		$islamic_center_mosque_custom_css .='} ';
	}
    if($islamic_center_mosque_resp_scroll_top == true){
    	$islamic_center_mosque_custom_css .='@media screen and (max-width:575px) {';
		$islamic_center_mosque_custom_css .='.scrollup i{';
			$islamic_center_mosque_custom_css .='visibility:visible !important;';
		$islamic_center_mosque_custom_css .='} }';
	}else if($islamic_center_mosque_resp_scroll_top == false){
		$islamic_center_mosque_custom_css .='@media screen and (max-width:575px){';
		$islamic_center_mosque_custom_css .='.scrollup i{';
			$islamic_center_mosque_custom_css .='visibility:hidden !important;';
		$islamic_center_mosque_custom_css .='} }';
	}

	/*-------------- Copyright Alignment ----------------*/

	$islamic_center_mosque_copyright_alingment = get_theme_mod('islamic_center_mosque_copyright_alingment');
	if($islamic_center_mosque_copyright_alingment != false){
		$islamic_center_mosque_custom_css .='.copyright p{';
			$islamic_center_mosque_custom_css .='text-align: '.esc_attr($islamic_center_mosque_copyright_alingment).';';
		$islamic_center_mosque_custom_css .='}';
	}

	/*------------------ Logo  -------------------*/

	$islamic_center_mosque_site_title_font_size = get_theme_mod('islamic_center_mosque_site_title_font_size');
	if($islamic_center_mosque_site_title_font_size != false){
		$islamic_center_mosque_custom_css .='.logo h1, .logo p.site-title{';
			$islamic_center_mosque_custom_css .='font-size: '.esc_attr($islamic_center_mosque_site_title_font_size).';';
		$islamic_center_mosque_custom_css .='}';
	}

	$islamic_center_mosque_site_tagline_font_size = get_theme_mod('islamic_center_mosque_site_tagline_font_size');
	if($islamic_center_mosque_site_tagline_font_size != false){
		$islamic_center_mosque_custom_css .='.logo p.site-description{';
			$islamic_center_mosque_custom_css .='font-size: '.esc_attr($islamic_center_mosque_site_tagline_font_size).';';
		$islamic_center_mosque_custom_css .='}';
	}

	/*------------- Preloader Background Color  -------------------*/

	$islamic_center_mosque_preloader_bg_color = get_theme_mod('islamic_center_mosque_preloader_bg_color');
	if($islamic_center_mosque_preloader_bg_color != false){
		$islamic_center_mosque_custom_css .='#preloader{';
			$islamic_center_mosque_custom_css .='background-color: '.esc_attr($islamic_center_mosque_preloader_bg_color).';';
		$islamic_center_mosque_custom_css .='}';
	}

	$islamic_center_mosque_preloader_border_color = get_theme_mod('islamic_center_mosque_preloader_border_color');
	if($islamic_center_mosque_preloader_border_color != false){
		$islamic_center_mosque_custom_css .='.loader-line{';
			$islamic_center_mosque_custom_css .='border-color: '.esc_attr($islamic_center_mosque_preloader_border_color).'!important;';
		$islamic_center_mosque_custom_css .='}';
	}