const CATEGORIES = [
  { id: 'all',       label: 'All' },
  { id: 'press-on',  label: 'Press-On Sets' },
  { id: 'glitter',   label: 'Glitter & Chrome' },
  { id: 'bridal',    label: 'Bridal & Occasion' },
  { id: 'pastel',    label: 'Pastel & Minimal' },
  { id: 'gel',       label: 'Gel Extension' },
];

/* Gradient placeholder images mapped to category for visual variety */
const CAT_COLORS = {
  'press-on': ['#7A1A4C','#C9A24B'],
  'glitter':  ['#3A0E25','#EAD9A8'],
  'bridal':   ['#5A1138','#F4D7D2'],
  'pastel':   ['#E9B6B0','#9B2B63'],
  'gel':      ['#3A0E25','#D9B96B'],
};

function productPlaceholder(id, categoryId, name) {
  const colors = CAT_COLORS[categoryId] || ['#5A1138','#C9A24B'];
  return `assets/img/placeholder.svg`;
}

const PRODUCTS = [
  {
    id: 'psv-001',
    name: 'Champagne Glitter Almond Set',
    category: 'glitter',
    price: 899,
    compareAt: 1199,
    rating: 4.8,
    reviews: 34,
    badge: 'Bestseller',
    featured: true,
    short: 'Reusable press-on set with champagne micro-glitter & chrome tips. Lasts 14+ days.',
    description: 'Our most-loved set features ultra-fine champagne glitter with mirror chrome tips that catch light at every angle. Made with salon-grade acrylic, these press-ons feel and look like fresh salon nails. Reusable up to 3 times with proper care.',
    box: ['10 press-on nails (full size kit)', 'Nail glue (premium bond)', 'Mini file & buffer', 'Cuticle stick', 'Alcohol prep wipe', 'Size guide card'],
    care: 'Apply on clean, oil-free nails. Press firmly for 30 seconds. Avoid prolonged water exposure. Gently peel from the sides to remove and soak in warm water if needed. Clean and store in the box for reuse.',
    images: ['assets/img/gallery/g1.jpg', 'assets/img/gallery/g2.jpg'],
    variants: {
      shape: ['Almond', 'Coffin', 'Square', 'Stiletto'],
      length: ['Short', 'Medium', 'Long'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { shape: 'Almond', length: 'Medium', size: 'M' },
    stock: true
  },
  {
    id: 'psv-002',
    name: 'Blush Ombre Coffin Set',
    category: 'pastel',
    price: 799,
    compareAt: null,
    rating: 4.6,
    reviews: 21,
    badge: 'New',
    featured: true,
    short: 'Dreamy nude-to-blush ombre gradient on a modern coffin shape.',
    description: 'Soft, feminine and effortlessly elegant. This gradient blush ombre set transitions from a barely-there nude at the base to a warm rose blush at the tips. Perfect for everyday wear or romantic occasions.',
    box: ['10 press-on nails', 'Nail glue', 'Mini file', 'Cuticle stick', 'Alcohol wipe'],
    care: 'Apply on clean, oil-free nails. Avoid harsh cleaning chemicals without gloves.',
    images: ['assets/img/gallery/g3.jpg', 'assets/img/gallery/g4.jpg'],
    variants: {
      shape: ['Coffin', 'Almond', 'Square'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { shape: 'Coffin', size: 'M' },
    stock: true
  },
  {
    id: 'psv-003',
    name: 'Bridal Pearl & Lace Set',
    category: 'bridal',
    price: 1299,
    compareAt: 1699,
    rating: 4.9,
    reviews: 18,
    badge: 'Bestseller',
    featured: true,
    short: 'Exquisite bridal set with hand-placed pearl accents and delicate lace detailing.',
    description: 'Designed for the modern bride. Each nail is individually crafted with raised lace patterns and genuine micro-pearls hand-set by our nail artists. A truly luxurious piece for your most special day.',
    box: ['10 bespoke bridal nails', 'Premium nail glue', 'File & buffer kit', 'Cuticle oil', 'Luxury packaging box'],
    care: 'Handle with care around pearls. Remove using warm soak — do not peel forcefully.',
    images: ['assets/img/gallery/g5.jpg', 'assets/img/gallery/g6.jpg'],
    variants: {
      shape: ['Almond', 'Coffin', 'Stiletto'],
      length: ['Medium', 'Long'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { shape: 'Almond', length: 'Long', size: 'M' },
    stock: true
  },
  {
    id: 'psv-004',
    name: 'Chrome Mirror Square Set',
    category: 'glitter',
    price: 749,
    compareAt: null,
    rating: 4.5,
    reviews: 29,
    badge: null,
    featured: false,
    short: 'High-shine chrome mirror finish on clean square tips.',
    description: 'Bold, futuristic, and impossibly glossy. The chrome mirror powder gives these square nails a liquid-metal effect that photographs beautifully. A statement piece for any occasion.',
    box: ['10 press-on nails', 'Nail glue', 'Mini file', 'Alcohol wipe'],
    care: 'Apply carefully to avoid scratching chrome surface during application.',
    images: ['assets/img/gallery/g7.jpg', 'assets/img/gallery/g8.jpg'],
    variants: {
      shape: ['Square', 'Coffin'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { shape: 'Square', size: 'M' },
    stock: true
  },
  {
    id: 'psv-005',
    name: 'French Tip Classic Set',
    category: 'press-on',
    price: 649,
    compareAt: null,
    rating: 4.7,
    reviews: 45,
    badge: null,
    featured: true,
    short: 'Timeless French tips — clean, crisp, and always in style.',
    description: 'The classic French manicure that never goes out of style. Pristine white tips on a sheer natural base, finished with a high-gloss topcoat. Professional salon quality at home.',
    box: ['10 press-on nails', 'Nail glue', 'Mini file', 'Cuticle stick', 'Alcohol wipe'],
    care: 'Keep away from acetone-based products to preserve tip clarity.',
    images: ['assets/img/gallery/g9.jpg', 'assets/img/gallery/g10.jpg'],
    variants: {
      shape: ['Almond', 'Square', 'Coffin', 'Oval'],
      length: ['Short', 'Medium', 'Long'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { shape: 'Almond', length: 'Medium', size: 'M' },
    stock: true
  },
  {
    id: 'psv-006',
    name: 'Sage Green Minimal Set',
    category: 'pastel',
    price: 699,
    compareAt: null,
    rating: 4.4,
    reviews: 12,
    badge: 'New',
    featured: false,
    short: 'Muted sage green in a slim almond shape — the quiet luxury of nail fashion.',
    description: 'Earthy, sophisticated and modern. This dusty sage green set embodies the quiet luxury aesthetic with its muted, nature-inspired tone. Slim almond nails for an elongating effect.',
    box: ['10 press-on nails', 'Nail glue', 'Mini file', 'Alcohol wipe'],
    care: 'Avoid dark colored fabrics while glue is setting.',
    images: ['assets/img/gallery/g11.jpg', 'assets/img/gallery/g12.jpg'],
    variants: {
      shape: ['Almond', 'Oval'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { shape: 'Almond', size: 'M' },
    stock: true
  },
  {
    id: 'psv-007',
    name: 'Red Velvet Stiletto Set',
    category: 'gel',
    price: 999,
    compareAt: 1299,
    rating: 4.8,
    reviews: 22,
    badge: 'Hot',
    featured: false,
    short: 'Deep, rich red velvet finish on dramatic stiletto tips.',
    description: 'For the bold and confident. Deep crimson velvet texture on sharply pointed stiletto nails that command attention. Inspired by old-Bollywood glamour reimagined for the modern woman.',
    box: ['10 gel extension nails', 'Premium adhesive tabs + nail glue', 'File & buffer', 'Cuticle oil'],
    care: 'Gel extensions require professional removal — we recommend booking a removal appointment.',
    images: ['assets/img/gallery/g1.jpg', 'assets/img/gallery/g3.jpg'],
    variants: {
      length: ['Medium', 'Long', 'Extra Long'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { length: 'Long', size: 'M' },
    stock: true
  },
  {
    id: 'psv-008',
    name: 'Pastel Rainbow Set',
    category: 'pastel',
    price: 849,
    compareAt: null,
    rating: 4.6,
    reviews: 16,
    badge: null,
    featured: false,
    short: 'Five soft pastel shades — each nail a different colour.',
    description: 'A cheerful riot of soft pastels: lavender, mint, baby blue, peach, and buttercream yellow. Wear all five or mix and match however you like. Perfect for summer or a mood-lifting mani.',
    box: ['10 press-on nails (5 pastel shades × 2)', 'Nail glue', 'Mini file', 'Alcohol wipe'],
    care: 'Standard press-on care applies.',
    images: ['assets/img/gallery/g4.jpg', 'assets/img/gallery/g5.jpg'],
    variants: {
      shape: ['Almond', 'Round', 'Square'],
      size: ['XS', 'S', 'M', 'L']
    },
    defaultVariant: { shape: 'Almond', size: 'M' },
    stock: true
  },
];

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function getByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === categoryId);
}

function getFeatured() {
  return PRODUCTS.filter(p => p.featured);
}

function getRelated(product, count = 4) {
  return PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}
