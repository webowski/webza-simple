<?php

/**
 * Author, user
 */
// убирает /author/<username>
add_action('template_redirect', function () {
    if (is_author()) {
        wp_redirect(home_url(), 301);
        exit;
    }
    if (preg_match('#^/wp-sitemap-users-1\\.xml$#', $_SERVER['REQUEST_URI'])) {
        // global $wp_query;
        // $wp_query->set_404();
        // status_header(404);
        // nocache_headers();
        // include get_query_template('404');
        // exit;

        wp_redirect(home_url('/'), 301);
        exit;
    }
});

// убирает REST эндпоинт автора и авторов
add_filter('rest_endpoints', function($endpoints) {
    if (isset($endpoints['/wp/v2/users'])) {
        unset($endpoints['/wp/v2/users']);
    }
    if (isset($endpoints['/wp/v2/users/(?P<id>[\\d]+)'])) {
        unset($endpoints['/wp/v2/users/(?P<id>[\\d]+)']);
    }
    return $endpoints;
});

// Удалить поле author из REST-ответа постов/страниц:
function remove_author_from_rest($response, $post, $request) {
    if (isset($response->data['author'])) {
        unset($response->data['author']);
    }
    return $response;
}
add_filter('rest_prepare_page', 'remove_author_from_rest', 10, 3);
add_filter('rest_prepare_post', 'remove_author_from_rest', 10, 3);

// удалит /wp-sitemap-users-1.xml и /wp-sitemap.xml → блок авторов.
add_filter('wp_sitemaps_add_provider', function($provider, $name) {
    if ($name === 'users') {
        return false;
    }
    return $provider;
}, 10, 2);


/**
 * Post
 */
// Полное отключение REST для post
// add_filter('rest_endpoints', function ($endpoints) {
//     unset($endpoints['/wp/v2/posts']);
//     unset($endpoints['/wp/v2/posts/(?P<id>[\d]+)']);
//     return $endpoints;
// });
add_filter('register_post_type_args', function ($args, $post_type) {
    if ($post_type === 'post') {
        $args['show_in_rest'] = false;
    }
    return $args;
}, 10, 2);

// Убирает post из поиска и архивов:
add_action('pre_get_posts', function ($query) {
    if (!is_admin() && $query->is_main_query() && (is_home() || is_search() || is_archive())) {
        $query->set('post_type', ['post']); // Например: ['post', 'project', 'service']
    }
});
// Отключит wp-sitemap-posts-post-1.xml и уберёт post из wp-sitemap.xml.
add_filter('wp_sitemaps_post_types', function ($post_types) {
    unset($post_types['post']); // Удаляем только post
    return $post_types;
});
// не удаляет сам файл wp-sitemap-taxonomies-category-1.xml, но делает его пустым, если в нём только категории, относящиеся к post-type 'post'
add_filter('wp_sitemaps_taxonomies_data', function ($data, $taxonomy, $object_subtype) {
    if ($taxonomy === 'category' && $object_subtype === 'post') {
        return []; // полностью убирает категории, связанные с post
    }
    return $data;
}, 10, 3);
// редирект или 404 для определённой рубрики
add_action('template_redirect', function () {
    if (is_category()) {
        $category = get_queried_object();

        if ($category && isset($category->term_id) && $category->term_id === 1) {
            // Вариант 1: вернуть 404
            // global $wp_query;
            // $wp_query->set_404();
            // status_header(404);
            // nocache_headers();
            // include get_query_template('404');
            // exit;

            // Вариант 2: редирект на главную
            wp_redirect(home_url('/en/'), 301);
            exit;
        }
        if ($category && isset($category->term_id) && $category->term_id === 7  ) {
            wp_redirect(home_url('/'), 301);
            exit;
        }
    }
});


// Редирект на главную со страниц постов (single)
add_action('template_redirect', function () {
    $post_types_to_redirect = ['post', 'project', 'example', 'service'];

    if (is_single() && in_array(get_post_type(), $post_types_to_redirect, true)) {
        wp_redirect(home_url('/'), 301);
        exit;
    }
});
