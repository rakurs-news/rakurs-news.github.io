const news = [
  {
    cat:'Армия',
    title:'Режим тишины в Алёшках (Херсонской области)',
    excerpt:'В Алешках на несколько дней введут «режим тишины»',
    img:'img/IMG_20261024_073039_426.jpg',
    date:'24 октября 2026, 08:09',
    link:'news/peremirie-v-aleschkah.html'
  },
];

// ===== Утилиты =====
const MONTHS = {
  'янв':0,'фев':1,'мар':2,'апр':3,'май':4,'июн':5,
  'июл':6,'авг':7,'сен':8,'окт':9,'ноя':10,'дек':11
};

function parseDate(str) {
  const m = str.match(/(\d+)\s+(\w+)\s+(\d+)/);
  if (!m) return new Date(0);
  return new Date(+m[3], MONTHS[m[2]] || 0, +m[1]);
}

function sortByDate(arr) {
  return arr.slice().sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

function getNewsByCat(cat) {
  if (!cat || cat === 'all') return sortByDate(news);
  return sortByDate(news.filter(n => n.cat === cat));
}
