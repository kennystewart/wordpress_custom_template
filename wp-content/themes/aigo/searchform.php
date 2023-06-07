<form action="http://localhost/first-own-template/" method="get" class="widget-form" role="search">
    <input type="search" class="form-control" placeholder="Search..."
           name="s" id="s" value="<?php echo esc_html( get_search_query( false ) ); ?>"/>
    <input type="hidden" name="post_type" value="post" />
    <!-- <input type="hidden" value="1" name="sentence" />
    <input type="hidden" value="product" name="post_type" /> -->



    <button type="submit" id="searchsubmit">
        <i class="fa fa-search"></i>
    </button>
</form>
