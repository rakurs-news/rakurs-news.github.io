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
    
    // --- НАСТРОЙКИ ПАГИНАЦИИ ---
    const ITEMS_PER_PAGE = 20; 
    let currentPage = 1;       
    // --------------------------

    // --- 1. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ ДЛЯ КАТЕГОРИЙ ---
    const categoriesContainer = document.querySelector('.categories-panel'); 
    if (categoriesContainer) {
        categoriesContainer.addEventListener('wheel', (evt) => {
            evt.preventDefault(); 
            categoriesContainer.scrollLeft += evt.deltaY;
        }, { passive: false });
    } else {
        console.warn('⚠️ Блок .categories-panel не найден.');
    }

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

        renderPaginatedNews(allNewsData);

        if (loader) loader.style.display = 'none'; 
    })
    .catch(error => {
        console.error('Ошибка загрузки новостей:', error);
        if (loader) {
            loader.textContent = 'Не удалось загрузить новости. Проверьте консоль.';
            loader.style.display = 'block'; 
        }
        // Даже если новости не загрузились, пробуем отрисовать пустую пагинацию или заглушку
        renderPaginatedNews([]);
    });

    // --- ФУНКЦИИ ОТРИСОВКИ ---
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

    // --- ПАГИНАЦИЯ ---
    function renderPaginatedNews(newsArray) {
        if (!newsContainer) return;
        newsContainer.innerHTML = ''; 

        if (!newsArray || newsArray.length === 0) {
            newsContainer.innerHTML = '<p>Новостей не найдено.</p>';
            return;
        }

        const totalPages = Math.ceil(newsArray.length / ITEMS_PER_PAGE);
        
        if (totalPages <= 1) {
            displayNewsSlice(newsArray, 0, newsArray.length);
            return;
        }

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        
        displayNewsSlice(newsArray, start, end);

        // --- ОТРИСОВКА КНОПОК ---
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-wrapper';

        if (currentPage > 1) {
            paginationContainer.innerHTML += `<button class="page-btn" onclick="changePage(${currentPage - 1})">« Назад</button>`;
        } else {
            paginationContainer.innerHTML += `<span class="page-btn disabled">« Назад</span>`;
        }

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                paginationContainer.innerHTML += `<span class="page-btn active">${i}</span>`;
            } else {
                paginationContainer.innerHTML += `<button class="page-btn" onclick="changePage(${i})">${i}</button>`;
            }
        }

        if (currentPage < totalPages) {
            paginationContainer.innerHTML += `<button class="page-btn" onclick="changePage(${currentPage + 1})">Далее »</button>`;
        } else {
            paginationContainer.innerHTML += `<span class="page-btn disabled">Далее »</span>`;
        }

        newsContainer.appendChild(paginationContainer);
    }

    function displayNewsSlice(newsArray, startIndex, endIndex) {
        const categoryMap = {
            'сво': 'сво', 'общество': 'общество', 'регионы': 'регионы',
            'государство': 'государство', 'происшествия': 'происшествия',
            'криминал': 'криминал', 'политика': 'политика',
            'геополитика': 'геополитика', 'коррупция': 'коррупция',
            'шоу-бизнес': 'шоу-бизнес', 'спорт': 'спорт',
            'наука': 'наука', 'стиль': 'стиль', 'культура': 'культура'
        };
    
        const slice = newsArray.slice(startIndex, endIndex);

        slice.forEach(newsItem => {
            let formattedDate = '';
            if (newsItem.date) {
                try {
                    formattedDate = new Date(newsItem.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
                } catch (e) {
                    formattedDate = newsItem.date; 
                }
            }
    
            let categoryKey = 'other';
            if (newsItem.category) {
                const lowerCat = newsItem.category.toLowerCase().trim();
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

    window.changePage = function(pageNumber) {
        currentPage = pageNumber;
        const filtered = currentCategory === 'all' 
            ? allNewsData 
            : allNewsData.filter(item => item.category === currentCategory);
        renderPaginatedNews(filtered);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- ФИЛЬТРАЦИЯ И ПОИСК ---
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.getAttribute('data-category');
            currentPage = 1; 
            filterNews();
        });
    });

    function filterNews() {
        const filtered = currentCategory === 'all' 
            ? allNewsData 
            : allNewsData.filter(item => item.category === currentCategory);
        renderPaginatedNews(filtered);
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length > 1) {
            const filtered = allNewsData.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
            currentPage = 1;
            renderPaginatedNews(filtered);
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

    // ИСПРАВЛЕНИЕ ОШИБКИ scrollToTop
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ---
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
    
    
    // --- КУРС ВАЛЮТ (ИСПРАВЛЕННАЯ ВЕРСИЯ) ---
    async function updateCurrency() {
        const usdEl = document.getElementById('usd-rate');
        const eurEl = document.getElementById('eur-rate');
        const commentEl = document.getElementById('currency-comment');
    
        if (!usdEl || !eurEl || !commentEl) {
            return; // Если блоков нет в HTML, просто выходим, не ломаем скрипт
        }
    
        try {
            const response = await fetch('https://api.exchangerate.host/latest?base=RUB');
            const data = await response.json();
            
            // Проверка, что данные пришли корректно
            if (!data.rates || !data.rates.USD || !data.rates.EUR) {
                console.warn('API вернул неполные данные о курсе');
                return;
            }

            const usdRate = data.rates.USD;
            const eurRate = data.rates.EUR;

            usdEl.textContent = usdRate.toFixed(2);
            eurEl.textContent = eurRate.toFixed(2);
    
            let comment = '';
            const usdVal = parseFloat(usdRate);
            
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
            // Не показываем ошибку пользователю, просто не обновляем курс
        }
    }
    
    updateCurrency();
    setInterval(updateCurrency, 300000);
    
});
