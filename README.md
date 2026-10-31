# Yasar - Interactive 3D Smartphone Portfolio

A single-page personal portfolio website designed as an interactive 3D smartphone with 60-120fps physics-driven orbit controls (inspired by `prsd.dev`), high-contrast monochrome and secondary accent app icons, custom Bento widgets, an interactive 137-LED Glyph Matrix backplate, and fluid spatial app launch animations. On mobile viewports, the interface automatically adapts to a full-screen mobile OS experience.

Engineered with **React 18**, **Vite**, **Framer Motion**, and **Tailwind CSS**. All icons are rendered as custom 2px-stroke inline SVGs. Zero external image assets, zero emojis, zero prohibited brand names.

---

## About Yasar

- **Name:** Yasar
- **Role:** Data analyst and builder, third-year B.Tech Artificial Intelligence and Data Science student
- **Core Skills:** Python, SQL, HTML, Tailwind CSS, JavaScript, React
- **Geospatial & Telemetry:** NASA FIRMS (Fire Information for Resource Management System), OpenStreetMap
- **Real-World Work:**
  - **Zenny Studios:** Production responsive client site.
  - **SIH26162:** Thermal anomaly classifier prototype analyzing NASA FIRMS active fire sensor feeds and OpenStreetMap land-use geometries.

---

## Architecture & Technical Highlights

### 1. 3D Smartphone Hardware Chassis
- **Solid Unibody Metal Extrusion:** 17 continuous micro-slices spaced across the Z-axis creating a seamless 48px rounded corner unibody without polygon clipping.
- **Diamond-Cut CNC Chamfers:** Specular bevel edges (`inset 0 1px 0 rgba(255,255,255,0.85)`) replicating precision-milled aerospace aluminum.
- **Hardware Rail Triggers:**
  - **Left Rail:** Volume Up, Volume Down, and the dedicated **Essential Key** (with tactile shutter flash and haptic audio).
  - **Right Rail:** Tactile Power button (locks and wakes device).
  - **Top Rail:** Noise-cancelling microphone hole and antenna lines.
  - **Bottom Rail:** Center USB-C port with internal gold contacts, CNC speaker vents, primary microphone, and SIM tray with ejection pinhole.
- **Dual-Zone Rear Face:**
  - **Upper Transparent Crystal Deck:** Showcases 3-camera system (large 50MP primary circular lens with concentric CD-milled bezel and sapphire anti-reflective multi-coating, dual-camera horizontal pill), 137 mini-LED circular Glyph Matrix running live audio equalizer wave patterns, and red status square.
  - **Lower Satin Plate:** Bead-blasted anodized aluminum housing with debossed dial accent and precision industrial markings.

### 2. Motion Engine & Zero-Latency Performance
- **Spatial App Launch Animations:** Powered by Framer Motion springs (`stiffness: 380, damping: 28`). Tapping an icon triggers an instantaneous coordinate-based expansion into full screen.
- **Zero Latency 60-120 FPS Loop:** Hardware-accelerated CSS `transform: translate3d` with linear interpolation (`lerp`) damping and inertia orbit dragging.
- **Web Audio Haptic Synthesizer:** Procedural dual-impulse mechanical clicks and shutter sounds synthesized directly in-browser using Web Audio API (zero audio files to download).

### 3. Interactive Micro-Apps
- **Case Studies App:** Interactive SIH26162 sensor confidence threshold simulator allowing visitors to dynamically adjust confidence levels and observe real-time simulated false-positive suppression and detection latency.
- **Developer Terminal CLI:** Interactive command prompt (`yasar@portfolio:~$`) supporting `help`, `skills`, `projects`, `telemetry`, `about`, `contact`, and `clear`.
- **Settings App:** Live wallpaper switcher (Warm Copper, Deep Obsidian, Midnight, Frosted Silver), Web Audio toggle, and Glyph pattern selector.
- **GitHub App:** Heatmap activity matrix with language breakdown and repository showcase.
- **Projects & Simple Apps:** Categorized project gallery (Zenny Studios, SIH26162), Skills, Experience, Resume, Contact, and Dashboards.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Deployment Instructions

### Cloudflare Pages
1. Push this repository to GitHub: `https://github.com/Yasar-17/Yasar.git`
2. In Cloudflare Dashboard, navigate to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select the `Yasar-17/Yasar` repository.
4. Set the build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Cloudflare Pages will build and deploy the portfolio live on `*.pages.dev`.

### Vercel
1. In Vercel Dashboard, import `Yasar-17/Yasar`.
2. Vercel automatically detects `vite` via `vercel.json` and configures `dist` as the output directory.
3. Click **Deploy**.
