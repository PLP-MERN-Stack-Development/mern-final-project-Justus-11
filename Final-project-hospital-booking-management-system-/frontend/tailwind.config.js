/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    colors: {
      primary: '#3b82f6',   // Main brand color
      secondary: '#2563eb', // Slightly darker blue
      accent: '#60a5fa',    // Lighter accent
      background: '#f9fafb', // App background
      white: '#ffffff',
      black: '#000000',
      gray: {
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },

    fontFamily: {
      sans: ['Inter', 'Poppins', 'sans-serif'],
    },

    boxShadow: {
      soft: '0 4px 12px rgba(0, 0, 0, 0.08)',
      deep: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },

    gridTemplateColumns: {
      auto: 'repeat(auto-fill, minmax(200px, 1fr))',
    },

    borderRadius: {
      xl: '1rem',
      '2xl': '1.5rem',
    },
  },

  plugins: {
    forms: true,
    typography: true,
    'line-clamp': true,
  },
};

