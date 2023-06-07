<?php
/**
 * Get the teams for the current player and display them as a table.
 */
if (function_exists('sgc_player_getteams')) :
    $team_list = sgc_player_getteams();
    if( !empty($team_list) ) :
        // make sure we have the local server timezone
        date_default_timezone_set( get_option('timezone_string') );
    ?>
        <div class="sgc-2021-team-info">
            <h4><?php _e('Teams', 'simple-golf-club-2021') ?></h4>
            <table>
                <tbody>
                    <?php foreach( $team_list as $team ) : ?>
                    <tr>
                        <td class="name"><a href="<?php echo esc_url($team['URL']) ?>" target="_blank"><?php echo esc_html($team['name']) ?></a></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
<?php endif;
