const Cart = (() => {
  function _load() {
    try {
      const raw = localStorage.getItem(CONFIG.CART_KEY);
      if (!raw) return { v: 1, items: [], updatedAt: Date.now() };
      const data = JSON.parse(raw);
      if (data.v !== 1) return { v: 1, items: [], updatedAt: Date.now() };
      return data;
    } catch {
      return { v: 1, items: [], updatedAt: Date.now() };
    }
  }

  function _save(data) {
    data.updatedAt = Date.now();
    localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(data));
    document.dispatchEvent(new CustomEvent('cart:change', { detail: data }));
  }

  function _makeLineKey(id, variant) {
    if (!variant) return id;
    const parts = Object.entries(variant).sort().map(([k, v]) => `${k}:${v}`);
    return `${id}|${parts.join('|')}`;
  }

  function items() {
    return _load().items;
  }

  function count() {
    return _load().items.reduce((n, i) => n + i.qty, 0);
  }

  function subtotal() {
    return _load().items.reduce((t, i) => t + i.price * i.qty, 0);
  }

  function add(item) {
    /* item: { id, name, price, image, variant } */
    const lineKey = _makeLineKey(item.id, item.variant);
    const data = _load();
    const existing = data.items.find(i => i.lineKey === lineKey);
    if (existing) {
      existing.qty += 1;
    } else {
      data.items.push({ ...item, lineKey, qty: 1 });
    }
    _save(data);
    return lineKey;
  }

  function setQty(lineKey, qty) {
    const data = _load();
    const item = data.items.find(i => i.lineKey === lineKey);
    if (!item) return;
    if (qty <= 0) {
      data.items = data.items.filter(i => i.lineKey !== lineKey);
    } else {
      item.qty = qty;
    }
    _save(data);
  }

  function remove(lineKey) {
    const data = _load();
    data.items = data.items.filter(i => i.lineKey !== lineKey);
    _save(data);
  }

  function clear() {
    _save({ v: 1, items: [], updatedAt: Date.now() });
  }

  return { items, count, subtotal, add, setQty, remove, clear };
})();
