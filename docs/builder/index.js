const fs = require('fs');
const asciidoctor = require('@asciidoctor/core')();
const fse = require('fs-extra');
const { rimraf } = require('rimraf');

const styleContent = fs.readFileSync('../index.adoc', 'utf-8');
const html = asciidoctor.convert(styleContent, { standalone: true });

rimraf('../dist').then(() => {
  try {
    fs.mkdirSync('../dist');
  } catch (error) {}
  fs.writeFileSync('../dist/index.html', html);
  fs.copyFileSync(
    './node_modules/@asciidoctor/core/dist/css/asciidoctor.css',
    '../dist/asciidoctor.css'
  );
  fse.copySync('../images', '../dist/images');
});
