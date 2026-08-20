document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const scrollTopBtn = document.getElementById('scrollTopBtn'); // Кнопка "Наверх"

    if (!newsContainer) return;

    let allNews = [];
    const itemsPerPage = 10;
    
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1;

    // --- НОВАЯ ФУНКЦИЯ: Универсальная отрисовка одной карточки ---
    function renderCard(item) {
        const card = document.createElement('article');
        card.className = 'news-card';
        
        const hasImage = item.image && item.image.trim() !== '';
        let formattedDate = '';
        if(item.date) {
            const dateObj = new Date(item.date);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
            } else {
                formattedDate = item.date;
            }
        }

        // Экранируем кавычки в заголовке для атрибута aria-label
        const safeTitle = item.title.replace(/"/g, '&quot;');

        card.innerHTML = `
            <a href="${item.url}" class="news-card-link" aria-label="Перейти к статье: ${safeTitle}">
                ${hasImage ? `<div class="card-image-wrapper"><img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy"></div>` : ''}
                <div class="card-body">
                    <span class="card-category">${item.category}</span>
                    ${formattedDate ? `<span class="card-date">${formattedDate}</span>` : ''}
                    <h3 class="card-title">${item.title}</h3>
                    ${item.description ? `<p class="card-description">${item.description.substring(0, 120)}${item.description.length > 120 ? '...' : ''}</p>` : ''}
                </div>
            </a>`;
        
        return card;
    }
    // -------------------------------------------------------------

    // --- ФУНКЦИЯ: Отрисовка Hero-баннера ---
    function renderHero() {
        const heroContainer = document.querySelector('.hero-banner .hero-card');
        if (!heroContainer || allNews.length === 0) return;

        // Ищем статью с флагом isHero: true
        const heroItem = allNews.find(item => item.isHero === true);

        if (heroItem) {
            const hasImage = heroItem.image && heroItem.image.trim() !== '';
            let formattedDate = '';
            
            if (heroItem.date) {
                const dateObj = new Date(heroItem.date);
                if (!isNaN(dateObj.getTime())) {
                    formattedDate = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
                } else {
                    formattedDate = heroItem.date;
                }
            }

            const safeTitle = heroItem.title.replace(/"/g, '&quot;');

            heroContainer.innerHTML = `
                <div class="hero-image-wrapper">
                    ${hasImage ? `<img src="${heroItem.image}" alt="${heroItem.title}" class="hero-image" loading="lazy">` : ''}
                </div>
                <div class="hero-body">
                    <span class="card-category" style="background:#ef4444; color:#fff;">${heroItem.category}</span>
                    <h1 class="hero-title">${heroItem.title}</h1>
                    ${formattedDate ? `<p class="hero-date">${formattedDate}</p>` : ''}
                    ${heroItem.description ? `<p class="hero-subtitle">${heroItem.description}</p>` : ''}
                    <a href="${heroItem.url}" class="hero-btn">Подробнее</a>
                </div>`;
        } else {
            // Если ни одна статья не помечена как Hero, берем самую свежую (первую в массиве)
            const latestItem = allNews[0];
            if (latestItem) {
                 const hasImage = latestItem.image && latestItem.image.trim() !== '';
                 let formattedDate = '';
                 if (latestItem.date) {
                    const dateObj = new Date(latestItem.date);
                    if (!isNaN(dateObj.getTime())) {
                        formattedDate = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
                    } else {
                        formattedDate = latestItem.date;
                    }
                }
                
                const safeTitle = latestItem.title.replace(/"/g, '&quot;');

                heroContainer.innerHTML = `
                    <div class="hero-image-wrapper">
                        ${hasImage ? `<img src="${latestItem.image}" alt="${latestItem.title}" class="hero-image" loading="lazy">` : ''}
                    </div>
                    <div class="hero-body">
                        <span class="card-category" style="background:#ef4444; color:#fff;">${latestItem.category}</span>
                        <h1 class="hero-title">${latestItem.title}</h1>
                        ${formattedDate ? `<p class="hero-date">${formattedDate}</p>` : ''}
                        ${latestItem.description ? `<p class="hero-subtitle">${latestItem.description}</p>` : ''}
                        <a href="${latestItem.url}" class="hero-btn">Подробнее</a>
                    </div>`;
            } else {
                heroContainer.innerHTML = '<p style="padding:20px; color:#64748b;">Нет новостей для главного баннера</p>';
            }
        }
    }
    // -----------------------------------------

    function updateUrl(pageNum) {
        const newParams = new URLSearchParams(window.location.search);
        if (pageNum === 1) {
            window.history.replaceState({}, '', window.location.pathname);
        } else {
            newParams.set('page', pageNum);
            window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`);
        }
        document.title = currentPage > 1 
            ? `Ракурс NEWS | Страница ${currentPage} — Новости и аналитика` 
            : 'Ракурс NEWS | Экспертный разбор новостей простым языком';
    }

    async function loadNews() {
    if (loader) loader.style.display = 'block';

    try {
        // ВАЖНО: используем абсолютный путь. 
        // Если сайт лежит в папке, иногда нужно './news.json', но чаще '/news.json' или просто 'news.json'.
        // Попробуй сначала '/news.json', если не сработает - поставь 'news.json'.
        const response = await fetch('/news.json'); 
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        allNews = await response.json();
        console.log('✅ Данные загружены:', allNews.length, 'новостей');
        
        renderHero();
        renderNews();
    } catch (error) {
        console.error('❌ Техническая ошибка (не пугайся):', error);
        
        // ГЛАВНОЕ ИЗМЕНЕНИЕ:
        // Мы НЕ показываем пользователю красный блок про ошибку JSON.
        // Вместо этого мы просто говорим, что новостей нет.
        newsContainer.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px;">
                <h3 style="margin: 0;">В этом разделе пока нет новостей</h3>
                <p style="margin-top: 10px; font-size: 14px;">Статьи про СВО появятся здесь, как только будут добавлены в базу.</p>
            </div>`;
        
        const paginationHolder = document.getElementById('pagination-holder');
        if (paginationHolder) paginationHolder.innerHTML = '';
    } finally {
        if (loader) loader.style.display = 'none';
    }
}


    function renderNews() {
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
            default: 
                if (currentFileName === '' || currentFileName === 'index.html') {
                    filteredNews = allNews; 
                }
                break;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredNews.slice(startIndex, endIndex);

        newsContainer.innerHTML = '';

        if (pageItems.length === 0) {
    // Рисуем сообщение
    newsContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px;">
            <h3 style="margin: 0;">В этой категории пока нет новостей</h3>
            <p style="margin-top: 10px; font-size: 14px;">Мы опубликуем их, как только появится информация.</p>
        </div>
    `;

    // БЕЗОПАСНАЯ ОЧИСТКА ПАГИНАЦИИ
    const paginationHolder = document.getElementById('pagination-holder');
    if (paginationHolder) { 
        // Элемент найден? Тогда очищаем.
        paginationHolder.innerHTML = '';
    } 
    // Если элемента НЕТ — мы просто ничего не делаем, и скрипт НЕ падает. Ошибки не будет!

    return; // Выходим из функции
}

        pageItems.forEach((item, index) => {
            // Используем универсальную функцию отрисовки
            const card = renderCard(item);
            newsContainer.appendChild(card);
        });

        renderPagination(filteredNews.length);
    }

    function renderPagination(totalCount) {
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        
        if (totalPages <= 1) {
            const container = document.getElementById('pagination-holder');
            if (container) container.innerHTML = '';
            return;
        }

        let paginationContainer = document.getElementById('pagination-holder');
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.id = 'pagination-holder';
            document.querySelector('.content-area').appendChild(paginationContainer);
        }
        paginationContainer.className = 'pagination';
        paginationContainer.innerHTML = '';

        const maxVisible = 5;
        const pageLinks = [];

        pageLinks.push(1);

        if (currentPage > 3) {
            pageLinks.push('...');
        }

        const start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

        for (let i = start; i <= end; i++) {
            pageLinks.push(i);
        }

        if (currentPage < totalPages - 2) {
            pageLinks.push('...');
        }

        if (totalPages !== 1) {
            if (pageLinks[pageLinks.length - 1] !== totalPages) {
                pageLinks.push(totalPages);
            }
        }

        pageLinks.forEach(pageNum => {
            if (pageNum === '...') {
                const span = document.createElement('span');
                span.textContent = '…';
                span.style.cursor = 'default';
                span.style.color = '#94a3b8';
                paginationContainer.appendChild(span);
                return;
            }

            const link = document.createElement('a');
            link.href = `?page=${pageNum}`;
            link.textContent = pageNum;
            if (pageNum === currentPage) link.classList.add('active');
            
            paginationContainer.appendChild(link);
        });

        const head = document.querySelector('head');
        head.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach(el => el.remove());

        if (currentPage > 1) {
            const prevLink = document.createElement('link');
            prevLink.rel = 'prev';
            const prevHref = (currentPage - 1 === 1) 
                ? window.location.pathname 
                : `${window.location.pathname}?page=${currentPage - 1}`;
            prevLink.href = prevHref;
            head.appendChild(prevLink);
        }

        if (currentPage < totalPages) {
            const nextLink = document.createElement('link');
            nextLink.rel = 'next';
            nextLink.href = `${window.location.pathname}?page=${currentPage + 1}`;
            head.appendChild(nextLink);
        }
    }

    document.addEventListener('click', (e) => {
        const targetLink = e.target.closest('.pagination a');
        if (targetLink) {
            e.preventDefault();
            const page = parseInt(targetLink.getAttribute('href').split('=').pop());
            currentPage = page;
            updateUrl(page);
            renderNews();
        }
    });

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const isActive = mobileMenu.classList.contains('active');
            burgerBtn.setAttribute('aria-expanded', isActive);
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // --- ВСТАВЛЕННЫЙ БЛОК ПОИСКА ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            // Если поле пустое, сбрасываем на обычную логику (пагинацию)
            if (!query) {
                renderNews(); 
                return;
            }

            // Фильтруем ВСЕ новости по заголовку и описанию
            const filtered = allNews.filter(item => 
                item.title.toLowerCase().includes(query) || 
                (item.description && item.description.toLowerCase().includes(query))
            );

            newsContainer.innerHTML = '';
            
            if (filtered.length === 0) {
                newsContainer.innerHTML = '<p style="padding:20px; color:#64748b;">Ничего не найдено по запросу</p>';
                document.getElementById('pagination-holder').innerHTML = '';
                return;
            }

            filtered.forEach((item) => {
                // Используем ту же универсальную функцию отрисовки
                const card = renderCard(item);
                newsContainer.appendChild(card);
            });

            // При поиске пагинацию скрываем, чтобы видеть все результаты сразу
            document.getElementById('pagination-holder').innerHTML = ''; 
        });
    }
    // --------------------------------

    // --- ДОБАВЛЕНО: Логика кнопки "Наверх" ---
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // -----------------------------------------

    loadNews();
});