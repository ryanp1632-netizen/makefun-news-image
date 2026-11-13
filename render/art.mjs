// Flat SVG drawings for each story, written by hand. Lead scenes use a 320x170 box, icons a 120x120 box.

export const C = {
  navy: '#14213d', ink: '#1d2433', red: '#d62839', amber: '#f2a541', teal: '#1b998b', sky: '#9cc9e0',
  pale: '#e9eef4', sand: '#efe6d6', grey: '#8d99ae', white: '#ffffff', green: '#2a9d4b', blue: '#2f5aa8',
};

const flag = {
  // Each takes x, y, w, h and returns a small flag.
  uk: (x, y, w, h) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#012169"/>
    <path d="M${x} ${y}L${x + w} ${y + h}M${x + w} ${y}L${x} ${y + h}" stroke="#fff" stroke-width="${h / 5}"/>
    <path d="M${x} ${y}L${x + w} ${y + h}M${x + w} ${y}L${x} ${y + h}" stroke="#c8102e" stroke-width="${h / 12}"/>
    <path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}" stroke="#fff" stroke-width="${h / 3}"/>
    <path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}" stroke="#c8102e" stroke-width="${h / 5}"/></g>`,
  fr: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w / 3}" height="${h}" fill="#0055a4"/><rect x="${x + w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#fff"/><rect x="${x + 2 * w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#ef4135"/>`,
  de: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 3}" fill="#000"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="#dd0000"/><rect x="${x}" y="${y + 2 * h / 3}" width="${w}" height="${h / 3}" fill="#ffce00"/>`,
  it: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w / 3}" height="${h}" fill="#009246"/><rect x="${x + w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#fff"/><rect x="${x + 2 * w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#ce2b37"/>`,
  pl: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="#fff"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 2}" fill="#dc143c"/>`,
  tr: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e30a17"/>
    <circle cx="${x + w * 0.36}" cy="${y + h / 2}" r="${h * 0.25}" fill="#fff"/><circle cx="${x + w * 0.4}" cy="${y + h / 2}" r="${h * 0.2}" fill="#e30a17"/>
    <path d="${star(x + w * 0.6, y + h / 2, h * 0.12, h * 0.05)}" fill="#fff"/>`,
  qa: (x, y, w, h) => {
    let d = `M${x} ${y}H${x + w * 0.3}`;
    const n = 9, s = h / n;
    for (let i = 0; i < n; i++) d += `L${x + w * 0.4} ${y + s * i + s / 2}L${x + w * 0.3} ${y + s * (i + 1)}`;
    d += `H${x}Z`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8a1538"/><path d="${d}" fill="#fff"/>`;
  },
  bh: (x, y, w, h) => {
    let d = `M${x} ${y}H${x + w * 0.25}`;
    const n = 5, s = h / n;
    for (let i = 0; i < n; i++) d += `L${x + w * 0.38} ${y + s * i + s / 2}L${x + w * 0.25} ${y + s * (i + 1)}`;
    d += `H${x}Z`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ce1126"/><path d="${d}" fill="#fff"/>`;
  },
  pe: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#d91023"/><rect x="${x + w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#fff"/>`,
};

function star(cx, cy, R, r, pts = 5) {
  let d = '';
  for (let i = 0; i < pts * 2; i++) {
    const a = -Math.PI / 2 + i * Math.PI / pts, rad = i % 2 ? r : R;
    d += `${i ? 'L' : 'M'}${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }
  return d + 'Z';
}

const plane = (x, y, s, fill) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
  <path d="M-40 -3 L30 -4 Q42 -4 44 0 Q42 4 30 4 L-40 3 Q-44 0 -40 -3Z"/>
  <path d="M-2 -3 L-16 -30 L-8 -30 L14 -3Z"/><path d="M-2 3 L-16 30 L-8 30 L14 3Z"/>
  <path d="M-36 -2 L-44 -14 L-38 -14 L-28 -2Z"/><path d="M-36 2 L-44 14 L-38 14 L-28 2Z"/></g>`;

const drone = (x, y, s, fill) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
  <path d="M-16 0 L10 -9 L14 0 L10 9Z"/><path d="M-2 -1 L6 -16 L10 -16 L6 -1Z"/><path d="M-2 1 L6 16 L10 16 L6 1Z"/></g>`;

const burst = (x, y, R, c1, c2) => `<path d="${star(x, y, R, R * 0.5, 8)}" fill="${c1}"/><path d="${star(x, y, R * 0.55, R * 0.28, 8)}" fill="${c2}"/>`;

// ---------------------------------------------------------------- lead scenes, 320x170
export const scenes = {
  radar: () => `
    <defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a4e"/><stop offset="1" stop-color="#5a6f9a"/></linearGradient></defs>
    <rect width="320" height="170" fill="url(#dusk)"/>
    <circle cx="40" cy="30" r="9" fill="#f6f1d3"/>
    <path d="M0 140 Q80 128 160 136 T320 132 V170 H0Z" fill="#c9b48a"/>
    <path d="M0 152 H320 V170 H0Z" fill="#b39d72"/>
    <path d="M92 142 L100 104 H124 L132 142Z" fill="#d9dde6"/><path d="M100 118 H124 M97 130 H127" stroke="#b8c0cf" stroke-width="1.5"/>
    <circle cx="112" cy="84" r="30" fill="#f4f6fa"/>
    <path d="M84 76 Q112 66 140 76 M82 90 Q112 100 142 90 M112 54 Q98 84 112 114 M112 54 Q126 84 112 114" stroke="#cfd5e0" stroke-width="1.4" fill="none"/>
    <path d="M86 98 Q112 112 138 98" stroke="#cfd5e0" stroke-width="1.4" fill="none"/>
    <rect x="30" y="72" width="2.5" height="72" fill="#cfd5e0"/>${flag.bh(32.5, 72, 34, 21)}
    <path d="M318 26 Q260 40 214 70" stroke="#ffd6a0" stroke-width="2" stroke-dasharray="5 4" fill="none"/>
    <path d="M318 70 Q270 74 236 92" stroke="#ffd6a0" stroke-width="2" stroke-dasharray="5 4" fill="none"/>
    ${drone(210, 72, 1.1, '#262b36')}${burst(232, 92, 15, '#ffb238', '#fff3c4')}
    <path d="M150 140 Q190 110 226 96" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="3 4" fill="none" opacity=".85"/>
    <rect x="230" y="128" width="56" height="12" rx="2" fill="#7d8597"/><rect x="246" y="118" width="26" height="12" fill="#7d8597"/>
    <path d="M262 120 L282 104" stroke="#7d8597" stroke-width="5"/>`,

  groundstop: () => `
    <rect width="320" height="170" fill="#cfe5f2"/>
    <path d="M0 118 H320 V170 H0Z" fill="#7d8597"/>
    <path d="M0 140 H320" stroke="#fff" stroke-width="3" stroke-dasharray="18 12"/>
    <rect x="12" y="20" width="168" height="88" rx="6" fill="#14213d"/>
    <text x="22" y="38" font-family="Bahnschrift, Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#f2a541">DEPARTURES</text>
    ${['NEW YORK', 'CHICAGO', 'ATLANTA', 'DALLAS', 'DENVER'].map((c, i) => `
      <text x="22" y="${55 + i * 12}" font-family="Bahnschrift, Segoe UI, sans-serif" font-size="10" fill="#e9eef4">${c}</text>
      <text x="108" y="${55 + i * 12}" font-family="Bahnschrift, Segoe UI, sans-serif" font-size="10" font-weight="700" fill="${i % 2 ? '#f2a541' : '#ff5a5f'}">${i % 2 ? 'DELAYED' : 'CANCELLED'}</text>`).join('')}
    ${plane(250, 124, 1.05, '#f4f6fa')}<path d="M210 120 H290" stroke="#c3cad6" stroke-width="2"/>
    <path d="M226 117 L272 117" stroke="#6b7a90" stroke-width="2" stroke-dasharray="3 3"/>
    <g transform="translate(262 50)"><path d="${octagon(0, 0, 34)}" fill="#d62839" stroke="#fff" stroke-width="3"/>
    <text x="0" y="8" text-anchor="middle" font-family="Bahnschrift, Arial, sans-serif" font-size="22" font-weight="700" fill="#fff">STOP</text></g>
    ${plane(90, 150, 0.55, '#e9eef4')}`,

  outage: () => `
    <rect width="320" height="170" fill="#e8ecf6"/>
    <circle cx="262" cy="60" r="44" fill="#cddaf0"/>
    <path d="M222 48 Q262 40 302 48 M218 66 Q262 74 306 66 M262 16 Q238 60 262 104 M262 16 Q286 60 262 104" stroke="#a9bde0" stroke-width="2" fill="none"/>
    <rect x="40" y="26" width="168" height="104" rx="7" fill="#1d2433"/><rect x="48" y="34" width="152" height="88" fill="#f8f9fc"/>
    <path d="M20 130 H228 L216 144 H32Z" fill="#9aa3b5"/>
    <rect x="66" y="52" width="66" height="46" rx="3" fill="#fff" stroke="#2f5aa8" stroke-width="3"/>
    <path d="M66 54 L99 80 L132 54" stroke="#2f5aa8" stroke-width="3" fill="none"/>
    <path d="M146 58 h40 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-26 l-10 9 v-9 h-4 a6 6 0 0 1 -6 -6 v-20 a6 6 0 0 1 6 -6z" fill="#6264a7" opacity=".9"/>
    <circle cx="160" cy="74" r="3" fill="#fff"/><circle cx="169" cy="74" r="3" fill="#fff"/><circle cx="178" cy="74" r="3" fill="#fff"/>
    <circle cx="124" cy="96" r="17" fill="#d62839"/><path d="M116 88 L132 104 M132 88 L116 104" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <path d="M250 112 l12 -22 l12 22z" fill="#f2a541"/><path d="M262 97 v8" stroke="#1d2433" stroke-width="2.5"/><circle cx="262" cy="108" r="1.4" fill="#1d2433"/>
    <path d="M228 140 h70" stroke="#a9bde0" stroke-width="3" stroke-dasharray="6 5"/>`,
};

function octagon(cx, cy, r) {
  let d = '';
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 8 + i * Math.PI / 4;
    d += `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  }
  return d + 'Z';
}

// ---------------------------------------------------------------- icons, 120x120
export const icons = {
  euteam: () => `<circle cx="60" cy="42" r="34" fill="#003399"/>
    ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="${star(60 + 22 * Math.cos(a), 42 + 22 * Math.sin(a), 4.6, 1.9)}" fill="#ffcc00"/>`; }).join('')}
    ${['uk', 'fr', 'de', 'it', 'pl'].map((f, i) => flag[f](4 + i * 23, 88, 20, 14)).join('')}
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${4 + i * 23}" y="88" width="20" height="14" fill="none" stroke="#c3cad6" stroke-width="0.8"/>`).join('')}`,

  drones: () => `<rect x="20" y="52" width="80" height="58" fill="#e9eef4" stroke="#8d99ae" stroke-width="2"/>
    ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${28 + c * 18}" y="${60 + r * 15}" width="10" height="9" fill="#9cc9e0"/>`).join('')).join('')}
    <rect x="50" y="34" width="20" height="20" fill="#fff" stroke="#8d99ae" stroke-width="2"/><path d="M60 38 V50 M54 44 H66" stroke="#d62839" stroke-width="4"/>
    <path d="M78 54 q6 -14 0 -22 q12 8 10 22 q8 -6 6 -16 q10 10 2 24z" fill="#f2a541"/><path d="M82 54 q4 -8 0 -13 q8 5 6 13z" fill="#d62839"/>
    ${drone(30, 22, 1.2, '#1d2433')}<path d="M48 26 Q66 30 76 40" stroke="#1d2433" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>`,

  chip: () => `<rect x="22" y="30" width="62" height="62" rx="6" fill="#1d2433"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${28 + i * 11}" y="22" width="5" height="8" fill="#8d99ae"/><rect x="${28 + i * 11}" y="92" width="5" height="8" fill="#8d99ae"/><rect x="14" y="${36 + i * 11}" width="8" height="5" fill="#8d99ae"/><rect x="84" y="${36 + i * 11}" width="8" height="5" fill="#8d99ae"/>`).join('')}
    <rect x="36" y="44" width="34" height="34" rx="3" fill="#76b900"/>
    <path d="M30 20 L58 50 L72 40 L104 86" stroke="#d62839" stroke-width="7" fill="none" stroke-linejoin="round"/>
    <path d="M92 86 L108 92 L106 74Z" fill="#d62839"/>`,

  pact: () => `<rect x="18" y="16" width="2.5" height="62" fill="#8d99ae"/><rect x="99" y="16" width="2.5" height="62" fill="#8d99ae"/>
    ${flag.tr(20.5, 16, 38, 26)}${flag.qa(61, 16, 38, 26).replace(/x="61"/, 'x="61"')}
    <rect x="28" y="58" width="64" height="48" rx="3" fill="#fff" stroke="#8d99ae" stroke-width="2"/>
    <path d="M36 68 H84 M36 76 H84 M36 84 H70" stroke="#c3cad6" stroke-width="2.5"/>
    <path d="M40 98 q6 -8 10 0 t10 0 t10 -2" stroke="#2f5aa8" stroke-width="2" fill="none"/>
    <path d="M66 96 q6 -10 10 -2 t12 -2" stroke="#d62839" stroke-width="2" fill="none"/>`,

  atom: () => `<rect x="18" y="62" width="58" height="44" fill="#c3cad6"/><path d="M14 64 Q47 26 80 64Z" fill="#e9eef4" stroke="#8d99ae" stroke-width="2"/>
    <rect x="40" y="82" width="14" height="24" fill="#8d99ae"/>
    <g transform="translate(47 54)" stroke="#2f5aa8" stroke-width="2.4" fill="none">
      <ellipse rx="20" ry="8"/><ellipse rx="20" ry="8" transform="rotate(60)"/><ellipse rx="20" ry="8" transform="rotate(-60)"/></g>
    <circle cx="47" cy="54" r="4" fill="#2f5aa8"/>
    <circle cx="86" cy="40" r="20" fill="#fff" stroke="#1d2433" stroke-width="5"/><path d="M100 54 L114 68" stroke="#1d2433" stroke-width="7" stroke-linecap="round"/>
    <text x="86" y="49" text-anchor="middle" font-family="Bahnschrift, Arial, sans-serif" font-size="26" font-weight="700" fill="#d62839">?</text>`,

  pope: () => `<rect width="120" height="120" fill="none"/>
    ${Array.from({ length: 21 }, (_, i) => `<circle cx="${10 + (i % 7) * 17 + (Math.floor(i / 7) % 2) * 8}" cy="${84 + Math.floor(i / 7) * 12}" r="6" fill="${['#8d99ae', '#c3cad6', '#6b7a90'][i % 3]}"/>`).join('')}
    ${flag.pe(14, 66, 18, 12)}${flag.pe(88, 70, 18, 12)}
    <path d="M38 84 Q40 44 60 40 Q80 44 82 84Z" fill="#fff" stroke="#c3cad6" stroke-width="2"/>
    <path d="M60 46 V66 M52 54 H68" stroke="#c9a227" stroke-width="3"/>
    <circle cx="60" cy="30" r="11" fill="#f1c9a5"/><path d="M50 26 A10 10 0 0 1 70 26 Z" fill="#fff" stroke="#c3cad6" stroke-width="1.5"/>
    <path d="M42 56 L26 30" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M42 56 L26 30" stroke="#c3cad6" stroke-width="1" fill="none"/>
    <circle cx="25" cy="27" r="4.5" fill="#f1c9a5"/>
    <path d="M78 56 L94 30" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="95" cy="27" r="4.5" fill="#f1c9a5"/>`,

  bus: () => `<rect x="6" y="46" width="62" height="34" rx="5" fill="#f2a541"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${12 + i * 13}" y="52" width="9" height="11" fill="#9cc9e0"/>`).join('')}
    <circle cx="20" cy="82" r="6" fill="#1d2433"/><circle cx="54" cy="82" r="6" fill="#1d2433"/>
    <g transform="rotate(-8 92 64)"><rect x="76" y="40" width="40" height="38" fill="#2f5aa8"/><rect x="66" y="54" width="14" height="24" rx="2" fill="#24467f"/>
    <circle cx="74" cy="80" r="6" fill="#1d2433"/><circle cx="106" cy="80" r="6" fill="#1d2433"/></g>
    ${burst(68, 56, 16, '#d62839', '#ffe08a')}
    <path d="M0 92 H120" stroke="#8d99ae" stroke-width="3"/>`,

  ships: () => `<path d="M0 80 H120 V120 H0Z" fill="#6b9ac4"/>
    <path d="M0 88 Q15 84 30 88 T60 88 T90 88 T120 88" stroke="#cfe5f2" stroke-width="2" fill="none"/>
    <g transform="rotate(14 40 70)"><path d="M6 64 H76 L70 80 H12Z" fill="#fff" stroke="#8d99ae" stroke-width="2"/>
    <rect x="14" y="48" width="54" height="16" fill="#fff" stroke="#8d99ae" stroke-width="2"/><rect x="22" y="38" width="36" height="10" fill="#fff" stroke="#8d99ae" stroke-width="2"/>
    <rect x="30" y="26" width="5" height="12" fill="#1d2433"/><rect x="44" y="26" width="5" height="12" fill="#1d2433"/>
    <circle cx="66" cy="70" r="9" fill="#d62839"/></g>
    <path d="M84 52 H120 V82 H74 Z" fill="#1d2433"/><rect x="100" y="34" width="16" height="18" fill="#8d99ae"/>
    ${burst(78, 62, 11, '#f2a541', '#fff3c4')}`,

  prices: () => `<rect x="12" y="14" width="96" height="92" rx="6" fill="#fff" stroke="#c3cad6" stroke-width="2"/>
    <path d="M22 96 H100 M22 96 V24" stroke="#8d99ae" stroke-width="2"/>
    <path d="M24 86 L40 80 L54 82 L68 66 L82 56 L98 34" stroke="#d62839" stroke-width="4" fill="none" stroke-linejoin="round"/>
    <path d="M90 34 L100 30 L98 42Z" fill="#d62839"/>
    <text x="28" y="44" font-family="Bahnschrift, Arial, sans-serif" font-size="22" font-weight="700" fill="#1d2433">6.5%</text>`,

  ebola: () => `<path d="M60 10 L100 24 V58 Q100 92 60 110 Q20 92 20 58 V24Z" fill="#1b998b"/><path d="M40 60 L54 74 L82 44" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  stadium: () => `<ellipse cx="60" cy="70" rx="52" ry="28" fill="#8d99ae"/><ellipse cx="60" cy="66" rx="40" ry="18" fill="#2a9d4b"/><path d="M60 48 V84" stroke="#fff" stroke-width="2"/>
    <rect x="58" y="10" width="3" height="40" fill="#1d2433"/><rect x="61" y="10" width="30" height="10" fill="#00209f"/><rect x="61" y="20" width="30" height="10" fill="#d21034"/>`,
  carbomb: () => `<path d="M14 80 L22 60 H84 L100 74 H108 V92 H14Z" fill="#6b7a90"/><rect x="30" y="64" width="20" height="10" fill="#cfe5f2"/><rect x="56" y="64" width="20" height="10" fill="#cfe5f2"/>
    <circle cx="34" cy="94" r="9" fill="#1d2433"/><circle cx="88" cy="94" r="9" fill="#1d2433"/>${burst(96, 46, 22, '#d62839', '#f2a541')}`,
  court: () => `<path d="M10 42 L60 12 L110 42Z" fill="#8d99ae"/><rect x="14" y="44" width="92" height="8" fill="#6b7a90"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${20 + i * 18}" y="54" width="10" height="44" fill="#c3cad6"/>`).join('')}<rect x="10" y="98" width="100" height="12" fill="#6b7a90"/>`,
  rain: () => `<path d="M14 98 L48 52 L82 98Z" fill="#c9b48a"/><path d="M48 52 L58 98" stroke="#9c8660" stroke-width="2"/>
    <path d="M30 36 a16 16 0 0 1 30 -8 a14 14 0 0 1 26 8 a10 10 0 0 1 0 20 H34 a12 12 0 0 1 -4 -20z" fill="#8d99ae"/>
    ${[36, 52, 68, 84, 98].map((x, i) => `<path d="M${x} ${62 + (i % 2) * 6} l-4 10" stroke="#2f5aa8" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <path d="M0 104 Q30 98 60 104 T120 104 V120 H0Z" fill="#6b9ac4"/>`,
  ballot: () => `<rect x="24" y="50" width="72" height="56" rx="4" fill="#2f5aa8"/><rect x="40" y="56" width="40" height="5" fill="#14213d"/>
    <rect x="44" y="18" width="32" height="40" fill="#fff" stroke="#8d99ae" stroke-width="2"/><path d="M50 36 L58 44 L72 26" stroke="#1b998b" stroke-width="5" fill="none"/>`,
  ball: () => `<defs><clipPath id="ballclip"><circle cx="60" cy="60" r="44"/></clipPath></defs>
    <circle cx="60" cy="60" r="44" fill="#fff"/><g clip-path="url(#ballclip)"><path d="${pent(60, 60, 15)}" fill="#1d2433"/>
    ${[0, 1, 2, 3, 4].map(i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return `<path d="M${60 + 15 * Math.cos(a)} ${60 + 15 * Math.sin(a)} L${60 + 34 * Math.cos(a)} ${60 + 34 * Math.sin(a)}" stroke="#1d2433" stroke-width="3"/><path d="${pent(60 + 44 * Math.cos(a), 60 + 44 * Math.sin(a), 11)}" fill="#1d2433"/>`; }).join('')}</g>
    <circle cx="60" cy="60" r="44" fill="none" stroke="#1d2433" stroke-width="4"/>`,
  globe: () => `<circle cx="60" cy="60" r="40" fill="#6b9ac4"/><path d="M40 34 q14 -6 22 4 q-4 12 -16 10 q-6 10 -2 20 q-12 -6 -12 -18z M70 62 q12 -4 16 8 q-4 14 -14 18 q-6 -12 -2 -26z" fill="#2a9d4b"/>
    <path d="M30 96 q10 -18 22 -10 q8 -16 20 -6 q12 -12 22 4 q10 -2 12 12z" fill="#f2a541"/><path d="M44 104 q10 -14 20 -6 q10 -10 18 2" fill="#d62839"/>`,
  chipban: () => `<rect x="30" y="30" width="60" height="60" rx="6" fill="#1d2433"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${38 + i * 13}" y="22" width="5" height="8" fill="#8d99ae"/><rect x="${38 + i * 13}" y="90" width="5" height="8" fill="#8d99ae"/><rect x="22" y="${38 + i * 13}" width="8" height="5" fill="#8d99ae"/><rect x="90" y="${38 + i * 13}" width="8" height="5" fill="#8d99ae"/>`).join('')}
    <circle cx="60" cy="60" r="40" fill="none" stroke="#d62839" stroke-width="9"/><path d="M32 32 L88 88" stroke="#d62839" stroke-width="9"/>`,
  music: () => `<circle cx="60" cy="60" r="44" fill="#c9a227"/><circle cx="60" cy="60" r="36" fill="#f2d16b"/>
    <path d="M52 34 V74 M52 34 L78 28 V66" stroke="#1d2433" stroke-width="6" fill="none"/><ellipse cx="45" cy="76" rx="9" ry="7" fill="#1d2433"/><ellipse cx="71" cy="68" rx="9" ry="7" fill="#1d2433"/>`,
  candle: () => `<rect x="46" y="50" width="28" height="56" rx="3" fill="#efe6d6" stroke="#c9b48a" stroke-width="2"/><path d="M60 50 V42" stroke="#1d2433" stroke-width="2"/>
    <path d="M60 14 Q74 32 60 44 Q46 32 60 14Z" fill="#f2a541"/><path d="M60 26 Q66 36 60 42 Q54 36 60 26Z" fill="#fff3c4"/>
    ${flag.fr(84, 70, 28, 18)}`,
};

function pent(cx, cy, r) {
  let d = '';
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / 5;
    d += `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  }
  return d + 'Z';
}
