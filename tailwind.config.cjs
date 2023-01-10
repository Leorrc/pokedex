/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins, sans-serif'
      },
      fontSize: {
        dina: 'clamp(8px, 5vw, 25px)',
        dina2: 'clamp(8px, 5vw, 1rem)'
      },
      boxShadow: {
        shado: '-3px 4px 0 #888, -5px 7px 0 #333',
        shado2: '-2px 3px 0 #222, -4px 6px 0 #000',
        shado3: 'inset -4px 4px 0 #222'
      }
    }
  },
  plugins: []
}
