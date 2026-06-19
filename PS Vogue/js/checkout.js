document.addEventListener('DOMContentLoaded', () => {
  renderHeader('cart.html');
  renderFooter();

  const items = Cart.items();
  const container = document.getElementById('checkout-content');

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="icon">🛍️</div>
        <h2>Your cart is empty</h2>
        <p>Explore our beautiful nail sets and add something stunning to your cart.</p>
        <a href="shop.html" class="btn btn--primary btn--lg">Browse Nail Sets</a>
      </div>`;
    return;
  }

  const subtotal = Cart.subtotal();
  const freeDelivery = subtotal >= CONFIG.FREE_DELIVERY_ABOVE;

  const lineItemsHTML = items.map(item => {
    const variantStr = item.variant
      ? Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(' · ')
      : '';
    return `
    <div class="cart-line" data-key="${item.lineKey}">
      <div class="cart-line__img">
        <img src="${item.image}" alt="${item.name}" width="80" height="100"
             onerror="this.onerror=null;this.src='assets/img/placeholder.svg'">
      </div>
      <div class="cart-line__info">
        <div class="cart-line__name">${item.name}</div>
        ${variantStr ? `<div class="cart-line__variant">${variantStr}</div>` : ''}
        <div class="cart-line__price">${formatINR(item.price * item.qty)}</div>
        <div class="cart-line__actions">
          <div class="qty-stepper">
            <button class="qty-dec" data-key="${item.lineKey}" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button class="qty-inc" data-key="${item.lineKey}" aria-label="Increase">+</button>
          </div>
          <button class="remove-btn" data-key="${item.lineKey}">Remove</button>
        </div>
      </div>
    </div>`;
  }).join('');

  const orderLinesHTML = items.map(item => {
    const variantStr = item.variant
      ? Object.entries(item.variant).map(([k, v]) => v).join(', ')
      : '';
    return `
    <div class="order-line">
      <div class="order-line__img">
        <img src="${item.image}" alt="${item.name}" width="56" height="70"
             onerror="this.onerror=null;this.src='assets/img/placeholder.svg'">
      </div>
      <div class="order-line__name">${item.name}${variantStr ? `<br><small style="color:var(--text-muted)">${variantStr} × ${item.qty}</small>` : ` × ${item.qty}`}</div>
      <div class="order-line__price">${formatINR(item.price * item.qty)}</div>
    </div>`;
  }).join('');

  container.innerHTML = `
<div class="checkout-layout">
  <div class="container">
    <h1 style="margin-bottom:var(--sp-6)">Your Cart & Checkout</h1>
    <div class="checkout-grid">
      <!-- Left: cart items + delivery form -->
      <div>
        <div class="checkout-card" style="margin-bottom:var(--sp-5)">
          <h2>Cart Items</h2>
          <div id="cart-lines">${lineItemsHTML}</div>
        </div>

        <div class="checkout-card">
          <h2>Delivery Details</h2>
          <form class="checkout-form" id="checkout-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="cf-name">Full Name <span>*</span></label>
                <input type="text" id="cf-name" name="name" placeholder="Your name" autocomplete="name">
                <span class="form-error" id="err-name">Please enter your name</span>
              </div>
              <div class="form-group">
                <label for="cf-phone">Mobile Number <span>*</span></label>
                <input type="tel" id="cf-phone" name="phone" placeholder="10-digit number" autocomplete="tel" maxlength="10">
                <span class="form-error" id="err-phone">Enter a valid 10-digit mobile number</span>
              </div>
            </div>
            <div class="form-group">
              <label for="cf-address">Delivery Address <span>*</span></label>
              <textarea id="cf-address" name="address" rows="2" placeholder="House / Flat no., Street, Area" autocomplete="street-address"></textarea>
              <span class="form-error" id="err-address">Please enter your address</span>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="cf-city">City <span>*</span></label>
                <input type="text" id="cf-city" name="city" placeholder="City" value="Surat" autocomplete="address-level2">
                <span class="form-error" id="err-city">Please enter your city</span>
              </div>
              <div class="form-group">
                <label for="cf-pin">Pincode <span>*</span></label>
                <input type="text" id="cf-pin" name="pin" placeholder="6-digit pincode" maxlength="6" autocomplete="postal-code">
                <span class="form-error" id="err-pin">Enter a valid 6-digit pincode</span>
              </div>
            </div>
            <div class="form-group">
              <label for="cf-email">Email Address <span style="color:var(--text-muted);font-weight:400">(optional)</span></label>
              <input type="email" id="cf-email" name="email" placeholder="your@email.com" autocomplete="email">
              <span class="form-error" id="err-email">Enter a valid email address</span>
            </div>
            <div class="form-group">
              <label>Payment Method</label>
              <select id="cf-payment">
                <option>UPI / PhonePe / GPay (on WhatsApp)</option>
                <option>Cash on Delivery (COD)</option>
                <option>Bank Transfer (details on WhatsApp)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cf-notes">Order Notes <span style="color:var(--text-muted);font-weight:400">(optional)</span></label>
              <textarea id="cf-notes" name="notes" rows="2" placeholder="Any special instructions, gift message, etc."></textarea>
            </div>
            <button type="submit" class="btn btn--whatsapp btn--lg btn--block" id="place-order-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.123 1.529 5.852L0 24l6.335-1.502A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.034-1.376l-.361-.214-3.741.981.999-3.648-.235-.374A9.86 9.86 0 012.118 12c0-5.448 4.434-9.882 9.882-9.882 5.447 0 9.882 4.434 9.882 9.882 0 5.447-4.435 9.882-9.882 9.882z"/></svg>
              Place Order via WhatsApp
            </button>
          </form>

          <div class="order-success" id="order-success">
            <div class="icon">✅</div>
            <h2>Order Sent!</h2>
            <p>Your order has been opened in WhatsApp — please hit <strong>Send</strong> to confirm with the salon. We'll reach out shortly to confirm delivery details and payment.</p>
            <div style="margin-top:var(--sp-5);display:flex;gap:var(--sp-3);justify-content:center;flex-wrap:wrap">
              <a href="shop.html" class="btn btn--primary">Continue Shopping</a>
              <a href="${CONFIG.INSTAGRAM_NAILS}" target="_blank" rel="noopener" class="btn btn--ghost">View Our Work</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: order summary -->
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="order-line-items">${orderLinesHTML}</div>
        <div class="order-totals">
          <div class="order-total-row"><span>Subtotal</span><span>${formatINR(subtotal)}</span></div>
          <div class="order-total-row"><span>Delivery</span><span>${freeDelivery ? '<span style="color:var(--success)">Free</span>' : 'Calculated on WhatsApp'}</span></div>
          <div class="order-total-row grand"><span>Total</span><span>${formatINR(subtotal)}</span></div>
        </div>
        <div class="delivery-note" style="margin-top:var(--sp-4)">
          ${freeDelivery
            ? '🎉 You qualify for free delivery!'
            : `Add ${formatINR(CONFIG.FREE_DELIVERY_ABOVE - subtotal)} more for free delivery.`}
          Delivery charges will be confirmed on WhatsApp before dispatch.
        </div>
      </div>
    </div>
  </div>
</div>`;

  /* Qty updates & remove */
  document.getElementById('cart-lines').addEventListener('click', e => {
    const key = e.target.dataset.key;
    if (e.target.classList.contains('qty-dec')) {
      const item = Cart.items().find(i => i.lineKey === key);
      if (item) Cart.setQty(key, item.qty - 1);
      if (Cart.items().length === 0) { location.reload(); return; }
      const line = document.querySelector(`.cart-line[data-key="${key}"]`);
      const newItem = Cart.items().find(i => i.lineKey === key);
      if (!newItem) { line?.remove(); return; }
      line.querySelector('.cart-line__price').textContent = formatINR(newItem.price * newItem.qty);
      line.querySelector('.qty-stepper span').textContent = newItem.qty;
      updateCartBadge();
    }
    if (e.target.classList.contains('qty-inc')) {
      const item = Cart.items().find(i => i.lineKey === key);
      if (item) Cart.setQty(key, item.qty + 1);
      const line = document.querySelector(`.cart-line[data-key="${key}"]`);
      const newItem = Cart.items().find(i => i.lineKey === key);
      if (newItem) {
        line.querySelector('.cart-line__price').textContent = formatINR(newItem.price * newItem.qty);
        line.querySelector('.qty-stepper span').textContent = newItem.qty;
      }
      updateCartBadge();
    }
    if (e.target.classList.contains('remove-btn')) {
      Cart.remove(key);
      document.querySelector(`.cart-line[data-key="${key}"]`)?.remove();
      updateCartBadge();
      if (Cart.items().length === 0) location.reload();
    }
  });

  /* Form validation & submit */
  document.getElementById('checkout-form').addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    function field(id, errId, check) {
      const el = document.getElementById(id);
      const err = document.getElementById(errId);
      const ok = check(el.value.trim());
      el.classList.toggle('error', !ok);
      err.classList.toggle('visible', !ok);
      if (!ok) valid = false;
      return ok ? el.value.trim() : '';
    }

    const name    = field('cf-name',    'err-name',    v => v.length >= 2);
    const phone   = field('cf-phone',   'err-phone',   v => /^[6-9]\d{9}$/.test(v));
    const address = field('cf-address', 'err-address', v => v.length >= 5);
    const city    = field('cf-city',    'err-city',    v => v.length >= 2);
    const pin     = field('cf-pin',     'err-pin',     v => /^\d{6}$/.test(v));
    const email   = (() => {
      const el = document.getElementById('cf-email');
      const err = document.getElementById('err-email');
      const v = el.value.trim();
      if (!v) return '';
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      el.classList.toggle('error', !ok);
      err.classList.toggle('visible', !ok);
      if (!ok) valid = false;
      return ok ? v : '';
    })();
    const payment = document.getElementById('cf-payment').value;
    const notes   = document.getElementById('cf-notes').value.trim();

    if (!valid) return;

    /* Build WhatsApp message */
    const currentItems = Cart.items();
    const lines = currentItems.map((item, i) => {
      const v = item.variant
        ? '\n   ' + Object.entries(item.variant).map(([k,val]) => `${k}: ${val}`).join(' | ')
        : '';
      return `${i+1}. ${item.name}${v}\n   Qty: ${item.qty} × ${formatINR(item.price)} = ${formatINR(item.price * item.qty)}`;
    }).join('\n');
    const total = Cart.subtotal();
    const msg = `🛍️ *New PS Vogue Order*\n\n*Items:*\n${lines}\n\n*Subtotal:* ${formatINR(total)}\n(Delivery to be confirmed)\n\n*Deliver to:*\nName: ${name}\nPhone: +91 ${phone}\nAddress: ${address}\nCity: ${city}\nPincode: ${pin}${email ? '\nEmail: ' + email : ''}\nPayment: ${payment}${notes ? '\nNotes: ' + notes : ''}\n\nOrder placed via website 🌐`;

    window.open(whatsappURL(msg), '_blank');

    Cart.clear();
    updateCartBadge();
    document.querySelector('.checkout-form').style.display = 'none';
    document.getElementById('order-success').classList.add('visible');
  });
});
