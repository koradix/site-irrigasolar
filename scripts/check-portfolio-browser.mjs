import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const profile=await fs.mkdtemp(path.join(os.tmpdir(),'irrigasolar-portfolio-check-'));
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless','--disable-gpu','--no-first-run','--remote-debugging-port=9335',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
let ws;
try {
 let tabs;
 for(let n=0;n<40;n++) {try {tabs=await(await fetch('http://127.0.0.1:9335/json/list')).json();break;}catch{await new Promise(r=>setTimeout(r,250));}}
 if(!tabs)throw new Error('Browser unavailable');
 ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
 let id=0;const pending=new Map();
 ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const i=++id;pending.set(i,{resolve,reject});ws.send(JSON.stringify({id:i,method,params}));});
 await send('Page.enable');
 for(const [name,url,width,height] of [['mobile','/projetos/alfredo-seixas',390,844],['desktop','/projetos',1440,1000]]) {
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
  await send('Page.navigate',{url:'http://localhost:3105'+url});
  await new Promise(r=>setTimeout(r,1800));
  await send('Runtime.evaluate',{expression:'Promise.all([document.fonts.ready,...Array.from(document.images).map(i=>{i.loading="eager";return i.decode().catch(()=>{})})])',awaitPromise:true});
  const metrics=await send('Runtime.evaluate',{expression:'JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:Array.from(document.images).map(i=>({src:i.getAttribute("src"),loaded:i.complete&&i.naturalWidth>0}))})',returnByValue:true});
  console.log(name,metrics.result.value);
  const layout=await send('Page.getLayoutMetrics');
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.min(layout.cssContentSize.height,3000),scale:1}});
  await fs.writeFile(`assets-source/portfolio-review/site-${name}.png`,Buffer.from(shot.data,'base64'));
 }
 await send('Browser.close');
}finally{ws?.close();chrome.kill();}
