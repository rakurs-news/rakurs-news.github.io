// ===== CYBER — ЛОГИКА СТРАНИЦ КАТЕГОРИЙ =====
// PAGE_CATEGORY задаётся в каждом HTML-файле категории перед загрузкой этого скрипта.

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('newsGrid');
  const gridTitle = document.getElementById('gridTitle');
  const cat = window.PAGE_CATEGORY || 'all';
  let currentQuery = '';

  function render(query) {
    currentQuery = query || '';
    let filtered = getNewsByCat(cat);
    if (currentQuery) {
      const q = currentQuery.toLowerCase();
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)
      );
    }

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state"><p>Новостей пока нет, но они скоро появятся.</p></div>';
      return;
    }

    filtered.forEach((n, i) => {
      const card = document.createElement('a');
      card.className = 'card';
      card.href = n.link;
      card.style.animationDelay = (i * 0.06) + 's';
      card.innerHTML = `
        <div class="card-img">
          <span class="card-badge">${n.cat}</span>
          <img src="${n.img}" alt="${n.title}" loading="lazy">
        </div>
        <div class="card-body">
          <h3>${n.title}</h3>
          <p>${n.excerpt}</p>
          <div class="card-meta"><span>${n.date}</span></div>
        </div>`;
      grid.appendChild(card);
    });
  }

  render('');

  // Поиск
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  if (searchInput) searchInput.addEventListener('input', () => render(searchInput.value));
  if (mobileSearchInput) mobileSearchInput.addEventListener('input', () => render(mobileSearchInput.value));

  // Бургер-меню
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
  if (burger) {
    burger.addEventListener('click', () => {
      if (burger.classList.contains('open')) closeMobileMenu();
      else { burger.classList.add('open'); mobileMenu.classList.add('open'); }
    });
  }
  document.addEventListener('click', (e) => {
    if (burger && !burger.contains(e.target) && !mobileMenu.contains(e.target)) closeMobileMenu();
  });

  // Навигация из меню
  document.querySelectorAll('.nav a, .mobile-menu a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = a.dataset.cat;
      const catLinks = {
        'all': 'index.html', 'В России': 'inrussia.html',
        'В мире': 'inworld.html',
        'Экономика': 'economics.html',
        'Спорт': 'sport.html',
        'Культура': 'culture.html',
        'Армия': 'army.html'
      };
      if (catLinks[cat]) window.location.href = catLinks[cat];
    });
  });
});
