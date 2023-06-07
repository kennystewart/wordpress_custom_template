<?php


namespace ColibriWP\Theme\Components;


class FrontPageContent extends PageContent {

    public function renderContent() {
        ?>
        <div class="page-content">
            <?php while ( have_posts() ) : the_post(); ?>
            <div id="content"  class="content">
                <?php
                the_content();
                endwhile;
                ?>
            </div>
            <?php
            colibriwp_render_page_comments();
            ?>
        </div>
        <?php

    }

}
