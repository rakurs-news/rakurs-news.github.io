const fs = require('fs');
const path = require('path');

// 1. Читаем твой JSON
const rawData = fs.readFileSync('news.json', 'utf8');
const news = JSON.parse(rawData);

// Папка, куда складывать готовые статьи (должна существовать!)
const outputDir = '_posts'; 

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

console.log(`Начинаю конвертацию ${news.length} статей...`);

news.forEach(article => {
    // --- НАСТРОЙКИ ФОРМАТА ДАТЫ ---
    // Если в JSON дата в формате "2024-10-25", оставляем как есть.
    // Если там timestamp (цифры), раскомментируй строку ниже и подстрой формат.
    const dateObj = new Date(article.date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    // Имя файла: YYYY-MM-DD-slug.md
    // Заменяем пробелы в заголовке на дефисы и делаем нижний регистр
    const slug = article.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-');
    const filename = `${year}-${month}-${day}-${slug}.md`;

    // --- ГЕНЕРАЦИЯ FRONT MATTER ---
    const frontMatter = `---
title: "${article.title}"
date: ${year}-${month}-${day}
layout: post
category: ${article.category || 'other'}
image: ${article.imageUrl || 'images/placeholder.jpg'}
---
`;

    // --- ТЕЛО СТАТЬИ ---
    // Берем полный текст. Если в JSON есть поле 'content' и 'summary', используй их.
    // Здесь я беру поле 'content', если его нет - 'summary'.
    const content = article.content || article.summary || 'Текст статьи отсутствует';

    const fullFileContent = frontMatter + content;

    // Пишем файл
    fs.writeFileSync(path.join(outputDir, filename), fullFileContent, 'utf8');
    console.log(`✅ Создан файл: ${filename}`);
});

console.log('Готово! Теперь положи эти файлы в папку _posts на GitHub.');
