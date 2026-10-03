import { readFile, writeFile, mkdir, cp, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// Run after building the sibling template library: node scripts/sync-template-previews.mjs
const site = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const library = path.resolve(process.argv[2] || path.join(site, '..', 'templates'));
const require = createRequire(path.join(library, 'package.json'));
const sharp = require('sharp');
const catalogue = JSON.parse(await readFile(path.join(library, 'dist/catalog.json'), 'utf8'));
const slugs = {
  academia: 'academias', 'escritorio-de-advocacia': 'advocacia',
  'clinica-medica': 'clinicas-medicas', 'escritorio-de-contabilidade': 'contabilidade',
  escola: 'escolas-e-cursos', 'clinica-de-estetica': 'estetica', imobiliaria: 'imobiliarias',
  'clinica-odontologica': 'odontologia', 'consultorio-de-psicologia': 'psicologia',
  restaurante: 'restaurantes', 'servico-residencial': 'servicos-residenciais',
  'clinica-veterinaria': 'veterinarias', spa: 'spa',
};
const templates = catalogue.templates.filter(t => t.kind === 'template' && ['essencial', 'presenca', 'aura'].includes(t.collection));
if (templates.length !== 25) throw new Error(`Expected 25 public templates; found ${templates.length}. Review the catalogue before syncing.`);
// Validate every print and build before changing the site.
for (const t of templates) {
  if (!slugs[t.slug]) throw new Error(`Unknown template: ${t.id}`);
  await stat(path.join(library, 'prints_templates', `${t.collection}-${t.slug}.png`));
  await stat(path.join(library, 'dist', t.preview, 'index.html'));
}
async function verifyPreview(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await verifyPreview(file);
    else if (/\.(?:map|astro|tsx?|md|zip)$/i.test(entry.name) || /^package(?:-lock)?\.json$/.test(entry.name)) {
      throw new Error(`Unexpected source file in preview: ${file}`);
    }
  }
}
for (const t of templates) await verifyPreview(path.join(library, 'dist', t.preview));
for (const t of templates) {
  const id = `${t.collection}-${slugs[t.slug]}`;
  const assets = path.join(site, 'public/assets/projects', t.collection);
  await mkdir(assets, { recursive: true });
  const print = path.join(library, 'prints_templates', `${t.collection}-${t.slug}.png`);
  for (const width of [480, 960, 1400]) {
    const suffix = width === 1400 ? '' : `-${width}`;
    await sharp(print).resize({ width }).webp({ quality: 82 }).toFile(path.join(assets, `${id}${suffix}.webp`));
  }
  const preview = path.join(site, 'public', t.preview);
  await mkdir(path.dirname(preview), { recursive: true });
  await cp(path.join(library, 'dist', t.preview), preview, { recursive: true });
}
await writeFile(path.join(site, 'public/previews/README.txt'), 'Prévias públicas compiladas de Essencial, Presença e Aura. Atualize com node scripts/sync-template-previews.mjs após o build da biblioteca.\n');
console.log(`Synced ${templates.length} interactive previews and their screenshots. No library source pages were copied.`);
