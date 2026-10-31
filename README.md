# Yasar - Interactive 3D Smartphone Portfolio

A single-page personal portfolio website designed as an interactive 3D smartphone with full rotatability (pitch and yaw orbit physics inspired by `prsd.dev`), custom Bento widgets, circular monochrome app icons, and an interactive Glyph matrix backplate. On mobile screens, the interface automatically adapts to a full-screen experience.

Built entirely using semantic HTML5, Tailwind CSS (via CDN), and vanilla JavaScript. Zero frameworks, zero external runtime dependencies. All icons are drawn inline as stroke SVGs.

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

## Design System & Architecture

- **Smartphone Hardware & 3D Replicate Unibody:**
  - **Chassis:** Slim bead-blasted silver aluminium unibody (7.95mm equivalent depth) with continuous 48px rounded corner extrusion (17 micro-slices spaced across the Z-axis) eliminating corner clipping and forming a solid metallic chassis.
  - **Precision Edge Rails:** Flat matte silver aluminum rails spanning the straight perimeter, antenna break lines, and tactile physical buttons:
    - **Left Rail:** Volume Up, Volume Down, and the dedicated **Essential Key** (with haptic visual feedback and quick launcher).
    - **Right Rail:** Tactile Power button (lock/unlock screen).
    - **Top Rail:** Secondary noise-cancelling microphone pinhole and antenna lines.
    - **Bottom Rail:** Center USB-C port with internal contacts, CNC milled speaker vents, primary microphone pinhole, and SIM tray with ejection pinhole.
  - **Display Glass:** Mathematically concentric OLED display bezel ($R_{inner} = 44\text{px}$, $R_{outer} = 48\text{px}$) with diamond-cut chamfer highlights, top bezel ear-piece speaker slit, and 2.5D optical glass specular sheen.
  - **Interactive 3D Orbit & Rotation (prsd.dev Style):**
    - Drag anywhere on the screen or canvas to freely orbit the phone 360 degrees horizontally (Yaw) and tilt smoothly vertically (Pitch).
    - Silky smooth lerp damping physics loop (60/120fps).
    - Dynamic click-suppression ensures rotating the phone never accidentally launches an app or clicks a button.
    - Double-click anywhere to smoothly reset the phone to the front-facing angle.
    - Ambient cursor tracking parallax tilts the phone subtly as your mouse moves around the screen.
  - **Back Housing:**
    - Transparent nano-moulded camera bump with **3-camera system**: top large 50MP Sony primary circular module and lower dual-camera horizontal pill capsule.
    - Right circular Glyph Matrix display with 137 mini-LEDs running live animated dot-matrix equalizer waveforms.
    - Precision red status square, ambient light sensor, micro-fasteners, and curved LED light strip.
    - Clean satin aluminium lower unibody with tactile debossed dial accent and industrial technical markings (no external brand names).
- **Visual Palette:**
  - Wallpaper: Warm copper, amber, and chocolate organic gradient (`#E57A38` to `#250B05`)
  - Widgets: High-contrast pure white rounded cards (`#FFFFFF`) with dark charcoal icons and typography
  - Accent Red: `#D71921`
  - Internal Cards: `#151B23` with `#1B222B` borders and `#1F2933` chips
  - Primary Text: `#E8EDF2` (soft text `#C5CED8`, muted text `#9AA6B2`)
- **Typography:**
  - Space Grotesk: Geometric sans headings and display titles
  - Inter: Clean readable body copy
  - DotGothic16 / Dot-Matrix: Authentic digital clock and Glyph matrix labeling
- **App Icons:**
  - Dock: 4 pure white circular app icons (`rounded-full`) with dark stroke glyphs (`#111111`).
  - Drawer & Home Grid: All 12 circular monochrome app icons in a clean 4-column grid.
  - 100% inline SVG (24px, 2px stroke, round caps, round joins). Zero emojis.
- **Controls & Help Navigation (Left Side):**
  - Sleek floating **Help button** on the left side of the screen.
  - Clicking Help expands a floating guide panel displaying interaction shortcuts (3D Drag, Reset Angle, Apps, Hardware Buttons, Keyboard Shortcuts).
- **Accessibility:**
  - All touch and click targets are at least 44px.
  - Text contrast exceeds WCAG AA requirements.
  - Full keyboard accessibility: `Escape` closes apps, modals, and resets angle, `Cmd+K` / `Ctrl+K` opens search, and `Tab` navigates elements.
  - Respects `prefers-reduced-motion` media queries.

---

## Screens & Interactions

1. **Lock Screen:**
   - Real-time dot-matrix digital clock and localized date display.
   - Name with signature red indicator and builder role.
   - Three interactive notification cards (Zenny Studios, SIH26162, Case Studies) that open directly to the corresponding study.
   - "Swipe up to unlock" hint.
2. **Home Screen:**
   - **About Me Card:** Dedicated Bento card showing Yasar's builder profile, education, and skills. Tapping opens About.
   - **GitHub Contribution Graph Widget:** 18-column x 7-row interactive activity heatmap grid with sample commits, "[N] contributions in last year" counter, and "sample data" pill badge. Tapping opens the GitHub app.
   - **Status Capsule Pill:** Dot-matrix audio/status bar with red accent dot. Tapping cycles Glyph modes.
   - **Circular Controls:** Accent red circle (ambient light toggle) and white circle with up-arrow (Links).
   - **All 12 Applications Grid:** 4-column grid featuring every app (Projects, Case Studies, Skills, Experience, Resume, Contact, GitHub, Links, Dashboards, Learning, Open Source, About) in circular monochrome style.
   - **Dock:** 4 circular monochrome app icons: All Apps (Drawer), Contact, Resume, GitHub. Bottom search bar removed for a clean, streamlined finish.
3. **Glyph Matrix Back View:**
   - Live animated 11x9 LED dot-matrix equalizer waveform.
   - Interactive: clicking the Glyph display cycles LED animation patterns.
   - Industrial regulatory and model markings.
4. **App Drawer:**
   - Real-time search filter for all 12 apps.
   - "Start here for interviews" quick card.
   - 4-column alphabetical grid of all 12 apps with circular monochrome icons.
5. **Animative App Launch Scenes:**
   - Tapping an app delivers a tactile press animation (`scale(0.94)`).
   - The app screen zooms in from `scale(0.88)` with spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`) and dissipating glass blur.
   - Staggered entrance cascades: the app header slides down from the top, while content cards and lists slide up sequentially (40ms, 80ms delays).
   - Closing an app smoothly scales down and dissolves back into the home screen.
6. **Case Studies App:**
   - 3 tabs: SIH26162, Zenny Studios, [Case title].
   - 3 structured cards per case: Problem, Approach (with tech chips and two sentences), Result (large metric placeholder like [X]% or [N]x).
   - Direct action buttons: "View code on GitHub" and "Home".
7. **Full-Screen In-Phone Apps:**
   - Complete apps with back buttons: About, Projects, Skills, Experience, Resume, Contact, GitHub, Links, Dashboards, Learning, Open Source.
7. **Quick Panel:**
   - Swiping down from the home screen reveals quick tiles: Contact, Resume download, and Book a call.

---

## Deployment Steps

This project is a static single-page application requiring zero build steps or bundlers.

### Deploying to Vercel

#### Option A: Via Vercel Web Dashboard
1. Push your repository to GitHub or GitLab.
2. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Set **Framework Preset** to **Other** (or leave as default).
5. Leave **Root Directory** as `./` and build settings empty.
6. Click **Deploy**.

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally if not already installed
npm install -g vercel

# From the project root directory
vercel
```

---

### Deploying to Cloudflare Pages

#### Option A: Via Cloudflare Dashboard
1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Configure build settings:
   - **Framework preset:** None
   - **Build command:** (leave blank)
   - **Build output directory:** `.` (root directory)
5. Click **Save and Deploy**.

#### Option B: Via Wrangler CLI
```bash
# Deploy directly to Cloudflare Pages
npx wrangler pages deploy . --project-name=yasar-portfolio
```

---

## Local Development & Testing

You can preview the portfolio using any standard local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (npx serve)
npx serve .
```

Open `http://localhost:8000` in your browser.
