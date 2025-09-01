import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { globby } from 'globby';
import SVGSpriter from 'svg-sprite';

// Конфигурация
const config = {
  dest: '.', // корневая директория вывода
  mode: {
    symbol: {
      dest: '',
      sprite: 'images/icons.min.svg',
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
};

const spriter = new SVGSpriter(config);

// Сканируем SVG-файлы
const svgFiles = await globby('images/icons/*.svg');

for (const file of svgFiles) {
  const content = readFileSync(file, 'utf-8');
  spriter.add(resolve(file), null, content);
}

// Компилируем
const { result } = await spriter.compileAsync();

// Записываем результат
for (const mode of Object.values(result)) {
  for (const resource of Object.values(mode)) {
    mkdirSync(dirname(resource.path), { recursive: true });
    writeFileSync(resource.path, resource.contents);
    console.log('✅ written:', resource.path);
  }
}
