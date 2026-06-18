/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          dark: '#050A07',
          darker: '#020504',
          card: '#0C1410',
          surface: '#111A14',
          border: 'rgba(74,222,128,0.12)',
          green: '#4ADE80',
          'green-dark': '#16A34A',
          'green-light': '#86EFAC',
          teal: '#2DD4BF',
          lime: '#A3E635',
          blue: '#60A5FA',
          amber: '#FCD34D',
          coral: '#F87171',
          purple: '#A78BFA',
          text: '#E2F0E8',
          muted: '#5A7A63',
          'muted-light': '#8FA897',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'eco-gradient': 'linear-gradient(135deg, #4ADE80 0%, #2DD4BF 100%)',
        'eco-gradient-subtle': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,222,128,0.06) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(74,222,128,0.03) 0%, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'count-up': 'countUp 2s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(74,222,128,0.2)' },
          to: { boxShadow: '0 0 40px rgba(74,222,128,0.5)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        countUp: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'eco': '0 0 0 1px rgba(74,222,128,0.15), 0 4px 30px rgba(74,222,128,0.08)',
        'eco-lg': '0 0 0 1px rgba(74,222,128,0.2), 0 8px 50px rgba(74,222,128,0.15)',
        'card': '0 1px 0 rgba(255,255,255,0.04), 0 0 0 0.5px rgba(255,255,255,0.06)',
        'inner-eco': 'inset 0 1px 0 rgba(74,222,128,0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
