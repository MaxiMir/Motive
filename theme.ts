import { CSSProperties } from 'react'
import { PaletteMode, ThemeOptions } from '@mui/material'

// Override Mui theme typings to include the new theme property
declare module '@mui/material/styles' {
  interface CustomText {
    white: CSSProperties['color']
    silent: CSSProperties['color']
    sand: CSSProperties['color']
    wave: CSSProperties['color']
  }

  interface CustomBlock {
    menu: CSSProperties['color']
  }

  interface CustomCharacteristic {
    motivation: CustomCharacteristicValue
    support: CustomCharacteristicValue
    creativity: CustomCharacteristicValue
    completed: CustomCharacteristicValue
    followers: CustomCharacteristicValue
    abandoned: CustomCharacteristicValue
    members: CustomCharacteristicValue
  }

  interface CustomCharacteristicValue {
    light: CSSProperties['color']
    main: CSSProperties['color']
    dark: CSSProperties['color']
  }

  interface Theme {
    text: CustomText
    block: CustomBlock
    characteristic: CustomCharacteristic
  }

  interface ThemeOptions {
    text: CustomText
    block: CustomBlock
    characteristic: CustomCharacteristic
  }
}

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  return {
    text: {
      white: '#F5F5F7',
      silent: '#99989D',
      sand: '#ad998b',
      wave: '#85dfff',
    },
    block: {
      menu: mode === 'dark' ? '#121212' : '#d7d7d7',
    },
    characteristic: {
      motivation: {
        light: '#FFE0B2',
        main: '#FF9800', // шрифт
        dark: '#f57c00',
      },
      support: {
        light: '#B3E5FC',
        main: '#03A9F4', // шрифт
        dark: '#03A9F4',
      },
      creativity: {
        light: '#D1C4E9',
        main: '#BE9AFF', // шрифт
        dark: '#673AB7',
      },
      completed: {
        light: '#BDB5B5',
        main: '#78C77B',
        dark: '#1D1D1F',
      },
      followers: {
        light: '',
        main: '#f2d900',
        dark: '',
      },
      abandoned: {
        light: '',
        main: '#AEABAE',
        dark: '',
      },
      members: {
        light: '',
        main: '#EF8277',
        dark: '',
      },
    },
    palette: {
      mode,
      ...(mode === 'dark' &&
        {
          // text: {
          //   // primary: '#F5F5F7',
          //   // disabled: '#BDB5B5',
          // },
        }),
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: '3rem',
            lineHeight: '3.5rem',
            maxWidthSm: {
              fontSize: '2.5rem',
              lineHeight: '3rem',
            },
          },
          h2: {
            fontSize: '3.75rem',
            lineHeight: 1.2,
          },
          subtitle1: {
            fontSize: '1rem',
            lineHeight: 1.75,
          },
          h4: {
            fontSize: '2.125rem',
            lineHeight: 1.235,
          },
          h5: {
            fontWeight: 'bold',
            fontSize: '1.5rem',
            lineHeight: 1.334,
          },
          h6: {
            fontSize: '1.15rem',
            lineHeight: 1.6,
          },
          caption: {
            fontSize: '0.75rem',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          standardSuccess: {
            backgroundColor: '#37474f',
          },
          action: {
            padding: '0 0 0 16px',
          },
          icon: {
            display: 'flex',
            alignItems: 'center',
            animation: 'fadeWithBlur 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53) both',
            '@keyframes fadeWithBlur': {
              '0%': {
                filter: 'blur(12px)',
                opacity: 0,
              },
              '100%': {
                filter: 'blur(0px)',
                opacity: 1,
              },
            },
          },
          root: {
            lineHeight: '21px',
            '@media (max-width:365px)': {
              fontSize: '0.85rem',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            border: '1px solid #F5F5F7',
            borderRadius: 10,
            margin: 16,
            width: 'calc(100% - 16px)',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            background: '#121212',
          },
          body: {
            margin: 0,
            padding: 0,
            minHeight: '100vh',
            background: '#121212',
          },
          '@supports not (-moz-appearance:none)': {
            body: {
              background: 'linear-gradient(#19191A, #0A0A0A 60%)',
            },
          },
        },
      },
    },
  }
}
