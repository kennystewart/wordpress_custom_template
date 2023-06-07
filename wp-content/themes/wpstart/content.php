<div class="panel panel-default blog-post">
<div class="panel-heading">
	<h3 class="panel-title post-title">

	<?php if( !is_single() ): ?>

		<a href="<?php echo esc_url( get_permalink() ); ?>">
		<?php the_title(); ?>
		</a>

	<?php else:
		the_title();
	endif; ?>

	</h3>

	<p class="post-meta">
	<?php the_date(); ?>
	by <a href="#">
		<?php the_author(); ?>
		</a>
	</p>
</div>

<div class="panel-body">

	<?php if( !is_single() ):
	the_excerpt();
	else:
	the_content();
	endif; ?>

</div>
</div>
