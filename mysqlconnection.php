<?php
/**
 * Plugin Name: Image Drag and Drop
 * Description: Drag and drop image/video on page 
 * Version: 1.0.0
 * Author: vijayabal
 */
add_action('wp_enqueue_scripts', 'drag_drop_enqueue_scripts');

function drag_drop_enqueue_scripts() {
	
	wp_enqueue_style( 'maincss', plugins_url( '/css/style.css', __FILE__ ) );

	wp_enqueue_script( 'jqueryjs', plugins_url( '/js/jquery.js', __FILE__ ));
	
	wp_enqueue_script( 'dragjs', plugins_url( '/js/drag-drop.js', __FILE__ ), array('jqueryjs'), '1.0', true );
		
	wp_localize_script( 'dropjs', 'ajaxurl', array(
		'ajax_url' => admin_url( 'admin-ajax.php' )
	));
}
function drag_drop_shortcode() { 
	include("image_video_upload_file.php");
}
add_shortcode('dropdrag_shortcode_page', 'drag_drop_shortcode'); 
?>