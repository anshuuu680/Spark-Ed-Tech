/** @type {import('tailwindcss').Config} */
export default  {
  darkMode: 'class', // Enables dark mode with 'class'
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "", // Optional prefix for class names
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      // Animations and Keyframes
      keyframes: {
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // Colors for Light and Dark Modes
      colors: {
        // Light Mode Colors
        border: "hsl(210, 16%, 82%)",
        input: "hsl(0, 0%, 100%)",
        ring: "hsl(210, 16%, 82%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(210, 22%, 24%)",
        primary: { DEFAULT: "hsl(220, 98%, 61%)", foreground: "hsl(0, 0%, 100%)" },
        secondary: { DEFAULT: "hsl(340, 82%, 52%)", foreground: "hsl(0, 0%, 100%)" },
        destructive: { DEFAULT: "hsl(0, 78%, 62%)", foreground: "hsl(0, 0%, 100%)" },
        muted: { DEFAULT: "hsl(210, 16%, 82%)", foreground: "hsl(210, 22%, 24%)" },
        accent: { DEFAULT: "hsl(40, 100%, 70%)", foreground: "hsl(0, 0%, 100%)" },
        popover: { DEFAULT: "hsl(0, 0%, 100%)", foreground: "hsl(210, 22%, 24%)" },
        card: { DEFAULT: "hsl(0, 0%, 100%)", foreground: "hsl(210, 22%, 24%)" },

        // Dark Mode Colors
        "dark-border": "#292E35",
        "dark-input": "hsl(0, 0%, 20%)",
        "dark-ring": "hsl(0, 0%, 15%)",
        "dark-background": "#0D1117", 
        "dark-inside-card": "#252B38",
        "dark-foreground": "hsl(0, 0%, 90%)",
        "dark-primary": { DEFAULT: "hsl(220, 100%, 61%)", foreground: "hsl(0, 0%, 100%)" },
        "dark-secondary": { DEFAULT: "hsl(340, 82%, 52%)", foreground: "hsl(0, 0%, 100%)" },
        "dark-destructive": { DEFAULT: "hsl(0, 78%, 62%)", foreground: "hsl(0, 0%, 100%)" },
        "dark-muted": { DEFAULT: "hsl(0, 0%, 30%)", foreground: "hsl(0, 0%, 80%)" },
        "dark-accent": { DEFAULT: "hsl(40, 100%, 60%)", foreground: "hsl(0, 0%, 100%)" },
        "dark-popover": { DEFAULT: "hsl(0, 0%, 15%)", foreground: "hsl(0, 0%, 90%)" },
        "dark-card": { DEFAULT: "#161B22", foreground: "hsl(0, 0%, 90%)" },
      },
      // Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
