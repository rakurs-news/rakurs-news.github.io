const fs = require('fs');

const news = require('./news.json');

const generateNewsHTML = (item) => `
<article>
  <h2>${item.title}</h2>
  <p>${item.content}</p>
  <div>${item.date} - ${item.category}</div>
</article>
`;

const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<title>Новости</title>
</head>
<body>
<h1>Последние новости</h1>
${news.map(generateNewsHTML).join('\n')}
</body>
</html>
`;

fs.writeFileSync('public/news.html', htmlContent);
console.log('Новости сгенерированы');
