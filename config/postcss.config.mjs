import "dotenv/config"
import tailwindcss from '@tailwindcss/postcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssUrl from 'postcss-url'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const themeRootDir = path.resolve(__dirname, '..')
const themeName = path.basename(themeRootDir)

let domain = process.env.DOMAIN_LOCAL
if (process.env.NODE_ENV && process.env.NODE_ENV == "production") {
  domain = process.env.DOMAIN
}
const baseUrl = `${domain}/wp-content/themes/${themeName}`

export default {
  plugins: [
    tailwindcss(),
    postcssPresetEnv(),
		postcssUrl({
			url: asset => {
				if (asset.url.startsWith('http') || asset.url.startsWith('/') || asset.url.startsWith('data')) return asset.url

				return `${baseUrl}/${asset.url}`
			}
		})
  ],
};
