( function( api ) {

	// Extends our custom "islamic-center-mosque" section.
	api.sectionConstructor['islamic-center-mosque'] = api.Section.extend( {

		// No events for this type of section.
		attachEvents: function () {},

		// Always make the section active.
		isContextuallyActive: function () {
			return true;
		}
	} );

} )( wp.customize );