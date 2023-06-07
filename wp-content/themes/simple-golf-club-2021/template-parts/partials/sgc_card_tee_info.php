<?php
/**
 * Get the tees for the current event and display them in a tabbed format.
 */
$units = (get_option('sgc_default_units') === 'imperial') ? __('Yards', 'simple-golf-club-2021') : __('Meters', 'simple-golf-club-2021');

$tee_list = null;
switch($sgc_postType) {
    case 'sgc_location' :
        $tee_list = sgc_location_gettees();
        (function_exists('sgc_location_gettees')) ? $tee_list = sgc_location_gettees() : null ;
        break;
    case 'sgc_event' :
        (function_exists('sgc_event_gettees')) ? $tee_list = sgc_event_gettees() : null ;
        break;
}

if( !empty($tee_list) && !array_key_exists('status', $tee_list) ) :
?>
    <div class="sgc-2021-tees-info">
        <div class="tabs">
            <?php
            foreach ($tee_list as $index => $tee) :
                ?>
                <div class="tab">
                    <input type="radio" id="tab-<?php echo $index ?>" name="tee_list" checked>
                    <label for="tab-<?php echo $index ?>"><?php echo esc_html($tee->color) ?> (<?php echo esc_html($tee->difficulty) ?>)</label>
                    <div class="content">
                        <div class="stats">
                            <div class="par"><?php _e('Par:', 'simple-golf-club-2021') ?> <?php echo esc_html($tee->average_par) ?></div>
                            <div class="rating"><?php _e('Rating:', 'simple-golf-club-2021') ?> <?php echo esc_html($tee->average_rating) ?></div>
                            <div class="slope"><?php _e('Slope:', 'simple-golf-club-2021') ?> <?php echo esc_html($tee->average_slope) ?></div>
                        </div>
                        <div class="tees">
                            <div class="frontnine">
                                <h4><?php _e('Front Nine', 'simple-golf-club-2021') ?></h4>
                                <table>
                                    <tbody>
                                        <tr class="hole">
                                            <th><?php _e('Hole', 'simple-golf-club-2021') ?></th>
                                            <?php for ($i = 1; $i <= 9; $i++): ?>
                                                <th><?php echo $i ?></th>
                                            <?php endfor; ?>
                                        </tr>
                                        <tr class="par">
                                            <th><?php _e('Par', 'simple-golf-club-2021') ?></th>
                                            <?php for ($i = 0; $i < 9; $i++): ?>
                                                <td><?php echo esc_html($tee->par[$i]) ?></td>
                                            <?php endfor; ?>
                                        </tr>
                                        <tr class="rating">
                                            <th><?php _e('Rating', 'simple-golf-club-2021') ?></th>
                                            <?php for ($i = 0; $i < 9; $i++): ?>
                                                <td><?php echo esc_html($tee->rating[$i]) ?></td>
                                            <?php endfor; ?>
                                        </tr>
                                        <tr class="length">
                                            <th><?php echo $units ?></th>
                                            <?php for ($i = 0; $i < 9; $i++): ?>
                                                <td><?php echo esc_html($tee->length[$i]) ?></td>
                                            <?php endfor; ?>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="backnine">
                                <h4><?php _e('Back Nine', 'simple-golf-club-2021') ?></h4>
                                <table>
                                    <tbody>
                                        <tr class="hole">
                                            <th><?php _e('Hole', 'simple-golf-club-2021') ?></th>
                                            <?php for ($i = 10; $i <= 18; $i++): ?>
                                                <th><?php echo $i ?></th>
                                            <?php endfor; ?>
                                        </tr>
                                        <tr class="par">
                                            <th><?php _e('Par', 'simple-golf-club-2021') ?></th>
                                            <?php for ($i = 9; $i < 18; $i++): ?>
                                                <td><?php echo esc_html($tee->par[$i]) ?></td>
                                            <?php endfor; ?>
                                        </tr>
                                        <tr class="rating">
                                            <th><?php _e('Rating', 'simple-golf-club-2021') ?></th>
                                            <?php for ($i = 9; $i < 18; $i++): ?>
                                                <td><?php echo esc_html($tee->rating[$i]) ?></td>
                                            <?php endfor; ?>
                                        </tr>
                                        <tr class="length">
                                            <th><?php echo $units ?></th>
                                            <?php for ($i = 9; $i < 18; $i++): ?>
                                                <td><?php echo esc_html($tee->length[$i]) ?></td>
                                            <?php endfor; ?>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> 
                </div>
            <?php endforeach;  ?>
        </div>
    </div>
<?php endif; ?>
