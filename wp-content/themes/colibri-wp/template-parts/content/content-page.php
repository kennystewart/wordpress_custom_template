<div id="post-<?php the_ID();?>" <?php post_class(); ?>>
  <div>
   <?php 
   		the_content(); 
   		wp_link_pages(array(
          'before'      => '<div class="page-links"><span class="page-links-title">' . __('Pages:', 'colibri-wp') . '</span>',
          'after'       => '</div>',
          'link_before' => '<span>',
          'link_after'  => '</span>',
          'pagelink'    => '<span class="screen-reader-text">' . __('Page', 'colibri-wp') . ' </span>%',
          'separator'   => '<span class="screen-reader-text">, </span>',
      	));   
   ?>
  </div>
</div>
