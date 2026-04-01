import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        capy: {
          cream:      '#FFF8F0',
          warm:       '#F5E6D3',
          peach:      '#EDD5BA',
          brown:      '#7C4A2D',
          'brown-light': '#A0643D',
          terracotta: '#C4623A',
          'terra-light': '#E8855E',
          'terra-pale': '#F5CEBC',
          sage:       '#7A9E7E',
          'sage-light': '#A8C5AC',
          'sage-pale':  '#D8EDD8',
          dark:       '#2D1810',
          muted:      '#9B7B6B',
          border:     '#E8D0B8',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-nunito)',   'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'slide-in': 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in':  'fadeIn 0.2s ease-out',
        'float':    'float 3s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
