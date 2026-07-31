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

    // --- 1. ЗАГРУЗКА НОВОСТЕЙ ---
    fetch('news.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allNewsData = data.items || [];

            // Показываем главную новость
            if (data.featuredNewsId && allNewsData.length > 0) {
                const featuredNews = allNewsData.find(item => item.id === data.featuredNewsId);
                if (featuredNews) {
                    displayFeaturedNews(featuredNews);
                }
            }

            // Показываем список новостей
            displayNews(allNewsData);

            // Скрываем лоадер
            if (loader) {
                loader.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки новостей:', error);
            if (loader) {
                loader.textContent = 'Не удалось загрузить новости. Проверьте консоль.';
                loader.style.display = 'block';
            }
        });

    // --- ФУНКЦИИ ОТРИСОВКИ ---
    function displayFeaturedNews(newsItem) {
        if (featuredNewsContainer) {
            featuredNewsContainer.style.display = 'block';
            featuredNewsContainer.innerHTML = `
                <div class="featured-news-card">
                    <img src="${newsItem.image}" alt="${newsItem.title}" class="featured-news-image">
                    <div class="featured-news-content">
                        <h2 class="featured-news-title">${newsItem.title}</h2>
                        <p class="featured-news-date">${newsItem.date}</p>
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

        newsArray.forEach(newsItem => {
            let formattedDate = '';
            if (newsItem.date) {
                try {
                    formattedDate = new Date(newsItem.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
                } catch (e) {
                    formattedDate = newsItem.date;
                }
            }

            // --- ИЗМЕНЕНИЕ ЗДЕСЬ: Надежное формирование класса ---
            let categoryRaw = newsItem.category || 'other';
            // 1. Приводим к нижнему регистру
            // 2. Заменяем пробелы на дефисы (чтобы "Шоу-бизнес" стало "шоу-бизнес")
            // 3. Убираем лишние спецсимволы, если они есть
            const categoryClean = categoryRaw.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const categoryClass = `category-${categoryClean}`;
            const categoryText = newsItem.category || 'Разное';
            // ------------------------------------------------------

            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');

            newsElement.innerHTML = `
                <div class="news-card">
                    <!-- Теперь этот класс точно совпадёт с CSS -->
                    <span class="news-category-badge ${categoryClass}">${categoryText}</span>
                    
                    <img src="${newsItem.image}" alt="${newsItem.title}" class="news-image" />
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
        // Показывать кнопку "наверх"
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    function progressBarScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0 && progressBar) {
            progressBar.style.width = ((winScroll / height) * 100) + '%';
        }
    }

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Тема ---
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

    // --- Новый функционал: "Сейчас обсуждают" ---
    const hotNewsList = document.getElementById('hot-news-list');

    // Здесь пример данных, замените на реальные
    const hotNews = allNewsData.filter(item => item.isHot).slice(0, 3);
    hotNews.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" data-id="${item.id}">${item.title}</a>`;
        hotNewsList.appendChild(li);
    });

    // Обработка кликов по "Сейчас обсуждают"
    if (hotNewsList) {
        hotNewsList.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                handleReadMoreClick(e.target.getAttribute('data-id'));
            }
        });
    }

    // --- Обновление курса валют (пример, замените API) ---
    const currencyDiv = document.getElementById('currency-rate');

    function updateCurrency() {
        // Здесь можно вставить вызов API для получения курса
        // В примере — статический курс
        const rate = "74.35"; // замените на реальный API
        if (currencyDiv) {
            currencyDiv.textContent = `${rate} ₽`;
        }
    }

    // Обновлять курс при загрузке и по интервалу
    updateCurrency();
    setInterval(updateCurrency, 60000); // обновлять каждую минуту
});
