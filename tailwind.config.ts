import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0C0A1D',
        steel: '#1F1D2F',
        clay: '#36344B',
        smokey: '#6F6D8A',
        lavender: '#8682B1',
      },
      fontSize: {
        'display-large': ['64px', { lineHeight: '72px' }],
        'display-medium': ['48px', { lineHeight: '64px' }],
        'display-small': ['40px', { lineHeight: '48px' }],
        'title-large': ['32px', { lineHeight: '40px' }],
        'title-medium': ['28px', { lineHeight: '36px' }],
        'title-small': ['24px', { lineHeight: '32px' }],
        'body-large': ['24px', { lineHeight: '32px' }],
        'body-medium': ['20px', { lineHeight: '28px' }],
        'body-small': ['16px', { lineHeight: '24px' }],
        'caption-large': ['14px', { lineHeight: '20px' }],
        'caption-medium': ['12px', { lineHeight: '16px' }],
        'caption-small': ['10px', { lineHeight: '12px' }],
      },
      transitionTimingFunction: {
        snap: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

export default config
