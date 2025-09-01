#!/usr/bin/env node

import favicons from "favicons";
import config from "./favicon.config.mjs";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const inputFile = path.join(projectRoot, "images/favicon/favicon.svg");
const outputDir = path.join(projectRoot, "images", "favicon");

mkdirSync(outputDir, { recursive: true });

const allowedImageNames = [
	"favicon.ico",
	"favicon-16x16.png",
	"favicon-32x32.png",
	"favicon-48x48.png",
	"yandex-browser-50x50.png",
	"android-chrome-144x144.png",
	"android-chrome-192x192.png",
	"android-chrome-512x512.png",
	"apple-touch-icon-180x180.png",
	// "apple-touch-icon.png", // alias к 180x180
	"mstile-150x150.png"
];

favicons(inputFile, config)
	.then(response => {
		// фильтрация изображений
		response.images = response.images.filter(i => allowedImageNames.includes(i.name));

		// фильтрация файлов
		response.files = response.files.filter(f => {
			if (f.name === "manifest.webmanifest") {
				try {
					const manifest = JSON.parse(f.contents.toString());
					manifest.icons = manifest.icons?.filter((icon, i) => {
						manifest.icons[i].src = `/wp-content/themes/webza${icon.src}`
						return ["144x144", "192x192", "512x512"].includes(icon.sizes)
					}) || [];
					f.contents = JSON.stringify(manifest, null, 2);
				} catch (e) {
					console.warn("⚠️ Не удалось обработать site.webmanifest");
				}
				return true;
			} else if (f.name === "yandex-browser-manifest.json") {
				try {
					const manifest = JSON.parse(f.contents.toString());
					manifest.layout.logo = `/wp-content/themes/webza${manifest.layout.logo}`
					f.contents = JSON.stringify(manifest, null, 2);
				} catch (e) {
					console.warn("⚠️ Не удалось обработать yandex-browser-manifest.json");
				}
				return true
			}
			return true;
		});

		// фильтрация HTML
		// !line.includes("favicon.ico") &&
		response.html = response.html.filter(line => (
			!/apple-touch-icon-(?!180x180)/.test(line) &&
			!line.includes("theme-color") &&
			!line.includes("application-name")
		));

		// запись изображений
		response.images.forEach(i => {
			writeFileSync(path.join(outputDir, i.name), i.contents);
		});

		// запись файлов
		response.files.forEach(f => {
			writeFileSync(path.join(outputDir, f.name), f.contents);
		});

		// формирование favicon.php
		const version = Date.now()
		const templateUri = "<?= get_template_directory_uri() ?>";
		const prependPath = html =>
			`\t` + html.replace(/(href|content)=["'](\/?.*?\/([^"']+))["']/g, (_, attr, _path, file) =>
				`${attr}="${templateUri}/images/${file}?v=${version}"`
			);

		const stringBefore = `<?php function webza_favicon_connect() { \n?>`;
		const stringAfter = `<?php\n}\nadd_action('wp_head', 'webza_favicon_connect');`;
		const svgLine = `\t<link rel="icon" href="<?= get_template_directory_uri() ?>/images/favicon/favicon.svg?v=${version}" sizes="any" type="image/svg+xml">`;
		const phpOutput = [
			stringBefore,
			svgLine,
			...response.html.map(prependPath),
			stringAfter
		].join("\n");

		writeFileSync(path.join(outputDir, "favicon.php"), phpOutput);

		console.log("✅ Фавиконки и favicon.php сгенерированы в images/favicon.");
	})
	.catch(err => {
		console.error("❌ Ошибка генерации фавиконок:", err.message);
	});
