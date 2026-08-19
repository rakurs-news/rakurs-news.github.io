const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('searchInput');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');

let allNews = [];
let currentPage = 0;
const itemsPerPage = 10;
let isLoading = false;

async function loadNews() {
    try {
        const response = await fetch('/news.json'); // <-- слэш спереди
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        
        allNews = await response.json();
        console.log('✅ Данные загружены:', allNews.length, 'новостей');
        renderNews();
    } catch (error) {
        console.error('❌ Ошибка загрузки:', error);
        newsContainer.innerHTML = `<p style="color:red; padding:20px;">Ошибка загрузки news.json. Проверь консоль (F12).</p>`;
    }
}

function renderNews() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    
    const currentFileName = window.location.pathname.split('/').pop();
    let filteredNews = allNews;

    // Фильтрация по категориям (оставляем как было)
    if (currentFileName === 'svo.html') filteredNews = allNews.filter(item => item.category === 'СВО');
    else if (currentFileName === 'army.html') filteredNews = allNews.filter(item => item.category === 'Армия');
    else if (currentFileName === 'state.html') filteredNews = allNews.filter(item => item.category === 'Государство');
    else if (currentFileName === 'politics.html') filteredNews = allNews.filter(item => item.category === 'Политика');
    else if (currentFileName === 'geopolitics.html') filteredNews = allNews.filter(item => item.category === 'Геополитика');
    else if (currentFileName === 'world.html') filteredNews = allNews.filter(item => item.category === 'Мир');
    else if (currentFileName === 'crime.html') filteredNews = allNews.filter(item => item.category === 'Криминал');
    else if (currentFileName === 'society.html') filteredNews = allNews.filter(item => item.category === 'Общество');

    const pageItems = filteredNews.slice(start, end);

    if (pageItems.length === 0 && currentPage === 0) {
        loader.style.display = 'none';
        newsContainer.innerHTML = '<p style="padding: 20px; color: #64748b;">Новостей по этой категории пока нет.</p>';
        loadMoreBtn.style.display = 'none';
        return;
    }

    pageItems.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const hasImage = item.image && item.image.trim() !== '';
        if (!hasImage) card.classList.add('has-no-image');
        
        const dateObj = new Date(item.date);
        const formattedDate = dateObj.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

        // ГЛАВНОЕ ИСПРАВЛЕНИЕ: Ссылка теперь ТОЛЬКО здесь, внутри кнопки.
        // Если URL нет, показываем предупреждение красным цветом.
        let linkHtml = '';
        if (item.url && item.url.trim() !== '') {
            linkHtml = `<a href="${item.url}" class="read-more-link">Читать далее</a>`;
        } else {
            linkHtml = `<span style="color:red; font-size:12px; display:block; margin-top:10px;">⚠️ Ошибка: нет ссылки в news.json</span>`;
            console.warn('Нет URL для новости:', item.title);
        }

        const imageBlock = hasImage
            ? `<div class="card-image-wrapper">
                 <img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy">
               </div>`
            : '';

        card.innerHTML = `
    ${imageBlock}
    <div class="card-body">
        <span class="card-category">${item.category}</span>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="card-date">${formattedDate}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-description">${item.description ? item.description.substring(0, 120) + (item.description.length > 120 ? '...' : '') : ''}</p>
        ${linkHtml}
    </div>
`;
        
        newsContainer.appendChild(card);
    });

    currentPage++;
    isLoading = false;
    checkPaginationVisibility();
}


function checkPaginationVisibility() {
    const currentFileName = window.location.pathname.split('/').pop();
    let totalCount = allNews.length;

    if (currentFileName === 'svo.html') {
        totalCount = allNews.filter(i => i.category === 'СВО').length;
    } else if (currentFileName === 'army.html') {
        totalCount = allNews.filter(i => i.category === 'Армия').length;
    } else if (currentFileName === 'state.html') {
        totalCount = allNews.filter(i => i.category === 'Государство').length;
    } else if (currentFileName === 'politics.html') {
        totalCount = allNews.filter(i => i.category === 'Политика').length;
    } else if (currentFileName === 'geopolitics.html') {
        totalCount = allNews.filter(i => i.category === 'Геополитика').length;
    } else if (currentFileName === 'world.html') {
        totalCount = allNews.filter(i => i.category === 'Мир').length;
    } else if (currentFileName === 'crime.html') {
        totalCount = allNews.filter(i => i.category === 'Криминал').length;
    }
    else if (currentFileName === 'society.html') {
        totalCount = allNews.filter(i => i.category === 'Общество').length;
    }

    if (currentPage * itemsPerPage < totalCount) {
        loadMoreBtn.style.display = 'flex';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        if (!isLoading) {
            isLoading = true;
            loadMoreBtn.textContent = 'Загрузка...';
            setTimeout(() => {
                renderNews();
                loadMoreBtn.textContent = 'Еще новости';
                isLoading = false;
            }, 300);
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.news-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const desc = card.querySelector('.card-description').textContent.toLowerCase();
            
            if (query.length >= 3 && (title.includes(query) || desc.includes(query))) {
                card.style.display = 'block';
            } else if (query.length < 3) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const spans = burgerBtn.querySelectorAll('span');
        spans.forEach(span => span.style.backgroundColor = mobileMenu.classList.contains('active') ? '#ff0000' : '#fff');
    });

    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            const spans = burgerBtn.querySelectorAll('span');
            spans.forEach(span => span.style.backgroundColor = '#fff');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

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
});

loadNews();