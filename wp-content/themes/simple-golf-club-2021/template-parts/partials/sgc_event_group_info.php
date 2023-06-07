<?php
/**
 * Get the groups for the current event and display them.
 * Integrate player check-in
 */
if (function_exists('sgc_event_getgroups')) :
    $group_list = sgc_event_getgroups();
    if( !empty($group_list) ) :
    ?>
        <div class="sgc-2021-event-groups">
            <h4><?php _e('Groups', 'simple-golf-club-2021') ?></h4>
            <div class="container">
                <?php foreach( $group_list as $group ) : ?>
                <div class="card">
                    <div class="title"><?php echo esc_html($group['name']) ?></div>
                    <div class="players">
                        <table>
                            <?php foreach( $group['players'] as $player ) : ?>
                            <tr class="name"><td><a href="<?php echo esc_url($player['URL']) ?>" target="_blank"><?php echo esc_html($player['name']) ?></a></td></tr>
                            <?php endforeach; ?>
                        </table>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    <?php else: ?>
        <div class="sgc-2021-event-groups no-groups">
            <h4><?php _e('Groups', 'simple-golf-club-2021') ?></h4>
            <p><?php _e('Groups have not been created yet.', 'simple-golf-club-2021') ?></p>
        </div>
    <?php endif; ?>
<?php endif;
