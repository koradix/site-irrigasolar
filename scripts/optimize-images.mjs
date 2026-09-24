#!/usr/bin/env node
/**
 * Converte e redimensiona imagens locais para WebP, sem depender de nenhum
 * serviço externo. Usa `sharp` (já listado em devDependencies).
 *
 * Uso:
 *   npm run images:optimize -- <arquivo-ou-pasta> [--max-width=1920] [--quality=82]
 *
 * Exemplos:
 *   npm run images:optimize -- public/assets/portfolio
 *   npm run images:optimize -- public/assets/img/nova-foto.jpg --max-width=1200
 *
 * Cada arquivo de entrada gera um .webp irmão (mesmo nome, extensão trocada).
 * O arquivo original NÃO é apagado — decida manualmente se remove depois de
 * conferir o resultado.
 */
import { readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SUPPORTED = new Set(['.png', '.jpg', '.jpeg']);

async function main() {
  const args = process.argv.slice(2);
  const target = args.find((a) => !a.startsWith('--'));
  const maxWidthArg = args.find((a) => a.startsWith('--max-width='));
  const qualityArg = args.find((a) => a.startsWith('--quality='));

  if (!target) {
    console.error('Informe um arquivo ou pasta. Ex.: npm run images:optimize -- public/assets/portfolio');
    process.exit(1);
  }

  const maxWidth = maxWidthArg ? Number(maxWidthArg.split('=')[1]) : 1920;
  const quality = qualityArg ? Number(qualityArg.split('=')[1]) : 82;

  const files = await collectFiles(target);
  if (files.length === 0) {
    console.log('Nenhuma imagem .png/.jpg/.jpeg encontrada em', target);
    return;
  }

  for (const file of files) {
    await convert(file, maxWidth, quality);
  }
}

async function collectFiles(target) {
  const st = await stat(target);
  if (st.isFile()) {
    return SUPPORTED.has(path.extname(target).toLowerCase()) ? [target] : [];
  }
  const entries = await readdir(target, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(target, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else if (SUPPORTED.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function convert(file, maxWidth, quality) {
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
  await mkdir(path.dirname(out), { recursive: true });

  const before = (await stat(file)).size;
  await sharp(file)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out);
  const after = (await stat(out)).size;

  const beforeKb = (before / 1024).toFixed(0);
  const afterKb = (after / 1024).toFixed(0);
  const reduction = (100 - (after / before) * 100).toFixed(0);
  console.log(`${file} → ${out} (${beforeKb}KB → ${afterKb}KB, -${reduction}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
