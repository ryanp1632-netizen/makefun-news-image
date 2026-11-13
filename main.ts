// news-image-01 entry (Node 22, standard library only).
// The picture of Friday 13 November 2026's world news is entry.png, drawn by render/build.mjs from the stories in
// render/stories.mjs. This program copies it to /output/entry.png (MAKEFUN_OUTPUT_DIR stands in for /output locally):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
