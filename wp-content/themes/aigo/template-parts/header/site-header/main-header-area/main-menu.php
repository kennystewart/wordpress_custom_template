<div class="classy-menu">
    <div class="classycloseIcon">
        <div class="cross-wrap">
            <span class="top"></span>
            <span class="bottom"></span>
        </div>
    </div>

    <?php
      wp_nav_menu(
        array(
          'theme_location'  => 'primary',
          'container_class' => 'classynav',
          'menu_id'         => 'nav',
        )
      );
    ?>

    <!-- <div class="live-chat-btn ml-5 mt-4 mt-lg-0 ml-md-4">
      <a href="#" class="btn hami-btn live--chat--btn">
        <i class="fa fa-comments" aria-hidden="true"></i> Live Chat </a>
    </div> -->
    
</div>