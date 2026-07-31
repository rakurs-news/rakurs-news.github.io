const fs = require('fs');
const path = require('path');

// 1. Читаем данные
let newsData;
try {
    newsData = JSON.parse(fs.readFileSync('./news.json', 'utf8'));
} catch (e) {
    console.error('❌ Ошибка чтения news.json! Проверь путь и формат файла.');
    process.exit(1);
}

const outputDir = './news';

// Очищаем папку news
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

console.log('🚀 Начинаю генерацию...');

let sitemapEntries = [];

newsData.forEach((item) => {
    const slug = item.slug;
    const articleDir = path.join(outputDir, slug);
    const articlePath = path.join(articleDir, 'index.html');

    fs.mkdirSync(articleDir, { recursive: true });

    // --- САМОЕ ГЛАВНОЕ: МЫ СОБИРАЕМ HTML ВРУЧНУЮ ---
    // Никаких replace, никаких поисков по шаблону. 
    // Мы просто вставляем переменные туда, где они должны быть.
    
    const dateStr = new Date(item.date).toLocaleDateString('ru-RU');
    const category = item.category || 'Новости';
    const summary = item.summary || '';
    
    // Формируем картинку, если есть
    let imageBlock = '';
    if (item.image) {
        const imgName = item.image.split('/').pop();
        const imgPath = `../images/${imgName}`;
        imageBlock = `<img src="${imgPath}" alt="${item.title}" class="post-image">`;
    }

    const pageContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>${item.title}</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="container">
        <a href="../index.html" class="back-link">← Вернуться на главную</a>
        
        <article class="post">
            <h1 class="post-title">${item.title}</h1>
            
            <div class="post-meta">
                <span class="category">${category}</span>
                <span class="date">${dateStr}</span>
            </div>

            ${imageBlock}

            <div class="post-summary">
                ${summary}
            </div>

            <div class="post-content">
                ${item.content}
            </div>
        </article>
    </div>
</body>
</html>
    `;

    fs.writeFileSync(articlePath, pageContent, 'utf8');
    
    console.log(`✅ Создана страница: /news/${slug}/ (Заголовок: ${item.title})`);

    sitemapEntries.push(`https://rakurs-news.github.io/news/${slug}/`);
});

// Генерация sitemap
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
   <loc>https://rakurs-news.github.io/</loc>

    <priority>1.0</priority>
  </url>
  ${sitemapEntries.map(url => `
  <url>
    <loc>${url}</loc>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync('./sitemap.xml', sitemapXml, 'utf8');
console.log('✅ Карта сайта (sitemap.xml) создана!');
console.log('🎉 ГОТОВО!');
