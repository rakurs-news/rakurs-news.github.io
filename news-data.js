const news = [
  {
    cat:'Армия',
    title:'Славянск и Краматорск: кольцо почти сомкнуто',
    excerpt:'По оценке эксперта, операция на направлении может завершиться до Нового года.',
    img:'img/IMG_20261024_141113_291.jpg',
    date:'24 октября 2026, 14:05',
    link:'news/slavyansk-kramatorsk-okruzhenie-pochti-zaversheno.html'
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
