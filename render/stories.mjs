// The stories of Friday 13 November 2026, each checked against the full text of a report published that day.
// lon/lat place the story's pin on the world map; icon names a drawing in art.mjs.

export const DATE = 'FRIDAY 13 NOVEMBER 2026';

// Lead stories: big drawings across the top.
export const leads = [
  {
    n: 1, region: 'MIDDLE EAST', icon: 'radar', lon: 50.6, lat: 26.1,
    head: 'Iran says it hit a US radar in Bahrain',
    sub: 'Revenge for a US strike near Hormuz, says the IRGC. US: two drones shot down, radar not destroyed.',
    src: 'Guardian, Euronews',
  },
  {
    n: 2, region: 'UNITED STATES', icon: 'groundstop', lon: -98, lat: 39,
    head: 'Every US flight grounded by FAA',
    sub: 'Air traffic telecoms outage halts departures nationwide; about 7,000 flights delayed or cancelled.',
    src: 'NPR, Guardian',
  },
  {
    n: 3, region: 'WORLDWIDE', icon: 'outage', lon: -122.1, lat: 47.6,
    head: 'Microsoft outage nears 24 hours',
    sub: 'Outlook and Teams down in 70+ countries. Microsoft "deeply sorry"; not a cyberattack.',
    src: 'BBC',
  },
];

// Second tier: one drawing and a headline each.
export const grid = [
  { n: 4, region: 'EUROPE', icon: 'euteam', lon: -6.3, lat: 53.3,
    head: 'EU names UK, France, Germany, Italy, Poland for Ukraine talks', sub: 'Costa, at the end of the Dublin summit', src: 'Al Jazeera' },
  { n: 5, region: 'UKRAINE · RUSSIA', icon: 'drones', lon: 30.5, lat: 50.4,
    head: 'Russian drones hit a Kyiv hospital', sub: 'Ukraine fires almost 1,200 drones at Russia overnight', src: 'AP, Reuters' },
  { n: 6, region: 'US · TECH', icon: 'chip', lon: -77.0, lat: 38.9,
    head: 'Nvidia spy scandal reaches Trump cabinet', sub: 'Bessent blames Lutnick; stock’s longest losing run since 2012', src: 'BBC, CNBC' },
  { n: 7, region: 'MIDDLE EAST', icon: 'pact', lon: 29.0, lat: 41.0,
    head: 'Türkiye and Qatar sign a mutual defence pact', sub: 'Erdogan and Emir Tamim, in Istanbul', src: 'Al Jazeera' },
  { n: 8, region: 'NUCLEAR', icon: 'atom', lon: 51.7, lat: 32.7,
    head: 'UN watchdog “increasingly concerned” about Iran site', sub: 'IAEA cannot inspect a new Isfahan enrichment plant', src: 'BBC' },
  { n: 9, region: 'SOUTH AMERICA', icon: 'pope', lon: -79.8, lat: -6.8,
    head: 'Pope Leo’s homecoming Mass in Chiclayo, Peru', sub: 'Huge crowds greet their former bishop', src: 'Al Jazeera, DW' },
  { n: 10, region: 'SOUTH ASIA', icon: 'bus', lon: 93.4, lat: 26.6,
    head: 'Bus and truck collide in India’s Assam: 24 dead', sub: 'Children among the dead, near Kaziranga park', src: 'Al Jazeera, AP' },
  { n: 11, region: 'UNITED STATES', icon: 'ships', lon: -90.1, lat: 29.95,
    head: 'Tanker rams river cruise ship in New Orleans', sub: '129 passengers aboard; all accounted for', src: 'Guardian' },
  { n: 12, region: 'ECONOMY', icon: 'prices', lon: -74.0, lat: 40.7,
    head: 'US wholesale prices up 6.5% in a year', sub: 'Fastest since 2022; rate-hike bets grow', src: 'CNBC (BLS)' },
];

// Short items: a small drawing and one line.
export const also = [
  { n: 13, icon: 'ebola', lon: 7.5, lat: 9.1, text: 'Nigeria ends Ebola watch: none of 62 contacts fell ill' },
  { n: 14, icon: 'stadium', lon: -72.3, lat: 18.5, text: 'Haiti’s forces retake national stadium from gangs' },
  { n: 15, icon: 'carbomb', lon: 37.6, lat: 55.75, text: 'Moscow car bomb wounds aide to Ukraine’s ex-PM' },
  { n: 16, icon: 'court', lon: -77.0, lat: 38.9, text: 'US Supreme Court to hear Trump’s asylum ban' },
  { n: 17, icon: 'rain', lon: 34.4, lat: 31.4, text: 'Gaza: baby dies of cold as rain floods tents' },
  { n: 18, icon: 'ballot', lon: -105.0, lat: 39.7, text: 'Boebert loses her Colorado seat to a Democrat' },
  { n: 19, icon: 'ball', lon: -2.29, lat: 53.46, text: 'Man United appoint Pochettino, ex-USA coach' },
  { n: 20, icon: 'candle', lon: 2.35, lat: 48.86, text: 'Paris marks 11 years since the 13 Nov attacks' },
];

export const SOURCES = 'Sources, all 13 Nov 2026: BBC, AP, Reuters, Al Jazeera, Guardian, NPR, CNBC, DW, France 24, Euronews';
