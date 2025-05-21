import type { Config } from "tailwindcss";

export default {
	darkMode: ['class', '.dark'], // Here, `.dark` is the class that will trigger dark mode
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			'xxs': '380px',
  			'xs': '440px'
  		},
  		fontFamily: {
  			'lexend': ["var(--font-lexend)"]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
			'float-in-right': {
				'0%': { transform: 'translateX(-10%)', opacity: '0' },
				'100%': { transform: 'translateX(0)', opacity: '1' },
			},
			'float-out-left': {
				'0%': { transform: 'translateX(0)', opacity: '1' },
				'100%': { transform: 'translateX(-10%)', opacity: '0' },
			},
			'diagonal': {
				"0%, 100%": { transform: "translate(0, 0)" },
				"50%": { transform: "translate(50px, -50px)" },
			  },
			  'zigzag': {
				"0%, 100%": { transform: "translateX(0)" },
				"25%": { transform: "translateX(20px) translateY(-20px)" },
				"50%": { transform: "translateX(-20px) translateY(20px)" },
				"75%": { transform: "translateX(20px) translateY(-20px)" },
			  },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			'float-in-right': 'float-in-right 1s ease-in-out 0.3s forwards',
			'float-out-left': 'float-out-left 1s ease-in-out 0.3s forwards',
			'diagonal': "diagonal 6s ease-in-out infinite",
			'zigzag': "zigzag 8s ease-in-out infinite",
			'bounce-slow': "bounce 5s infinite",
			'spin-slow': "spin 10s linear infinite",
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
