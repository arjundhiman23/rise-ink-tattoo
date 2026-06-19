const CONFIG = {
  WHATSAPP_NUMBER: '917715086978',
  SALON_PHONE: '+91 77150 86978',
  SALON_NAME: 'PS Vogue Salon & Academy',
  SALON_ADDRESS: 'G-1, Fortune The Shopping Island, Near Galaxy Circle, Pal Adajan, Surat, Gujarat 394510',
  SALON_HOURS: 'Mon–Sat: 10 AM – 8 PM | Sun: 11 AM – 7 PM',
  INSTAGRAM_MAIN: 'https://www.instagram.com/psvoguesalonacademy_surat/',
  INSTAGRAM_NAILS: 'https://www.instagram.com/psvogue_nails/',
  INSTAGRAM_MAKEUP: 'https://www.instagram.com/psmakeupstudio_surat/',
  CURRENCY: '₹',
  CURRENCY_CODE: 'INR',
  FREE_DELIVERY_ABOVE: 1499,
  CART_KEY: 'psv_cart_v1',
};

function formatINR(amount) {
  return CONFIG.CURRENCY + amount.toLocaleString('en-IN');
}

function whatsappURL(message) {
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
