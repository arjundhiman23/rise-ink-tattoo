# Level One — Mumbai's Premier Multi-Sport Arena

Website for **Level One**, India's first 24x7 neon glow-in-the-dark pickleball arena, located in Marol, Andheri East, Mumbai.

## Features
- Full landing page with image gallery (real venue photos)
- Live slot booking flow → WhatsApp confirmation
- Sports & pricing section
- Real Google Maps reviews
- Embedded Google Maps location
- Mobile responsive
- Floating WhatsApp CTA

## Tech Stack
- React 18 + Vite
- Pure CSS (no UI framework)
- All images embedded as base64 (no external hosting needed)

---

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Build

```bash
npm run build
```

Output goes to `./dist`

---

## Deploy on Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your GitHub repo
4. Render auto-detects `render.yaml` — just click **Deploy**

Settings (auto-filled from render.yaml):
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

Your site will be live at `https://level-one-mumbai.onrender.com` (or your custom domain).

### Custom Domain (optional)
In Render dashboard → Settings → Custom Domains → add `levelonemumbai.in` or whatever domain you buy.

---

## Contact
**Level One**  
1st Floor, Mineral Process Equipment Building  
Makwana Road, opposite Vasant Oasis  
Marol, Andheri East, Mumbai – 400059  
📞 +91 98337 77688
