// script.js

const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('searchInput');
const loader = document.getElementById('loader');
const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');

let allNews = [];
let currentPage = 0;
const itemsPerPage = 10;
let isLoading = false;

// Загрузка данных из JSON
async function loadNews() {
    try {
        const response = await fetch('news.json');
        if (!response.ok) throw new Error('Ошибка загрузки новостей');
        allNews = await response.json();
        renderNews();
    } catch (error) {
        console.error(error);
        newsContainer.innerHTML = '<p>Не удалось загрузить новости</p>';
    }
}

// Рендеринг карточек
function renderNews() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = allNews.slice(start, end);

    if (pageItems.length === 0) {
        loader.style.display = 'none';
        return;
    }

    pageItems.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Форматирование даты
        const dateObj = new Date(item.date);
        const formattedDate = dateObj.toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="news-image">
            <div class="card-body">
                <div class="card-date">${formattedDate}</div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
            </div>
        `;
        
        // Клик по карточке - имитация перехода на страницу статьи
        card.addEventListener('click', () => {
            alert(`Переход на статью: ${item.title}`);
            // Здесь должна быть логика window.location.href = `/article/${item.id}`;
        });

        newsContainer.appendChild(card);
    });

    currentPage++;
    isLoading = false;
    checkLoaderVisibility();
}

// Бесконечная лента
function checkLoaderVisibility() {
    const lastNewsCard = document.querySelector('.news-card:last-child');
    if (!lastNewsCard) return;

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading && currentPage * itemsPerPage < allNews.length) {
                loader.style.display = 'block';
                isLoading = true;
                setTimeout(() => {
                    renderNews();
                }, 500); // Имитация задержки сети
            }
        });
    }, options);

    observer.observe(lastNewsCard);
}

// Поиск
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.news-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const desc = card.querySelector('.card-description').textContent.toLowerCase();
        
        if (query.length >= 3 && (title.includes(query) || desc.includes(query))) {
            card.style.display = 'block';
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (query.length < 3) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Мобильное меню
burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // Инверсия цвета полосок для эффекта крестика (опционально)
    const spans = burgerBtn.querySelectorAll('span');
    spans.forEach(span => span.style.backgroundColor = mobileMenu.classList.contains('active') ? '#ff0000' : '#fff');
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const spans = burgerBtn.querySelectorAll('span');
        spans.forEach(span => span.style.backgroundColor = '#fff');
    }
});

// Инициализация
loadNews();
