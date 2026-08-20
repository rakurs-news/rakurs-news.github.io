document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!newsContainer) return;

    let allNews = [];
    const itemsPerPage = 10;
    
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1;

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
            const response = await fetch('news.json');
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            allNews = await response.json();
            console.log('✅ Данные успешно загружены:', allNews.length, 'новостей');
            
            renderNews(); 
        } catch (error) {
            console.error('❌ КРИТИЧЕСКАЯ ОШИБКА ЗАГРУЗКИ:', error);
            newsContainer.innerHTML = `
                <div style="padding: 20px; color: red; border: 1px solid red; background: #ffe6e6;">
                    <h3>Ошибка загрузки news.json</h3>
                    <p>Проверьте консоль (F12) для деталей.</p>
                </div>`;
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
            newsContainer.innerHTML = '<p style="padding: 20px; color: #64748b;">Новостей по этой категории пока нет.</p>';
            document.getElementById('pagination-holder').innerHTML = '';
            return;
        }

        pageItems.forEach((item, index) => {
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

            card.innerHTML = `
                <a href="${item.url}" class="news-card-link" aria-label="Перейти к статье: ${item.title.replace(/"/g, '&quot;')}">
                    ${hasImage ? `<div class="card-image-wrapper"><img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy"></div>` : ''}
                    <div class="card-body">
                        <span class="card-category">${item.category}</span>
                        ${formattedDate ? `<span class="card-date">${formattedDate}</span>` : ''}
                        <h3 class="card-title">${item.title}</h3>
                        ${item.description ? `<p class="card-description">${item.description.substring(0, 120)}${item.description.length > 120 ? '...' : ''}</p>` : ''}
                    </div>
                </a>`;
            
            newsContainer.appendChild(card);
        });

        renderPagination(filteredNews.length);
    }

    function renderPagination(totalCount) {
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        
        let paginationContainer = document.getElementById('pagination-holder');
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.id = 'pagination-holder';
            document.querySelector('.content-area').appendChild(paginationContainer);
        }
        paginationContainer.className = 'pagination';
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = `?page=${i}`;
            link.textContent = i;
            if (i === currentPage) link.classList.add('active');
            
            paginationContainer.appendChild(link);
        }

        // --- SEO: Генерация rel="prev" и rel="next" ---
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
        // ---------------------------------------------
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

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
        });
    }
    
    loadNews();
});