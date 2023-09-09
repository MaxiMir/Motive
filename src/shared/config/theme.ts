import { PaletteMode, ThemeOptions } from '@mui/material'
import { CSSProperties } from 'react'
import { Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

declare module '@mui/material/styles' {
  interface ZenColor {
    silent: CSSProperties['color']
    sand: CSSProperties['color']
    tender: CSSProperties['color']
  }

  interface CustomCharacteristicValue {
    light: CSSProperties['color']
    main: CSSProperties['color']
    dark: CSSProperties['color']
    border: CSSProperties['color']
  }

  interface Palette {
    underlay: CSSProperties['color']
    content: CSSProperties['color']
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
    underlay: CSSProperties['color']
    content: CSSProperties['color']
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

export function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      mode,
      underlay: mode === 'dark' ? '#000000' : '#d7d7d7',
      content: mode === 'dark' ? '#19191a' : '#d7d7d7',
      zen: {
        silent: '#8e8e8e',
        sand: '#ad998b',
        tender: '#C8B1BB',
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
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
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
      MuiMenu: {
        defaultProps: {
          PaperProps: {
            sx: {
              mt: 1,
              background: '#262626',
            },
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'hover',
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
            animation: 'fade-with-blur 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53) both',
            '@keyframes fade-with-blur': {
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
            width: '100%',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            margin: 0,
            padding: 0,
          },
          '#__next': {
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
          },
          'h1, h2, h3, h4, h5, h6': {
            textWrap: 'balance',
          },
          '::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: 'rgb(255 255 255 / 10%)',
            borderRadius: 10,
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(0 0 0 / 80%)',
            borderRadius: 10,
            '&:hover': {
              backgroundColor: 'grey',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 1200px)': {
              maxWidth: 900,
            },
          },
        },
      },
    },
  }
}
