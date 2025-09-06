/** @type { import( 'tailwindcss' ).Config } */

module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'system-bg': '#f5f5f7',
        'system-bg-dark': 'rgb(52, 52, 52)',
        'system-sidebar': 'rgb(220, 220, 200)',
        'system-sidebar-dark': 'rgb(74, 69, 60)',
        'system-border': 'rgb(207, 207, 207)',
        'system-border-dark': 'rgb(90, 90, 90)',
        'system-text': 'rgb(72, 72, 72)',
        'system-text-dark': 'rgb(223, 223, 223)',
        'system-text-secondary': '#86868b',
        'system-blue': '#007aff',
        'system-red': '#ff3b30',
        // Neutral accent for dark mode focus states
        'system-accent-dark': 'rgb(160, 160, 160)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sf: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backdropBlur: {
        system: '20px',
      },
      boxShadow: {
        system: '0 4px 16px rgba(0, 0, 0, 0.1)',
        'system-dark': '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [ require( 'tailwindcss-animate' ) ],  // eslint-disable-line
}
