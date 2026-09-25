import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const inventory=JSON.parse(await fs.readFile('assets-source/portfolio-review/inventory.json','utf8'));
const entries=inventory.flatMap(p=>p.entries.map(e=>({...e,project:p.name})));
const selections={
 'alfredo-seixas':[86,82,75,57],
 'aline-ac-almeida':[110,112,109,99],
 'abel-reboucas':[3,8,2],
 'fazenda-alagoa-de-cabaca':[224],
};
const manifest=[];
for(const [slug,ids] of Object.entries(selections)) {
 const dest=path.join('public/assets/portfolio',slug);
 const originals=path.join('assets-source/portfolio',slug);
 await fs.mkdir(dest,{recursive:true}); await fs.mkdir(originals,{recursive:true});
 for(let i=0;i<ids.length;i++) {
  const e=entries.find(e=>e.id===ids[i]); if(!e) throw new Error(`Missing ${ids[i]}`);
  const n=String(i+1).padStart(2,'0');
  const original=path.join(originals,n+path.extname(e.source).toLowerCase());
  await fs.copyFile(e.source,original);
  const target=path.join(dest,`${n}.webp`);
  await sharp(original).rotate().resize({width:1920,height:1920,fit:'inside',withoutEnlargement:true}).webp({quality:80,effort:6}).toFile(target);
  const m=await sharp(target).metadata();
  manifest.push({project:e.project,slug,source:e.source,original,output:target,width:m.width,height:m.height,bytes:(await fs.stat(target)).size,sha256:crypto.createHash('sha256').update(await fs.readFile(original)).digest('hex'),treatment:'Orientação EXIF, dimensionamento sem ampliação e compressão WebP. Sem reconstrução generativa ou alteração da instalação.'});
 }
}
await fs.writeFile('assets-source/portfolio/manifest.json',JSON.stringify(manifest,null,2));
console.log(`${manifest.length} imagens preparadas; ${Math.round(manifest.reduce((s,e)=>s+e.bytes,0)/1024)} KB no total.`);

const pending={ 'gustavo-identificacao-pendente':[132,137,136,143,152], 'abilio-nascimento':[31,33,27,19], 'matteus-guimaraes':[177], 'vegrisa-levantamento':[185,203] };
const pendingManifest=[];
for(const [slug,ids] of Object.entries(pending)) {
 const dir=path.join('assets-source/portfolio-pendentes',slug);
 await fs.mkdir(dir,{recursive:true});
 for(let i=0;i<ids.length;i++) {
  const e=entries.find(e=>e.id===ids[i]);
  const output=path.join(dir,`${String(i+1).padStart(2,'0')}.webp`);
  await sharp(e.source).rotate().resize({width:1920,height:1920,fit:'inside',withoutEnlargement:true}).webp({quality:80,effort:6}).toFile(output);
  pendingManifest.push({slug,source:e.source,output,status:'Seleção interna; não vinculada ao site. Confirmar identificação e escopo.'});
 }
}
await fs.writeFile('assets-source/portfolio-pendentes/manifest.json',JSON.stringify(pendingManifest,null,2));
console.log(`${pendingManifest.length} imagens adicionais selecionadas para validação.`);
