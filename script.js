// Переменная для хранения новостей
let newsData = [];
let filteredNews = [];
let currentCategory = "Все";

// Элементы
const newsContainer = document.getElementById('news-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Функция отображения новостей
function renderNews() {
    newsContainer.innerHTML = '';

    const searchTerm = searchInput.value.toLowerCase();

    const newsToShow = filteredNews.filter(news => {
        const matchesCategory = (currentCategory === "Все") || (news.category === currentCategory);
        const matchesSearch = news.title.toLowerCase().includes(searchTerm) || news.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (newsToShow.length === 0) {
        newsContainer.innerHTML = '<p>Нет новостей по выбранным фильтрам.</p>';
        return;
    }

    newsToShow.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        newsItem.innerHTML = `
            <h2>${news.title}</h2>
            <p>${news.description}</p>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Загрузка news.json
function loadNews() {
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            // В вашем JSON есть поле items
            newsData = data.items;
            filteredNews = newsData.slice();

            // По умолчанию активна категория "Все"
            document.querySelector('.category-btn[data-category="Все"]').classList.add('active');
            renderNews();
        })
        .catch(error => {
            console.error('Ошибка загрузки news.json:', error);
            newsContainer.innerHTML = '<p>Ошибка загрузки новостей.</p>';
        });
}

// Обработка выбора категории
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убрать активный класс у всех
        categoryButtons.forEach(b => b.classList.remove('active'));
        // Добавить активный класс текущей
        btn.classList.add('active');

        currentCategory = btn.getAttribute('data-category');
        renderNews();
    });
});

// Обработка поиска
searchButton.addEventListener('click', () => {
    renderNews();
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        renderNews();
    }
});

// Инициализация загрузки
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
});