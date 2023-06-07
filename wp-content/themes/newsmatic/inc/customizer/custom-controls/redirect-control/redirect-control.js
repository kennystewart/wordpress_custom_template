( function( api, $ ) {
	api.controlConstructor['redirect-link'] = api.Control.extend( {
		ready: function() {
			var control = this;
            // trigger click
            control.container.find( ".link-item" ).each(function() {
                var singleContainer = $(this)
                singleContainer.on( "click", function(e) {
                    e.preventDefault();
                    type= $(this).data( "type" ),
                    id = $(this).data( "id" );
                    switch(type) {
                        case 'section' : wp.customize.section( id ).focus(); break;
                        default : wp.customize.control( id ).focus(); break;
                    }
                })
            })
        }
    });
} )( wp.customize, jQuery );