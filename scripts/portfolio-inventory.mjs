import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = 'C:/Users/mmbon/OneDrive/IrrigaSolar';
const out = 'assets-source/portfolio-review';
await fs.mkdir(out, {recursive:true});
async function walk(dir) {
  const result=[];
  for (const e of await fs.readdir(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if(e.isDirectory()) result.push(...await walk(p));
    else if(/\.(jpe?g|png|webp)$/i.test(p)) result.push(p);
  }
  return result.sort();
}
const projects=[];
let id=0;
for(const e of await fs.readdir(root,{withFileTypes:true})) {
 if(!e.isDirectory() || !/^(Projeto |Fotos IrrigaSolar)/.test(e.name)) continue;
 const all=await walk(path.join(root,e.name));
 const photos=all.filter(p=> !/RG |CNH|fatura|protocolo|orçamento|compradas|Itens estrutura|transformador|submetido|kit Alfredo|Plaqueta/i.test(p));
 const sampled=photos.length>48 ? photos.filter((_,i)=>i%Math.ceil(photos.length/48)===0) : photos;
 const entries=[];
 for(const source of sampled) entries.push({id:++id,source});
 projects.push({name:e.name,total:all.length,entries});
 await fs.writeFile(path.join(out,'inventory.json'),JSON.stringify(projects,null,2));
 console.log('Review:',e.name,entries.length);
 for(let offset=0;offset<entries.length;offset+=24){
  const name=e.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]/g,'-');
  const target=path.join(out,`${name}-${offset}.jpg`);
  try { await fs.access(target); continue; } catch {}
  const batch=entries.slice(offset,offset+24); const tiles=[];
  for(let i=0;i<batch.length;i++) {
   const e=batch[i];const x=(i%4)*300,y=Math.floor(i/4)*220;
   console.log('Photo',e.id,path.basename(e.source));
   try { tiles.push({input:await sharp(e.source).rotate().resize(294,190,{fit:'inside'}).png().toBuffer(),left:x,top:y}); } catch(err) { console.log('Unavailable',e.source,err.message); }
   const label=`${e.id} | ${path.basename(e.source).replace(/[<>&]/g,'')}`;
   tiles.push({input:Buffer.from(`<svg width="300" height="26"><rect width="300" height="26" fill="white"/><text x="4" y="17" font-size="12">${label}</text></svg>`),left:x,top:y+191});
  }
  await sharp({create:{width:1200,height:Math.ceil(batch.length/4)*220,channels:3,background:'#eeeeee'}}).composite(tiles).jpeg({quality:85}).toFile(target);
 }
}
await fs.writeFile(path.join(out,'inventory.json'),JSON.stringify(projects,null,2));
console.log(projects.map(p=>({name:p.name,total:p.total,sampled:p.entries.length})));
