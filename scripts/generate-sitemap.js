const fs = require('fs');
const path = require('path');

console.log('--- START GENERATING SITEMAP ---');
console.log('Current working directory:', process.cwd());
console.log('Script directory (__dirname):', __dirname);

// Пытаемся найти news.json в корне проекта
const rootDir = path.resolve(__dirname, '..');
const newsPath = path.join(rootDir, 'news.json');

console.log('Looking for news.json at:', newsPath);

// Проверка: существует ли файл?
if (!fs.existsSync(newsPath)) {
    console.error('❌ ОШИБКА: Файл news.json НЕ найден по пути:', newsPath);
    console.log('📂 Список файлов в корне проекта:', fs.readdirSync(rootDir));
    process.exit(1);
}

let news;
try {
    const rawData = fs.readFileSync(newsPath, 'utf8');
    news = JSON.parse(rawData);
    console.log('✅ Успешно загружено новостей:', news.length);
} catch (err) {
    console.error('❌ ОШИБКА при чтении/парсинге news.json:', err.message);
    console.log('📄 Содержимое файла (первые 500 символов):', rawData.substring(0, 500));
    process.exit(1);
}

const baseUrl = 'https://rakurs-news.github.io';
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${baseUrl}/</loc>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>`;

if (Array.isArray(news)) {
    news.forEach(article => {
        if (!article.id) {
            console.warn('⚠️ Пропуск новости без ID:', article);
            return;
        }
        const id = article.id;
        let slug = id
            .replace(/–/g, '-')
            .replace(/[^a-z0-9-]/gi, '-')
            .toLowerCase();
        
        const loc = `${baseUrl}/news.html?id=${slug}`;
        
        xml += `
<url>
<loc>${loc}</loc>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`;
    });
} else {
    console.error('❌ ОШИБКА: news.json должен содержать массив объектов!');
    process.exit(1);
}

xml += `\n</urlset>`;

const sitemapPath = path.join(rootDir, 'sitemap.xml');
try {
    fs.writeFileSync(sitemapPath, xml);
    console.log('✅ Sitemap успешно создан:', sitemapPath);
} catch
