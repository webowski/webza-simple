# Webza
A blank for web application

## Development stack:
* [gulp.js](https://gulpjs.com/)
* [scss](http://sass-lang.com/guide)

## Usage
1. Install with command `npm i`
2. Run gulp with `gulp` command

---

## CSS Naming

```
<div class="SomeBlock SomeBlock--modifier is-stateModifier">
	<div class="SomeBlock__innerBlock"></div>
</div>

<div class="SomeBlock -modifier is-stateModifier">
	<div class="SomeBlock__innerBlock"></div>
</div>
```

+ Block `.SomeBlock` - block. *UpperCamelCase* naming
+ Element `.SomeBlock__innerBlock`. *lowerCamelCase* naming
+ Modifier:
	+ `.SomeBlock--modifier` — custom modifier. *lowerCamelCase* naming
	+ `.is-*` — state (`is-selected`)
	+ `.has-*` — has descendant or inner state (`.has-childInput`)
+ `.do-*` — the prefix used to be a script hook
+ Columns grid `.row`, `.col-*`, `.grid`, `.gutter-*`
+ Utilites
	+ Custom `.u-whatItDoes`. Например, `.u-expandLinkArea`
	+ Atomic
		+ Box relations: `.d-*`, `.justify-*`, `.align-*`
		+ Paddings and margins
			+ `.p-10` `padding: 10px`
			+ `.mx-15` `margin-left: 15px; margin-right: 15px;`
		+ Text: `.text-center`, `.fw-bold`, `.color-major`, `.list-*` (`.fz-14`)
+ Global context classes `.g-*` (`.g-mobile`, `.g-logined`). Adding to `<body>`

## Not allowed
Mix the blocks
`<div class="SomeBlock AnotherBlock"></div>`

---

## Сборка стилей (gulp)
+ `styles`
+ `watch`
+ `browsersync`
+ default (gulp) — minifyjs, minifycss
+ `dev` — `styles + watch + browsersync`
+ `settings.json`

## Adding an icon to the collection
1. put SVG file into folder `images/vector-icons`
2. run `gulp icons`
3. copy a snippet from `images/sprite.symbol.html`

### Adding a stylesheet
+ As a `.css` file
+ As a `.scss` file

### Adding a script
+ As a module
+ As a `.js` file
