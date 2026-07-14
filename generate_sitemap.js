
```javascript
const fs = require('fs');

const newsData = JSON.parse(fs.readFileSync('news.json', 'utf8'));

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rakurs-news.github.io/</loc>
    <changefreq>daily</changefreq>    <priority>1.0</priority>
  </url>
`;

newsData.forEach(news => {    sitemap += `  <url>
    <loc>https://rakurs-news.github.io/news.html?id=${news.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemap += '</urlset>';fs.writeFileSync('sitemap.xml', sitemap);
console.log(`Готово! Обработано ${newsData.length} новостей.`);
```
