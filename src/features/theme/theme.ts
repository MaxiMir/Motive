import { CSSProperties } from 'react'
import { PaletteMode, ThemeOptions } from '@mui/material'

// Override Mui theme typings to include the new theme property
declare module '@mui/material/styles' {
  interface ZenColor {
    silent: CSSProperties['color']
    sand: CSSProperties['color']
    wave: CSSProperties['color']
    tender: CSSProperties['color']
  }

  interface CustomCharacteristicValue {
    light: CSSProperties['color']
    main: CSSProperties['color']
    dark: CSSProperties['color']
    border: CSSProperties['color']
  }

  interface Palette {
    navigation: CSSProperties['color']
    content: CSSProperties['color']
    circle: CSSProperties['color']
    zen: ZenColor
    motivation: CustomCharacteristicValue
    support: CustomCharacteristicValue
    creativity: CustomCharacteristicValue
    completed: CustomCharacteristicValue
    followers: CustomCharacteristicValue
    abandoned: CustomCharacteristicValue
    members: CustomCharacteristicValue
  }

  interface PaletteOptions {
    navigation: CSSProperties['color']
    content: CSSProperties['color']
    circle: CSSProperties['color']
    zen: ZenColor
    motivation: CustomCharacteristicValue
    support: CustomCharacteristicValue
    creativity: CustomCharacteristicValue
    completed: CustomCharacteristicValue
    followers: CustomCharacteristicValue
    abandoned: CustomCharacteristicValue
    members: CustomCharacteristicValue
  }
}

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: {
      mode,
      navigation: mode === 'dark' ? '#000000' : '#d7d7d7',
      content: mode === 'dark' ? '#19191a' : '#d7d7d7',
      circle: '#2d313e',
      zen: {
        silent: '#99989D',
        sand: '#ad998b',
        tender: '#C8B1BB',
        wave: '#80cbc4',
      },
      motivation: {
        light: '#FFE0B2',
        main: '#FF9800', // шрифт
        dark: '#f57c00',
        border: '#f4ad4e',
      },
      support: {
        light: '#B3E5FC',
        main: '#03A9F4', // шрифт
        dark: '#03A9F4',
        border: '#4766bc',
      },
      creativity: {
        light: '#D1C4E9',
        main: '#BE9AFF', // шрифт
        dark: '#673AB7',
        border: '#ba4fcb',
      },
      completed: {
        light: '#B3D6B4',
        main: '#78C77B',
        dark: '#1D1D1F',
        border: '',
      },
      followers: {
        light: '',
        main: '#f2d900',
        dark: '',
        border: '',
      },
      abandoned: {
        light: '#6F6F6F',
        main: '#AEABAE',
        dark: '',
        border: '',
      },
      members: {
        light: '',
        main: '#EF8277',
        dark: '',
        border: '',
      },
      ...(mode === 'dark' &&
        {
          //
        }),
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: 48,
            lineHeight: '56px',
            maxWidthSm: {
              fontSize: 40,
              lineHeight: '48px',
            },
          },
          h2: {
            fontSize: 60,
            lineHeight: 1.2,
          },
          subtitle1: {
            fontSize: 16,
            lineHeight: 1.75,
          },
          h4: {
            fontSize: 34,
            lineHeight: 1.235,
          },
          h5: {
            fontSize: 24,
            lineHeight: 1.334,
            fontWeight: 'bold',
          },
          h6: {
            fontSize: 18,
            lineHeight: 1.6,
          },
          caption: {
            fontSize: 12,
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
              from: {
                filter: 'blur(12px)',
                opacity: 0,
              },
              to: {
                filter: 'blur(0px)',
                opacity: 1,
              },
            },
          },
          root: {
            lineHeight: '21px',
            '@media (max-width:365px)': {
              fontSize: 13.5,
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            borderRadius: '12px',
            width: 'calc(100% - 16px)',
            maxHeight: '700px',
            margin: '16px',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
          },
          '#__next': {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          },
          '.ps .ps__rail-y:hover, .ps .ps--clicking': {
            background: 'transparent!important',
          },
          a: {
            textDecoration: 'none',
            color: 'inherit',
          },
        },
      },
    },
  }
}
