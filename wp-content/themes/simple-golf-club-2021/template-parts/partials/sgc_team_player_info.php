<?php
/**
 * Get the players for the current team and display them as a table.
 */
if (function_exists('sgc_team_getplayers')) :
    $player_list = sgc_team_getplayers();
    if( !empty($player_list) ) :
    ?>
        <div class="sgc-2021-team-players">
            <h4><?php _e('Player Roster', 'simple-golf-club-2021') ?></h4>
            <table>
                <tbody>
                    <?php foreach( $player_list as $player ) : ?>
                    <tr>
                        <td class="name"><a href="<?php echo esc_url($player['URL']) ?>" target="_blank"><?php echo esc_html($player['name']) ?></a></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
<?php endif;
