document.addEventListener('DOMContentLoaded', () => {
  renderHeader('shop.html');
  renderFooter();

  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('result-count');
  const sortEl = document.getElementById('sort-select');

  /* Read category from URL */
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('cat') || 'all';

  /* Render category chips */
  const chipGroup = document.getElementById('category-chips');
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `chip${cat.id === activeCategory ? ' active' : ''}`;
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      chipGroup.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.cat === activeCategory));
      renderGrid();
    });
    chipGroup.appendChild(btn);
  });

  function sortProducts(products) {
    const val = sortEl ? sortEl.value : 'featured';
    if (val === 'price-asc') return [...products].sort((a, b) => a.price - b.price);
    if (val === 'price-desc') return [...products].sort((a, b) => b.price - a.price);
    if (val === 'new') return [...products].sort((a, b) => (b.badge === 'New') - (a.badge === 'New'));
    return [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  function renderGrid() {
    const products = sortProducts(getByCategory(activeCategory));
    if (countEl) countEl.textContent = `${products.length} item${products.length !== 1 ? 's' : ''}`;
    grid.innerHTML = products.map(buildProductCard).join('');
    initReveal();
  }

  if (sortEl) sortEl.addEventListener('change', renderGrid);
  renderGrid();
});
