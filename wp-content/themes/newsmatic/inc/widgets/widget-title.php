<?php
/**
 * Adds Newsmatic_Widget_Title_Widget widget.
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
class Newsmatic_Widget_Title_Widget extends WP_Widget {
    /**
     * Register widget with WordPress.
     */
    public function __construct() {
        parent::__construct(
            'newsmatic_widget_title_widget',
            esc_html__( 'Newsmatic : Widget Title', 'newsmatic' ),
            array( 'description' => __( 'Theme custom widget title.', 'newsmatic' ) )
        );
    }

    /**
     * Front-end display of widget.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     */
    public function widget( $args, $instance ) {
        extract( $args );
        $widget_title = isset( $instance['widget_title'] ) ? $instance['widget_title'] : '';
        $widget_title_align = isset( $instance['widget_title_align'] ) ? $instance['widget_title_align'] : '';
        echo wp_kses_post($before_widget);
        ?>
            <h2 class="newsmatic-widget-title <?php echo esc_attr( 'align--' . $widget_title_align ); ?>">
                <span><?php echo newsmatic_wrap_last_word( $widget_title ); ?></span>
            </h2>
        <?php
        echo wp_kses_post($after_widget);
    }

    /**
     * Widgets fields
     * 
     */
    function widget_fields() {
        return array(
                array(
                    'name'      => 'widget_title',
                    'type'      => 'text',
                    'title'     => esc_html__( 'Custom Widget Title', 'newsmatic' ),
                    'description'=> esc_html__( 'Add the widget title here.', 'newsmatic' ),
                    'default'   => esc_html__( 'Latest News', 'newsmatic' )
                ),
                array(
                    'name'      => 'widget_title_align',
                    'type'      => 'select',
                    'title'     => esc_html__( 'Text Align', 'newsmatic' ),
                    'description'=> esc_html__( 'change the alignment of the wiget title text.', 'newsmatic' ),
                    'options'   => array(
                        'left'  => esc_html__( 'Left', 'newsmatic' ),
                        'center'=> esc_html__( 'Center', 'newsmatic' ),
                        'right' => esc_html__( 'Right', 'newsmatic' )
                    )
                )
            );
    }

    /**
     * Back-end widget form.
     *
     * @see WP_Widget::form()
     *
     * @param array $instance Previously saved values from database.
     */
    public function form( $instance ) {
        $widget_fields = $this->widget_fields();
        foreach( $widget_fields as $widget_field ) :
            if ( isset( $instance[ $widget_field['name'] ] ) ) {
                $field_value = $instance[ $widget_field['name'] ];
            } else if( isset( $widget_field['default'] ) ) {
                $field_value = $widget_field['default'];
            } else {
                $field_value = '';
            }
            newsmatic_widget_fields( $this, $widget_field, $field_value );
        endforeach;
    }
 
    /**
     * Sanitize widget form values as they are saved.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update( $new_instance, $old_instance ) {
        $instance = $old_instance;
        $widget_fields = $this->widget_fields();
        if( ! is_array( $widget_fields ) ) {
            return $instance;
        }
        foreach( $widget_fields as $widget_field ) :
            $instance[$widget_field['name']] = newsmatic_sanitize_widget_fields( $widget_field, $new_instance );
        endforeach;
        return $instance;
    }
} // class Newsmatic_Widget_Title_Widget