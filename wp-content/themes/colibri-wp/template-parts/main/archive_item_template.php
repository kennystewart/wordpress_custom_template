<div class="<?php colibriwp_print_archive_entry_class("h-column h-column-container d-flex  masonry-item style-581-outer style-local-435-m4-outer");?>" data-masonry-width="<?php colibriwp_print_masonry_col_class(true); ?>">
  <div data-colibri-id="435-m4" class="d-flex h-flex-basis h-column__inner h-px-lg-0 h-px-md-0 h-px-0 v-inner-lg-0 v-inner-md-0 v-inner-0 style-581 style-local-435-m4 h-overflow-hidden position-relative">
    <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
      <div data-href="<?php the_permalink(); ?>" data-colibri-component="link" data-colibri-id="435-m5" class="colibri-post-thumbnail <?php colibriwp_post_thumbnail_classes(); ?> style-582 style-local-435-m5 h-overflow-hidden position-relative h-element">
        <div class="h-global-transition-all colibri-post-thumbnail-shortcode style-dynamic-435-m5-height">
          <?php colibriwp_post_thumbnail(array (
            'link' => true,
          )); ?>
        </div>
        <div class="colibri-post-thumbnail-content align-items-lg-center align-items-md-center align-items-center flex-basis-100">
          <div class="w-100 h-y-container"></div>
        </div>
      </div>
      <div data-colibri-id="435-m6" class="h-row-container gutters-row-lg-3 gutters-row-md-3 gutters-row-3 gutters-row-v-lg-0 gutters-row-v-md-0 gutters-row-v-0 style-583 style-local-435-m6 position-relative">
        <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-3 gutters-col-md-3 gutters-col-3 gutters-col-v-lg-0 gutters-col-v-md-0 gutters-col-v-0">
          <div class="h-column h-column-container d-flex h-col-lg-auto h-col-md-auto h-col-auto style-584-outer style-local-435-m7-outer">
            <div data-colibri-id="435-m7" class="d-flex h-flex-basis h-column__inner h-px-lg-0 h-px-md-0 h-px-0 v-inner-lg-3 v-inner-md-3 v-inner-3 style-584 style-local-435-m7 position-relative">
              <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
                <?php if ( apply_filters( 'colibriwp_show_post_meta', true ) ): ?>
                <div data-colibri-id="435-m8" class="h-blog-meta style-585 style-local-435-m8 position-relative h-element">
                  <div name="1" class="metadata-item">
                    <span class="metadata-prefix">
                      <?php esc_html_e('by','colibri-wp'); ?>
                    </span>
                    <a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>">
                      <?php echo get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ); ?>
                    </a>
                  </div>
                </div>
                <?php endif; ?>
                <div data-colibri-id="435-m9" class="h-blog-meta style-586 style-local-435-m9 position-relative h-element">
                  <div name="2" class="metadata-item">
                    <a href="<?php colibriwp_post_meta_date_url(); ?>">
                      <?php colibriwp_the_date('F j, Y'); ?>
                    </a>
                  </div>
                </div>
                <div data-colibri-id="435-m10" class="h-blog-title style-587 style-local-435-m10 position-relative h-element">
                  <div class="h-global-transition-all">
                    <?php colibriwp_post_title(array (
                      'heading_type' => 'h4',
                      'classes' => 'colibri-word-wrap',
                    )); ?>
                  </div>
                </div>
                <div data-colibri-id="435-m11" class="style-588 style-local-435-m11 position-relative h-element">
                  <div class="h-global-transition-all">
                    <?php colibriwp_post_excerpt(array (
                      'max_length' => 16,
                    )); ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-colibri-id="435-m12" class="h-row-container gutters-row-lg-0 gutters-row-md-0 gutters-row-0 gutters-row-v-lg-0 gutters-row-v-md-0 gutters-row-v-0 style-589 style-local-435-m12 position-relative">
        <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-0 gutters-col-md-0 gutters-col-0 gutters-col-v-lg-0 gutters-col-v-md-0 gutters-col-v-0">
          <div class="h-column h-column-container d-flex h-col-lg-auto h-col-md-auto h-col-auto style-590-outer style-local-435-m13-outer">
            <div data-colibri-id="435-m13" class="d-flex h-flex-basis h-column__inner h-px-lg-3 h-px-md-3 h-px-3 v-inner-lg-2 v-inner-md-2 v-inner-2 style-590 style-local-435-m13 position-relative">
              <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
                <div data-colibri-id="435-m14" class="h-blog-meta style-591 style-local-435-m14 position-relative h-element">
                  <div name="4" class="metadata-item">
                    <a href="<?php comments_link(); ?>">
                      <span class="h-svg-icon">
                        <!--Icon by Icons8 Line Awesome (https://icons8.com/line-awesome)-->
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="comments" viewBox="0 0 512 545.5">
                          <path d="M32 112h320v256H197.5L122 428.5l-26 21V368H32V112zm32 32v192h64v46.5l54-43 4.5-3.5H320V144H64zm320 32h96v256h-64v81.5L314.5 432h-149l40-32h120l58.5 46.5V400h64V208h-64v-32z"></path>
                        </svg>
                      </span>
                      <?php echo get_comments_number(); ?>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-column h-column-container d-flex h-col-lg-auto h-col-md-auto h-col-auto style-592-outer style-local-435-m15-outer">
            <div data-colibri-id="435-m15" class="d-flex h-flex-basis h-column__inner h-px-lg-3 h-px-md-3 h-px-3 v-inner-lg-2 v-inner-md-2 v-inner-2 style-592 style-local-435-m15 position-relative">
              <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
                <div data-colibri-id="435-m16" class="h-x-container style-593 style-local-435-m16 position-relative h-element">
                  <div class="h-x-container-inner style-dynamic-435-m16-group">
                    <span class="h-button__outer style-594-outer style-local-435-m17-outer d-inline-flex h-element">
                      <a h-use-smooth-scroll="true" href="<?php the_permalink(); ?>" data-colibri-id="435-m17" class="d-flex w-100 align-items-center h-button justify-content-lg-center justify-content-md-center justify-content-center style-594 style-local-435-m17 position-relative">
                        <span>
                          <?php esc_html_e('read more','colibri-wp'); ?>
                        </span>
                        <span class="h-svg-icon h-button__icon style-594-icon style-local-435-m17-icon">
                          <!--Icon by Icons8 Line Awesome (https://icons8.com/line-awesome)-->
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="arrow-right" viewBox="0 0 512 545.5">
                            <path d="M299.5 140.5l136 136 11 11.5-11 11.5-136 136-23-23L385 304H64v-32h321L276.5 163.5z"></path>
                          </svg>
                        </span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
