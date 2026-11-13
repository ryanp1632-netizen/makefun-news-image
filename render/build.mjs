// Builds entry.png: lays the stories out as an HTML page with inline SVG drawings and a world map, then has a
// headless Chrome (or Edge) take a 1024x1024 screenshot of it. Run from the repository root:
//   node render/build.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { DATE, leads, grid, also, SOURCES, pinShift } from './stories.mjs';
import { scenes, icons, C } from './art.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---- world map: decode the TopoJSON land outline (world-atlas, Natural Earth 1:110m) into an SVG path
// Equirectangular, cropped to where the day's stories are (true aspect: one scale for both axes).
const LON_W = -134, LON_E = 152, LAT_TOP = 70, LAT_BOT = -44, MAP_W = 470;
const K = MAP_W / (LON_E - LON_W), MAP_H = Math.round((LAT_TOP - LAT_BOT) * K);
const project = (lon, lat) => [(lon - LON_W) * K, (LAT_TOP - lat) * K];
function landPath() {
  const topo = JSON.parse(readFileSync(join(root, 'data', 'land-110m.json'), 'utf8'));
  const [sx, sy] = topo.transform.scale, [tx, ty] = topo.transform.translate;
  const arcs = topo.arcs.map(arc => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * sx + tx, y * sy + ty]; });
  });
  const ring = idx => {
    const pts = [];
    for (const i of idx) {
      const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
      pts.push(...(pts.length ? a.slice(1) : a));
    }
    return pts;
  };
  let d = '';
  for (const g of topo.objects.land.geometries) {
    const polys = g.type === 'Polygon' ? [g.arcs] : g.arcs;
    for (const poly of polys) for (const r of poly) {
      const pts = ring(r);
      if (pts.length < 3 || Math.max(...pts.map(p => p[1])) < -55) continue; // drop Antarctica
      // a ring that crosses the antimeridian is unwrapped eastwards; the svg clips what falls off the edge
      const crosses = pts.some((p, k) => k && Math.abs(p[0] - pts[k - 1][0]) > 180);
      d += pts.map(([lon, lat], k) => {
        const [x, y] = project(crosses && lon < -150 ? lon + 360 : lon, lat);
        return `${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join('') + 'Z';
    }
  }
  return d;
}

function mapSvg() {
  const f = v => v.toFixed(1);
  // short items: small dots underneath
  const dots = also.map(s => { const [x, y] = project(s.lon, s.lat); return `<circle cx="${f(x)}" cy="${f(y)}" r="3" fill="${C.amber}" stroke="${C.navy}" stroke-width="1"/>`; });
  // numbered stories: a numbered pin, moved off a crowded spot with a leader line where pinShift says so
  const numbered = [...grid, ...leads].map(s => {
    const [x, y] = project(s.lon, s.lat), [dx, dy] = pinShift[s.n] ?? [0, 0];
    const lead = s.n <= leads.length, r = lead ? 8.6 : 7.4, px = x + dx, py = y + dy;
    return `${dx || dy ? `<path d="M${f(x)} ${f(y)}L${f(px)} ${f(py)}" stroke="${C.navy}" stroke-width="1"/><circle cx="${f(x)}" cy="${f(y)}" r="1.8" fill="${C.navy}"/>` : ''}
      <circle cx="${f(px)}" cy="${f(py)}" r="${r}" fill="${lead ? C.red : C.blue}" stroke="#fff" stroke-width="1.4"/>
      <text x="${f(px)}" y="${f(py + 3.5)}" text-anchor="middle" font-size="${lead ? 10.5 : 9.5}" font-weight="700" fill="#fff" font-family="Bahnschrift, Segoe UI, sans-serif">${s.n}</text>`;
  });
  return `<svg width="${MAP_W}" height="${MAP_H}" viewBox="0 0 ${MAP_W} ${MAP_H}"><path d="${landPath()}" fill="#c7d3e3" stroke="#aebcd0" stroke-width="0.4"/>${dots.join('')}${numbered.join('')}</svg>`;
}

const svg = (body, w, h, vb) => `<svg width="${w}" height="${h}" viewBox="${vb}">${body}</svg>`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1024px; height: 1024px; overflow: hidden; }
body { background: #f6f3ec; color: ${C.ink}; font-family: 'Segoe UI', Arial, sans-serif; padding: 16px 20px 0; }
.top { display: flex; justify-content: space-between; align-items: baseline; font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: .06em; }
.top .k { color: ${C.red}; } .top .c { color: #55607a; }
h1 { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 62px; line-height: 1; letter-spacing: .005em; color: ${C.navy}; margin-top: 2px; }
.rule { height: 4px; background: ${C.navy}; margin: 8px 0 10px; }
.leads { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.lead { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 0 #e2dccf; }
.lead svg { display: block; }
.lead .t { padding: 8px 11px 9px; }
.tag { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 12.5px; letter-spacing: .07em; color: ${C.red}; display: flex; align-items: center; gap: 6px; }
.num { display: inline-flex; align-items: center; justify-content: center; width: 19px; height: 19px; border-radius: 50%; background: ${C.red}; color: #fff; font-size: 11.5px; letter-spacing: 0; }
.lead h2 { font-size: 22.5px; line-height: 1.12; font-weight: 700; margin: 4px 0 4px; color: ${C.navy}; }
.lead p { font-size: 13.6px; line-height: 1.3; color: #444c5e; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 12px; margin-top: 10px; }
.card { background: #fff; border-radius: 8px; padding: 6px 10px 6px 8px; display: flex; gap: 9px; align-items: center; box-shadow: 0 1px 0 #e2dccf; height: 90px; }
.card svg { flex: none; }
.card .tag { font-size: 11px; color: ${C.blue}; }
.num.sm { width: 16px; height: 16px; font-size: 10px; background: ${C.blue}; }
.card h3 { font-size: 16.4px; line-height: 1.13; font-weight: 700; color: ${C.navy}; margin: 2px 0 2px; }
.card p { font-size: 12.4px; line-height: 1.22; color: #4d566a; }
.bottom { display: flex; gap: 12px; margin-top: 10px; }
.map { background: #fff; border-radius: 8px; padding: 6px 8px 4px; box-shadow: 0 1px 0 #e2dccf; display: flex; flex-direction: column; }
.map svg { margin: auto 0; }
.map .cap { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 11.5px; letter-spacing: .07em; color: #55607a; display: flex; justify-content: space-between; }
.also { flex: 1; background: #fff; border-radius: 8px; padding: 6px 12px; box-shadow: 0 1px 0 #e2dccf; }
.also .cap { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: .07em; color: ${C.red}; margin-bottom: 3px; }
.also ul { list-style: none; }
.also li { display: flex; align-items: center; gap: 8px; font-size: 13.3px; font-weight: 600; line-height: 1.1; color: ${C.navy}; padding: 0.5px 0; border-top: 1px solid #ece7dc; }
.also li:first-child { border-top: 0; }
.foot { font-size: 11.5px; color: #6b7387; text-align: center; margin-top: 7px; }
</style></head><body>
<div class="top"><span class="k">THE WORLD'S NEWS IN ONE PICTURE</span><span class="c">${leads.length + grid.length + also.length} STORIES · 5 CONTINENTS</span></div>
<h1>${DATE}</h1>
<div class="rule"></div>
<div class="leads">${leads.map(s => `<div class="lead">${svg(scenes[s.icon](), 316, 148, '0 12 320 150')}<div class="t">
  <div class="tag"><span class="num">${s.n}</span>${s.region}</div><h2>${esc(s.head)}</h2><p>${esc(s.sub)}</p></div></div>`).join('')}</div>
<div class="grid">${grid.map(s => `<div class="card">${svg(icons[s.icon](), 76, 76, '0 0 120 120')}<div>
  <div class="tag"><span class="num sm">${s.n}</span>${s.region}</div><h3>${esc(s.head)}</h3><p>${esc(s.sub)}</p></div></div>`).join('')}</div>
<div class="bottom">
  <div class="map"><div class="cap"><span>WHERE IT HAPPENED</span><span>NUMBERS MATCH THE STORIES · <span style="color:${C.amber}">●</span> ALSO</span></div>${mapSvg()}</div>
  <div class="also"><div class="cap">ALSO ON FRIDAY</div><ul>${also.map(s => `<li>${svg(icons[s.icon](), 18, 18, '0 0 120 120')}<span>${esc(s.text)}</span></li>`).join('')}</ul></div>
</div>
<div class="foot">${esc(SOURCES)}</div>
</body></html>`;

const out = join(root, 'build');
if (!existsSync(out)) mkdirSync(out);
const page = join(out, 'page.html');
writeFileSync(page, html);

const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
];
const exe = process.env.CHROME ?? browsers.find(b => existsSync(b));
if (!exe) throw new Error('no Chrome or Edge found; set CHROME to its path');
const png = join(out, 'shot.png');
execFileSync(exe, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1024,1024', '--default-background-color=00000000', `--screenshot=${png}`, pathToFileURL(page).href], { stdio: 'inherit' });
writeFileSync(join(root, 'entry.png'), readFileSync(png));
console.log('entry.png', statSync(join(root, 'entry.png')).size, 'bytes');
