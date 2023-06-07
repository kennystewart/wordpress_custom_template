<?php
/**
 * Typography control class.
 *
 * @since  1.0.0
 * @access public
 */

class Islamic_Center_Mosque_Control_Typography extends WP_Customize_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $type = 'islamic-center-mosque-typography';

	/**
	 * Array 
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $l10n = array();

	/**
	 * Set up our control.
	 *
	 * @since  1.0.0
	 * @access public
	 * @param  object  $manager
	 * @param  string  $id
	 * @param  array   $args
	 * @return void
	 */
	public function __construct( $manager, $id, $args = array() ) {

		// Let the parent class do its thing.
		parent::__construct( $manager, $id, $args );

		// Make sure we have labels.
		$this->l10n = wp_parse_args(
			$this->l10n,
			array(
				'color'       => esc_html__( 'Font Color', 'islamic-center-mosque' ),
				'family'      => esc_html__( 'Font Family', 'islamic-center-mosque' ),
				'size'        => esc_html__( 'Font Size',   'islamic-center-mosque' ),
				'weight'      => esc_html__( 'Font Weight', 'islamic-center-mosque' ),
				'style'       => esc_html__( 'Font Style',  'islamic-center-mosque' ),
				'line_height' => esc_html__( 'Line Height', 'islamic-center-mosque' ),
				'letter_spacing' => esc_html__( 'Letter Spacing', 'islamic-center-mosque' ),
			)
		);
	}

	/**
	 * Enqueue scripts/styles.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function enqueue() {
		wp_enqueue_script( 'islamic-center-mosque-ctypo-customize-controls' );
		wp_enqueue_style(  'islamic-center-mosque-ctypo-customize-controls' );
	}

	/**
	 * Add custom parameters to pass to the JS via JSON.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function to_json() {
		parent::to_json();

		// Loop through each of the settings and set up the data for it.
		foreach ( $this->settings as $setting_key => $setting_id ) {

			$this->json[ $setting_key ] = array(
				'link'  => $this->get_link( $setting_key ),
				'value' => $this->value( $setting_key ),
				'label' => isset( $this->l10n[ $setting_key ] ) ? $this->l10n[ $setting_key ] : ''
			);

			if ( 'family' === $setting_key )
				$this->json[ $setting_key ]['choices'] = $this->get_font_families();

			elseif ( 'weight' === $setting_key )
				$this->json[ $setting_key ]['choices'] = $this->get_font_weight_choices();

			elseif ( 'style' === $setting_key )
				$this->json[ $setting_key ]['choices'] = $this->get_font_style_choices();
		}
	}

	/**
	 * Underscore JS template to handle the control's output.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function content_template() { ?>

		<# if ( data.label ) { #>
			<span class="customize-control-title">{{ data.label }}</span>
		<# } #>

		<# if ( data.description ) { #>
			<span class="description customize-control-description">{{{ data.description }}}</span>
		<# } #>

		<ul>

		<# if ( data.family && data.family.choices ) { #>

			<li class="typography-font-family">

				<# if ( data.family.label ) { #>
					<span class="customize-control-title">{{ data.family.label }}</span>
				<# } #>

				<select {{{ data.family.link }}}>

					<# _.each( data.family.choices, function( label, choice ) { #>
						<option value="{{ choice }}" <# if ( choice === data.family.value ) { #> selected="selected" <# } #>>{{ label }}</option>
					<# } ) #>

				</select>
			</li>
		<# } #>

		<# if ( data.weight && data.weight.choices ) { #>

			<li class="typography-font-weight">

				<# if ( data.weight.label ) { #>
					<span class="customize-control-title">{{ data.weight.label }}</span>
				<# } #>

				<select {{{ data.weight.link }}}>

					<# _.each( data.weight.choices, function( label, choice ) { #>

						<option value="{{ choice }}" <# if ( choice === data.weight.value ) { #> selected="selected" <# } #>>{{ label }}</option>

					<# } ) #>

				</select>
			</li>
		<# } #>

		<# if ( data.style && data.style.choices ) { #>

			<li class="typography-font-style">

				<# if ( data.style.label ) { #>
					<span class="customize-control-title">{{ data.style.label }}</span>
				<# } #>

				<select {{{ data.style.link }}}>

					<# _.each( data.style.choices, function( label, choice ) { #>

						<option value="{{ choice }}" <# if ( choice === data.style.value ) { #> selected="selected" <# } #>>{{ label }}</option>

					<# } ) #>

				</select>
			</li>
		<# } #>

		<# if ( data.size ) { #>

			<li class="typography-font-size">

				<# if ( data.size.label ) { #>
					<span class="customize-control-title">{{ data.size.label }} (px)</span>
				<# } #>

				<input type="number" min="1" {{{ data.size.link }}} value="{{ data.size.value }}" />

			</li>
		<# } #>

		<# if ( data.line_height ) { #>

			<li class="typography-line-height">

				<# if ( data.line_height.label ) { #>
					<span class="customize-control-title">{{ data.line_height.label }} (px)</span>
				<# } #>

				<input type="number" min="1" {{{ data.line_height.link }}} value="{{ data.line_height.value }}" />

			</li>
		<# } #>

		<# if ( data.letter_spacing ) { #>

			<li class="typography-letter-spacing">

				<# if ( data.letter_spacing.label ) { #>
					<span class="customize-control-title">{{ data.letter_spacing.label }} (px)</span>
				<# } #>

				<input type="number" min="1" {{{ data.letter_spacing.link }}} value="{{ data.letter_spacing.value }}" />

			</li>
		<# } #>

		</ul>
	<?php }

	/**
	 * Returns the available fonts.  Fonts should have available weights, styles, and subsets.
	 *
	 * @todo Integrate with Google fonts.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return array
	 */
	public function get_fonts() { return array(); }

	/**
	 * Returns the available font families.
	 *
	 * @todo Pull families from `get_fonts()`.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return array
	 */
	function get_font_families() {

		return array(
			'' => __( 'No Fonts', 'islamic-center-mosque' ),
        'Abril Fatface' => __( 'Abril Fatface', 'islamic-center-mosque' ),
        'Acme' => __( 'Acme', 'islamic-center-mosque' ),
        'Anton' => __( 'Anton', 'islamic-center-mosque' ),
        'Architects Daughter' => __( 'Architects Daughter', 'islamic-center-mosque' ),
        'Arimo' => __( 'Arimo', 'islamic-center-mosque' ),
        'Arsenal' => __( 'Arsenal', 'islamic-center-mosque' ),
        'Arvo' => __( 'Arvo', 'islamic-center-mosque' ),
        'Alegreya' => __( 'Alegreya', 'islamic-center-mosque' ),
        'Alfa Slab One' => __( 'Alfa Slab One', 'islamic-center-mosque' ),
        'Averia Serif Libre' => __( 'Averia Serif Libre', 'islamic-center-mosque' ),
        'Bangers' => __( 'Bangers', 'islamic-center-mosque' ),
        'Boogaloo' => __( 'Boogaloo', 'islamic-center-mosque' ),
        'Bad Script' => __( 'Bad Script', 'islamic-center-mosque' ),
        'Bitter' => __( 'Bitter', 'islamic-center-mosque' ),
        'Bree Serif' => __( 'Bree Serif', 'islamic-center-mosque' ),
        'BenchNine' => __( 'BenchNine', 'islamic-center-mosque' ),
        'Cabin' => __( 'Cabin', 'islamic-center-mosque' ),
        'Cardo' => __( 'Cardo', 'islamic-center-mosque' ),
        'Courgette' => __( 'Courgette', 'islamic-center-mosque' ),
        'Cherry Swash' => __( 'Cherry Swash', 'islamic-center-mosque' ),
        'Cormorant Garamond' => __( 'Cormorant Garamond', 'islamic-center-mosque' ),
        'Crimson Text' => __( 'Crimson Text', 'islamic-center-mosque' ),
        'Cuprum' => __( 'Cuprum', 'islamic-center-mosque' ),
        'Cookie' => __( 'Cookie', 'islamic-center-mosque' ),
        'Chewy' => __( 'Chewy', 'islamic-center-mosque' ),
        'Days One' => __( 'Days One', 'islamic-center-mosque' ),
        'Dosis' => __( 'Dosis', 'islamic-center-mosque' ),
        'Droid Sans' => __( 'Droid Sans', 'islamic-center-mosque' ),
        'Economica' => __( 'Economica', 'islamic-center-mosque' ),
        'Fredoka One' => __( 'Fredoka One', 'islamic-center-mosque' ),
        'Fjalla One' => __( 'Fjalla One', 'islamic-center-mosque' ),
        'Francois One' => __( 'Francois One', 'islamic-center-mosque' ),
        'Frank Ruhl Libre' => __( 'Frank Ruhl Libre', 'islamic-center-mosque' ),
        'Gloria Hallelujah' => __( 'Gloria Hallelujah', 'islamic-center-mosque' ),
        'Great Vibes' => __( 'Great Vibes', 'islamic-center-mosque' ),
        'Handlee' => __( 'Handlee', 'islamic-center-mosque' ),
        'Hammersmith One' => __( 'Hammersmith One', 'islamic-center-mosque' ),
        'Inconsolata' => __( 'Inconsolata', 'islamic-center-mosque' ),
        'Indie Flower' => __( 'Indie Flower', 'islamic-center-mosque' ),
        'IM Fell English SC' => __( 'IM Fell English SC', 'islamic-center-mosque' ),
        'Julius Sans One' => __( 'Julius Sans One', 'islamic-center-mosque' ),
        'Josefin Slab' => __( 'Josefin Slab', 'islamic-center-mosque' ),
        'Josefin Sans' => __( 'Josefin Sans', 'islamic-center-mosque' ),
        'Kanit' => __( 'Kanit', 'islamic-center-mosque' ),
        'Lobster' => __( 'Lobster', 'islamic-center-mosque' ),
        'Lato' => __( 'Lato', 'islamic-center-mosque' ),
        'Lora' => __( 'Lora', 'islamic-center-mosque' ),
        'Libre Baskerville' => __( 'Libre Baskerville', 'islamic-center-mosque' ),
        'Lobster Two' => __( 'Lobster Two', 'islamic-center-mosque' ),
        'Merriweather' => __( 'Merriweather', 'islamic-center-mosque' ),
        'Monda' => __( 'Monda', 'islamic-center-mosque' ),
        'Montserrat' => __( 'Montserrat', 'islamic-center-mosque' ),
        'Muli' => __( 'Muli', 'islamic-center-mosque' ),
        'Marck Script' => __( 'Marck Script', 'islamic-center-mosque' ),
        'Noto Serif' => __( 'Noto Serif', 'islamic-center-mosque' ),
        'Open Sans' => __( 'Open Sans', 'islamic-center-mosque' ),
        'Overpass' => __( 'Overpass', 'islamic-center-mosque' ),
        'Overpass Mono' => __( 'Overpass Mono', 'islamic-center-mosque' ),
        'Oxygen' => __( 'Oxygen', 'islamic-center-mosque' ),
        'Orbitron' => __( 'Orbitron', 'islamic-center-mosque' ),
        'Patua One' => __( 'Patua One', 'islamic-center-mosque' ),
        'Pacifico' => __( 'Pacifico', 'islamic-center-mosque' ),
        'Padauk' => __( 'Padauk', 'islamic-center-mosque' ),
        'Playball' => __( 'Playball', 'islamic-center-mosque' ),
        'Playfair Display' => __( 'Playfair Display', 'islamic-center-mosque' ),
        'PT Sans' => __( 'PT Sans', 'islamic-center-mosque' ),
        'Philosopher' => __( 'Philosopher', 'islamic-center-mosque' ),
        'Permanent Marker' => __( 'Permanent Marker', 'islamic-center-mosque' ),
        'Poiret One' => __( 'Poiret One', 'islamic-center-mosque' ),
        'Quicksand' => __( 'Quicksand', 'islamic-center-mosque' ),
        'Quattrocento Sans' => __( 'Quattrocento Sans', 'islamic-center-mosque' ),
        'Raleway' => __( 'Raleway', 'islamic-center-mosque' ),
        'Rubik' => __( 'Rubik', 'islamic-center-mosque' ),
        'Rokkitt' => __( 'Rokkitt', 'islamic-center-mosque' ),
        'Russo One' => __( 'Russo One', 'islamic-center-mosque' ),
        'Righteous' => __( 'Righteous', 'islamic-center-mosque' ),
        'Slabo' => __( 'Slabo', 'islamic-center-mosque' ),
        'Source Sans Pro' => __( 'Source Sans Pro', 'islamic-center-mosque' ),
        'Shadows Into Light Two' => __( 'Shadows Into Light Two', 'islamic-center-mosque'),
        'Shadows Into Light' => __( 'Shadows Into Light', 'islamic-center-mosque' ),
        'Sacramento' => __( 'Sacramento', 'islamic-center-mosque' ),
        'Shrikhand' => __( 'Shrikhand', 'islamic-center-mosque' ),
        'Tangerine' => __( 'Tangerine', 'islamic-center-mosque' ),
        'Ubuntu' => __( 'Ubuntu', 'islamic-center-mosque' ),
        'VT323' => __( 'VT323', 'islamic-center-mosque' ),
        'Varela Round' => __( 'Varela Round', 'islamic-center-mosque' ),
        'Vampiro One' => __( 'Vampiro One', 'islamic-center-mosque' ),
        'Vollkorn' => __( 'Vollkorn', 'islamic-center-mosque' ),
        'Volkhov' => __( 'Volkhov', 'islamic-center-mosque' ),
        'Yanone Kaffeesatz' => __( 'Yanone Kaffeesatz', 'islamic-center-mosque' )
		);
	}

	/**
	 * Returns the available font weights.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return array
	 */
	public function get_font_weight_choices() {

		return array(
			'' => esc_html__( 'No Fonts weight', 'islamic-center-mosque' ),
			'100' => esc_html__( 'Thin',       'islamic-center-mosque' ),
			'300' => esc_html__( 'Light',      'islamic-center-mosque' ),
			'400' => esc_html__( 'Normal',     'islamic-center-mosque' ),
			'500' => esc_html__( 'Medium',     'islamic-center-mosque' ),
			'700' => esc_html__( 'Bold',       'islamic-center-mosque' ),
			'900' => esc_html__( 'Ultra Bold', 'islamic-center-mosque' ),
		);
	}

	/**
	 * Returns the available font styles.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return array
	 */
	public function get_font_style_choices() {

		return array(
			'' => esc_html__( 'No Fonts Style', 'islamic-center-mosque' ),
			'normal'  => esc_html__( 'Normal', 'islamic-center-mosque' ),
			'italic'  => esc_html__( 'Italic', 'islamic-center-mosque' ),
			'oblique' => esc_html__( 'Oblique', 'islamic-center-mosque' )
		);
	}
}
