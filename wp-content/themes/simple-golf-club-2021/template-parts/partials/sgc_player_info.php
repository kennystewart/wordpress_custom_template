<?php
/**
 * Get the player info for the current player and display in a table.
 */
if (function_exists('sgc_player_getinfo')) :
    $player_info = sgc_player_getinfo();
    if( !empty($player_info) && !empty($player_info['phone']) && !empty($player_info['email']) ) :
    ?>
        <div class="sgc-2021-player-info">
            <h4><a href="<?php echo esc_url($player_info['URL']) ?>" target="_blank"><?php echo esc_html($player_info['name']) ?></a></h4>
            <table>
                <tbody>
                    <?php if( !empty($player_info['phone']) ) : ?>
                    <tr>
                        <th><?php _e('Phone', 'simple-golf-club-2021') ?></th>
                        <td class="phone"><a href="phone:<?php echo esc_attr($player_info['phone']) ?>" target="_blank">
                            <?php echo esc_html($player_info['phone']) ?></a></td>
                    </tr>
                    <?php endif; ?>
                    <?php if( !empty($player_info['email']) ) : ?>
                    <tr>
                        <th><?php _e('Email', 'simple-golf-club-2021') ?></th>
                        <td class="email"><a href="mailto:<?php echo esc_attr($player_info['email']) ?>" target="_blank">
                            <?php echo esc_html($player_info['email']) ?></a></td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
<?php endif;
