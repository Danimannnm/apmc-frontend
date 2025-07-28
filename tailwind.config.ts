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
          600: '#046A38',
          700: '#035530',
        },
        'saffron': '#F4C95D',
        'maroon': '#8B0000',
        'indigo': {
          600: '#264653',
          700: '#1e3940',
        },
        'ivory': '#F8F6F0',
        'charcoal': '#222222',
        'charcoal-light': '#333333',
        'burnt-orange': '#E07A5F',
        'mint': '#B1E7D6',
        'page-bg': '#FFFFFF',
        'card-bg': '#F8F6F0',
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
