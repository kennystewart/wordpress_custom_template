<?php
/**
 * Adds Newsmatic_Popular_Posts_Widget widget.
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
class Newsmatic_Popular_Posts_Widget extends WP_Widget {
    /**
     * Register widget with WordPress.
     */
    public function __construct() {
        parent::__construct(
            'newsmatic_popular_posts_widget',
            esc_html__( 'Newsmatic : Popular Posts Slider', 'newsmatic' ),
            array( 'description' => __( 'A collection of popular posts from specific category.', 'newsmatic' ) )
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
        $posts_category = isset( $instance['posts_category'] ) ? $instance['posts_category'] : '';
        $slider_auto = isset( $instance['slider_auto'] ) ? $instance['slider_auto'] : true;
        
        echo wp_kses_post($before_widget);
            // Slider direction
            $newsmatic_slider = 'newsmatic_vertical_slider';
            ?>
            <div class="newsmatic-widget-popular-posts <?php echo esc_attr($newsmatic_slider); ?> <?php if(empty($widget_title)) echo esc_attr('no_heading_widget');?>">
                <?php if ($widget_title ): ?>
                    <h2 class="widget-title">
                        <span><?php echo esc_html($widget_title); ?></span>
                    </h2>
                <?php endif; ?>
                <div class="popular-posts-wrap" data-auto="<?php echo esc_attr( json_encode( $slider_auto ) ); ?>" data-arrows="true" data-loop="true" data-vertical="vertical">
                    <?php
                        $popular_posts_args = array( 
                                    'numberposts' => -1,
                                    'category_name' => esc_html( $posts_category )
                                );
                        if( empty( $posts_category ) ) $popular_posts_args['numberposts'] = 8;
                        $popular_posts = get_posts( $popular_posts_args );
                        if( $popular_posts ) :
                            $total_posts = sizeof($popular_posts);
                            foreach( $popular_posts as $popular_post_key => $popular_post ) :
                                $popular_post_id  = $popular_post->ID;
                            ?>
                                    <article class="post-item newsmatic-category-no-bk <?php if(!has_post_thumbnail($popular_post_id)){ echo esc_attr('no-feat-img');} ?>">
                                        <figure class="post-thumb">
                                            <span class="post-count"><?php echo absint( $popular_post_key+1 ); ?></span>
                                            <?php if( has_post_thumbnail($popular_post_id) ): ?> 
                                                <a href="<?php echo esc_url(get_the_permalink($popular_post_id)); ?>">
                                                    <img src="<?php echo esc_url( get_the_post_thumbnail_url($popular_post_id, 'newsmatic-thumb') ); ?>"/>
                                                </a>
                                            <?php endif; ?>
                                        </figure>
                                        <div class="post-element">
                                            <h2 class="post-title"><a href="<?php the_permalink($popular_post_id); ?>"><?php echo wp_kses_post( get_the_title($popular_post_id) ); ?></a></h2>
                                            <div class="post-meta">
                                                <?php newsmatic_get_post_categories($popular_post_id,2); ?>
                                            </div>
                                        </div>
                                    </article>
                            <?php
                            endforeach;
                        endif;
                    ?>
                </div>
            </div>
    <?php
        echo wp_kses_post($after_widget);
    }

    /**
     * Widgets fields
     * 
     */
    function widget_fields() {
        $categories = get_categories();
        $categories_options[''] = esc_html__( 'Select category', 'newsmatic' );
        foreach( $categories as $category ) :
            $categories_options[$category->slug] = $category->name. ' (' .$category->count. ') ';
        endforeach;
        return array(
                array(
                    'name'      => 'widget_title',
                    'type'      => 'text',
                    'title'     => esc_html__( 'Widget Title', 'newsmatic' ),
                    'description'=> esc_html__( 'Add the widget title here', 'newsmatic' ),
                    'default'   => esc_html__( 'Popular News', 'newsmatic' )
                ),
                array(
                    'name'      => 'posts_category',
                    'type'      => 'select',
                    'title'     => esc_html__( 'Categories', 'newsmatic' ),
                    'description'=> esc_html__( 'Choose the category to display for popular posts', 'newsmatic' ),
                    'options'   => $categories_options
                ),
                array(
                    'name'      => 'slider_auto',
                    'type'      => 'checkbox',
                    'title'     => esc_html__( 'Enable slider item to auto slide', 'newsmatic' ),
                    'default'   => true
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
 
} // class Newsmatic_Popular_Posts_Widget