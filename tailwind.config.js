/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0B0F14',
        card: '#151B23',
        chip: '#1F2933',
        border: '#1B222B',
        accent: {
          mint: '#7CF2C9',
          amber: '#FFB86B',
          blue: '#8AB4FF',
          pink: '#F4A0C0',
          lavender: '#C9B8FF',
          red: '#D71921',
        },
        text: {
          primary: '#E8EDF2',
          muted: '#9AA6B2',
          soft: '#C5CED8',
        },
        metal: {
          light: '#f5f8fb',
          base: '#d4dbe3',
          dark: '#8a94a0',
          deep: '#1d232b',
        }
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace', 'sans-serif'],
        dot: ['"DotGothic16"', 'monospace', 'sans-serif'],
      },
      borderRadius: {
        'phone': '48px',
        'phone-inner': '40px',
        'card-custom': '24px',
        'icon-custom': '18px',
      },
      boxShadow: {
        'metal-bevel': 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.25)',
        'metal-rail': 'inset 1px 0 0 rgba(255,255,255,0.6), inset -1px 0 0 rgba(0,0,0,0.3)',
        'lens-depth': 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(255,255,255,0.2)',
        'glyph-glow': '0 0 8px rgba(255,255,255,0.85), 0 0 16px rgba(255,255,255,0.35)',
      }
    },
  },
  plugins: [],
};

