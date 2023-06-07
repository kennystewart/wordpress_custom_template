<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<title> <?php echo get_bloginfo( "name" ); ?> </title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
		integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
		crossorigin="anonymous" />

<link rel="stylesheet" href="<?php echo get_bloginfo( 'template_directory' ); ?>/style.css" />
<?php wp_head(); ?>
</head>

<body>

<?php get_template_part( 'template-parts/header/site-header' ); ?>

