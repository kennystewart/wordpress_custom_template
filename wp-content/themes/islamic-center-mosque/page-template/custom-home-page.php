<?php
/**
 * Template Name: Custom Home Page
 */

get_header(); ?>

<main id="maincontent" role="main">
  <?php do_action( 'islamic_center_mosque_before_slider' ); ?>

  <?php if( get_theme_mod( 'islamic_center_mosque_slider_hide_show', false) == 1 || get_theme_mod( 'islamic_center_mosque_resp_slider_hide_show', false) == 1) { ?> 
    <section id="slider">
      <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel" data-bs-interval="<?php echo esc_attr(get_theme_mod( 'islamic_center_mosque_slider_speed',4000)) ?>">
        <?php $islamic_center_mosque_pages = array();
          for ( $count = 1; $count <= 3; $count++ ) {
            $mod = intval( get_theme_mod( 'islamic_center_mosque_slider_page' . $count ));
            if ( 'page-none-selected' != $mod ) {
              $islamic_center_mosque_pages[] = $mod;
            }
          }
          if( !empty($islamic_center_mosque_pages) ) :
            $args = array(
              'post_type' => 'page',
              'post__in' => $islamic_center_mosque_pages,
              'orderby' => 'post__in'
            );
            $query = new WP_Query( $args );
            if ( $query->have_posts() ) :
              $i = 1;
        ?>
        <div class="carousel-inner" role="listbox">
          <?php while ( $query->have_posts() ) : $query->the_post(); ?>
            <div <?php if($i == 1){echo 'class="carousel-item active"';} else{ echo 'class="carousel-item"';}?>>
              <?php if(has_post_thumbnail()){
                the_post_thumbnail();
              } else{?>
                <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/slider.png" alt="" />
              <?php } ?>
              <div class="carousel-caption">
                <div class="inner_carousel">
                  <div class="small-img">
                     <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/small-img.png" alt="" />
                  </div>
                  <h1 class="wow slideInLeft delay-1000" data-wow-duration="2s"><a href="<?php echo esc_url( get_permalink() ); ?>" title="<?php echo the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
                    <p class="mt-2 wow slideInLeft delay-1000" data-wow-duration="3s"><?php $islamic_center_mosque_excerpt = get_the_excerpt(); echo esc_html( islamic_center_mosque_string_limit_words( $islamic_center_mosque_excerpt,'5')); ?></p>
                  <div class="slider-btn mt-3 wow slideInLeft delay-1000" data-wow-duration="2s">
                    <div class="slider-btn1 me-3 wow slideInLeft delay-1000" data-wow-duration="2s">
                      <a href="<?php the_permalink(); ?>"><?php echo esc_html('Join Now','islamic-center-mosque');?><span class="screen-reader-text"><?php echo esc_html('Join Now','islamic-center-mosque');?></span></a>
                    </div>
                    <div class="slider-btn2 wow slideInRight delay-1000" data-wow-duration="2s">
                      <a href="<?php the_permalink(); ?>"><?php echo esc_html('Donate Now','islamic-center-mosque');?><span class="screen-reader-text"><?php echo esc_html('Donate Now','islamic-center-mosque');?></span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <?php $i++; endwhile; 
          wp_reset_postdata();?>
        </div>
        <?php else : ?>
          <div class="no-postfound"></div>
        <?php endif;
        endif;?>
        <a class="carousel-control-prev" data-bs-target="#carouselExampleInterval" data-bs-slide="prev" role="button">
          <span class="carousel-control-prev-icon w-auto h-auto" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
        </a>
        <a class="carousel-control-next" data-bs-target="#carouselExampleInterval" data-bs-slide="next" role="button">
          <span class="carousel-control-next-icon w-auto h-auto" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
        </a>
      </div> 
    </section>
  <?php }?>

  <?php do_action( 'islamic_center_mosque_after_slider' ); ?>

<!-- Event Section -->

<?php if(get_theme_mod( 'islamic_center_mosque_events_heading') != '' || get_theme_mod( 'islamic_center_mosque_events_category') != '') { ?>
  <section id="events-section" class="px-2 wow bounceInDown delay-1000" data-wow-duration="3s">
    <div class="container">
      <div class="events-head text-center mb-2 position-relative">
        <?php if( get_theme_mod('islamic_center_mosque_events_heading') != '' ){ ?>
          <h2 class="text-center"><?php echo esc_html(get_theme_mod('islamic_center_mosque_events_heading',''));?></h2>
        <?php }?>
      </div>
      <div class="row">
        <div class="tab-content blog_content col-lg-12 col-md-12 mt-3">
          <?php 
          for ($count=1; $count < 4; $count++) { 
            $islamic_center_mosque_postData1 =  get_theme_mod('islamic_center_mosque_tab_pages'.$count);
            if($islamic_center_mosque_postData1){
              $args = array( 'name' => esc_html($islamic_center_mosque_postData1 ,'islamic-center-mosque'));
              $new = new WP_Query($args); 
              ?>
              <?php $i=1; while ( $new->have_posts() ){
                $new->the_post();  ?>
                <div role="tabpanel" class="tm_tab tab-pane" id="blog_tab<?php echo esc_attr($count);?>">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 post-img-tab">
                      <?php the_post_thumbnail(); ?>
                      <div class="countdowntimer">
                        <p id="timer" class="countdown">
                          <?php
                          $dateday = get_theme_mod('islamic_center_mosque_product_clock_timer_end'); ?>
                          <input type="hidden" class="date" value="<?php echo esc_html($dateday); ?>"></p>
                      </div> 
                    </div>
                    <div class="col-lg-6 col-md-6">
                      <div class="inner-events-box">
                      <h3 class="my-0"><a href="<?php the_permalink(); ?>"><?php the_title(); ?><span class="screen-reader-text"><?php the_title(); ?></span></a></h3>
                      <p><?php $islamic_center_mosque_excerpt = get_the_excerpt(); echo esc_html( islamic_center_mosque_string_limit_words( $islamic_center_mosque_excerpt, 60)); ?></p>
                        <div class="invite-btn mt-md-3 mt-2"> 
                          <div class="event-btn-1">
                            <a href="<?php the_permalink(); ?>"><?php echo esc_html(get_theme_mod('islamic_center_mosque_event_button_text1',__('View Details','islamic-center-mosque')));?><span class="screen-reader-text"><?php echo esc_html('View Details','islamic-center-mosque');?></span></a>
                          </div>
                          <div class="event-btn-2">
                            <?php if( get_theme_mod('islamic_center_mosque_event_button_text2','Particiapte') != '' || get_theme_mod('islamic_center_mosque_event_button_link_text2') != ''){ ?>
                              <div class="event-btn-2">
                                <a href="<?php echo esc_url(get_theme_mod('islamic_center_mosque_event_button_link_text2')); ?>"><?php echo esc_html(get_theme_mod('islamic_center_mosque_event_button_text2',__('Particiapte','islamic-center-mosque')));?><span class="screen-reader-text"><?php echo esc_html(get_theme_mod('islamic_center_mosque_event_button_text2',__('Particiapte','islamic-center-mosque')));?></span></a>
                              </div>
                            <?php } ?>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <?php $i++; }
             wp_reset_query(); }?>
          <?php }?>
        </div>
      </div>
      <div class="tab-next-section py-3">
        <ul class="nav tab-nav">
          <?php 
          for ($n=1; $n < 4; $n++) { 
            $islamic_center_mosque_postData1 =  get_theme_mod('islamic_center_mosque_tab_pages'.$n);
            if($islamic_center_mosque_postData1){
              $args = array( 'name' => esc_html($islamic_center_mosque_postData1 ,'islamic-center-mosque'));
              $new = new WP_Query($args); ?>
              <?php $j=1;
              while ( $new->have_posts() ){
                $new->the_post();  ?>
                <li class="outside nav-item">
                  <a class="pointer nav-link" href="#blog_tab<?php echo esc_attr($n);?>" role="tab" data-toggle="tab" onclick="islamic_center_mosque_tab_open(event, '#blog_tab<?php echo esc_attr($n);?>')">
                    <?php the_post_thumbnail(); ?>
                  </a>
                </li>
              <?php $j++;}
            wp_reset_query(); }?>
          <?php } ?>
        </ul>
      </div>
  </section>
<?php }?>
<?php do_action( 'islamic_center_mosque_after_event_section' ); ?>


  <div id="content-vw" class="entry-content py-3">
    <div class="container">
      <?php while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
      <?php endwhile; // end of the loop. ?>
    </div>
  </div>
</main>

<?php get_footer(); ?>