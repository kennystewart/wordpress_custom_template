jQuery(document).ready(function($) {
    'use strict';
    var this_obj = islamic_center_mosque_plugin_activate_plugin;

    $('#gutenberg_editor .plugin-activation-redirect a').addClass('ive-redirect-to-dashboard');

    $(document).on('click', '.islamic-center-mosque-plugin-install', function(event) {
       
        event.preventDefault();
        var button = $(this);
        var slug = button.data('slug');
        button.text(this_obj.installing + '...').addClass('updating-message');
        wp.updates.installPlugin({
            slug: slug,
            success: function(data) {
                button.attr('href', data.activateUrl);
                button.text(this_obj.activating + '...');
                button.removeClass('button-secondary updating-message islamic-center-mosque-plugin-install');
                button.addClass('button-primary islamic-center-mosque-plugin-activate');
                button.trigger('click');
            },
            error: function(data) {
                jQuery('.islamic-center-mosque-recommended-plugins .islamic-center-mosque-activation-note').css('display','block');
                button.removeClass('updating-message');
                button.text(this_obj.error);
            },
        });
    });

    $(document).on('click', '.islamic-center-mosque-plugin-activate', function(event) {
        var redirect_class = jQuery(this).attr('class');
        event.preventDefault();
        var button = $(this);
        var url = button.attr('href');
        if (typeof url !== 'undefined') {
            // Request plugin activation.
            jQuery.ajax({
                async: true,
                type: 'GET',
                url: url,
                beforeSend: function() {
                    button.text(this_obj.activating + '...');
                    button.removeClass('button-secondary');
                    button.addClass('button-primary activate-now updating-message');
                },
                success: function(data) {
                    if(redirect_class.indexOf('ive-redirect-to-dashboard') != -1){
                        location.href = this_obj.ibtana_admin_url;
                    }else{
                        location.reload();
                    }
                }
            });
        }
    });

    /* --------- Create Pattern Page -------- */
    $(document).on('click', '.vw-pattern-page-btn', function(event) {
        jQuery.post(
        this_obj.ajax_url,
        {
            action: 'create_pattern_setup_builder'

        }, function(data, status){
            window.open(data.edit_page_url,'_blank');
        }, 'json');
    });

    jQuery('#lite_theme .ibtana-skip-btn').click(function(){
        var light_theme = jQuery(this).attr('get-start-tab-id');
        jQuery('.' + light_theme).css('display','block');
        jQuery('#lite_theme .islamic-center-mosque-recommended-plugins').css('display','none');
    });

    jQuery('#block_pattern .ibtana-skip-btn').click(function(){
        var light_theme = jQuery(this).attr('get-start-tab-id');
        jQuery('.' + light_theme).css('display','block');
        jQuery('#block_pattern .islamic-center-mosque-recommended-plugins').css('display','none');
    });

    jQuery('.ibtana-dashboard-page-btn').click(function(){
        location.href = this_obj.ibtana_admin_url;
    });
});