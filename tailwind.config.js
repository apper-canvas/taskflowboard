/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFEDFF',
          100: '#E3DFFF',
          500: '#5B4EF5',
          600: '#4C3FE0',
          700: '#3D30CB',
        },
        secondary: {
          50: '#F0EFFF',
          100: '#E3E0FF',
          500: '#8B80F9',
          600: '#7C70F8',
        },
        accent: {
          50: '#FFF0F0',
          100: '#FFE0E0',
          500: '#FF6B6B',
          600: '#FF5252',
          700: '#F44336',
        },
        success: {
          50: '#E8FFFE',
          100: '#D1FFFC',
          500: '#4ECDC4',
          600: '#26A69A',
        },
        warning: {
          50: '#FFFDE7',
          100: '#FFF9C4',
          500: '#FFD93D',
          600: '#FBC02D',
        },
        info: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#4DABF7',
          600: '#2196F3',
        },
        surface: '#FFFFFF',
        background: '#F8F9FB',
        neutral: {
          50: '#F8F9FB',
          100: '#F1F3F4',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#BDC1C6',
          500: '#9AA0A6',
          600: '#80868B',
          700: '#5F6368',
          800: '#3C4043',
          900: '#202124',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-gentle': 'pulse 2s ease-in-out infinite',
        'bounce-gentle': 'bounce 1s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(91, 78, 245, 0.3)',
      },
    },
  },
  plugins: [],
}