import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'emerald': {
          600: 'var(--accent-green)',
          700: '#035530',
          100: '#D1FAE5', // Light green for better visibility
        },
        'saffron': 'var(--secondary-saffron)',
        'saffron-shades': {
          600: 'var(--secondary-saffron)',
          500: 'var(--secondary-saffron)',
        },
        'saffron-text': 'var(--secondary-saffron)',
        'maroon': 'var(--accent-maroon)',
        'indigo': {
          600: 'var(--accent-indigo)',
          700: '#1e3940',
        },
        'ivory': '#F8F6F0',
        'charcoal': 'var(--text-primary)',
        'charcoal-light': 'var(--text-secondary)',
        'burnt-orange': 'var(--highlight-orange)',
        'mint': 'var(--accent-mint)',
        'page-bg': 'var(--bg-page)',
        'card-bg': 'var(--bg-card)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #046A38 0%, #264653 100%)',
        'pattern-main': "url('/patterns/main-pattern.svg')",
        'pattern-sidebar': "url('/patterns/sidebar-pattern.svg')",
      },
      backgroundSize: {
        'pattern': '400px 400px',
        'pattern-small': '100px 100px',
      },
      opacity: {
        '1': '0.01',
        '2': '0.02',
        '3': '0.03',
        '4': '0.04',
        '5': '0.05',
        '6': '0.06',
        '12': '0.12',
        '15': '0.15',
      },
    },
  },
  plugins: [],
}
export default config
