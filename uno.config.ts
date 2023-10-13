import { defineConfig, presetIcons, presetUno, presetWind, UserConfig } from 'unocss'

import { presetShadcn } from './preset.shadcn'

const config = {
  presets: [presetUno(), presetWind(), presetIcons(), presetShadcn()],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
  rules: [],
  preflights: [
    {
      getCSS: () => ``,
    },
  ],
  theme: {
    colors: {
      border: 'hsla(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      brand: {
        DEFAULT: 'hsl(var(--brand))',
        foreground: 'hsl(var(--brand-foreground))',
      },
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
      bg1: 'var(--bg-1)',
      bg2: 'var(--bg-2)',
      bg3: 'var(--bg-3)',
      bg4: 'var(--bg-4)',
      fg1: 'var(--fg-1)',
      fg2: 'var(--fg-2)',
      fg3: 'var(--fg-3)',
      fg4: 'var(--fg-4)',

      button: 'var(--bg-button)',
      'button-h': 'var(--bg-button-h)',

      yellow: 'var(--yellow)',
      red: 'var(--red)',
      gray: 'var(--gray)',
      blue: 'var(--blue)',
      green: 'var(--green)',
      transparent: 'transparent',
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: 'calc(var(--radius) - 4px)',
    },
  },
}

export default defineConfig(config) as UserConfig<(typeof config)['theme']>
