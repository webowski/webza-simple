import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';
import chalk from 'chalk';

const depsIndex = JSON.parse(fs.readFileSync('./config/dependencies.json', 'utf8'));
const depsDir = './dependencies';

for (const depName in depsIndex) {
  const files = depsIndex[depName];
  for (const file of files) {
    const src = path.join('node_modules', depName, file);
    const dest = path.join(depsDir, depName, file);
    fse.ensureDirSync(path.dirname(dest));
    fse.copyFileSync(src, dest);
    console.log(`Copied: ${chalk.blue(dest)}`);
  }
}
