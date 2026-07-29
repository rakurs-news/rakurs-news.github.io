console.log('Скрипт запустился');

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const loader = document.getElementById('loader');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    const featuredNewsContainer = document.getElementById('main-news');
    const progressBar = document.getElementById('progress-bar');
    const scrollToTopButton = document.getElementById('scrollToTop');

    let allNewsData = [];
    let currentCategory = 'all';

        // --- 1. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ ДЛЯ КАТЕГОРИЙ (ИСПРАВЛЕНО) ---
        const categoriesContainer = document.querySelector('.categories-panel'); // Ищем по классу панели
    
        if (categoriesContainer) {
            categoriesContainer.addEventListener('wheel', (evt) => {
                evt.preventDefault(); 
                categoriesContainer.scrollLeft += evt.deltaY;
            }, { passive: false });
        } else {
            console.warn('⚠️ Блок .categories-panel не найден. Проверь HTML.');
        }
        // --------------------------------------------------------
    

    // --- 2. ЗАГРУЗКА НОВОСТЕЙ ---
       // --- 2. ЗАГРУЗКА НОВОСТЕЙ ---
       fetch('news.json')
       .then(response => {
           if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
           return response.json();
       })
       .then(data => {
           allNewsData = data.items || []; 

           if (data.featuredNewsId && allNewsData.length > 0) {
               const featuredNews = allNewsData.find(item => item.id === data.featuredNewsId);
               if (featuredNews) displayFeaturedNews(featuredNews);
           }

           displayNews(allNewsData);
           
           // 👇 ВОТ ЗДЕСЬ МЫ ВЫЗЫВАЕМ ЗАПОЛНЕНИЕ САЙДБАРА (после успешной загрузки)
           populateTrendsList(); 

           if (loader) loader.style.display = 'none'; 
       })
       .catch(error => {
           console.error('Ошибка загрузки новостей:', error);
           if (loader) {
               loader.textContent = 'Не удалось загрузить новости. Проверьте консоль.';
               loader.style.display = 'block'; 
           }
       });

   // 👇 ЭТА ФУНКЦИЯ ДОЛЖНА БЫТЬ ОТДЕЛЬНО (не внутри catch!)
   function populateTrendsList() {
       const trendsContainer = document.querySelector('.trends-list');
       if (!trendsContainer || allNewsData.length === 0) return;

       const topTrends = allNewsData.slice(0, 5); 
       trendsContainer.innerHTML = ''; 

       topTrends.forEach(item => {
           const li = document.createElement('li');
           li.innerHTML = `<a href="#" class="trend-link" onclick="handleReadMoreClick('${item.id}')">🔥 ${item.title}</a>`;
           trendsContainer.appendChild(li);
       });
   }


    // --- ФУНКЦИИ ОТРИСОВКИ (остальной твой код без изменений) ---
    function displayFeaturedNews(newsItem) {
        if (featuredNewsContainer) {
            featuredNewsContainer.style.display = 'block';
            
            let formattedDate = '';
            if (newsItem.date) {
                try {
                    formattedDate = new Date(newsItem.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
                } catch (e) {
                    formattedDate = newsItem.date; 
                }
            }

            featuredNewsContainer.innerHTML = `
                <div class="featured-news-card">
                    <img src="${newsItem.image}" alt="${newsItem.title}" class="featured-news-image">
                    <div class="featured-news-content">
                        <h2 class="featured-news-title">${newsItem.title}</h2>
                        <p class="featured-news-date">${formattedDate}</p>
                        <p class="featured-news-description">${newsItem.description}</p>
                        <a href="#" class="read-more-featured" data-id="${newsItem.id}">Читать полностью</a>
                    </div>
                </div>
            `;
            const readMoreFeatured = featuredNewsContainer.querySelector('.read-more-featured');
            if (readMoreFeatured) {
                readMoreFeatured.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleReadMoreClick(e.target.getAttribute('data-id'));
                });
            }
        }
    }

    function displayNews(newsArray) {
        if (!newsContainer) return;
        newsContainer.innerHTML = ''; 
        if (!newsArray || newsArray.length === 0) {
            newsContainer.innerHTML = '<p>Новостей не найдено.</p>';
            return;
        }
    
        // Словарь для приведения названий категорий к нужному формату классов
        const categoryMap = {
            'сво': 'сво',
            'общество': 'общество',
            'регионы': 'регионы',
            'государство': 'государство',
            'происшествия': 'происшествия',
            'криминал': 'криминал',
            'политика': 'политика',
            'геополитика': 'геополитика',
            'коррупция': 'коррупция',
            'шоу-бизнес': 'шоу-бизнес',
            'спорт': 'спорт',
            'наука': 'наука',
            'стиль': 'стиль',
            'культура': 'культура'
        };
    
        newsArray.forEach(newsItem => {
            let formattedDate = '';
            if (newsItem.date) {
                try {
                    formattedDate = new Date(newsItem.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
                } catch (e) {
                    formattedDate = newsItem.date; 
                }
            }
    
            // Получаем категорию и ищем соответствующий класс
            let categoryKey = 'other';
            if (newsItem.category) {
                const lowerCat = newsItem.category.toLowerCase().trim();
                // Если категория есть в нашем списке - берем ключ, иначе ставим 'other'
                categoryKey = categoryMap[lowerCat] || 'other';
            }
            
            const categoryClass = categoryKey !== 'other' ? `category-badge category-${categoryKey}` : 'news-category-badge';
            const categoryText = newsItem.category || 'Разное';
            
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
            
            newsElement.innerHTML = `
                <div class="news-card">
                    <span class="${categoryClass}">${categoryText}</span>
                    <img src="${newsItem.image}" alt="${newsItem.title}" class="news-image">
                    <div class="news-content">
                        <h3 class="news-title">${newsItem.title}</h3>
                        <p class="news-date">${formattedDate}</p>
                        <p class="news-description">${newsItem.description}</p>
                        <a href="#" class="read-more" data-id="${newsItem.id}">Читать далее</a>
                    </div>
                </div>
            `;
            newsContainer.appendChild(newsElement);
        });
    }
    

    // --- ФИЛЬТРАЦИЯ И ПОИСК ---
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.getAttribute('data-category');
            filterNews();
        });
    });

    function filterNews() {
        const filtered = currentCategory === 'all' 
            ? allNewsData 
            : allNewsData.filter(item => item.category === currentCategory);
        displayNews(filtered);
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length > 1) {
            const filtered = allNewsData.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
            displayNews(filtered);
        } else if (query.length === 0) {
            filterNews(); 
        }
    });

    // --- ОБРАБОТКА КЛИКА НА "ЧИТАТЬ ДАЛЕЕ" ---
    function handleReadMoreClick(newsId) {
        const item = allNewsData.find(i => i.id === newsId);
        if (item) {
            window.location.href = `${newsId}.html`;
        }
    }

    if (newsContainer) { 
        newsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('read-more')) {
                event.preventDefault(); 
                handleReadMoreClick(event.target.getAttribute('data-id'));
            }
        });
    }

    // --- ПРОКРУТКА И ПРОГРЕСС-БАР ---
    window.addEventListener('scroll', () => {
        progressBarScroll();
    });

    function progressBarScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0 && progressBar) {
            progressBar.style.width = ((winScroll / height) * 100) + '%';
        }
    }

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

        // --- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (Твой код, он верный) ---
        const themeToggleBtn = document.querySelector('.theme-toggle');
    
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                if (document.body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.removeItem('theme');
                }
            });
        }
    
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme'); 
        }
    
    
        // --- КУРС ВАЛЮТ (ИСПРАВЛЕННЫЙ И ВСТРОЕННЫЙ) ---
        
        // Объявляем функцию ВНУТРИ DOMContentLoaded
        async function updateCurrency() {
            const usdEl = document.getElementById('usd-rate');
            const eurEl = document.getElementById('eur-rate');
            const commentEl = document.getElementById('currency-comment');
    
            // Проверка: если элементов нет (например, на мобильном сайдбар скрыт), выходим
            if (!usdEl || !eurEl || !commentEl) {
                return; 
            }
    
            try {
                const response = await fetch('https://api.exchangerate.host/latest?base=RUB');
                const data = await response.json();
    
                usdEl.textContent = usd;
                eurEl.textContent = eur;
    
                let comment = '';
                const usdVal = parseFloat(usd);
                
                if (usdVal > 95) {
                    comment = "Рубль улетел в космос, но обещал вернуться… через неделю и с доплатой.";
                } else if (usdVal > 90 && usdVal <= 95) {
                    comment = "Курс такой нервный, что даже котировки пьют валерьянку.";
                } else {
                    comment = "Стабильность? Скорее, затишье перед иронией. Держите кофе крепче.";
                }
                commentEl.textContent = comment;
            } catch (e) {
                console.error('Ошибка загрузки курса:', e);
                // Можно раскомментировать строку ниже, если хочешь видеть ошибку прямо на сайте
                // commentEl.textContent = "Не удалось загрузить курс. Проверьте консоль.";
            }
        }
    
        // ЗАПУСКАЕМ функцию СРАЗУ после загрузки DOM
        updateCurrency();
    
        // Обновляем каждые 5 минут (300 000 мс)
        setInterval(updateCurrency, 300000);
    
    }); // <-- Это конец твоего большого DOMContentLoaded
    