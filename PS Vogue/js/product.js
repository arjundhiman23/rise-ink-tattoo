document.addEventListener('DOMContentLoaded', () => {
  renderHeader('shop.html');
  renderFooter();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = productId ? getProduct(productId) : null;

  if (!product) {
    document.getElementById('product-content').innerHTML = `
      <div class="empty-cart" style="padding-top:var(--sp-10)">
        <div class="icon">💅</div>
        <h2>Product not found</h2>
        <p>The nail set you're looking for isn't available.</p>
        <a href="shop.html" class="btn btn--primary">Browse All Sets</a>
      </div>`;
    return;
  }

  /* State */
  let currentVariant = { ...(product.defaultVariant || {}) };
  let qty = 1;
  let currentImgIndex = 0;

  /* Build variant options */
  function variantGroupHTML(axis, options, selected) {
    const chips = options.map(opt => `
      <button class="variant-chip${opt === selected ? ' active' : ''}"
              data-axis="${axis}" data-val="${opt}">${opt}</button>
    `).join('');
    return `
      <div class="variant-group">
        <div class="variant-group__label">${axis}: <em>${selected}</em></div>
        <div class="variant-chips">${chips}</div>
      </div>`;
  }

  function buildVariantHTML() {
    if (!product.variants) return '';
    return Object.entries(product.variants)
      .map(([axis, options]) => variantGroupHTML(axis, options, currentVariant[axis] || options[0]))
      .join('');
  }

  function variantLabel() {
    if (!currentVariant) return '';
    return Object.entries(currentVariant).map(([k, v]) => `${k}: ${v}`).join(' · ');
  }

  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  const badgeHTML = product.badge ? `<span class="badge badge--gold">${product.badge}</span>` : '';
  const compareHTML = product.compareAt
    ? `<span class="product-info__compare">${formatINR(product.compareAt)}</span>
       <span class="product-info__save">Save ${formatINR(product.compareAt - product.price)}</span>`
    : '';

  const thumbsHTML = product.images.map((img, i) => `
    <div class="product-gallery__thumb${i === 0 ? ' active' : ''}" data-idx="${i}">
      <img src="${img}" alt="${product.name} view ${i+1}" loading="lazy" width="72" height="90"
           onerror="this.onerror=null;this.src='assets/img/placeholder.svg'">
    </div>`).join('');

  const boxItems = product.box.map(b => `<li>✓ ${b}</li>`).join('');

  const relatedProducts = getRelated(product).map(buildProductCard).join('');

  document.getElementById('product-content').innerHTML = `
<div class="product-layout">
  <div class="container">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <span>/</span>
      <a href="shop.html">Shop</a>
      <span>/</span>
      <a href="shop.html?cat=${product.category}">${CATEGORIES.find(c => c.id === product.category)?.label || product.category}</a>
      <span>/</span>
      <span>${product.name}</span>
    </div>
    <div class="product-grid">
      <!-- Gallery -->
      <div class="product-gallery">
        <div class="product-gallery__main">
          <img id="main-img" src="${product.images[0] || 'assets/img/placeholder.svg'}"
               alt="${product.name}" width="600" height="750"
               onerror="this.onerror=null;this.src='assets/img/placeholder.svg'">
        </div>
        ${product.images.length > 1 ? `<div class="product-gallery__thumbs">${thumbsHTML}</div>` : ''}
      </div>

      <!-- Info -->
      <div class="product-info">
        <div class="product-info__category">${CATEGORIES.find(c=>c.id===product.category)?.label}</div>
        ${badgeHTML}
        <h1 class="product-info__title">${product.name}</h1>
        <div class="product-info__rating">
          <span class="stars">${stars}</span>
          <span>${product.rating} · ${product.reviews} reviews</span>
        </div>
        <div class="product-info__price-row">
          <span class="product-info__price">${formatINR(product.price)}</span>
          ${compareHTML}
        </div>
        <p class="product-short">${product.short}</p>

        <div id="variant-groups">${buildVariantHTML()}</div>

        <div class="product-actions">
          <div class="product-actions__row">
            <div class="qty-input-group">
              <button id="qty-dec" aria-label="Decrease quantity">−</button>
              <span id="qty-display">1</span>
              <button id="qty-inc" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn--primary" style="flex:1" id="add-to-cart-btn">
              Add to Cart — ${formatINR(product.price)}
            </button>
          </div>
          <a href="${whatsappURL(`Hi! I'd like to order the *${product.name}* (${variantLabel()}).`)}"
             target="_blank" rel="noopener"
             class="btn btn--whatsapp btn--block">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.123 1.529 5.852L0 24l6.335-1.502A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.034-1.376l-.361-.214-3.741.981.999-3.648-.235-.374A9.86 9.86 0 012.118 12c0-5.448 4.434-9.882 9.882-9.882 5.447 0 9.882 4.434 9.882 9.882 0 5.447-4.435 9.882-9.882 9.882z"/></svg>
            Order on WhatsApp
          </a>
        </div>

        <div class="accordion">
          <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="true">
              What's in the box
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="accordion-content open"><ul style="display:flex;flex-direction:column;gap:4px">${boxItems}</ul></div>
          </div>
          <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">
              Description
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="accordion-content">${product.description}</div>
          </div>
          <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">
              Application & Care
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="accordion-content">${product.care}</div>
          </div>
          <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">
              Delivery & Returns
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="accordion-content">
              We ship across India. Delivery is arranged by the salon after order confirmation on WhatsApp.
              Free delivery on orders above ${formatINR(CONFIG.FREE_DELIVERY_ABOVE)}.
              Returns accepted within 48 hours if the product is unused and unopened.
            </div>
          </div>
        </div>
      </div>
    </div>

    ${relatedProducts ? `
    <section class="section--sm">
      <div class="section-header"><span class="eyebrow">You may also like</span><h2>More from ${CATEGORIES.find(c=>c.id===product.category)?.label}</h2></div>
      <div class="products-grid">${relatedProducts}</div>
    </section>` : ''}
  </div>
</div>`;

  /* Gallery thumbnails */
  document.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentImgIndex = parseInt(thumb.dataset.idx);
      document.getElementById('main-img').src = product.images[currentImgIndex] || 'assets/img/placeholder.svg';
      document.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.toggle('active', t.dataset.idx == currentImgIndex));
    });
  });

  /* Variant chips */
  document.getElementById('variant-groups').addEventListener('click', e => {
    const chip = e.target.closest('.variant-chip');
    if (!chip) return;
    const axis = chip.dataset.axis;
    const val = chip.dataset.val;
    currentVariant[axis] = val;
    chip.closest('.variant-chips').querySelectorAll('.variant-chip').forEach(c => c.classList.toggle('active', c.dataset.val === val));
    chip.closest('.variant-group').querySelector('.variant-group__label em').textContent = val;
    document.getElementById('add-to-cart-btn').textContent = `Add to Cart — ${formatINR(product.price * qty)}`;
  });

  /* Qty */
  document.getElementById('qty-dec').addEventListener('click', () => {
    if (qty <= 1) return;
    qty--;
    document.getElementById('qty-display').textContent = qty;
    document.getElementById('add-to-cart-btn').textContent = `Add to Cart — ${formatINR(product.price * qty)}`;
  });
  document.getElementById('qty-inc').addEventListener('click', () => {
    qty++;
    document.getElementById('qty-display').textContent = qty;
    document.getElementById('add-to-cart-btn').textContent = `Add to Cart — ${formatINR(product.price * qty)}`;
  });

  /* Add to cart */
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    for (let i = 0; i < qty; i++) {
      Cart.add({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || 'assets/img/placeholder.svg',
        variant: { ...currentVariant }
      });
    }
    updateCartBadge();
    toast(`${product.name} added to cart 💅`);
  });

  initAccordions();
  initReveal();
});
