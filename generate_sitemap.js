const fs = require('fs');
const path = require('path');

// НАСТРОЙКИ
// ВАЖНО: Твой точный URL на GitHub Pages!
// Если сайт доступен по https://rakurs-news.github.io/rakurs-news/
const DOMAIN = 'https://rakurs-news.github.io/rakurs-news';
// Если сайт доступен по https://rakurs-news.github.io/ (например, если это главный репозиторий пользователя)
// const DOMAIN = 'https://rakurs-news.github.io/';

// УДАЛЕНО: const OUTPUT_DIR = './public'; // Эта папка больше не нужна, файлы генерируются в корень

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe).replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
        }
    });
}

const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>%TITLE% | Ракурс NEWS</title>
    <meta name="description" content="%DESCRIPTION%">
    <meta property="og:title" content="%TITLE%">
    <meta property="og:description" content="%DESCRIPTION%">
    <meta property="og:type" content="article">
    <!-- Путь к стилям. Если у тебя стили в отдельном файле style.css в корне проекта, раскомментируй строку ниже -->
    <!-- <link rel="stylesheet" href="/style.css"> -->
    
    <style>
        /* Вставляем стили прямо сюда, чтобы страницы работали автономно */
        :root { --bg: #ffffff; --card: #f9f9f9; --text: #1a1a1a; --accent: #ff9800; --meta: #666; }
        [data-theme="dark"] { --bg: #121212; --card: #1e1e1e; --text: #e0e0e0; --accent: #ff9800; --meta: #aaa; }
        body { background: var(--bg); color: var(--text); font-family: sans-serif; margin: 0; transition: background 0.3s; }
        header { background: var(--card); padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--accent); position: sticky; top: 0; z-index: 1000; }
        .logo-wrapper { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 20px; }
        .back-link { color: var(--accent); text-decoration: none; font-weight: bold; margin-bottom: 20px; display: inline-block; }
        h1 { font-size: 28px; line-height: 1.2; margin-top: 0; }
        .meta-info { color: var(--meta); font-size: 14px; margin-bottom: 25px; display: flex; gap: 15px; flex-wrap: wrap; }
        img.article-img { width: 100%; height: auto; max-height: 500px; object-fit: cover; border-radius: 8px; margin-bottom: 20px; background: #333; }
        .article-content { max-width: 700px; margin: 0 auto; line-height: 1.7; color: var(--text); }
        .article-content p { margin-bottom: 1em; }
        footer { text-align: center; padding: 40px; color: var(--meta); border-top: 1px solid #eee; margin-top: 50px; }
        .theme-toggle { cursor: pointer; background: transparent; border: 1px solid var(--accent); color: var(--text); padding: 5px 10px; border-radius: 4px; }
    </style>
</head>
<body>
    <header>
        <div class="logo-wrapper"><span>Ракурс NEWS</span></div>
        <button class="theme-toggle" onclick="toggleTheme()" aria-label="Сменить тему">Тема</button>
    </header>

    <main style="padding: 20px;">
        <a href="/" class="back-link">← Вернуться к ленте</a>

        <article>
            <h1>%TITLE%</h1>
            <div class="meta-info">
                <span>Категория: %CATEGORY%</span>
                <span>•</span>
                <span>Дата: %DATE%</span>
            </div>
            %IMAGE_BLOCK%
            <div class="article-content">
                %CONTENT%
            </div>
        </article>
    </main>

    <footer>&copy; 2024 Ракурс NEWS. Все права защищены.</footer>

    <script>
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }
    </script>
</body>
</html>
`;

console.log('🚀 ЗАПУСК ГЕНЕРАТОРА СТАТИЧЕСКИХ СТРАНИЦ...');

try {
    if (!fs.existsSync('news.json')) {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Файл news.json не найден в корне проекта!');
        process.exit(1);
    }

    const fileContent = fs.readFileSync('news.json', 'utf8');
    let newsData = JSON.parse(fileContent);

    console.log(`✅ Загружено новостей: ${newsData.length}`);

    // УДАЛЕНО: Проверка и создание папки OUTPUT_DIR

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
    <loc>${DOMAIN}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
</url>
`;

    newsData.forEach((news) => {
        // ВАЖНО: Используем ID из JSON как имя файла.
        const fileName = `${news.id}.html`;
        // УДАЛЕНО: const filePath = path.join(OUTPUT_DIR, fileName);
        const filePath = fileName; // Сохраняем прямо в корень

        // Ссылка для карты сайта. Должна совпадать с тем, куда ведет ссылка в index.html
        const pageUrl = `${DOMAIN}/${fileName}`;

        let isoDate = new Date().toISOString().split('T')[0];
        if (news.date && typeof news.date === 'string' && news.date.includes('.')) {
            const [day, month, year] = news.date.split('.');
            isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        const shortDesc = (news.description || '').substring(0, 160);
        const imageBlock = news.image
            ? `<img src="${escapeXml(news.image)}" alt="${escapeXml(news.title)}" class="article-img" loading="lazy">`
            : '';

        const articleContent = news.content || '<p>Текст новости отсутствует.</p>';

        const htmlContent = HTML_TEMPLATE
            .replace(/%TITLE%/g, escapeXml(news.title))
            .replace(/%DESCRIPTION%/g, escapeXml(shortDesc))
            .replace(/%CATEGORY%/g, escapeXml(news.category || 'Разное'))
            .replace(/%DATE%/g, escapeXml(news.date || ''))
            .replace(/%IMAGE_BLOCK%/g, imageBlock)
            .replace(/%CONTENT%/g, articleContent);

        // --- ДОБАВЬ ЭТИ СТРОКИ ДЛЯ ОТЛАДКИ ---
        console.log(`--- DEBUG INFO FOR NEWS ---`);
        console.log(`ID: ${news.id}`);
        console.log(`Title: ${news.title}`);
        console.log(`Generated fileName: ${fileName}`);
        console.log(`HTML Content length: ${htmlContent.length}`);
        console.log(`---------------------------`);
        // --- КОНЕЦ ДОБАВЛЕННЫХ СТРОК ---

        // УДАЛЕНО: fs.writeFileSync(filePath, htmlContent, 'utf8'); // Теперь filePath это просто fileName
        fs.writeFileSync(fileName, htmlContent, 'utf8'); // Сохраняем в корень
        console.log(`💾 Создан файл: ${fileName} (в корне проекта)`);

        sitemap += `<url>
    <loc>${pageUrl}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>
`;
    });

    sitemap += '</urlset>';
    // УДАЛЕНО: fs.writeFileSync('public/sitemap.xml', sitemap.trim(), 'utf8'); // Кладем sitemap тоже в public
    fs.writeFileSync('sitemap.xml', sitemap.trim(), 'utf8'); // Сохраняем sitemap.xml в корень
    console.log(`✅ Файл sitemap.xml успешно создан в корне проекта!`);
    console.log(`🎉 ГОТОВО! Сгенерировано страниц: ${newsData.length}.`);
    console.log(`💡 Теперь загрузи все сгенерированные файлы (HTML и sitemap.xml) в корень твоего репозитория на GitHub Pages.`);

} catch (error) {
    console.error('💥 Ошибка:', error.message);
    process.exit(1);
                  }
