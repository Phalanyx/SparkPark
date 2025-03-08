/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      textColor :{
        skin: {
          'main': 'var(--color-text-base)',
          'sub': 'var(--color-text-sub)'
        }
      },
      backgroundColor: {
        skin: {
          'back':'var(--color-background)',
          'fore': 'var(--color-foreground)',
          'highlight':'var(--color-highlight)'
        }
      },
      borderColor: {
        skin: {
          'main': 'var(--color-text-base)',
          'sub': 'var(--color-text-sub)'
        }
      },
      accentColor: {
        skin: {
          'back': 'var(--color-background)',
        }
      },
    },
  },
  plugins: [],
}