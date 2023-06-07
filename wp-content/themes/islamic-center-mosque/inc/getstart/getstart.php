<?php
//about theme info
add_action( 'admin_menu', 'islamic_center_mosque_gettingstarted' );
function islamic_center_mosque_gettingstarted() {
	add_theme_page( esc_html__('About Islamic Center Mosque ', 'islamic-center-mosque'), esc_html__('About Islamic Center Mosque ', 'islamic-center-mosque'), 'edit_theme_options', 'islamic_center_mosque_guide', 'islamic_center_mosque_mostrar_guide');
}

// Add a Custom CSS file to WP Admin Area
function islamic_center_mosque_admin_theme_style() {
	wp_enqueue_style('islamic-center-mosque-custom-admin-style', esc_url(get_template_directory_uri()) . '/inc/getstart/getstart.css');
	wp_enqueue_script('islamic-center-mosque-tabs', esc_url(get_template_directory_uri()) . '/inc/getstart/js/tab.js');
}
add_action('admin_enqueue_scripts', 'islamic_center_mosque_admin_theme_style');

//guidline for about theme
function islamic_center_mosque_mostrar_guide() { 
	//custom function about theme customizer
	$islamic_center_mosque_return = add_query_arg( array()) ;
	$islamic_center_mosque_theme = wp_get_theme( 'islamic-center-mosque' );
?>

<div class="wrapper-info">
    <div class="col-left">
    	<h2><?php esc_html_e( 'Welcome to Islamic Center Mosque ', 'islamic-center-mosque' ); ?> <span class="version"><?php esc_html_e( 'Version', 'islamic-center-mosque' ); ?>: <?php echo esc_html($islamic_center_mosque_theme['Version']);?></span></h2>
    	<p><?php esc_html_e('All our WordPress themes are modern, minimalist, 100% responsive, seo-friendly,feature-rich, and multipurpose that best suit designers, bloggers and other professionals who are working in the creative fields.','islamic-center-mosque'); ?></p>
    </div>

    <div class="tab-sec">
    	<div class="tab">
			<button class="tablinks" onclick="islamic_center_mosque_open_tab(event, 'lite_theme')"><?php esc_html_e( 'Setup With Customizer', 'islamic-center-mosque' ); ?></button>
			<button class="tablinks" onclick="islamic_center_mosque_open_tab(event, 'gutenberg_editor')"><?php esc_html_e( 'Setup With Gutunberg Block', 'islamic-center-mosque' ); ?></button>
		</div>

		<?php
			$islamic_center_mosque_plugin_custom_css = '';
			if(class_exists('Ibtana_Visual_Editor_Menu_Class')){
				$islamic_center_mosque_plugin_custom_css ='display: block';
			}
		?>
		<div id="lite_theme" class="tabcontent open">
			<?php if(!class_exists('Ibtana_Visual_Editor_Menu_Class')){ 
				$plugin_ins = Islamic_Center_Mosque_Plugin_Activation_Settings::get_instance();
				$islamic_center_mosque_actions = $plugin_ins->recommended_actions;
				?>
				<div class="islamic-center-mosque-recommended-plugins">
				    <div class="islamic-center-mosque-action-list">
				        <?php if ($islamic_center_mosque_actions): foreach ($islamic_center_mosque_actions as $key => $islamic_center_mosque_actionValue): ?>
				                <div class="islamic-center-mosque-action" id="<?php echo esc_attr($islamic_center_mosque_actionValue['id']);?>">
			                        <div class="action-inner">
			                            <h3 class="action-title"><?php echo esc_html($islamic_center_mosque_actionValue['title']); ?></h3>
			                            <div class="action-desc"><?php echo esc_html($islamic_center_mosque_actionValue['desc']); ?></div>
			                            <?php echo wp_kses_post($islamic_center_mosque_actionValue['link']); ?>
			                            <a class="ibtana-skip-btn" get-start-tab-id="lite-theme-tab" href="javascript:void(0);"><?php esc_html_e('Skip','islamic-center-mosque'); ?></a>
			                        </div>
				                </div>
				            <?php endforeach;
				        endif; ?>
				    </div>
				</div>
			<?php } ?>
			<div class="lite-theme-tab" style="<?php echo esc_attr($islamic_center_mosque_plugin_custom_css); ?>">
				<h3><?php esc_html_e( 'Lite Theme Information', 'islamic-center-mosque' ); ?></h3>
				<hr class="h3hr">
				<p><?php esc_html_e('Islamic Center Mosque is a versatile and user-friendly WordPress theme designed for mosques, Islamic centers, religious organizations, and Muslim communities. This theme can be used to create visually appealing and responsive websites that cater to the unique needs of the Islamic community. It is ideal for mosque administrators, religious leaders, and community members who want to establish an engaging online presence. With its elegant design, user-friendly interface, and comprehensive functionality, this theme caters to the unique needs of the Islamic community. It comes with features such as prayer timetables, event management, sermon recordings, and video galleries, which facilitate community engagement and fosters interaction. It is also suitable for Islamic scholars, speakers, and non-profit organizations involved in humanitarian and charitable work. Furthermore, Islamic Center Mosque has a responsive and visually appealing design. The theme provides a clean and modern layout that not only captures the essence of Islamic aesthetics but also ensures a seamless user experience across different devices and screen sizes. The theme offers a range of customization options, allowing administrators to personalize the website to suit their specific requirements. With the intuitive theme options panel, users can easily modify the layout, colors, fonts, and other visual elements without any coding knowledge. This flexibility enables Islamic centers to showcase their unique identity and maintain a consistent brand image.','islamic-center-mosque'); ?></p>
			  	<div class="col-left-inner">
			  		<h4><?php esc_html_e( 'Theme Documentation', 'islamic-center-mosque' ); ?></h4>
					<p><?php esc_html_e( 'If you need any assistance regarding setting up and configuring the Theme, our documentation is there.', 'islamic-center-mosque' ); ?></p>
					<div class="info-link">
						<a href="<?php echo esc_url( ISLAMIC_CENTER_MOSQUE_FREE_THEME_DOC ); ?>" target="_blank"> <?php esc_html_e( 'Documentation', 'islamic-center-mosque' ); ?></a>
					</div>
					<hr>
					<h4><?php esc_html_e('Theme Customizer', 'islamic-center-mosque'); ?></h4>
					<p> <?php esc_html_e('To begin customizing your website, start by clicking "Customize".', 'islamic-center-mosque'); ?></p>
					<div class="info-link">
						<a target="_blank" href="<?php echo esc_url( admin_url('customize.php') ); ?>"><?php esc_html_e('Customizing', 'islamic-center-mosque'); ?></a>
					</div>
					<hr>
					<h4><?php esc_html_e('Having Trouble, Need Support?', 'islamic-center-mosque'); ?></h4>
					<p> <?php esc_html_e('Our dedicated team is well prepared to help you out in case of queries and doubts regarding our theme.', 'islamic-center-mosque'); ?></p>
					<div class="info-link">
						<a href="<?php echo esc_url( ISLAMIC_CENTER_MOSQUE_SUPPORT ); ?>" target="_blank"><?php esc_html_e('Support Forum', 'islamic-center-mosque'); ?></a>
					</div>
					<hr>
					<h4><?php esc_html_e('Reviews & Testimonials', 'islamic-center-mosque'); ?></h4>
					<p> <?php esc_html_e('All the features and aspects of this WordPress Theme are phenomenal. I\'d recommend this theme to all.', 'islamic-center-mosque'); ?></p>
					<div class="info-link">
						<a href="<?php echo esc_url( ISLAMIC_CENTER_MOSQUE_REVIEW ); ?>" target="_blank"><?php esc_html_e('Reviews', 'islamic-center-mosque'); ?></a>
					</div>

					<div class="link-customizer">
						<h3><?php esc_html_e( 'Link to customizer', 'islamic-center-mosque' ); ?></h3>
						<hr class="h3hr">
						<div class="first-row">
							<div class="row-box">
								<div class="row-box1">
									<span class="dashicons dashicons-buddicons-buddypress-logo"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[control]=custom_logo') ); ?>" target="_blank"><?php esc_html_e('Upload your logo','islamic-center-mosque'); ?></a>
								</div>
								<div class="row-box2">
									<span class="dashicons dashicons-format-gallery"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_post_settings') ); ?>" target="_blank"><?php esc_html_e('Post settings','islamic-center-mosque'); ?></a>
								</div>
							</div>

							<div class="row-box">
								<div class="row-box1">
									<span class="dashicons dashicons-slides"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_slidersettings') ); ?>" target="_blank"><?php esc_html_e('Slider Settings','islamic-center-mosque'); ?></a>
								</div>
								<div class="row-box2">
									<span class="dashicons dashicons-category"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_events_section') ); ?>" target="_blank"><?php esc_html_e('Event Section','islamic-center-mosque'); ?></a>
								</div>
							</div>
						
							<div class="row-box">
								<div class="row-box1">
									<span class="dashicons dashicons-menu"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[panel]=nav_menus') ); ?>" target="_blank"><?php esc_html_e('Menus','islamic-center-mosque'); ?></a>
								</div>
								<div class="row-box2">
									<span class="dashicons dashicons-screenoptions"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[panel]=widgets') ); ?>" target="_blank"><?php esc_html_e('Footer Widget','islamic-center-mosque'); ?></a>
								</div>
							</div>
							
							<div class="row-box">
								<div class="row-box1">
									<span class="dashicons dashicons-admin-generic"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_left_right') ); ?>" target="_blank"><?php esc_html_e('General Settings','islamic-center-mosque'); ?></a>
								</div>
								<div class="row-box2">
									<span class="dashicons dashicons-text-page"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_footer') ); ?>" target="_blank"><?php esc_html_e('Footer Text','islamic-center-mosque'); ?></a>
								</div>
							</div>
						</div>
					</div>
			  	</div>
				<div class="col-right-inner">
					<h3 class="page-template"><?php esc_html_e('How to set up Home Page Template','islamic-center-mosque'); ?></h3>
				  	<hr class="h3hr">
					<p><?php esc_html_e('Follow these instructions to setup Home page.','islamic-center-mosque'); ?></p>
                  	<p><span class="strong"><?php esc_html_e('1. Create a new page :','islamic-center-mosque'); ?></span><?php esc_html_e(' Go to ','islamic-center-mosque'); ?>
					  	<b><?php esc_html_e(' Dashboard >> Pages >> Add New Page','islamic-center-mosque'); ?></b></p>
                  	<p><?php esc_html_e('Name it as "Home" then select the template "Custom Home Page".','islamic-center-mosque'); ?></p>
                  	<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getstart/images/home-page-template.png" alt="" />
                  	<p><span class="strong"><?php esc_html_e('2. Set the front page:','islamic-center-mosque'); ?></span><?php esc_html_e(' Go to ','islamic-center-mosque'); ?>
					  	<b><?php esc_html_e(' Settings >> Reading ','islamic-center-mosque'); ?></b></p>
				  	<p><?php esc_html_e('Select the option of Static Page, now select the page you created to be the homepage, while another page to be your default page.','islamic-center-mosque'); ?></p>
                  	<img src="<?php echo esc_url(get_template_directory_uri()); ?>/inc/getstart/images/set-front-page.png" alt="" />
                  	<p><?php esc_html_e(' Once you are done with setup, then follow the','islamic-center-mosque'); ?> <a class="doc-links" href="<?php echo esc_url( ISLAMIC_CENTER_MOSQUE_FREE_THEME_DOC ); ?>" target="_blank"><?php esc_html_e('Documentation','islamic-center-mosque'); ?></a></p>
			  	</div>
			</div>
		</div>
		
		<div id="gutenberg_editor" class="tabcontent">
			<?php if(!class_exists('Ibtana_Visual_Editor_Menu_Class')){ 
			$plugin_ins = Islamic_Center_Mosque_Plugin_Activation_Settings::get_instance();
			$islamic_center_mosque_actions = $plugin_ins->recommended_actions;
			?>
				<div class="islamic-center-mosque-recommended-plugins">
				    <div class="islamic-center-mosque-action-list">
				        <?php if ($islamic_center_mosque_actions): foreach ($islamic_center_mosque_actions as $key => $islamic_center_mosque_actionValue): ?>
				                <div class="islamic-center-mosque-action" id="<?php echo esc_attr($islamic_center_mosque_actionValue['id']);?>">
			                        <div class="action-inner plugin-activation-redirect">
			                            <h3 class="action-title"><?php echo esc_html($islamic_center_mosque_actionValue['title']); ?></h3>
			                            <div class="action-desc"><?php echo esc_html($islamic_center_mosque_actionValue['desc']); ?></div>
			                            <?php echo wp_kses_post($islamic_center_mosque_actionValue['link']); ?>
			                        </div>
				                </div>
				            <?php endforeach;
				        endif; ?>
				    </div>
				</div>
			<?php }else{ ?>
				<h3><?php esc_html_e( 'Gutunberg Blocks', 'islamic-center-mosque' ); ?></h3>
				<hr class="h3hr">
				<div class="islamic-center-mosque-pattern-page">
			    	<a href="<?php echo esc_url( admin_url( 'admin.php?page=ibtana-visual-editor-templates' ) ); ?>" class="vw-pattern-page-btn ibtana-dashboard-page-btn button-primary button"><?php esc_html_e('Ibtana Settings','islamic-center-mosque'); ?></a>
			    </div>

			    <div class="link-customizer-with-guternberg-ibtana">
	              	<div class="link-customizer-with-block-pattern">
						<h3><?php esc_html_e( 'Link to customizer', 'islamic-center-mosque' ); ?></h3>
						<hr class="h3hr">
						<div class="first-row">
							<div class="row-box">
								<div class="row-box1">
									<span class="dashicons dashicons-buddicons-buddypress-logo"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[control]=custom_logo') ); ?>" target="_blank"><?php esc_html_e('Upload your logo','islamic-center-mosque'); ?></a>
								</div>
								<div class="row-box2">
									<span class="dashicons dashicons-format-gallery"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_post_settings') ); ?>" target="_blank"><?php esc_html_e('Post settings','islamic-center-mosque'); ?></a>
								</div>
							</div>
							<div class="row-box">
								<div class="row-box1">
									<span class="dashicons dashicons-menu"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[panel]=nav_menus') ); ?>" target="_blank"><?php esc_html_e('Menus','islamic-center-mosque'); ?></a>
								</div>
								
								<div class="row-box2">
									<span class="dashicons dashicons-text-page"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_footer') ); ?>" target="_blank"><?php esc_html_e('Footer Text','islamic-center-mosque'); ?></a>
								</div>
							</div>
							
							<div class="row-box">
								<div class="row-box1">
									<span class="dashicons dashicons-admin-generic"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[section]=islamic_center_mosque_left_right') ); ?>" target="_blank"><?php esc_html_e('General Settings','islamic-center-mosque'); ?></a>
								</div>
								 <div class="row-box2">
									<span class="dashicons dashicons-screenoptions"></span><a href="<?php echo esc_url( admin_url('customize.php?autofocus[panel]=widgets') ); ?>" target="_blank"><?php esc_html_e('Footer Widget','islamic-center-mosque'); ?></a>
								</div> 
							</div>
						</div>
					</div>	
				</div>
			<?php } ?>
		</div>

	</div>
</div>

<?php } ?>