// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          brand: '#6366F1',
        },
        backgroundImage: {
          hero: "url('/assets/hero-bg.jpg')",
        },
      },
    },
    plugins: [],
  };
  