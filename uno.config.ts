import { defineConfig, presetIcons, presetWind, UserConfig } from 'unocss'

export const themeColors = {
  transparent: 'transparent',
  divide: '#E8EBF2',
  white: '#ffffff',
  primary: '#FF651E',
  primary2: '#FFA801',
  primary3: '#FFD98C',
  primary4: '#FFEFD2',
  red: '#FC5A5A',
  red4: '#ffdbdb',
  green: '#3DD598',
  green4: '#cdf8c9',
  blue4: '#c8e6ff',
  text1: '#242F57',
  text2: '#97A0C3',
}

const config = {
  presets: [presetWind(), presetIcons()],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      },
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { background: theme.colors[c] }
      },
    ],
    [
      /^border-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { 'border-color': theme.colors[c] }
      },
    ],
  ],
  theme: {
    colors: themeColors,
    backgroundColor: {
      ...themeColors,
    },
    borderColor: {
      ...themeColors,
    },
    borderRadius: {
      DEFAULT: '10px',
      sm: '4px',
      full: '999999px',
    },
  },
}

export default defineConfig(config as any) as UserConfig<(typeof config)['theme']>
