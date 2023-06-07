<?php
/**
 * Get the events for the current location and display them as a table.
 */

$event_list = null;
switch($sgc_postType) {
    case 'sgc_location' :
        (function_exists('sgc_location_getevents')) ? $event_list = sgc_location_getevents() : null ;
        break;
    case 'sgc_team' :
        (function_exists('sgc_team_getevents')) ? $event_list = sgc_team_getevents() : null ;
        break;
}

if( !empty($event_list) && !array_key_exists('status', $event_list) ) :
    // make sure we have the local server timezone
    date_default_timezone_set( get_option('timezone_string') );
?>
    <div class="sgc-2021-location-events">
        <h4><?php _e('Past & Upcoming Events', 'simple-golf-club-2021') ?></h4>
        <table>
            <thead>
                <tr>
                    <th><?php _e('Date', 'simple-golf-club-2021') ?></th>
                    <th><?php _e('Time', 'simple-golf-club-2021') ?></th>
                    <th><?php _e('Event Name', 'simple-golf-club-2021') ?></th>
                    <th><?php _e('Tee', 'simple-golf-club-2021') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach( $event_list as $event ) : ?>
                <tr>
                    <td class="date"><?php echo date( 'M d, Y', strtotime($event['time']) ) ?></td>
                    <td class="time"><?php echo date( 'g:i A', strtotime($event['time']) ) ?></td>
                    <td class="name"><a href="<?php echo esc_url($event['URL']) ?>" target="_blank"><?php echo esc_html($event['name']) ?></a></td>
                    <td class="tee"><?php echo esc_html($event['tee']) ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
<?php endif; ?>
