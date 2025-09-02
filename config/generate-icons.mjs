import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { globby } from 'globby'
import SVGSpriter from 'svg-sprite'

const config = {
  dest: '.', // output root dir
  mode: {
    symbol: {
      dest: '',
      sprite: 'dist/images/icons.min.svg',
      example: false
    }
  },
  shape: {
    id: {
      generator: 'icon-%s'
    },
    transform: ['svgo']
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
}

const spriter = new SVGSpriter(config)

// scan svg files
const svgFiles = await globby('src/images/icons/*.svg')

for (const file of svgFiles) {
  const content = readFileSync(file, 'utf-8')
  spriter.add(resolve(file), null, content)
}

// Compile
const { result } = await spriter.compileAsync()

// Write
for (const mode of Object.values(result)) {
  for (const resource of Object.values(mode)) {
    mkdirSync(dirname(resource.path), { recursive: true })
    writeFileSync(resource.path, resource.contents)
    console.log('✅ written:', resource.path)
  }
}
