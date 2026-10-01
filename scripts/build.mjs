import {cp, mkdir, rm, writeFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist/src',{recursive:true});
await Promise.all([cp('index.html','dist/index.html'),cp('src/app.js','dist/src/app.js'),cp('src/core.js','dist/src/core.js'),cp('src/styles.css','dist/src/styles.css'),cp('public','dist',{recursive:true})]);
await writeFile('dist/.nojekyll','');
console.log('Production build written to dist/');
