/* 
 * Impliment SGC checkin API
 */


(function ($) {
    'use strict';
    
    class SGCC_Checkin {

        constructor( ) {
            let checkinEL = '#event_player_checkin';
            
            SGCC_Checkin.eventID = $(checkinEL).attr('event_id');
            
            SGCC_Checkin.IDlist = [];
            
            SGCC_Checkin.get_player_idlist(checkinEL);
            SGCC_Checkin.enable_toggle_checkin();
        }
        
        static get_player_idlist( el ) {
            $(el).find('a').each( function() {
                if( $(this).attr('sgc_tc_player_id') !== undefined ) {
                    SGCC_Checkin.IDlist.push( $(this).attr('id') );
                }
            });
        }
        
        static enable_toggle_checkin( ) {
            $.each( SGCC_Checkin.IDlist, function(index, value) {
                let el = '#' + value;
                $(el).removeAttr('target').click(function () {
                    let initVal = $(el).text;
                    $(el).text('Updating...');
                    $.ajax({
                        url: $(el).attr('href')
                    }).success(function( data ) {
                        console.log(data);
                        if( data.status !== 'success' ) {
                            $(el).text('Error!');
                        } else if( data.status === 'success' && data.checkedin === '1' ) {
                            $(el).text('Yes');
                        } else {
                            $(el).text('No');
                        }
                    });
                    return false;
                });
            });
        }
    }
    
    // Load the class after the document is ready
    $(document).ready(function () {
        if ( $('#event_player_checkin').length > 0 ) {
            let sgcc_checkin = new SGCC_Checkin();
        }
    });
})( jQuery );