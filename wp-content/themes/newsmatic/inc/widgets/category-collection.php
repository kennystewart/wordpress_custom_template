<?php
/**
 * Adds Newsmatic_Category_Collection_Widget widget.
 * 
 * @package Newsmatic
 * @since 1.0.0
 */
class Newsmatic_Category_Collection_Widget extends WP_Widget {
    /**
     * Register widget with WordPress.
     */
    public function __construct() {
        parent::__construct(
            'newsmatic_category_collection_widget',
            esc_html__( 'Newsmatic : Category Collection', 'newsmatic' ),
            array( 'description' => __( 'A collection of post categories.', 'newsmatic' ) )
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
        $posts_categories = isset( $instance['posts_categories'] ) ? $instance['posts_categories'] : '';
        echo wp_kses_post($before_widget);
            if ( ! empty( $widget_title ) ) {
                echo $before_title . esc_html( $widget_title ) . $after_title;
            }
    ?>
            <div class="categories-wrap layout-one">
                <?php
                if( $posts_categories != '[]' ) {
                    $postCategories = get_categories( array( 'slug' => explode( ",", $posts_categories ) ) );
                } else {
                    $postCategories = get_categories();
                }
                    foreach( $postCategories as $cat ) :
                        $cat_name = $cat->name;
                        $cat_count = $cat->count;
                        $cat_slug = $cat->slug;
                        $cat_id = $cat->cat_ID;
                        $widget_post = new WP_Query( 
                            array( 
                                'category_name'    => esc_html( $cat_slug ),
                                'posts_per_page' => 1,
                                'meta_query' => array(
                                    array(
                                     'key' => '_thumbnail_id',
                                     'compare' => 'EXISTS'
                                    ),
                                ),
                                'ignore_sticky_posts'    => true
                            )
                        );
                        $thumbnail_url = '';
                        if( $widget_post->have_posts() ) :
                            while( $widget_post->have_posts() ) : $widget_post->the_post();
                                $thumbnail_url = get_the_post_thumbnail_url();
                            endwhile;
                            wp_reset_postdata();
                        endif;
                ?>
                        <div class="post-thumb post-thumb category-item cat-<?php echo esc_attr( $cat_id ); ?>">
                            <?php if( $thumbnail_url ) : ?>
                                <img src="<?php echo esc_url( $thumbnail_url ); ?>" loading="<?php newsmatic_lazy_load_value(); ?>">
                            <?php endif; ?>
                            <a class="cat-meta-wrap" href="<?php echo esc_url( get_term_link( $cat_id ) ); ?>">
                                <div class="cat-meta newsmatic-post-title">
                                    <?php
                                        echo '<span class="category-name">'.esc_html( $cat_name ).'</span>';
                                        echo '<span class="category-count">';
                                        echo absint( $cat_count );
                                    ?>
                                        <span class="news_text">
                                            <?php echo esc_html__( 'News', 'newsmatic' ); ?>
                                        </span>
                                    <?php
                                        echo '</span>';
                                    ?>
                                </div>
                            </a>
                        </div>
                <?php
                    endforeach;
                ?>
            </div>
    <?php
        echo wp_kses_post($after_widget);
    }

    /**
     * Widgets fields
     * 
     */
    function widget_fields() {
        $postCategories = get_categories();
        foreach( $postCategories as $category ) :
            $categories_options[$category->slug] = $category->name. ' (' .$category->count. ') ';
        endforeach;
        return array(
                array(
                    'name'      => 'widget_title',
                    'type'      => 'text',
                    'title'     => esc_html__( 'Widget Title', 'newsmatic' ),
                    'description'=> esc_html__( 'Add the widget title here', 'newsmatic' ),
                    'default'   => esc_html__( 'Category Collection', 'newsmatic' )
                ),
                array(
                    'name'      => 'posts_categories',
                    'type'      => 'multicheckbox',
                    'title'     => esc_html__( 'Post Categories', 'newsmatic' ),
                    'description'=> esc_html__( 'Choose the categories to display', 'newsmatic' ),
                    'options'   => $categories_options
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
 
} // class Newsmatic_Category_Collection_Widget