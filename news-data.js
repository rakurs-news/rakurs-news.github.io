const news = [
    {
    cat:'В России',
    title:'Воронеж под огнём: дроны вызвали пожар и разрушения',
    excerpt:'Более 70 беспилотников атаковали Воронеж. Губернатор Гусев сообщил о серии пожаров и повреждениях в городе. Есть погибшие и пострадавшие.',
    img:'/img/upload-shutterstock_2186413467-pic_32ratio_900x600-900x600-93656.jpg',
    date:'26 октября 2026, 09:39',
    author:'Дмитрий Мусиенко',
    link:'news/voronezh-pod-ognem-drony-vyzvali-pozhar-i-razrusheniya.html'
  },
  {
    cat:'В России',
    title:'Беспилотники атаковали Мелитополь: ранены трое, среди них двое детей',
    excerpt:'Ночью в Мелитополе пострадали три человека при атаке беспилотников. Об этом сообщил губернатор Запорожской области Евгений Балицкий в своём Telegram-канале.',
    img:'/img/RIAN_8172641.HR-pic_32ratio_900x600-900x600-75407.jpg',
    date:'26 октября 2026, 08:45',
    author:'Дмитрий Мусиенко',
    link:'news/ataka-bpla-na-melitopol-raneny-troe-vklyuchaya-detej.html'
  },
    {
    cat:'В России',
    title:'В Приморье задержали 18-летнего шпиона: он собирал данные о ТЭК',
    excerpt:'Житель Спасска-Дальнего 2007 года рождения подозревается в передаче сведений об объектах топливно-энергетического комплекса Приморья разведке Украины.',
    img:'/img/upload-20230915_gaf_u03_020-pic_32ratio_900x600-900x600-10936.jpg',
    date:'26 октября 2026, 07:09',
    author:'Дмитрий Мусиенко',
    link:'news/zaderzhan-18-letnij-shpion-v-primorye.html'
  },
  {
    cat:'В России',
    title:'У каждого десятого школьника России нашли проблемы с весом',
    excerpt:'**Около 10% школьников имеют избыточный вес или ожирение. Директор ФИЦ питания и биотехнологии Дмитрий Никитюк рассказал ТАСС, что показатель удалось стабилизировать.**',
    img:'/img/shutterstock_2376443987-pic_32ratio_900x600-900x600-42700.jpg',
    date:'26 октября 2026, 06:06',
    author:'Дмитрий Мусиенко',
    link:'news/izbytochny-ves-shkolnikov-rossii-statistika.html'
  },
  {
    cat:'Спорт',
    title:'Бывший вратарь «Спартака» забил со штрафного и принёс «Уралу» победу',
    excerpt:'Голкипер Сергей Селихов на 88-й минуте матча Первой лиги ударом со штрафного принёс «Уралу» победу над «Челябинском» — 3:1.',
    img:'/img/IMG_20261025_163406.png',
    date:'25 октября 2026, 16:35',
    author:'Дмитрий Мусиенко',
    link:'news/byvshiy-vratar-spartaka-zabil-s-shtrafnogo-za-ural.html'
  },
  {
    cat:'Армия',
    title:'До конца года: российские войска завершают окружение сил ВСУ под Славянском и Краматорском',
    excerpt:'Под Славянском и Краматорском разворачивается финальный этап операции по окружению группировки украинских войск.',
    img:'/img/5b8f7f8d959d6fbfd6d9179724f13658.webp',
    date:'25 октября 2026, 06:32',
    author:'Дмитрий Мусиенко',
    link:'news/slaviansk-kramatorsk-operacia-na-zakluchenii.html'
  },
  {
    cat:'В России',
    title:'Мошенники рассылают россиянам фальшивые претензии с вирусами',
    excerpt:'Аферисты прикрываются юристами и требуют миллионы. Внутри письма — вирус, который опустошает счета.',
    img:'/img/shutterstock_381063385-pic_32ratio_900x600-900x600-97295.jpg',
    date:'25 октября 2026, 06:02',
    author:'Дмитрий Мусиенко',
    link:'news/mashenniki-rassyilayut-falsyivyie-dosudebnyie-pretenzii-s-virusami.html'
  },
  {
    cat:'В мире',
    title:'Подразделение «Кайрос»: как дроны бьют по глубоким тылам',
    excerpt:'Подразделение ВСУ «Кайрос» стоит за ударами по объектам в глубине российской территории. Об этом пишет Bloomberg.',
    img:'/img/upload-2024-06-20T122033Z_744704379_RC24E8AWYSO4_RTRMADP_3_UKRAINE-CRISIS-KNARKIV-REGION-pic_32ratio_900x600-900x600-75135.jpg',
    date:'25 октября 2026, 05:07',
    author:'Дмитрий Мусиенко',
    link:'news/kajros-podrazdelenie-vsu-i-ataki-dronov.html'
  },
  {
    cat:'В мире',
    title:'Трамп назвал передачу Гренландии «сделкой века» в сфере недвижимости.',
    excerpt:'Трамп заявил о передаче Гренландии США, сравнив сделку с историческими соглашениями.  ',
    img:'/img/c11209a8f94aad5c6467177f1856d487.webp',
    date:'25 октября 2026, 04:41',
    author:'Дмитрий Мусиенко',
    link:'news/tramp-gryenlandiya-sdelka-veka.html'
  },
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
