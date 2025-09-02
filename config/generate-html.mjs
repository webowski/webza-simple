import fs from "fs"
import path from "path"
import Handlebars from "handlebars"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// paths
const templatesDir = path.join(projectRoot, "src/templates")
const partialsDir = path.join(projectRoot, "src/templates/partials")
const dataFile = path.join(projectRoot, "src/templates/base/data.json")
const outputDir = path.join(projectRoot, "dist")

// dist
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true })
}

// data
const context = JSON.parse(fs.readFileSync( dataFile, "utf8" ))

// partials
function registerPartials(dir, prefix = "partials") {
	fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
		const fullPath = path.join(dir, entry.name)

		if (entry.isDirectory()) {
			registerPartials(fullPath, `${prefix}/${entry.name}`)
		} else if (entry.isFile() && entry.name.endsWith(".hbs")) {
			const name = `${prefix}/${path.basename(entry.name, ".hbs")}`
			const src = fs.readFileSync(fullPath, "utf8")
			Handlebars.registerPartial(name, src)
			// console.log(`🔗 Registered Handlebars partial: ${name}`)
		}
	})
}
if (fs.existsSync(partialsDir)) {
	registerPartials(partialsDir)
}

// compilation
fs.readdirSync(templatesDir).forEach(file => {
	if (file.endsWith(".hbs")) {
		const filePath = path.join(templatesDir, file)
		const templateSrc = fs.readFileSync(filePath, "utf8")

		const template = Handlebars.compile(templateSrc)
		const html = template(context)

		const outPath = path.join(outputDir, file.replace(/\.hbs$/, ".html"))
		fs.writeFileSync(outPath, html, "utf8")

		console.log(`✅ Compiled ${file} → ${outPath}`)
	}
})
