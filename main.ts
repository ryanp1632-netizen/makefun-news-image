// news-image-01 entry (Node 22, standard library only).
// The picture of Friday 13 November 2026's world news is entry.png, drawn by render/build.mjs from the stories in
// render/stories.mjs. This program copies it to /output/entry.png (MAKEFUN_OUTPUT_DIR stands in for /output locally):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const png = readFileSync(new URL('./entry.png', import.meta.url));

// The gate takes a whole PNG of at most 1 MiB and 1024x1024 pixels: refuse to write anything else.
const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
if (!png.subarray(0, 8).equals(SIGNATURE)) throw new Error('entry.png is not a PNG');
if (png.length > 1048576) throw new Error(`entry.png is ${png.length} bytes, over 1 MiB`);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over 1024x1024`);
if (png.subarray(-8, -4).toString('latin1') !== 'IEND') throw new Error('entry.png is cut short');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
writeFileSync(join(outDir, 'entry.png'), png);
