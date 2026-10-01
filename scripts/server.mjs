import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {extname,join,normalize} from 'node:path';
const root=process.argv[2]||'.', port=Number(process.env.PORT||4173), types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'};
createServer(async(req,res)=>{try{let path=normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');if(path==='/'||path==='.')path='/index.html';let file=join(root,path);try{if((await stat(file)).isDirectory())file=join(file,'index.html')}catch{file=join(root,'index.html')}const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body)}catch{res.writeHead(404);res.end('Not found')}}).listen(port,'0.0.0.0',()=>console.log(`Cello Practice Lab: http://0.0.0.0:${port}`));
