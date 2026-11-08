const news = [
{
    cat:'Армия',
    title:'Наступление под Харьковом: стягивают резервы Киева',
    excerpt:'Ожесточённые бои в районах Волчанска и Купянска. Киев перебрасывает стратегические резервы из‑за прямой угрозы Харькову и напряжённой политической ситуации в городе.',
    img:'/img/Rakurs-News_20261108_112310.webp',
    video:'',
    date:'8 ноября 2026, 11:35',
    author:'Юлия Семененкова',
    link:'news/boevye-deistviya-harkov.html'
  },
  {
    cat:'Происшествия',
    title:'На Урале фуру разорвало в массовом ДТП',
    excerpt:'Кадры с места аварии: последствия удара, который не оставил шансов.',
    img:'/img/Rakurs-News_20261108_110208.webp',
    video:'',
    date:'8 ноября 2026, 11:04',
    author:'Николай Соколенко',
    link:'news/fura-razorvana-v-dtp-na-urale.html'
  },
{
    cat:'Армия',
    hero: true,
    title:'‎Колесный молот "Севера": как расчет САУ "Мальва" выжигает позиции противника. ‎',
    excerpt:'Как расчет САУ "Мальва" выжигает позиции противника. ‎',
    img:'',
    video:'https://vk.ru/clip-242510096_456239022?c=1',
    date:'8 ноября 2026, 10:38',
    author:'Юлия Семененкова',
    link:'news/kolesnyy-molot-malva-udaril-po-pozitsiyam-vsu.html'
  },
{
    cat:'Общество',
    title:'Любовницы остались с долгами: мужчина выманил 16 млн и погиб на СВО',
    excerpt:'История, в которой доверие обернулось долговой ловушкой.',
    img:'/img/Rakurs-News_20261107_134035.webp',
    video:'',
    date:'7 ноября 2026, 13:43',
    author:'Ирина Мусиенко',
    link:'news/rossiyanin-vymanil-16-mln-u-lyubovnic-i-pogib-na-svo.html'
  },
  {
    cat:'Армия',
    title:'Зеленский отверг ключевое условие Москвы: что это значит для переговоров',
    excerpt:'Перспективы мирного диалога снова под вопросом.',
    img:'/img/Rakurs-News_20261107_123330.webp',
    video:'',
    date:'7 ноября 2026, 12:35',
    author:'Юлия Семененкова',
    link:'news/zelenskiy-otverg-klyuchevoe-uslovie-moskvy.html'
  },
  {
    cat:'Культура',
    title:'Ушла из жизни Лидия Федосеева‑Шукшина',
    excerpt:'Легенда советского кино: 88 лет яркой судьбы.',
    img:'/img/Rakurs-News_20261107_120806.webp',
    video:'',
    date:'7 ноября 2026, 12:09',
    live: false,
    author:'Елена Соколенко',
    link:'news/lidiya-fedoseeva-shukshina-ushla-iz-zhizni.html'
  },
{
    cat:'В мире',
    title:'Финляндия думает о противотанковых рвах на границе с Россией',
    excerpt:'Инженерные заграждения в финском климате: плюсы и риски.',
    img:'/img/Rakurs-News_20261107_115507.webp',
    video:'',
    date:'7 ноября 2026, 11:58',
    author:'Алексей Резаев',
    link:'news/finlyandiya-izuchaet-protivotankovye-rvy-na-granice-s-rf.html'
  },
  {
    cat:'Общество',
    title:'В Приморье задержан отец, насиловавший дочь с четырёх лет',
    excerpt:'Девочка годами молчала из-за угроз: теперь подозреваемый под следствием.',
    img:'/img/Rakurs-News_20261107_110028.webp',
    video:'',
    date:'7 ноября 2026, 11:02',
    author:'Ирина Мусиенко',
    link:'news/otets-nasiloval-doch-s-chetyreh-let-zaderzhan-v-primore.html'
  },
  {
    cat:'Шоу-бизнес',
    title:'Дело мужа Блиновской закрыто',
    excerpt:'Уголовное дело против Алексея Блиновского прекращено. Об этом сообщила его адвокат. Блиновский обвинялся в уклонении от уплаты налогов.',
    img:'/img/Rakurs-News_20261107_100225.webp',
    video:'',
    date:'7 ноября 2026, 10:05',
    author:'Елена Куриная',
    link:'news/delo-muzha-blinovskoj-prekrascheno.html'
  },
  {
    cat:'Происшествия',
    title:'В Алма-Ате 14-летний школьник умер после укола антибиотика',
    excerpt:'Смерть восьмиклассника наступила после инъекции в поликлинике. Мальчик провёл неделю на искусственной вентиляции легких — врачи так и не смогли его спасти.',
    img:'/img/Rakurs-News_20261107.webp',
    video:'',
    date:'7 ноября 2026, 09:24',
    author:'Николай Соколенко',
    link:'news/podrostok-umer-posle-ukola-v-poliklinike-alma-aty.html'
  },
{
    cat:'Армия',
    hero: false,
    title:'Российские разведчики взяли в плен военных ВСУ без единого выстрела',
    excerpt:'Под Харьковом разведгруппа взяла в плен украинских военных — без стрельбы, только за счёт тактики и выдержки.',
    img:'/img/Rakurs-News_20261107_094040.webp',
    video:'',
    date:'7 ноября 2026, 09:12',
    author:'Юлия Семененкова',
    link:'news/rossiyskie-razvedchiki-vzyali-v-plen-bez-vystrelov.html'
  },
  {
    cat:'Шоу-бизнес',
    title:'Бэтпод с «Тёмного рыцаря»: ставка на легенду',
    excerpt:'Мотоцикл Бэтмена из фильма Кристофера Нолана ушёл на торги. Его стартовая цена — 1,2 миллиона долларов, это почти 98 миллионов рублей.',
    img:'/img/43b67c5b8073300ef96b5c7c8ff34248.webp',
    video:'',
    date:'7 ноября 2026, 08:56',
    author:'Елена Куриная',
    link:'news/bethpod-na-aukcione-za-1-2-mln-dollarov.html'
  },
  {
    cat:'В России',
    title:'Сколько украинцев въехало в Россию: цифры и цели поездок',
    excerpt:'С января по сентябрь 2026 года в Россию въехали 18 788 граждан Украины. Это почти на 6,6 тысячи человек меньше, чем годом ранее.',
    img:'/img/RIAN_8235484.HR-pic_32ratio_900x600-900x600-86114.jpg',
    video:'',
    date:'7 ноября 2026, 07:53',
    author:'Дмитрий Мусиенко',
    link:'news/ukraincy-v-rossii-statistika-peresecheniya-granicy.html'
  },
{
    cat:'Армия',
    title:'АдГ требует остановить поставки ракет Taurus Украине',
    excerpt:'В бундестаге бьют тревогу: риск передачи дальнобойных ракет растёт.',
    img:'/img/i.jpeg',
    video:'',
    date:'7 ноября 2026, 07:43',
    author:'Юлия Семененкова',
    link:'news/adg-protiv-postavok-raket-taurus-ukraine.html'
  },
{
    cat:'Армия',
    title:'Артиллерия группировки «Север» накрыла опорный пункт ВСУ',
    excerpt:'САУ «Мальва» уничтожили пункт управления дронами и личный состав противника',
    img:'',
    video:'',
    date:'7 ноября 2026, 07:09',
    author:'Юлия Семененкова',
    link:'news/vseso-unichtozhili-opornyj-punkt-i-punkty-upravleniya-bpla-vsus.html'
  },
{
    cat:'Спорт',
    title:'Локомотив» уступил «Рубину» — 0:1',
    excerpt:'Гол Тесленко на 71‑й минуте решил исход матча в Москве.',
    img:'/img/Rakurs-News_20261106_213341.webp',
    video:'',
    date:'6 ноября 2026, 21:36',
    author:'Андрей Грунский',
    link:'news/lokomotiv-proigral-rubinu-0-1-v-matche-rpl.html'
  },
{
    cat:'В России',
    title:'Пять лет за неудавшийся поджог: школьницу осудили в Красноярске',
    excerpt:'15‑летняя девочка получила реальный срок за попытку поджечь железнодорожное оборудование по заданию из мессенджера.',
    img:'/img/Rakurs-News_20261106_191045.webp',
    video:'',
    date:'6 ноября 2026, 19:13',
    author:'Дмитрий Мусиенко',
    link:'news/krasnoyarsk-shkolnitsa-osuzhdena-za-podzhog-zheleznodorozhnogo-oborudovaniya.html'
  },
  {
    cat:'Происшествия',
    title:'Убийство младенца в Оренбурге: задержан отец',
    excerpt:'22‑летний мужчина перекрыл дыхательные пути сыну — ребёнок погиб, мать проверяют на причастность.',
    img:'/img/Rakurs-News_20261106_143757.webp',
    video:'',
    date:'6 ноября 2026, 14:40',
    author:'Николай Соколенко',
    link:'news/orenburg-zaderzhan-muzhchina-za-ubiystvo-mladentsa.html'
  },
  {
    cat:'В мире',
    title:'НАТО: нет стопроцентной защиты от российских дронов и ракет',
    excerpt:'Генерал альянса признал уязвимость перед масштабами и эффективностью российского вооружения',
    img:'/img/Rakurs-News_20261106_140702.webp',
    video:'',
    date:'6 ноября 2026, 14:10',
    author:'Алексей Резаев',
    link:'news/nato-priznaet-otsutstvie-100-zaschity-ot-rossiiskih-dronov.html'
  },
{
    cat:'Происшествия',
    hero: false,
    video:'https://vk.ru/clip-242510096_456239021?c=1',
    title:'Выселение со спецназом: как иркутяне лишаются квартир',
    excerpt:'Выселение со спецназом: как иркутяне лишаются квартир',
    img:'',
    date:'6 ноября 2026, 12:46',
    author:'Николай Соколенко',
    link:'news/irkutsk-vyselenie-so-spetsnazom-istoriya-samostroya.html'
  },
  {
    cat:'В России',
    hero: false,
    title:'800 коров сожгли в Подмосковье',
    excerpt:'Вспышка узелкового дерматита вынудила власти утилизировать скот — жители двух посёлков пытались этому помешать.',
    img:'/img/Rakurs-News_20261106_113948.webp',
    date:'6 ноября 2026, 11:41',
    author:'Дмитрий Мусиенко',
    link:'news/podmoskove-sozhgli-800-korov-iz-za-dermatita.html'
  },
  {
    cat:'В мире',
    title:'Рютте: диалог Путина и Трампа — ключ к безопасности',
    excerpt:'Генсек НАТО подчеркнул: отношения лидеров России и США критически важны из‑за их ядерного статуса.',
    img:'/img/Rakurs-News_20261106_105819.webp',
    date:'6 ноября 2026, 11:03',
    author:'Алексей Резаев',
    link:'news/rütte-o-vazhnosti-dialoga-putina-i-trampa.html'
  },
  {
    cat:'Армия',
    hero: false,
    title:'109 атак за сутки в Белгородской области',
    excerpt:'Три мирных жителя ранены, повреждены дома, предприятия и транспорт — сводка по региону.',
    img:'/img/2110898344_0_159_3076_1889_1280x0_80_0_0_30a334e14456be4d28684919072e1631.jpg.webp',
    date:'6 ноября 2026, 09:57',
    author:'Юлия Семененкова',
    link:'news/belgorodskaya-oblast-109-atak-za-sutki.html'
  },
  {
    cat:'Армия',
    hero: false,
    title:'Удар ФАБ‑3000 по бригаде ВСУ в Димитрово',
    excerpt:'Авиабомба с модулем планирования поразила пункт дислокации 128‑й горно‑штурмовой бригады ВСУ.',
    img:'/img/Rakurs-News_20261106_092200.webp',
    date:'6 ноября 2026, 09:25',
    author:'Юлия Семененкова',
    link:'news/udar-fab-3000-po-brigade-vsu-v-dimitrovo.html'
  },
  {
    cat:'В России',
    title:'Банда силовиков на Урале: торговля гражданством',
    excerpt:'25‑летний замначальника миграционного отдела и сообщники — подозревают в легализации свыше 50 иностранцев.',
    img:'/img/Rakurs-News_20261106_084832.webp',
    date:'6 ноября 2026, 08:50',
    live: true,
    author:'Дмитрий Мусиенко',
    link:'news/banda-silovikov-torgovala-grazhdanstvom-na-yuzhnom-urale.html'
  },
  {
    cat:'Общество',
    hero: false,
    title:'63,5 тысячи мигрантов выдворены из России',
    excerpt:'За 9 месяцев 2026 года — плюс 75,8% запретов на въезд; список оснований для выдворения расширен вдвое.',
    img:'/img/Rakurs-News_20261106_082951.webp',
    date:'6 ноября 2026, 08:35',
    author:'Дмитрий Мусиенко',
    link:'news/migranty-vydvorenie-i-novye-normy-2026.html'
  },
  {
    cat:'Армия',
    title:'Удар по энергообъекту в Киевской области',
    excerpt:'Атакован парк хранения энергии в Белой Церкви — его использовали для нужд ВПК Украины.',
    img:'/img/Rakurs-News_20261106_081930.webp',
    date:'6 ноября 2026, 08:21',
    author:'Дмитрий Мусиенко',
    link:'news/udary-po-energoobektam-kievskaya-oblast.html'
  },
{
    cat:'Армия',
    title:'Приказ для дроноводов ВСУ: бить по своим пленным',
    excerpt:'Украинское командование ставит в приоритет удары по сдавшимся — свидетельства и логика приказа.',
    img:'/img/Rakurs-News_20261106_062449.jpg',
    date:'6 ноября 2026, 06:26',
    author:'Дмитрий Мусиенко',
    link:'news/drony-vsu-prikaz-bit-po-sdavshimsya-v-plen.html'
  },
  {
    cat:'В России',
    title:'Зарплаты мигрантов из Таджикистана: цифры и тренды.',
    excerpt:'Доходы в России в 3 раза выше средних по Таджикистану — и это только начало истории.',
    img:'/img/Rakurs-News_20261105_100408.jpg',
    date:'5 ноября 2026, 10:06',
    author:'Дмитрий Мусиенко',
    link:'news/migranty-iz-tadzhikistana-zarabotki-v-rossii.html'
  },
  {
    cat:'Спорт',
    title:'ООН: бойкот матчей РФ не признали дискриминацией',
    excerpt:'УВКПЧ связало отказ от игр со свободой выражения мнения — детали и правовые нюансы.',
    img:'/img/Rakurs-News_20261105_093822.jpg',
    date:'5 ноября 2026, 09:40',
    author:'Дмитрий Мусиенко',
    link:'news/boykot-matchej-sbornoy-rf-hokkey-oon-ne-uvidela-diskriminacii.html'
  },
{
    cat:'Здоровье',
    title:'Оптимальное время сна для здоровья сердца',
    excerpt:'Кардиолог назвала лучший час для засыпания и норму продолжительности сна — цифры и риски.',
    img:'/img/Rakurs-News_20261105_092237.jpg',
    date:'5 ноября 2026, 09:26',
    author:'Дмитрий Мусиенко',
    link:'news/optimalnoe-vremya-sna-dlya-zdorovya-serdca.html'
  },
  {
    cat:'Спорт',
    title:'Адриано Галлиани: битва за кресло президента FIGC',
    excerpt:'82‑летний ветеран «Милана» бросает вызов Джованни Малаго — выборы 14 декабря 2026 года решат судьбу итальянского футбола.',
    img:'/img/Rakurs-News_20261105_085906.jpg',
    date:'5 ноября 2026, 09:02',
    author:'Дмитрий Мусиенко',
    link:'news/adriano-galliani-pretenduet-na-post-prezidenta-figc.html'
  },
  {
    cat:'Происшествия',
    title:'Пожар в Тюменской области: два человека погибли',
    excerpt:'Трагедия в селе Шабаново: огонь унёс жизни, но одного жителя успели спасти.',
    img:'/img/Rakurs-News_20261105_084335.jpg',
    date:'5 ноября 2026, 08:47',
    author:'Дмитрий Мусиенко',
    link:'news/pozhar-v-tyumenskoy-oblasti-dva-pogibshih.html'
  },
  {
    cat:'Здоровье',
    title:'Медики Приморья спасли двух мужчин с тяжёлой патологией сердца',
    excerpt:'Остановка кровообращения, борьба за секунды и слаженная работа команды — как врачам удалось вернуть пациентов к жизни.',
    img:'/img/Rakurs-News_20261105_082842.jpg',
    date:'5 ноября 2026, 08:32',
    author:'Дмитрий Мусиенко',
    link:'news/spasenie-dvuh-muzhchin-s-tyazheloj-patologiej-serdca.html'
  },
  {
    cat:'Происшествия',
    title:'Спецгруппа вылетела к месту трагедии в тайге',
    excerpt:'Медведь убил охотника в Красноярском крае — напарник ждёт помощи в глухой тайге.',
    img:'/img/IMG_20261105_080251.jpg',
    date:'5 ноября 2026, 08:07',
    author:'Дмитрий Мусиенко',
    link:'news/spetsgruppa-vyletela-k-mestu-napadeniya-medvedya.html'
  },
{
    cat:'Наука',
    title:'Диализ не дал преимуществ ослабленным пожилым пациентам.',
    excerpt:'Консервативная помощь оказалась не хуже подготовки к диализу — данные крупного британского исследования.',
    img:'/img/IMG_20261105_074859.jpg',
    date:'5 ноября 2026, 07:51',
    author:'Дмитрий Мусиенко',
    link:'news/dializ-ne-dal-preimuschestv-pozhilym-patsientam.html'
  },
  {
    cat:'Шоу-бизнес',
    title:'Ким Кардашьян надела колье Элизабет Тейлор — и попала под шквал критики',
    excerpt:'Изумруды, бриллианты и буря эмоций: как один выход звезды вызвал волну негодования в сети.',
    img:'/img/1793810870123.png',
    date:'4 ноября 2026, 20:34',
    author:'Дмитрий Мусиенко',
    link:'news/kim-kardashyan-nadela-kole-elizabet-teylor-i-vyzvala-het.html'
  },
{
    cat:'Шоу-бизнес',
    title:'Дженнифер Лопес повторила культовый образ Джейн Фонды',
    excerpt:'От «Барбареллы» до сцены со скалами: как 57‑летняя звезда отдала дань уважения легенде Голливуда.',
    img:'/img/743b174f5febb579b910f72eb8a59430_ce_2560x1707x0x0_cropped_1020x680.webp',
    date:'4 ноября 2026, 20:15',
    author:'Дмитрий Мусиенко',
    link:'news/jennifer-lopez-povtorila-obraz-barbarellu-dzhejn-fondy.html'
  },
{
    cat:'Шоу-бизнес',
    hero: false,
    title:'Милла Йовович поздравила дочь Эвер с 19‑летием',
    excerpt:'Тёплые слова актрисы о дочери, её взрослении и первых успехах в кино.',
    img:'/img/IMG_20261104_182452.jpg',
    date:'4 ноября 2026, 18:29',
    author:'Дмитрий Мусиенко',
    link:'news/milla-jovovich-pozdravila-doch-ever-s-19-letiem.html'
  },
  {
    cat:'Спорт',
    title:'Биатлон: IBU не меняет позицию по допуску россиян.',
    excerpt:'Российские спортсмены остаются вне международных турниров; регламент IBU не предусматривает нейтральный статус.',
    img:'/img/AddText_11-04-03.16.01.jpg',
    date:'4 ноября 2026, 15:17',
    author:'Дмитрий Мусиенко',
    link:'news/biathlon-russia-ibu-position-unchanged.html'
  },
{
    cat:'В России',
    title:'Россия и Азербайджан: курс на совместное разминирование и ремонт техники.',
    excerpt:'МЧС РФ готово помогать Азербайджану в разминировании; согласована программа ремонта бронетехники.',
    img:'/img/IMG_20261104_132345.png',
    date:'4 ноября 2026, 13:24',
    live: true,
    author:'Дмитрий Мусиенко',
    link:'news/rossiya-azerbaydzhan-sotrudnichestvo-v-razminirovanii-i-remonte-tekhniki.html'
  },
{
    cat:'В России',
    title:'Косулю спасли из ледяного плена в Комсомольске‑на‑Амуре',
    excerpt:'Спасатели вытащили обессиленную косулю из полыньи на набережной — животное чудом держалось на плаву.',
    img:'/img/IMG_20261104_082759.jpg',
    date:'4 ноября 2026, 08:29',
    author:'Дмитрий Мусиенко',
    link:'news/kosulya-spasennaya-iz-lda-v-komsomolske.html'
  },
{
    cat:'В России',
    hero: false,
    title:'Атака БПЛА на склад Ozon в Адыгее: пожар, эвакуация, убытки',
    excerpt:'Логистический центр в Адыгейске остановлен, убытки компании превысили 30 млрд рублей.',
    img:'/img/22da3a0f783b5161da911d21d7e9cbd6.webp',
    date:'4 ноября 2026, 07:51',
    author:'Дмитрий Мусиенко',
    link:'news/ataka-bpla-na-sklad-ozon-v-adygee-pozhar-i-ubytki.html'
  },
{
    cat:'В России',
    title:'Пенсионер застрял в ванной: четыре дня в ловушке.',
    excerpt:'В Москве 71‑летний мужчина весом 140 килограммов застрял в ванне и провёл там четверо суток.',
    img:'/img/shutterstock_1029830881-pic_32ratio_900x600-900x600-5779.jpg',
    date:'3 ноября 2026, 21:31',
    author:'Дмитрий Мусиенко',
    link:'news/pensioner-zastryal-v-vanne-moskva.html'
  },
{
    cat:'В России',
    title:'На Урале мать избивала дочь кабелем — суд отправил её под арест',
    excerpt:'Жительница Кушвы около года истязала семилетнюю дочь. Женщина била девочку шнуром от зарядки, дёргала за волосы и бросала в неё предметы.',
    img:'/img/shutterstock_2219522063-pic_32ratio_900x600-900x600-13571.jpg',
    date:'3 ноября 2026, 20:49',
    author:'Дмитрий Мусиенко',
    link:'news/mama-s-verevki-arestovana-ural.html'
  },
{
    cat:'В мире',
    title:'Чехия: армия не готова к крупному конфликту',
    excerpt:'Президент Петр Павел прямо заявил: чешская армия не справится с серьёзным противостоянием и не выполнит обязательства перед НАТО.',
    img:'/img/IMG_20261103_161036.jpg',
    date:'3 ноября 2026, 16:18',
    author:'Дмитрий Мусиенко',
    link:'news/cheshskaya-armiya-problemy-i-plany.html'
  },
{
    cat:'В России',
    hero: false,
    title:'Атака ВСУ: жертвы в Луганской Народной Республике',
    excerpt:'Под ударом — мирные жители и энергетики. За сутки — 6 погибших, 20 раненых. Данные озвучил глава ЛНР Леонид Пасечник 3 ноября.',
    img:'/img/7acdcde52396d42e270090c701f2df1f.jpg',
    date:'3 ноября 2026, 14:57',
    author:'Дмитрий Мусиенко',
    link:'news/ataka-vsu-luganskaya-narodnaya-respublika.html'
  },
{
    cat:'В России',
    title:'Житель Новосибирска предстанет перед судом по обвинению в государственной измене.',
    excerpt:'Мужчина перевел деньги украинскому фонду, поддерживающему ВСУ.',
    img:'/img/1869375330_0_0_3072_1728_1280x0_80_0_0_99b07f214773a6d22fe1f1c2958c0035.jpg.webp',
    date:'3 ноября 2026, 12:25',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/novosibirsky-uchastnik-ukrainskogo-fonda-obvinen-v-gosizmene.html'
  },
{
    cat:'В мире',
    hero: false,
    title:'Европейским «миротворцам» на Украине разрешат стрелять по ВС РФ',
    excerpt:'The Guardian: западные войска на Украине получат право открывать огонь по российским солдатам.',
    img:'/img/IMG_20261103_111203.jpg',
    date:'3 ноября 2026, 11:14',
    author:'Дмитрий Мусиенко',
    link:'news/evropeyskie-mirotvortsy-na-ukraine-smogut-otkryvat-ogon.html'
  },
  {
    cat:'В России',
    title:'Белгородчанина осудили за госизмену: 21 год строгого режима',
    excerpt:'Житель Белгородской области проведет следующие 21 год за решеткой.',
    img:'/img/IMG_20261103_103605.jpg',
    date:'3 ноября 2026, 10:38',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/belgorodskaya-oblast-izmuchnik-prigovoren-k-21-godu-tyurmy.html'
  },
{
    cat:'В России',
    title:'В Бурятии с начала года ликвидировали более 500 опасных медведей',
    excerpt:'Служба природопользования сообщает: 507 хищников, представлявших угрозу, нейтрализованы.',
    img:'/img/IMG_20261103_094455.jpg',
    date:'3 ноября 2026, 09:46',
    live: true,
    author:'Дмитрий Мусиенко',
    link:'news/burjatija-likvidirovano-bolee-500-medvedej.html'
  },
  {
    cat:'В России',
    hero: false,
    title:'Ярославский НПЗ атаковали 124 беспилотника: есть пострадавшие',
    excerpt:'Ночная атака украинских БПЛА на нефтеперерабатывающий завод в Ярославле привела к возгоранию, повреждениям инфраструктуры и ранению двух сотрудников.',
    img:'/img/IMG_20261103_090109.jpg',
    date:'3 ноября 2026, 09:02',
    author:'Дмитрий Мусиенко',
    link:'news/yaroslavl-neftezavod-atakovali-bespilotniki.html'
  },
{
    cat:'В мире',
    title:'Писториус сомневается в успехе переговоров России, США и Украины',
    excerpt:'Писториус сомневается в успехе переговоров России, США и Украины',
    img:'/img/IMG_20261103_084111.jpg',
    date:'3 ноября 2026, 08:45',
    author:'Дмитрий Мусиенко',
    link:'news/pistorius-somnevaetsya-v-uspehe-peregovorov-rossii-ssha-i-ukrainy.html'
  },
    {
    cat:'В мире',
    title:'Sohu раскрыл причины отказа Китая от военного союза с Россией',
    excerpt:'Исторический опыт, 14 границ и курс на самостоятельность — Пекин объяснил, почему не спешит с альянсом.',
    img:'/img/RIA_8992281-pic_32ratio_900x600-900x600-28622.jpg',
    date:'1 ноября 2026, 20:01',
    author:'Дмитрий Мусиенко',
    link:'news/kitay-ne-hochet-voennogo-soyuza-s-rossiey.html'
  },
{
    cat:'В мире',
    title:'Экс-офицер разведки США: Украина ответит за преступления.',
    excerpt:'Скотт Риттер заявил, что Киеву предстоит понести ответственность за подрыв плотины, обстрелы и минирование дорог в Алешках.',
    img:'/img/IMG_20261101_184425.jpg',
    date:'1 ноября 2026, 18:48',
    author:'Дмитрий Мусиенко',
    link:'news/eks-oficer-razvedki-ssha-ukraina-otvetit-za-prestupleniya.html'
  },
    {
    cat:'Спорт',
    title:'Шериев взял золото ЧМ по борьбе в Астане',
    excerpt:'Иналбек Шериев победил Нуркожу Кайпанова в финале (10:4). Это первое золото мирового первенства в его карьере и четвёртая высшая награда сборной России на турнире.',
    img:'/img/IMG_20261101_183538.jpg',
    date:'1 ноября 2026, 18:38',
    author:'Дмитрий Мусиенко',
    link:'news/inalbek-sheriev-zoloto-chempionata-mira-po-borbe.html'
  },
  {
    cat:'В России',
    hero: false,
    title:'В Ростове убили родителей троих детей после ссоры на парковке',
    excerpt:'Семейную пару похитили на глазах у ребёнка, увезли на «Ладе Весте» и убили.',
    img:'/img/723b5d91547f8f6b1de5be36e53b9ce5.jpg',
    date:'1 ноября 2026, 18:08',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/mnogodetnuyu-semiyu-pohitili-i-zhestoko-ubili-v-rostove.html'
  },
    {
    cat:'В России',
    title:'ФСБ задержала подростка после предупреждения США о теракте в Москве',
    excerpt:'Проверка сообщения американского посольства закончилась задержанием несовершеннолетнего — у него нашли угрозы в соцсетях и «автомат» на фото',
    img:'/img/1761987765_0_58_1595_955_1280x0_80_0_0_4adee0272d3ee25aa81e1d7c18d76444.jpg.webp',
    date:'1 ноября 2026, 17:20',
    author:'Дмитрий Мусиенко',
    link:'news/fsb-raskrila-detali-proverki-soobshcheniya-ssha-o-terakte.html'
  },
  {
    cat:'В России',
    title:'Мороз не страшен: как сохранить авто зимой',
    excerpt:'Узнайте, какие ошибки совершают водители и как их избежать, чтобы ваш автомобиль служил верой и правдой даже в лютые морозы.',
    img:'/img/0b6bfce501350ed48229501cbb811d09.webp',
    date:'1 ноября 2026, 16:54',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/avto-sovety-v-moroz.html'
  },
    {
    cat:'В России',
    title:'Резкий отказ от алкоголя: почему это смертельно опасно',
    excerpt:'Нарколог предупреждает: синдром отмены после долгого запоя убивает до 20% пациентов без лечения.',
    img:'/img/b369cc057efcee8942de6e029e30a906.jpg',
    date:'1 ноября 2026, 16:29',
    author:'Дмитрий Мусиенко',
    link:'news/rezkiy-otkaz-ot-alkogolya-smertelnaya-opasnost.html'
  },
  {
    cat:'В мире',
    title:'Британия: Украина может уступить территории России ради мира',
    excerpt:'Мирный договор по Украине может включать территориальные потери Киева, считают эксперты.',
    img:'/img/RIA_8135498-pic_32ratio_900x600-900x600-52443.jpg',
    date:'1 ноября 2026, 16:18',
    author:'Дмитрий Мусиенко',
    link:'news/mirnoe-soglashenie-po-ukraine-territorialnye-ustupki-rossii.html'
  },
    {
    cat:'В России',
    title:'Ребёнок в коме: мать обвинила врачей в Ленобласти',
    excerpt:'Мальчик больше месяца без сознания — СК расследует дело о тяжком вреде здоровью.',
    img:'/img/82fa854d4b690afb7d4c4004a34e0d6c.jpg',
    date:'1 ноября 2026, 15:54',
    author:'Дмитрий Мусиенко',
    link:'news/rebenok-v-kome-mat-obvinila-vrachej-lenoblast.html'
  },
    {
    cat:'В России',
    title:'В России нашли фишинговый сайт для регистрации дронов',
    excerpt:'Фейковый сервис копирует «ЭРА‑ГЛОНАСС» — как не попасться на уловку.',
    img:'/img/upload-shutterstock_1853626690-pic_32ratio_900x600-900x600-7595.jpg',
    date:'1 ноября 2026, 15:42',
    author:'Дмитрий Мусиенко',
    link:'news/fishing-sajt-dlya-registracii-dronov-v-rossii.html'
  },
  {
    cat:'В России',
    title:'Ввоз дизельных авто с пробегом в Россию рухнул на 60%',
    excerpt:'Рост утильсбора и смена маршрутов поставок — почему рынок просел.',
    img:'/img/Kia_Mohave_low_22.12-pic_32ratio_900x600-900x600-72225.jpg',
    date:'1 ноября 2026, 15:31',
    author:'Дмитрий Мусиенко',
    link:'news/vvoz-dizelnyh-avto-s-probegom-upal-na-60.html'
  },
    {
    cat:'В мире',
    title:'Китай усиливает контроль за активами чиновников',
    excerpt:'Проверки доходов, имущества и семейного бизнеса — что меняет новый план ЦК КПК.',
    img:'/img/235697178_0_75_800_525_1280x0_80_0_0_d039a5ed06289cc4460044ad2cf135c9.jpg.webp',
    date:'1 ноября 2026, 15:04',
    author:'Дмитрий Мусиенко',
    link:'news/kitaj-usilivaet-kontrol-za-aktivami-chinovnikov.html'
  },
    {
    cat:'В мире',
    title:'Сестра Линдси Грэма — об «одержимости» сенатора санкциями',
    excerpt:'От 100% пошлин до 500% — сестра рассказала о позиции Грэма и разговоре с Трампом.',
    img:'/img/IMG_20261101_144735.jpg',
    date:'1 ноября 2026, 14:48',
    author:'Дмитрий Мусиенко',
    link:'news/sestra-gryema-o-ego-odolezhimosti-sankciyami.html'
  },
  {
    cat:'В России',
    hero: false,
    title:'Мать из Новочеркасска: суд над женщиной, годами истязавшей сыновей',
    excerpt:'Голод, побои, изгнание из дома — следствие раскрыло детали; женщине грозит до 7 лет.',
    img:'/img/IMG_20261101_134103.jpg',
    date:'1 ноября 2026, 13:46',
    author:'Дмитрий Мусиенко',
    link:'news/mat-iz-novocherkasska-sud-nad-istyazatelnicej.html'
  },
    {
    cat:'В мире',
    title:'Каллас против участия Путина в саммите G20',
    excerpt:'Глава евродипломатии Кая Каллас выступила против участия Владимира Путина в декабрьском саммите G20 во Флориде. Об этом она сообщила в интервью Bloomberg TV.',
    img:'/img/IMG_20261101_103302.jpg',
    date:'1 ноября 2026, 10:36',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/kalas-protiv-uchastiya-putina-v-g20.html'
  },
  {
    cat:'Армия',
    title:'Удары российских войск наносят потери ВСУ в Сумской области',
    excerpt:'Российские войска атаковали командный пункт противника в Сумской области, сообщают силовые структуры.',
    img:'/img/IMG_20261101_101023.jpg',
    date:'1 ноября 2026, 10:12',
    live: true,
    author:'Дмитрий Мусиенко',
    link:'news/potery-vsu-v-sumskoy-oblasti-iz-za-udara.html'
  },
  {
    cat:'Армия',
    title:'Российские войска атаковали объекты на станции Конотоп',
    excerpt:'Министерство обороны России сообщило о ночных ударах по железнодорожной станции Конотоп в Сумской области. Удары были направлены на объекты, отвечающие за управление движением.',
    img:'/img/rakurs_news_32ratio_900x600-900x600-22981.jpg',
    date:'1 ноября 2026, 08:48',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/rossiyskie-voyska-nanesli-udar-po-obiektam-v-konotop.html'
  },
  {
    cat:'В мире',
    hero: false,
    title:'Переговоры по Украине: в чём проблема с участием Европы',
    excerpt:'Профессор Диесен — о «неудобной» роли европейцев; возможная встреча в Абу‑Даби в ноябре.',
    img:'/img/rakurs-news-stol-peregivorov.jpg.webp',
    date:'1 ноября 2026, 07:58',
    author:'Дмитрий Мусиенко',
    link:'news/peregovory-po-ukraine-riski-i-pozicii.html'
  },
  {
    cat:'Армия',
    title:'Медведь с противотанковой миной: кадры из фотоловушки',
    excerpt:'Хищник попал в объектив в октябре 2025; мина похожа на ТМ‑62.',
    img:'/img/rakurs-news-medved-i-mina.jpg',
    date:'31 октября 2026, 19:55',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/medved-s-minoy-v-zubah.html'
  },
  {
    cat:'В мире',
    hero: true,
    title:'Заявление главкома НАТО: война не неизбежна, но готовиться надо',
    excerpt:'Генерал Гринкевич — о готовности к конфликту; позиция Москвы: «победителей не будет».',
    img:'/img/IMG_20261031_184429.png',
    date:'31 октября 2026, 18:45',
    author:'Дмитрий Мусиенко',
    link:'news/zayavlenie-glavkoma-nato-o-konflikte-s-rossiey.html'
  },
  {
    cat:'Экономика',
    title:'Россия и Таиланд: энергоресурсы и рост товарооборота',
    excerpt:'Обсуждаются долгосрочные поставки энергоресурсов; товарооборот вырос на 37% за 8 месяцев.',
    img:'/img/IMG_20261031_174601.png',
    date:'31 октября 2026, 17:49',
    author:'Дмитрий Мусиенко',
    link:'news/energopostavki-iz-rossii-v-tailand.html'
  },
  {
    cat:'Армия',
    hero: false,
    title:'Удар по производству БПЛА в Харькове: что это значит',
    excerpt:'Поражены цеха «Протона»; эксперт прогнозирует спад атак по тыловым российским регионам.',
    img:'/img/AddText_10-31-04.43.47.jpg',
    date:'31 октября 2026, 16:46',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/udar-po-proizvodstvu-bpla-v-harkove.html'
  },
  {
    cat:'В мире',
    title:'Кризис в Польше: чем он грозит Евросоюзу',
    excerpt:'Политолог Перенджиев — о рисках «эффекта домино» для Европы и протестах в Варшаве.',
    img:'/img/5-pic_32ratio_900x600-900x600-45273.jpg',
    date:'31 октября 2026, 15:33',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/krizis-v-polshe-riski-dlya-es.html'
  },
  {
    cat:'В России',
    title:'Как легально снизить плату за свет: советы депутата',
    excerpt:'Замена ламп на LED экономит до 40% расходов; семья может сберечь 1–1,5 тыс. рублей в год.',
    img:'/img/RIAN_5683800.HR-pic905-895x505-29694.jpg',
    date:'31 октября 2026, 14:13',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/kak-snizit-platu-za-svet.html'
  },
  {
    cat:'В России',
    title:'Курьер на мопеде сбил ребёнка в Петербурге  ',
    excerpt:'Мальчика протащило 15 метров; у него тяжёлые травмы, он в больнице.',
    img:'/img/upload-kur-pic_32ratio_900x600-900x600-63206.jpg',
    date:'31 октября 2026, 13:35',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/kurier-sbil-rebenka-v-peterburge.html'
  },
    {
    cat:'В мире',
    hero: false,
    title:'Поставки 500 ракет для Patriot: ждать до 2030 года  ',
    excerpt:'Ракеты PAC‑3 поступят не раньше 2030; сделка на $2,1 млрд финансируется союзниками.',
    img:'/img/AP26191286257668-pic_32ratio_900x600-900x600-37760.jpg',
    date:'31 октября 2026, 12:33',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/postavki-raket-patriot-dlya-vsu.html'
  },
  {
    cat:'В России',
    hero: false,
    title:'ФСБ задержала 56 пользователей «Дайвинчика»  ',
    excerpt:'Возраст задержанных — от 12 до 24 лет; их вовлекали в преступления через чат‑бот в Telegram.  ',
    img:'/img/1551470264_96_0_2000_1071_1280x0_80_0_0_3888e825768101825e1d71728970d662.jpg.webp',
    date:'29 октября 2026, 08:22',
    author:'Дмитрий Мусиенко',
    link:'news/zaderzhaniya-cherez-servis-dajvinchik.html'
  },
    {
    cat:'В России',
    hero: false,
    title:'Атака дронов на Москву: одна из крупнейших с начала года',
    excerpt:'613 БПЛА летели к столице в ночь на 29 октября, 231 перехвачен на подлёте.',
    img:'/img/upload-2024-03-01T105444Z_475782542_RC29C6A8E38I_RTRMADP_3_UKRAINE-CRISIS-EAST-DRONES-pic_32ratio_900x600-900x600-71352.jpg',
    date:'29 октября 2026, 07:59',
    author:'Дмитрий Мусиенко',
    link:'news/ataka-dronov-na-moskvu-29-oktyabrya.html'
  },
  {
    cat:'В мире',
    title:'Уязвимость армии США перед БПЛА: что показали учения в Германии  ',
    excerpt:'Дроны «Немезиды» нанесли 70% условных потерь бронетанковой бригаде США на учениях Combined Resolve.',
    img:'/img/AP23184355910016-pic_32ratio_900x600-900x600-54966.jpg',
    date:'27 октября 2026, 09:02',
    author:'Дмитрий Мусиенко',
    link:'news/uyazvimost-armii-ssha-pered-bpla.html'
  },
    {
    cat:'В России',
    title:'На Урале остановили движение поездов после схода вагонов',
    excerpt:'Семь грузовых вагонов сошли с рельсов и загорелись в Свердловской области. На перегоне работают 250 специалистов.',
    img:'/img/2126962438_0_0_1917_1079_1280x0_80_0_0_ab9c5bbd66b71b4cc163da43eae1fe67.jpg.webp',
    date:'26 октября 2026, 10:54',
    live: false,
    author:'Дмитрий Мусиенко',
    link:'news/ural-priostanovil-dvizhenie-poezdov-posle-shoda-vagonov.html'
  },
  {
    cat:'В России',
    title:'ФСБ задержала готовивших атаки дронов агентов СБУ',
    excerpt:'Задержанные достали FPV-дроны из тайников под Смоленском и Калугой. Управление ими планировалось с территории Украины.',
    img:'/img/IMG_20261026_103246_617.jpg',
    date:'26 октября 2026, 10:38',
    author:'Дмитрий Мусиенко',
    link:'news/fsb-zaderzhala-agentov-sbu-gotovivshih-ataki-dronov-na-pvo-moskvy.html'
  },
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
