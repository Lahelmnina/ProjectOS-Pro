/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030303',
        glass: 'rgba(15, 15, 25, 0.6)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        cyber: {
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          orange: '#F97316',
          green: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.7))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
