/* Header injection, cart drawer, toast, scroll reveal, mobile nav */

/* ===== HEADER ===== */
function renderHeader(activePage) {
  const nav = [
    { href: 'index.html',   label: 'Home' },
    { href: 'shop.html',    label: 'Shop Nails' },
    { href: 'custom.html',  label: 'Custom Order' },
    { href: 'about.html',   label: 'About' },
    { href: 'booking.html', label: 'Booking' },
  ];

  const navLinks = nav.map(n =>
    `<a href="${n.href}" class="${activePage === n.href ? 'active' : ''}">${n.label}</a>`
  ).join('');

  const mobileLinks = nav.map(n =>
    `<a href="${n.href}">${n.label}</a>`
  ).join('');

  const headerHTML = `
<header class="site-header" id="site-header">
  <div class="site-header__inner">
    <a href="index.html" class="site-header__logo">
      PS Vogue
      <span>Salon & Academy · Surat</span>
    </a>
    <nav class="site-header__nav" aria-label="Main navigation">
      ${navLinks}
    </nav>
    <div class="site-header__actions">
      <a href="cart.html" class="cart-btn" aria-label="View cart">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span class="cart-btn__badge" id="cart-badge">0</span>
      </a>
      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
  ${mobileLinks}
  <div class="mobile-nav__social">
    <a href="${CONFIG.INSTAGRAM_NAILS}" target="_blank" rel="noopener">@psvogue_nails</a>
    <a href="${CONFIG.INSTAGRAM_MAIN}" target="_blank" rel="noopener">@psvoguesalon</a>
  </div>
</nav>`;

  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  /* Scroll effect */
  const header = document.getElementById('site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* Close mobile nav on link click */
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ===== FOOTER ===== */
function renderFooter() {
  const footerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        <div class="logo">PS Vogue<span>Salon & Academy · Surat</span></div>
        <p>Surat's premium destination for nail art, bridal makeup, hair transformations, and skin care. Crafting beauty one nail at a time.</p>
        <div class="footer-ig-handles" style="margin-top:16px;">
          <a href="${CONFIG.INSTAGRAM_NAILS}" target="_blank" rel="noopener">@psvogue_nails</a>
          <a href="${CONFIG.INSTAGRAM_MAIN}" target="_blank" rel="noopener">@psvoguesalon</a>
          <a href="${CONFIG.INSTAGRAM_MAKEUP}" target="_blank" rel="noopener">@psmakeupstudio</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="shop.html?cat=press-on">Press-On Sets</a></li>
          <li><a href="shop.html?cat=glitter">Glitter & Chrome</a></li>
          <li><a href="shop.html?cat=bridal">Bridal Sets</a></li>
          <li><a href="shop.html?cat=pastel">Pastel & Minimal</a></li>
          <li><a href="custom.html">Custom Order</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Salon</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="booking.html">Hair & Makeup</a></li>
          <li><a href="booking.html">Skin Treatments</a></li>
          <li><a href="about.html#gallery">Our Work</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+917715086978">${CONFIG.SALON_PHONE}</a></li>
          <li><a href="${whatsappURL('Hi! I want to know more about PS Vogue.')}" target="_blank" rel="noopener">WhatsApp Us</a></li>
          <li><a href="about.html#location">Find Us</a></li>
          <li style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:8px;">${CONFIG.SALON_HOURS}</li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>© ${new Date().getFullYear()} PS Vogue Salon & Academy, Surat. All rights reserved.</span>
      <span>Made with 💅 in Surat</span>
    </div>
  </div>
</footer>`;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
}

/* ===== CART BADGE ===== */
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const n = Cart.count();
  badge.textContent = n;
  badge.classList.toggle('visible', n > 0);
}

/* ===== TOAST ===== */
let toastContainer;
function toast(message, duration = 3000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>✓</span>${message}`;
  toastContainer.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, duration);
}

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* ===== ACCORDION ===== */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', !expanded);
      content.classList.toggle('open', !expanded);
    });
  });
}

/* ===== PRODUCT CARD BUILDER ===== */
function buildProductCard(product) {
  const badgeHTML = product.badge
    ? `<div class="product-card__badge"><span class="badge badge--gold">${product.badge}</span></div>`
    : '';
  const compareHTML = product.compareAt
    ? `<span class="compare">${formatINR(product.compareAt)}</span>`
    : '';
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  const img1 = product.images[0] || 'assets/img/placeholder.svg';
  const img2 = product.images[1] || img1;

  return `
<article class="product-card reveal" onclick="location.href='product.html?id=${product.id}'">
  <div class="product-card__img-wrap">
    <img src="${img1}" alt="${product.name}"
         loading="lazy" width="400" height="500"
         onerror="this.onerror=null;this.src='assets/img/placeholder.svg'">
    ${badgeHTML}
    <div class="product-card__quick-add">
      <button class="btn btn--primary btn--sm btn--block" onclick="event.stopPropagation();quickAdd('${product.id}')">
        Add to Cart
      </button>
    </div>
  </div>
  <div class="product-card__body">
    <div class="product-card__name">${product.name}</div>
    <div class="product-card__rating">
      <span class="stars">${stars}</span>
      <span>${product.rating} (${product.reviews})</span>
    </div>
    <div class="product-card__price">
      <span class="current">${formatINR(product.price)}</span>
      ${compareHTML}
    </div>
  </div>
</article>`;
}

/* ===== QUICK ADD ===== */
function quickAdd(productId) {
  const product = getProduct(productId);
  if (!product) return;
  const variant = product.defaultVariant || null;
  Cart.add({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0] || 'assets/img/placeholder.svg',
    variant
  });
  updateCartBadge();
  toast(`${product.name} added to cart 💅`);
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initReveal();
  initAccordions();
  document.addEventListener('cart:change', updateCartBadge);
});
