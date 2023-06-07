<?php
/**
 * The template part for Middle Header
 *
 * @package Islamic Center Mosque 
 * @subpackage islamic-center-mosque
 * @since islamic-center-mosque 1.0
 */
?>
 
<!-- Middle Header -->
<div class="middle-header">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-12 my-lg-0 my-md-0 my-2 align-self-center">
        <div class="social-icon text-lg-start text-md-start text-center">
            <?php dynamic_sidebar('social-widget'); ?>
        </div>
      </div>
      <div class="col-lg-4 col-12 col-md-4 my-lg-0 my-md-0 my-2 align-self-center text-center">
        <div class="logo">
          <?php if ( has_custom_logo() ) : ?>
            <div class="site-logo"><?php the_custom_logo(); ?></div>
              <?php endif; ?>
              <?php $blog_info = get_bloginfo( 'name' ); ?>
                <?php if ( ! empty( $blog_info ) ) : ?>
                  <?php if ( is_front_page() && is_home() ) : ?>
                    <?php if( get_theme_mod('islamic_center_mosque_logo_title_hide_show',true) == 1){ ?>
                      <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                    <?php } ?>
                  <?php else : ?>
                  <?php if( get_theme_mod('islamic_center_mosque_logo_title_hide_show',true) == 1){ ?>
                    <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
                    <?php } ?>
                  <?php endif; ?>
                <?php endif; ?>
              <?php
                $description = get_bloginfo( 'description', 'display' );
                if ( $description || is_customize_preview() ) :
              ?>
              <?php if( get_theme_mod('islamic_center_mosque_tagline_hide_show',true) == 1){ ?>
                <p class="site-description mb-0">
                  <?php echo esc_html($description); ?>
                </p>
              <?php } ?>
          <?php endif; ?>
        </div>
      </div>
      <div class="col-lg-4 col-12 col-md-4 my-lg-0 my-md-0 my-2 align-self-center">
        <div class="menu-search text-lg-end">
          <?php get_search_form(); ?>
        </div>
      </div>
    </div>    
  </div>
</div>
<div class="container">
  <div class="menu-section text-center">
    <div class="col-lg-12 col-md-12 align-self-center">
      <?php get_template_part('template-parts/header/navigation'); ?>
    </div>
  </div>
</div>