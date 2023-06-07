<?php
/**
 * Displays the site header.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

// $wrapper_classes  = 'site-header';
// $wrapper_classes .= has_custom_logo() ? ' has-logo' : '';
// $wrapper_classes .= ( true === get_theme_mod( 'display_title_and_tagline', true ) ) ? ' has-title-and-tagline' : '';
// $wrapper_classes .= has_nav_menu( 'primary' ) ? ' has-menu' : '';
?>

<div id="preloader">
  <div class="loader"></div>
</div>

<header class="header-area">
  <?php get_template_part( 'template-parts/header/site-header/top-header-area' ); ?>
  <?php get_template_part( 'template-parts/header/site-header/main-header-area' ); ?>
</header>
