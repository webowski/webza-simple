<?php

/**
 * Add custom styles to SVG post image.
 */
function my_custom_inline_admin_styles() {

  $custom_css = <<<CSS
	#postimagediv .inside img[src$=".svg"] {
		width: 200px;
	}
	textarea.code {
		tab-size: 2;
	}
	CSS;

  // Bind to general styles 'wp-admin'
  wp_add_inline_style('wp-admin', $custom_css);
}
add_action('admin_enqueue_scripts', 'my_custom_inline_admin_styles');


/**
 * Custom fields for the 'project' post type
 */
function webowski_meta_box() {
	add_meta_box(
		'global-notice',
		__( 'Project parameters', 'webza' ),
		'webowski_meta_box_callback',
		'project'
	);
}
add_action( 'add_meta_boxes', 'webowski_meta_box' );

function webowski_meta_box_callback( $post ) {

	wp_nonce_field( 'project_type_nonce', 'project_type_nonce' );

	$projectUrl = get_post_meta( $post->ID, '_project_url', true );
	$projectType = get_post_meta( $post->ID, '_project_type', true );
	$projectSubject = get_post_meta( $post->ID, '_project_subject', true );
	$projectRepo = get_post_meta( $post->ID, '_project_repo', true );

	?>
	<div class="form-wrap">
		<div class="form-field">
			<label class="">URL</label>
			<input type="text" style="width:100%" id="project_url" name="project_url" value="<?= esc_attr( $projectUrl ) ?>">
		</div>
		<div class="form-field">
			<label class="">Тип</label>
			<input type="text" style="width:100%" id="project_type" name="project_type" value="<?= esc_attr( $projectType ) ?>">
		</div>
		<div class="form-field">
			<label class="">Предмет</label>
			<input type="text" style="width:100%" id="project_subject" name="project_subject" value="<?= esc_attr( $projectSubject ) ?>">
		</div>
		<div class="form-field">
			<label class="">Ссылка на репозиторий</label>
			<input type="text" style="width:100%" id="project_repo" name="project_repo" value="<?= esc_attr( $projectRepo ) ?>">
		</div>
	</div>
	<?php
}

// When the post is saved, saves the custom data.
function save_webowski_meta_box_data( $post_id ) {

	// check the nonce
	if ( ! isset( $_POST['project_type_nonce'] ) ) {
		return;
	}
	if ( ! wp_verify_nonce( $_POST['project_type_nonce'], 'project_type_nonce' ) ) {
		return;
	}

	// If this is an autosave and our form has not been submitted - don't do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Check permissions
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}

	}
	else {

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}

	// check fields
	if (
		! isset( $_POST['project_type'] ) or
		! isset( $_POST['project_subject'] ) or
		! isset( $_POST['project_url'] ) or
		! isset( $_POST['project_repo'] )
	) {
		return;
	}

	// Sanitize
	$project_url = sanitize_text_field( $_POST['project_url'] );
	$project_type = sanitize_text_field( $_POST['project_type'] );
	$project_subject = sanitize_text_field( $_POST['project_subject'] );
	$project_repo = sanitize_text_field( $_POST['project_repo'] );

	// Update the meta fields
	update_post_meta( $post_id, '_project_url', $project_url );
	update_post_meta( $post_id, '_project_type', $project_type );
	update_post_meta( $post_id, '_project_subject', $project_subject );
	update_post_meta( $post_id, '_project_repo', $project_repo );
}

add_action( 'save_post', 'save_webowski_meta_box_data' );
