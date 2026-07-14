
const fs = require('fs');

const DOMAIN = 'https://rakurs-news.github.io'; // Выносим домен в переменную

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
        }
    });
}

try {
    // Проверяем наличие файла
    if (!fs.existsSync('news.json')) {
        throw new Error('Файл news.json не найден!');
    }

    const fileContent = fs.readFileSync('news.json', 'utf8');
    const newsData = JSON.parse(fileContent);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

    newsData.forEach(news => {
        // ВАЖНО: экранируем ID, чтобы спецсимволы не сломали XML
        const safeId = escapeXml(String(news.id));
        
        sitemap += `  <url>
    <loc>${DOMAIN}/news.html?id=${safeId}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    sitemap += '</urlset>';

    // Явно указываем кодировку при записи
    fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
    
    console.log(`Готово! Обработано ${newsData.length} новостей. Файл сохранён как sitemap.xml`);
} catch (error) {
    console.error('Ошибка при генерации sitemap:', error.message);
    process.exit(1);
}
