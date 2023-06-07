<?php
/**
 * The template part for Top Header
 *
 * @package Islamic Center Mosque 
 * @subpackage islamic-center-mosque
 * @since islamic-center-mosque 1.0
 */
?> 
<!-- Top Header -->
<?php if( get_theme_mod( 'islamic_center_mosque_topbar_hide_show', false) == 1 || get_theme_mod( 'islamic_center_mosque_resp_topbar_hide_show', false) == 1) { ?>
  <div class="topbar py-1">
    <div class="container">
      <div class="row">
        <div class="col-lg-2 col-md-3 col-12 align-self-center text-md-start text-lg-start text-center my-lg-0 my-md-0 my-2">
            <span class="call-box">
              <?php if(get_theme_mod('islamic_center_mosque_phone_number') != ''){ ?>
                <span class="phone-number me-3"><span class="calling-text"><i class="fa fa-phone me-2"></i></span><a href="tel:<?php echo esc_attr( get_theme_mod('islamic_center_mosque_phone_number','') ); ?>"><?php echo esc_html(get_theme_mod('islamic_center_mosque_phone_number',''));?></a></span>
              <?php }?>
            </span>
          </div>
          <div class="col-lg-3 col-md-4 col-12 align-self-center text-md-start text-lg-start text-center my-lg-0 my-md-0 my-2">
            <span class="email-text">
              <?php if( get_theme_mod( 'islamic_center_mosque_lite_email','' ) != '') { ?>
                <span class="email"><i class="fa fa-envelope me-2"></i><a href="mailto:<?php echo esc_attr(get_theme_mod('islamic_center_mosque_lite_email',''));?>"><?php echo esc_html(get_theme_mod('islamic_center_mosque_lite_email',''));?></a></span>
              <?php } ?>
            </span>
          </div>
        <div class="col-lg-7 col-md-5 col-12 align-self-center text-md-end text-lg-end text-center my-lg-0 my-md-0 my-2">
          <?php if( get_theme_mod( 'islamic_center_mosque_cart_hide_show', true) == 1) { ?>
            <?php if(class_exists('woocommerce')){ ?>
              <span class="cart_no">
                <a href="<?php if(function_exists('wc_get_cart_url')){ echo esc_url(wc_get_cart_url()); } ?>" title="<?php esc_attr_e( 'shopping cart','islamic-center-mosque' ); ?>"><i class="fas fa-shopping-cart me-2"></i><span class='cart-text'>CART</span><span class="screen-reader-text"><?php esc_html_e( 'Shopping Cart','islamic-center-mosque' );?></span></a>
              </span>
            <?php } ?>
          <?php }?>
        </div>
      </div>
    </div>
  </div>
<?php }?> 