const fs = require('fs');
const path = require('path');

// --- НАСТРОЙКИ ---
const inputJson = './news.json';
const imagesSourceDir = './images'; // Откуда брать картинки (локально у тебя)
const imagesDestDir = './assets/images'; // Куда копировать картинки (чтобы Git видел)
const postsDir = './_posts'; // Стандартная папка для Jekyll
// -----------------

// 1. Читаем данные
let newsData;
try {
    newsData = JSON.parse(fs.readFileSync(inputJson, 'utf8'));
} catch (e) {
    console.error('❌ Ошибка чтения news.json! Проверь путь и формат файла.');
    process.exit(1);
}

console.log('🚀 Начинаю генерацию для Jekyll...');

// Создаем папки, если их нет
if (!fs.existsSync(imagesDestDir)) {
    fs.mkdirSync(imagesDestDir, { recursive: true });
}
if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

newsData.forEach((item) => {
    // --- ПОДГОТОВКА ДАТЫ И ИМЕНИ ФАЙЛА ---
    // Jekyll требует формат: YYYY-MM-DD-slug.md
    const dateObj = new Date(item.date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    // Создаем слаг (чистый URL) из заголовка или берем готовый
    let slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const fileName = `${year}-${month}-${day}-${slug}.md`;
    const filePath = path.join(postsDir, fileName);

    // --- ОБРАБОТКА КАРТИНКИ ---
    let imageBlock = '';
    let imgSrcPath = ''; // Путь для вставки в Markdown

    if (item.image) {
        // Получаем имя файла картинки (например, photo.jpg)
        const imgName = path.basename(item.image);
        
        // Путь назначения в assets/images
        const destImgPath = path.join(imagesDestDir, imgName);
        const srcImgPath = path.join(imagesSourceDir, imgName);

        // 1. Копируем картинку в assets/images (чтобы она попала в Git)
        if (fs.existsSync(srcImgPath)) {
            fs.copyFileSync(srcImgPath, destImgPath);
            console.log(`   🖼️ Скопирована картинка: ${imgName}`);
            
            // 2. Формируем ПРАВИЛЬНУЮ Markdown ссылку (начинается с /)
            imgSrcPath = `/assets/images/${imgName}`;
            imageBlock = `![${item.title}](${imgSrcPath})`;
        } else {
            console.warn(`   ⚠️ Картинка не найдена локально: ${srcImgPath}. Ссылка не будет добавлена.`);
        }
    }

    // --- ФОРМИРОВАНИЕ FRONT MATTER И КОНТЕНТА ---
    const frontMatter = `---
layout: post
title: "${item.title}"
date: ${year}-${month}-${day} 12:00:00 +0300
categories: ${item.category || 'news'}
---
`;

    const pageContent = frontMatter + `
${imageBlock}

${item.content}
`;

    // Записываем .md файл
    fs.writeFileSync(filePath, pageContent, 'utf8');
    console.log(`✅ Создана новость: ${fileName}`);
});

console.log('🎉 ГОТОВО! Теперь сделай: git add . && git commit -m "update" && git push');
