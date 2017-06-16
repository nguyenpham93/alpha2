<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */
?><!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?> xmlns:fb="http://ogp.me/ns/fb#">
<!--<![endif]-->
<head>
<link rel="shortcut icon" href="<?php echo get_option('9GAG_faviconurl'); ?>">
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 */
	global $page, $paged;

	wp_title( '|', true, 'right' );

	// Add the blog name.
	bloginfo( 'name' );

	// Add the blog description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";

	// Add a page number if necessary:
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'twentyeleven' ), max( $paged, $page ) );

	?></title>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script type="text/javascript" src=<?php bloginfo( 'url'); ?>/wp-content/themes/twentyeleven/js/jquery.js></script>
<script type="text/javascript">
function toggleDiv(divid){
  
  x = document.getElementById(divid).style;
      
      
    if(x.display == 'none' || x.display == ''){
      x.display = 'block';     
    }else{
      x.display = 'none';
    }
    
  }
</script> 
<script type="text/javascript">
$(document).ready(function() {
	if(location.pathname != "/") {
		$('#secondary_menu a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
	} else $('#secondary_menu a:eq(0)').addClass('active');
});
</script>
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
<?php
	/* We add some JavaScript to pages with the comment form
	 * to support sites with threaded comments (when in use).
	 */
	if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );

	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>
<?php echo get_option('9GAG_analyticscode'); ?>
</head>

<body <?php body_class(); ?>>
<script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" 
        type="text/javascript">
</script>
<div id="fb-root"></div>

<div id="wrap_bar">
	<div id="search_bar" style="">
		<div id="search_wrap">
			<div id="search_placeholder">
				<div id="search_background"><?php get_search_form(); ?></div>
			</div>
		</div>
	</div>
	<div id="head_bar">
		<div id="head_bar_wrap">
			<h1 id="logo_place"><a href="<?php echo home_url(); ?>"><?php echo get_bloginfo('name'); ?></a></h1>
			<div id="social_share"><?php echo '<a href="https://twitter.com/' . get_option('9GAG_twittername', 'Original_EXE') . '"'; ?> class="twitter-follow-button" data-show-count="false">Follow @<?php echo get_option('9GAG_twittername', 'OriginalEXE'); ?></a></div>
			<div id="main_navigation"><?php wp_nav_menu( array( 'theme_location' => 'menu-1' ) ); ?></div>
			<div id="second_navigation">
				<ul>
					<li id="invisible"></li>
					<li><div id="search_toggle" onclick="toggleDiv('search_bar');"></div></li>
				</ul>
				
			</div>
		</div>
	</div>
</div>
<div id="featured_bar">
</div>
<div id="secondary_menu_wrap">
	<div id="secondary_shadow">
		<div id="secondary_menu"><?php wp_nav_menu( array( 'theme_location' => 'menu-2' ) ); ?></div>
	</div>
</div>
<div id="page" class="hfeed">
	
	<div id="main">