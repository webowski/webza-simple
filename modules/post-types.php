<?php
/**
 * Custom Post Types
 */

// Service
function register_post_type_service() {
	$labels = [
		'name' => 'Услуги',
		'singular_name' => 'Услуга',
		'add_new' => 'Добавить услугу',
		'add_new_item' => 'Добавить новую услугу',
		'edit_item' => 'Редактировать услугу',
		'new_item' => 'Новая услуга',
		'all_items' => 'Все услуги',
		'view_item' => 'Просмотр услуг на сайте',
		'search_items' => 'Искать услугу',
		'not_found' =>  'Услуг не найдено.',
		'not_found_in_trash' => 'В корзине нет услуг.',
		'menu_name' => 'Услуги'
	];
	$args = [
		'labels' => $labels,
		'public' => true,
		'menu_icon' => 'dashicons-admin-page',
		'menu_position' => 7,
		'has_archive' => false,
		'supports' => array( 'title', 'thumbnail', 'custom-fields'),
		'rest_base'          => 'services',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
	];
	register_post_type('service', $args);
}
add_action( 'init', 'register_post_type_service' );

add_action( 'acf/init', 'webowski_acf_init' );

function webowski_acf_init() {

	acf_add_local_field_group( [
		'key'      => 'group_service',
		'title'    => 'Услуга',
		'style'    => 'seamless',
		'label_placement' => 'left',
		'instruction_placement' => 'label',
		'fields'   => [
			[
				'key'   => 'field_price',
				'label' => 'Цена от, тыс.р. / $',
				'name'  => 'price',
				'type'  => 'text',
			],
			[
				'key'   => 'field_term',
				'label' => 'Срок от, нед.',
				'name'  => 'term',
				'type'  => 'text',
			],
			[
				'key'   => 'field_text',
				'label' => 'Текст',
				'name'  => 'text',
				'type'  => 'wysiwyg',
			],
			[
				'key'   => 'emphasize_block',
				'label' => 'Выделить блок',
				'name'  => 'show_block',
				'type'  => 'true_false',
				'message' => 'Сделать блок визуально выделяющимся',
				'default_value' => 0,
				'ui' => 1, // 1 — toggle
			]
		],
		'location' => [
			[
				[
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'service',
				],
			],
		],
	] );
}


// Project object
function register_post_type_project() {
	$labels = [
		'name' => 'Проект',
		'singular_name' => 'Проект',
		'add_new' => 'Добавить проект',
		'add_new_item' => 'Добавить новый проект',
		'edit_item' => 'Редактировать проект',
		'new_item' => 'Новый проект',
		'all_items' => 'Все проекты',
		'view_item' => 'Просмотр проектов на сайте',
		'search_items' => 'Искать проект',
		'not_found' =>  'Проектов не найдено.',
		'not_found_in_trash' => 'В корзине нет проектов.',
		'menu_name' => 'Проекты'
	];
	$args = [
		'labels' => $labels,
		'menu_icon' => 'dashicons-admin-page',
		'menu_position' => 7,
		'supports' => array( 'title', 'thumbnail'),
		'rest_base'          => 'projects',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
		'show_in_rest'  => true,
		'show_ui'       => true,
		'public'        => false,
		'has_archive'   => false,
		'publicly_queryable' => false,
		'rewrite'       => false,
	];
	register_post_type('project', $args);
}
add_action( 'init', 'register_post_type_project' );


// Steps
function register_post_type_step() {
	$labels = [
		'name' => 'Порядок',
		'singular_name' => 'Шаг',
		'add_new' => 'Добавить шаг',
		'add_new_item' => 'Добавить новый шаг',
		'edit_item' => 'Редактировать шаг',
		'new_item' => 'Новый шаг',
		'all_items' => 'Все шаги',
		'view_item' => 'Просмотр шагов на сайте',
		'search_items' => 'Искать шаг',
		'not_found' =>  'Шагов не найдено.',
		'not_found_in_trash' => 'В корзине нет шагов.',
		'menu_name' => 'Порядок'
	];
	$args = [
		'labels' => $labels,
		'public' => true,
		'menu_icon' => 'dashicons-admin-page',
		'menu_position' => 7,
		'has_archive' => true,
		'supports' => array( 'title', 'editor', 'excerpt'),
	];
	register_post_type('step', $args);
}
add_action( 'init', 'register_post_type_step' );
