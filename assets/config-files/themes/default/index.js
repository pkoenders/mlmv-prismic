export const defaultTheme = {
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  borderWidth: {
    default: '1px',
    0: '0',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  boxShadow: {
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    none: 'none',
  },

  colors: {
    alert: {
      l1: {
        default: '#5FAF77',
        1100: '#559d6b',
        1200: '#4c8c5f',
        1300: '#427a53',
      },
      l2: {
        default: '#A3B951',
        1100: '#92a648',
        1200: '#829440',
        1300: '#728138',
      },
      l3: {
        default: '#F6C243',
        1100: '#ddae3c',
        1200: '#c49b35',
        1300: '#ac872e',
      },
      l4: {
        default: '#E88D3E',
        1100: '#d07e37',
        1200: '#b97031',
        1300: '#a2622b',
      },
      l5: {
        default: '#D95B4B',
        1100: '#c35143',
        1200: '#ad483c',
        1300: '#973f34',
      },
    },

    card: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },

    footer: {
      default: '#eeeeee',
      text: {
        default: '#eeeeee',
      },
      bground: {
        default: '#091b38',
        100: '#E6E8EB',
        200: '#E6E8EB',
        300: '#B5BAC3',
        400: '#9CA3AF',
        500: '#848D9B',
        600: '#6B7687',
        700: '#525F73',
        800: '#3A485F',
        900: '#21314B',
      },
    },

    header: {
      default: '#eeeeee',
      text: {
        default: '#eeeeee',
      },
      bground: {
        default: '#091b38',
        100: '#E6E8EB',
        200: '#E6E8EB',
        300: '#B5BAC3',
        400: '#9CA3AF',
        500: '#848D9B',
        600: '#6B7687',
        700: '#525F73',
        800: '#3A485F',
        900: '#21314B',
      },
    },

    primary: {
      default: '#51b5e0',
      100: '#EDF7FB',
      200: '#DCF0F8',
      300: '#CAE8F5',
      400: '#B9E1F2',
      500: '#A8DAEF',
      600: '#96D2EC',
      700: '#85CBE9',
      800: '#73C3E6',
      900: '#62BCE3',
      1100: '#48A2C9',
      1200: '#4090B3',
      1300: '#387E9C',
    },

    secondary: {
      default: '#e07c51',
      100: '#fbf1ed',
      200: '#f8e4dc',
      300: '#f5d7ca',
      400: '#f2cab9',
      500: '#f2cab9',
      600: '#efbda8',
      700: '#ecb096',
      800: '#e9a385',
      900: '#e69673',
      1100: '#c96f48',
      1200: '#b36340',
      1300: '#9c5638',
    },

    // Usually a invert of the header bground colors
    tertiary: {
      default: '#CEE007',
      100: '#FAFBE6',
      200: '#F5F8CD',
      300: '#F0F5B4',
      400: '#EBF29B',
      500: '#E6EF83',
      600: '#E1EC6A',
      700: '#DCE951',
      800: '#D7E638',
      900: '#D2E31F',
      1100: '#B9C906',
      1200: '#A4B305',
      1300: '#909C04',
    },

    error: '#ff6347',

    textColor: '#2d3748',

    page: {
      default: '#151a1e',
      100: '#e7e8e8',
      200: '#d0d1d2',
      300: '#b8babb',
      400: '#a1a3a5',
      500: '#8a8c8e',
      600: '#727578',
      700: '#5b5e61',
      800: '#43474a',
      900: '#2c3034',
      1100: '#12171b',
      1200: '#101418',
      1300: '#0e1215',

      bground: {
        default: '#ffffff',
      },
    },

    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    grey: {
      default: '#1a202c',
      100: '#e8e8e9',
      200: '#d1d2d4',
      300: '#babcbf',
      400: '#a3a5aa',
      500: '#8c8f95',
      600: '#757980',
      700: '#5e626b',
      800: '#474c56',
      900: '#303641',
      1100: '#171C27',
      1200: '#141923',
      1300: '#12161E',
    },
  },

  font: {
    sans: 'Roboto, sans-serif',
    slab: 'Rokkitt, serif',
    mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    serif: '"Bodoni Moda", serif',
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },

  fontWeight: {
    hairline: '100',
    thin: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  header: {
    height: '60px',
  },

  inset: {
    0: '0',
    auto: 'auto',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  listStyleType: {
    none: 'none',
    disc: 'disc',
    decimal: 'decimal',
  },

  objectPosition: {
    bottom: 'bottom',
    center: 'center',
    left: 'left',
    'left-bottom': 'left bottom',
    'left-top': 'left top',
    right: 'right',
    'right-bottom': 'right bottom',
    'right-top': 'right top',
    top: 'top',
  },

  opacity: {
    0: '0',
    25: '0.25',
    50: '0.5',
    75: '0.75',
    100: '1',
  },

  margin: {
    default: '32px',
    '1/2': '16px',
    '1/4': '8px',
    '1/8': '4px',
    '1/16': '2px',
    '1xl': '40px',
    '2xl': '48px',
    '3xl': '56px',
    '4xl': '64px',
  },

  padding: {
    default: '32px',
    '1/2': '16px',
    '1/4': '8px',
    '1/8': '4px',
    '1/16': '2px',
    '1xl': '40px',
    '2xl': '48px',
    '3xl': '56px',
    '4xl': '64px',
  },

  screens: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px', // 1280px ?
    xl: '1366px',
    xxl: '1680px',
    full: '100%',
  },

  height: (theme) => ({
    auto: 'auto',
    ...theme('spacing'),
    full: '100%',
    screen: '100vh',
  }),

  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },

  transition: {
    easeOut: {
      default: 'all 0.15s ease-out',
      quick: 'all 0.05s ease-out',
      slow: 'all 0.25s ease-out',
      lazy: 'all 0.5s ease-out',
      xtraLazy: 'all 0.25s ease-out',
    },
    easeIn: {
      default: 'all 0.15s ease-in',
      quick: 'all 0.05s ease-in',
      slow: 'all 0.25s ease-in',
      lazy: 'all 0.5s ease-in',
      xtraLazy: 'all 0.25s ease-in',
    },
    linear: {
      default: 'all 0.15s linear',
      quick: 'all 0.05s linear',
      slow: 'all 0.25s linear',
      lazy: 'all 0.5s linear',
      xtraLazy: 'all 0.25s linear',
    },
  },

  cursor: {
    auto: 'auto',
    default: 'default',
    pointer: 'pointer',
    wait: 'wait',
    text: 'text',
    move: 'move',
    'not-allowed': 'not-allowed',
  },
}