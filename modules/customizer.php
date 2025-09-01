<?php

function webowski_customize_register( $wp_customize ) {

	if ( ! class_exists( 'Webowski_Textarea_Control' ) ) {
		class Webowski_Textarea_Control extends WP_Customize_Control {
			public $type = 'textarea';

			public function render_content() {
				?>
				<label>
					<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
					<textarea rows="14" style="width:100%;" <?php $this->link(); ?>><?php echo esc_textarea( $this->value() ); ?></textarea>
				</label>
				<?php
			}
		}
	}

	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'webowski_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'webowski_customize_partial_blogdescription',
			)
		);
	}

	/**
	 * Theme Color
	 */
	$wp_customize->add_setting( 'theme-color', [
		'default'   => '#090912',
		'sanitize_callback' => 'sanitize_text_field',
	]);
	$wp_customize->add_control( 'theme-color', [
		'section'  => 'colors',
		'label'    => __( 'The value of the theme-color meta tag in <head>', 'webza' ),
		'type'     => 'text',
	]);


	/**
	 * Metrics Scripts
	 */
	$wp_customize->add_section('webowski_head_scripts_section', array(
			'title'    => __('Вставка скриптов', 'webza'),
			'priority' => 160,
	));
	$wp_customize->add_setting('webowski_head_scripts_code', array(
			'default'           => '',
			'sanitize_callback' => function($input) { return $input; }, // разрешает любые теги
	));
	$wp_customize->add_control(
    new Webowski_Textarea_Control(
        $wp_customize,
        'webowski_head_scripts_code',
        array(
            'label'    => __('Скрипты в <head>', 'webza'),
            'section'  => 'webowski_head_scripts_section',
            'settings' => 'webowski_head_scripts_code',
        )
    )
	);
}
add_action( 'customize_register', 'webowski_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 */
function webowski_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 */
function webowski_customize_partial_blogdescription() {
	bloginfo( 'description' );
}
