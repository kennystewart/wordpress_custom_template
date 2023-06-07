<?php
/**
 * Get the event info for the current event and display in a table.
 */
if (function_exists('sgc_event_getinfo')) :
    $event_info = sgc_event_getinfo();
    if( !empty($event_info) && !empty($event_info['location_name']) ) :
    ?>
        <div class="sgc-2021-event-info">
            <h4><?php _e('Event Info', 'simple-golf-club-2021') ?></h4>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <span class="time"><?php echo date( 'g:i A', strtotime($event_info['time']) ) ?></span>
                            <span class="date"><?php echo date( 'M d, Y', strtotime($event_info['time']) ) ?></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="location-name"><a href="<?php echo esc_url($event_info['location_url']) ?>" target="_blank">
                            <?php echo esc_html($event_info['location_name']) ?></a></td>
                    </tr>
                    <?php if( !empty($event_info['team_name']) ) : ?>
                    <tr>
                        <td class="team-name"><a href="<?php echo esc_url($event_info['team_url']) ?>" target="_blank">
                            <?php echo esc_html($event_info['team_name']) ?></a></td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
<?php endif;
