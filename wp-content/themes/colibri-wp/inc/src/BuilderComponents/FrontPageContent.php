<?php

namespace ColibriWP\Theme\BuilderComponents;


use ColibriWP\Theme\Core\ComponentBase;


class FrontPageContent extends ComponentBase {

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

    /**
     * @return array();
     */
    protected static function getOptions() {
        return array();
    }


}
