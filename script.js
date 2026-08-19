document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. ИНИЦИАЛИЗАЦИЯ ЭЛЕМЕНТОВ (с защитой от отсутствия)
    // ---------------------------------------------------------
    const newsContainer = document.getElementById('news-container');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Если на странице нет контейнера новостей, дальше смысла нет
    if (!newsContainer) return;

    let allNews = [];
    let currentPage = 0;
    const itemsPerPage = 10;
    let isLoading = false;

    // ---------------------------------------------------------
    // 2. ЗАГРУЗКА ДАННЫХ
    // ---------------------------------------------------------
    async function loadNews() {
        if (loader) loader.style.display = 'block';

        try {
            // ВАЖНО: Путь должен быть верным относительно HTML файла!
            const response = await fetch('news.json');
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            allNews = await response.json();
            console.log('✅ Данные успешно загружены:', allNews.length, 'новостей');
            
            renderNews(false); // false = первая отрисовка (очищаем контейнер)
            
        } catch (error) {
            console.error('❌ КРИТИЧЕСКАЯ ОШИБКА ЗАГРУЗКИ:', error);
            newsContainer.innerHTML = `
                <div style="padding: 20px; color: red; border: 1px solid red; background: #ffe6e6;">
                    <h3>Ошибка загрузки news.json</h3>
                    <p>Проверьте консоль (F12) для деталей.</p>
                    <ul>
                        <li>Лежит ли файл news.json в той же папке, что и HTML?</li>
                        <li>Не открываете ли вы сайт через file:// (двойной клик)? Нужен сервер (Live Server).</li>
                        <li>Валиден ли JSON (нет комментариев //, лишних запятых)?</li>
                    </ul>
                </div>`;
        } finally {
            if (loader) loader.style.display = 'none';
        }
    }

    // ---------------------------------------------------------
    // 3. РЕНДЕР НОВОСТЕЙ (ОБНОВЛЕННАЯ ВЕРСИЯ)
    // ---------------------------------------------------------
    function renderNews(append = false) {
    const start = currentPage * itemsPerPage;
    const currentFileName = window.location.pathname.split('/').pop();
    let filteredNews = allNews;

    switch (currentFileName) {
        case 'svo.html': filteredNews = allNews.filter(item => item.category === 'СВО'); break;
        case 'army.html': filteredNews = allNews.filter(item => item.category === 'Армия'); break;
        case 'state.html': filteredNews = allNews.filter(item => item.category === 'Государство'); break;
        case 'politics.html': filteredNews = allNews.filter(item => item.category === 'Политика'); break;
        case 'geopolitics.html': filteredNews = allNews.filter(item => item.category === 'Геополитика'); break;
        case 'world.html': filteredNews = allNews.filter(item => item.category === 'Мир'); break;
        case 'crime.html': filteredNews = allNews.filter(item => item.category === 'Криминал'); break;
        case 'society.html': filteredNews = allNews.filter(item => item.category === 'Общество'); break;
    }

    const pageItems = filteredNews.slice(start, start + itemsPerPage);

    if (!append) {
        newsContainer.innerHTML = '';
        currentPage = 0;
    } 

    if (pageItems.length === 0 && !append) {
        newsContainer.innerHTML = '<p style="padding: 20px; color: #64748b;">Новостей по этой категории пока нет.</p>';
        if(loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }

    pageItems.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'news-card';
        
        if(!append) card.style.animationDelay = `${index * 0.1}s`;

        const hasImage = item.image && item.image.trim() !== '';
        if (!hasImage) {
            card.classList.add('has-no-image');
        }
        
        let formattedDate = '';
        try {
            const dateObj = new Date(item.date);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
            } else {
                formattedDate = item.date || 'Дата не указана';
            }
        } catch (e) {
            formattedDate = 'Дата не указана';
        }

        const imageBlock = hasImage
            ? `<div class="card-image-wrapper"><img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy"></div>`
            : '';

        // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
        // В JSON уже есть полный путь (начинается с /), поэтому НЕ добавляем префикс "news/"
        let targetUrl = item.url || '#';
        
        // Если вдруг в будущем попадется ссылка без слэша, добавим её вручную, но для твоего JSON это не сработает
        if (targetUrl && !targetUrl.startsWith('/') && !targetUrl.startsWith('http')) {
            targetUrl = `/news/${targetUrl}`;
        }
        // -------------------------

        card.innerHTML = `
            ${imageBlock}
            <div class="card-body">
                <span class="card-category">${item.category}</span>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span class="card-date">${formattedDate}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description ? item.description.substring(0, 120) + (item.description.length > 120 ? '...' : '') : ''}</p>
                
                <!-- Кнопка "Читать далее" -->
                <a href="${targetUrl}" class="read-btn-custom">Читать далее</a>
            </div>`;

        newsContainer.appendChild(card);
    });

    if (!append) currentPage++;
    
    checkPaginationVisibility(filteredNews.length);
}




    // ---------------------------------------------------------
    // 4. ПРОВЕРКА КНОПКИ "ЕЩЕ"
    // ---------------------------------------------------------
    function checkPaginationVisibility(totalCount) {
        if (!loadMoreBtn) return;

        // totalCount уже передан из renderNews (длина отфильтрованного массива)
        const nextStartIndex = currentPage * itemsPerPage;

        if (nextStartIndex < totalCount) {
            loadMoreBtn.style.display = 'flex';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // ---------------------------------------------------------
    // 5. ОБРАБОТЧИК КНОПКИ "ЕЩЕ НОВОСТИ"
    // ---------------------------------------------------------
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (!isLoading) {
                isLoading = true;
                loadMoreBtn.textContent = 'Загрузка...';
                
                setTimeout(() => {
                    // ВАЖНО: передаем true, чтобы renderNews не очищал контейнер, а дописывал новости
                    renderNews(true); 
                    loadMoreBtn.textContent = 'Еще новости';
                    isLoading = false;
                }, 300); // Имитация задержки сети
            }
        });
    }

    // ---------------------------------------------------------
    // 6. ПОИСК (ПО ТЕКСТУ)
    // ---------------------------------------------------------
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.news-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
                
                // Показываем карточку, если найдено совпадение ИЛИ если поиск пустой
                const matches = query.length >= 3 && (title.includes(query) || desc.includes(query));
                
                if (matches || query.length < 3) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Скрываем кнопку "Еще", когда включен поиск, чтобы не ломать логику
            if(loadMoreBtn) loadMoreBtn.style.display = 'none';
        });
    }

    // ---------------------------------------------------------
    // 7. МОБИЛЬНОЕ МЕНЮ
    // ---------------------------------------------------------
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const spans = burgerBtn.querySelectorAll('span');
            spans.forEach(span => 
                span.style.backgroundColor = mobileMenu.classList.contains('active') ? '#ff0000' : '#fff'
            );
        });

        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const spans = burgerBtn.querySelectorAll('span');
                spans.forEach(span => span.style.backgroundColor = '#fff');
            }
        });
    }

    // ---------------------------------------------------------
    // 8. КНОПКА "НАВЕРХ"
    // ---------------------------------------------------------
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            scrollTopBtn.classList.remove('visible');
        });
    }

    // ЗАПУСК
    loadNews();
});