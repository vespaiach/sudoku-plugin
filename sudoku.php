<?php
/**
 * Plugin Name: Sudoku
 * Description: Sudoku game plugin for WordPress.
 * Version: 1.0
 * Author: Trinh Nguyen
 */

// Register activation hook to create the custom post type.
register_activation_hook( __FILE__, 'sudoku_register_post_type' );

function sudoku_register_post_type() {
	// Register the 'sudoku' custom post type.
	register_post_type( 'sudoku', [ 
		'labels' => [ 
			'name' => __( 'Sudokus' ),
			'singular_name' => __( 'Sudoku' )
		],
		'public' => true,
		'has_archive' => true,
		'rewrite' => [ 'slug' => 'sudoku' ],
		'supports' => [ 'title', 'editor', 'custom-fields' ]
	] );
}