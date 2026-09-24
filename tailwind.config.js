/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F5',
        paper2: '#F3F1EA',
        ink: '#141412',
        'ink-soft': '#3B3A37',
        graywarm: '#6F6C66',
        line: '#E5E1D8',
        seoul: '#1F4E9C',
        'seoul-deep': '#163A73',
        wine: '#8A2E3E',
        sand: '#E9E4D8',
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif KR', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
    },
  },
  plugins: [],
}
