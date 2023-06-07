<?php
/**
 * Get the players for the current event and display them in a table.
 * Integrate player check-in
 */
if (function_exists('sgc_event_getplayers')) :
    $player_list = sgc_event_getplayers();
    if( !empty($player_list) ) :
    ?>
        <div class="sgc-2021-event-players" id="event_player_checkin" event_id="<?php echo get_the_id() ?>">
            <h4><?php _e('Player Roster', 'simple-golf-club-2021') ?></h4>
            <?php if( !array_key_exists('status', $player_list) ) : ?>
            <table>
                <thead>
                    <tr>
                        <th><?php _e('Player', 'simple-golf-club-2021') ?></th>
                        <th><?php _e('Attending?', 'simple-golf-club-2021') ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach( $player_list as $player ) : ?>
                    <tr>
                        <td class="player-name"><a href="<?php echo esc_url($player['URL']) ?>" target="_blank">
                            <?php echo esc_html($player['name']) ?></a></td>
                        <td class="checkin-status">
                            <?php
                                $rest_url = get_option('siteurl') 
                                            . '/wp-json/simplegolfclub/v1/event/checkin/' 
                                            . get_the_id() . '/' . $player['ID'] 
                                            . '?email=' . $player['email']
                                            . '&phone=' . $player['phone'];
                            ?>
                            <a href="<?php echo esc_url($rest_url) ?>" 
                                id="player_checkin_<?php echo esc_attr($player['ID']) ?>" 
                                sgc_tc_player_id="<?php echo esc_attr($player['ID']) ?>"
                                sgc_tc_player_email="<?php echo esc_attr($player['email']) ?>"
                                sgc_tc_player_phone="<?php echo esc_attr($player['phone']) ?>"
                                >
                                    <?php ( $player['checkedin'] === 'true' ) ? _e('Yes', 'simple-golf-club-2021') : _e('No', 'simple-golf-club-2021'); ?>
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php else: ?>
            <p><?php _e( 'No players have been added to this event.', 'simple-golf-club-2021' ) ?>
            <?php endif; ?>
        </div>
        
    <?php endif; ?>
<?php endif;
