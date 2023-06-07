<?php
/**
 * Adds Newsmatic_Author_Info_Widget widget.
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
class Newsmatic_Author_Info_Widget extends WP_Widget {
    /**
     * Register widget with WordPress.
     */
    public function __construct() {
        parent::__construct(
            'newsmatic_author_info_widget',
            esc_html__( 'Newsmatic : Author Info', 'newsmatic' ),
            array( 'description' => __( 'The information of  in detail author.', 'newsmatic' ) )
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
        $author_type = isset( $instance['author_type'] ) ? $instance['author_type'] : 'custom';
        $widget_title = isset( $instance['widget_title'] ) ? $instance['widget_title'] : '';
        $author_name = isset( $instance['author_name'] ) ? $instance['author_name'] : '';
        $author_image = isset( $instance['author_image'] ) ? $instance['author_image'] : '';
        $author_tag = isset( $instance['author_tag'] ) ? $instance['author_tag'] : '';
        $author_desc = isset( $instance['author_desc'] ) ? $instance['author_desc'] : '';
        $author_url = isset( $instance['author_url'] ) ? $instance['author_url'] : '';

        if( $author_type != 'custom' ) {
            $author_id = str_replace( 'author-', '', $author_type );
            $author_tag = get_the_author_meta( 'user_nicename', $author_id );
            $author_name = get_the_author_meta( 'display_name', $author_id );
            $author_desc = get_the_author_meta( 'description', $author_id );
        }
        
        echo wp_kses_post( $before_widget );
            if ( ! empty( $widget_title ) ) {
                echo wp_kses_post( $before_title ) . esc_html( $widget_title ) . wp_kses_post( $after_title );
            }
    ?>
            <div class="post-card author-wrap layout-one">
                <div class="bmm-author-thumb-wrap">
                    <figure class="post-thumb post-thumb">
                        <?php
                            if( $author_type == 'custom' ) {
                                if( $author_image ) {
                                    ?>
                                        <a href="<?php echo esc_url( $author_url ); ?>"><img src="<?php echo esc_url( $author_image ); ?>" loading="<?php newsmatic_lazy_load_value(); ?>"></a>
                                <?php }
                            } else {
                                $author_id = str_replace( 'author-', '', $author_type );
                                echo wp_kses_post( get_avatar($author_id, 125) );
                            }
                        ?> 
                    </figure>
                    <?php
                        if( $author_tag ) {
                            echo '<span class="author-tag">' .esc_html( $author_tag ). '</span>';
                        }
                    ?> 
                </div>
                <div class="author-content-wrap">
                    <?php
                        if( $author_name ) {
                    ?>
                            <h2 class="author-name"><a href="<?php echo esc_url( $author_url ); ?>"><?php echo esc_html( $author_name ); ?></a></h2>
                    <?php
                        }
                        if( $author_desc ) {
                    ?>
                            <div class="author-desc"><?php echo esc_html( $author_desc ); ?></div>
                    <?php
                        }
                    ?>
                </div>
            </div>
    <?php
        echo wp_kses_post( $after_widget );
    }

    /**
     * Widgets fields
     * 
     */
    function widget_fields() {
        $admin_users = get_users(array( 'role__not_in' => 'subscriber', 'fields'  => array('ID','display_name')) );
        $admin_users_options['custom'] = esc_html__( 'Custom', 'newsmatic' );
        if( $admin_users ) {
            foreach( $admin_users as $admin_user ) {
                $admin_users_options['author-' . $admin_user->ID] = $admin_user->display_name;
            }
        }
        return array(
                array(
                    'name'      => 'author_type',
                    'type'      => 'select',
                    'title'     => esc_html__( 'Author To Display', 'newsmatic' ),
                    'description' => esc_html__( 'Custom will allow you to display below custom content to add.', 'newsmatic' ),
                    'options'   => $admin_users_options
                ),
                array(
                    'name'      => 'widget_title',
                    'type'      => 'text',
                    'title'     => esc_html__( 'Widget Title', 'newsmatic' ),
                    'description'=> esc_html__( 'Add the widget title here', 'newsmatic' ),
                    'default'   => esc_html__( 'Author Info', 'newsmatic' )
                ),
                array(
                    'name'      => 'author_name',
                    'type'      => 'text',
                    'title'     => esc_html__( 'Author Name', 'newsmatic' ),
                    'default'   => esc_html__( 'Author Name', 'newsmatic' )
                ),
                array(
                    'name'      => 'author_image',
                    'type'      => 'upload',
                    'title'     => esc_html__( 'Author Image', 'newsmatic' )
                ),
                array(
                    'name'      => 'author_tag',
                    'type'      => 'text',
                    'title'     => esc_html__( 'Author Tag', 'newsmatic' ),
                    'default'   => esc_html__( 'Writer', 'newsmatic' )
                ),
                array(
                    'name'      => 'author_url',
                    'type'      => 'url',
                    'title'     => esc_html__( 'Author URL', 'newsmatic' ),
                ),
                array(
                    'name'      => 'author_desc',
                    'type'      => 'textarea',
                    'title'     => esc_html__( 'Description', 'newsmatic' ),
                    'default'   => esc_html__( 'Lorem ipsum is simply dummy text', 'newsmatic' )
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
 
} // class Newsmatic_Author_Info_Widget