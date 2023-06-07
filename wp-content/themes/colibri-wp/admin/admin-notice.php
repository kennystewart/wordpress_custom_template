<?php

use ColibriWP\Theme\Core\Hooks;
use ColibriWP\Theme\Defaults;

$colibriwp_front_page_designs = array();

foreach ( Defaults::get( 'front_page_designs', array() ) as $colibriwp_current_design ) {
    if ( \ColibriWP\Theme\Core\Utils::pathGet( $colibriwp_current_design, 'display', true ) ) {
        $colibriwp_front_page_designs[] = $colibriwp_current_design;
    }
}

?>

<div class="colibri-admin-big-notice--container">
    <div class="logo-holder">
        <h2><?php \ColibriWP\Theme\Translations::escHtmlE( 'start_with_a_front_page' ); ?></h2>
    </div>
    <div class="content-holder">
        <ul class="predefined-front-pages">
            <?php foreach ( $colibriwp_front_page_designs as $colibriwp_design_index => $colibriwp_current_design ): ?>
                <?php $colibriwp_design_selected = $colibriwp_design_index === 0 ? 'selected' : ''; ?>
                <li data-index="<?php echo esc_attr( $colibriwp_current_design['index'] ); ?>"
                    class="<?php echo esc_attr( $colibriwp_design_selected ); ?>">
                    <div class="predefined-front-page-card">
                        <div class="front-page-design-wrapper">
                            <div class="selected-badge"></div>
                            <?php $colibriwp_front_page_design_image_url = Hooks::colibri_apply_filters(
                                'front_page_design_screenshot_url',
                                colibriwp_theme()->getAssetsManager()->getBaseURL() . "/images/front-page-{$colibriwp_current_design['index']}.jpg",
                                $colibriwp_current_design
                            ); ?>
                            <div class="design-preview-image"
                                 style="background-image: url(<?php echo esc_attr( $colibriwp_front_page_design_image_url ); ?>)"
                            ></div>
                        </div>
                        <div class="predefined-front-page-card-footer">
                            <h3 class="design-title">
                                <?php echo esc_html( $colibriwp_current_design['name'] ); ?>
                            </h3>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <div class="content-footer ">
        <div class="action-buttons">
            <button class="button button-primary button-hero start-with-predefined-design-button">
                <?php \ColibriWP\Theme\Translations::escHtmlE( 'start_with_selected_page' ); ?>
            </button>
            <span class="or-separator"><?php \ColibriWP\Theme\Translations::escHtmlE( 'or' ); ?> </span>
            <button class="button button-hero view-all-demos">
                <?php \ColibriWP\Theme\Translations::escHtmlE( 'check_all_demo_sites_page' ); ?>
            </button>
        </div>
        <div>
            <div class="plugin-notice">
                <span class="spinner"></span>
                <span class="message"></span>
            </div>
        </div>
        <div>
            <p class="description large-text"><?php \ColibriWP\Theme\Translations::escHtmlE( 'start_with_a_front_page_plugin_info' ); ?></p>
        </div>
    </div>
    <script type="text/javascript">
        <?php
        $colibriwp_builder_slug = Hooks::colibri_apply_filters( 'plugin_slug', 'colibri-page-builder' );

        $colibriwp_builder_status = array(
            "status"         => colibriwp_theme()->getPluginsManager()->getPluginState( $colibriwp_builder_slug ),
            "install_url"    => colibriwp_theme()->getPluginsManager()->getInstallLink( $colibriwp_builder_slug ),
            "activate_url"   => colibriwp_theme()->getPluginsManager()->getActivationLink( $colibriwp_builder_slug ),
            "slug"           => $colibriwp_builder_slug,
            "view_demos_url" => add_query_arg(
                array(
                    'page'        => 'colibri-wp-page-info',
                    'current_tab' => 'demo-import'
                ),
                admin_url( 'themes.php' )
            ),
            "messages"       => array(
                "installing" => \ColibriWP\Theme\Translations::get( 'installing',
                    'Colibri Page Builder' ),
                "activating" => \ColibriWP\Theme\Translations::get( 'activating',
                    'Colibri Page Builder' )
            ),
        ); ?>
        var colibriwp_builder_status = <?php echo wp_json_encode( $colibriwp_builder_status ); ?>;
    </script>
</div>
