const news = [
  {
    cat:'В мире',
    title:'Сильнейшая армия мира: Ким Чен Ын поставил задачу Пхеньяну',
    excerpt:'Лидер КНДР назвал создание сильнейших в мире вооружённых сил приоритетом страны. Об этом пишет агентство ЦТАК.',
    img:'img/upload-2026-09-18T223037Z_261393634_RC2XLNAV9L03_RTRMADP_3_NORTNKOREA-POLITICS-pic_32ratio_900x600-900x600-75350.jpg',
    date:'24 октября 2026, 21:58',
    author:'Дмитрий Мусиенко',
    link:'news/kim-chyn-yn-nazval-zadachu-sozdat-silneyshee-v-mire-armiyu.html'
  },
  {
    cat:'В России',
    title:'Атака БПЛА на логистический центр Ozon в Омске: хроника событий',
    excerpt:'Беспилотник ударил по логистическому центру Ozon в Омске. ',
    img:'/img/shutterstock_1702050574-pic_32ratio_900x600-900x600-38835.jpg',
    date:'24 октября 2026, 19:12',
    link:'news/ataka-bpla-na-logisticheskiy-tsentr-ozon-v-omske.html'
  },
  {
    cat:'В мире',
    title:'Как Starlink стал рычагом внешней политики США',
    excerpt:'Спутниковый интернет от SpaceX давно перестал быть просто связью — он превратился в инструмент дипломатии и стратегии.',
    img:'img/79-pic_32ratio_900x600-900x600-43112.jpg',
    date:'24 октября 2026, 15:17',
    link:'news/starlink-kak-sputnikovyy-internet-stal-instrumentom-vneshney-politiki.html'
  },
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
