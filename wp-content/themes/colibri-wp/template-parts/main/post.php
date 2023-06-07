<div data-colibri-id="432-m1" class="style-537 style-local-432-m1 h-overflow-hidden position-relative">
  <div data-colibri-component="section" data-colibri-id="432-m2" id="blog-post" class="h-section h-section-global-spacing d-flex align-items-lg-center align-items-md-center align-items-center style-538 style-local-432-m2 position-relative">
    <div class="h-section-grid-container h-section-boxed-container">
      <div data-colibri-id="432-m3" class="h-row-container gutters-row-lg-0 gutters-row-md-0 gutters-row-0 gutters-row-v-lg-0 gutters-row-v-md-0 gutters-row-v-0 colibri-dynamic-list colibri-single-post-loop style-543 style-local-432-m3 position-relative">
        <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-0 gutters-col-md-0 gutters-col-0 gutters-col-v-lg-0 gutters-col-v-md-0 gutters-col-v-0">
          <?php colibriwp_theme()->get('post-loop')->render(); ?>
        </div>
      </div>
    </div>
  </div>
  <div data-colibri-component="section" data-colibri-id="432-m29" id="comments" class="h-section h-section-global-spacing d-flex align-items-lg-center align-items-md-center align-items-center style-565 style-local-432-m29 position-relative">
    <div class="h-section-grid-container h-section-boxed-container">
      <div data-colibri-id="432-m30" class="h-row-container gutters-row-lg-0 gutters-row-md-0 gutters-row-0 gutters-row-v-lg-0 gutters-row-v-md-0 gutters-row-v-0 style-570 style-local-432-m30 position-relative">
        <div class="h-row justify-content-lg-center justify-content-md-center justify-content-center align-items-lg-stretch align-items-md-stretch align-items-stretch gutters-col-lg-0 gutters-col-md-0 gutters-col-0 gutters-col-v-lg-0 gutters-col-v-md-0 gutters-col-v-0">
          <div class="h-column h-column-container d-flex h-col-lg-auto h-col-md-auto h-col-auto style-571-outer style-local-432-m31-outer">
            <div data-colibri-id="432-m31" class="d-flex h-flex-basis h-column__inner h-px-lg-3 h-px-md-3 h-px-3 v-inner-lg-3 v-inner-md-3 v-inner-3 style-571 style-local-432-m31 position-relative">
              <div class="w-100 h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
                <div data-colibri-id="432-m32" class="style-572 style-local-432-m32 position-relative">
                  <div class="h-global-transition-all blog-post-comments">
                    <?php colibriwp_post_comments(array (
                      'none' => __('No responses yet', 'colibri-wp'),
                      'one' => __('One response', 'colibri-wp'),
                      'multiple' => __('{COMMENTS-COUNT} Responses', 'colibri-wp'),
                      'disabled' => 'Comments are closed',
                      'avatar_size' => 30,
                    )); ?>
                  </div>
                </div>
                <div data-colibri-id="432-m33" class="position-relative">
                  <div class="h-global-transition-all">
                    <?php colibriwp_post_comment_form(); ?>
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
