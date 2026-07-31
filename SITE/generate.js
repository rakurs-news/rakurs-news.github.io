const fs = require('fs');
const path = require('path');

// 1. Читаем данные
const newsData = JSON.parse(fs.readFileSync('./news.json', 'utf8'));

// Путь к шаблону статьи
const templatePath = './template-single.html';
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Базовый путь для генерации
const outputDir = './news';

// Очищаем папку news перед генерацией (чтобы не было дублей старых статей)
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

console.log('Начинаю генерацию...');

let sitemapEntries = []; // Сюда будем собирать ссылки для карты сайта

newsData.forEach((item) => {
    // Формируем путь: ./news/slug/index.html
    const slug = item.slug;
    const articleDir = path.join(outputDir, slug);
    const articlePath = path.join(articleDir, 'index.html');

    // Создаем папку для статьи
    fs.mkdirSync(articleDir, { recursive: true });

    // Заполняем шаблон данными
    const pageContent = templateContent
        .replace('{{TITLE}}', item.title)
        .replace('{{DATE}}', new Date(item.date).toLocaleDateString('ru-RU'))
        .replace('{{CATEGORY}}', item.category)
        .replace('{{SUMMARY}}', item.summary)
        .replace('{{CONTENT}}', item.content)
        // ВАЖНО: Путь к картинке должен быть относительным от статьи или абсолютным
        // Если картинка лежит в images/, а статья в news/slug/, то нужно подняться на уровень: ../images/
        .replace('{{IMAGE}}', `../images/${item.image.split('/').pop()}`) 
        .replace('{{SLUG}}', slug);

    // Записываем файл
    fs.writeFileSync(articlePath, pageContent, 'utf8');
    
    console.log(`✅ Создана страница: /news/${slug}/`);

    // Добавляем в карту сайта
    sitemapEntries.push(`https://rakurs-news.github.io/rakurs-news/news/${slug}/`);
});

// --- ГЕНЕРАЦИЯ SITEMAP.XML ---
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rakurs-news.github.io/rakurs-news/</loc>
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
console.log('🎉 Готово! Теперь можно загружать файлы на GitHub Pages.');
