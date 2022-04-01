import { CSSProperties } from 'react'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

// Override Mui theme typings to include the new theme property
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    text: {
      silent: CSSProperties['color']
      sand: CSSProperties['color']
      wave: CSSProperties['color']
    }
  }
  interface ThemeOptions {
    text: {
      silent: CSSProperties['color']
      sand: CSSProperties['color']
      wave: CSSProperties['color']
    }
  }
}

export type PaletteType = 'light' | 'dark'

export const getDesignTokens = (type: PaletteType): ThemeOptions => {
  return {
    text: {
      silent: '#99989D',
      sand: '#ad998b',
      wave: '#85dfff',
    },
    palette: {
      type,
      warning: {
        // motivation
        light: '#FFE0B2',
        main: '#FF9800', // шрифт
        dark: '#f57c00',
      },
      info: {
        // support
        light: '#B3E5FC',
        main: '#03A9F4', // шрифт
        dark: '#03A9F4',
      },
      success: {
        // creativity
        light: '#D1C4E9',
        main: '#BE9AFF', // шрифт
        dark: '#673AB7',
      },
      ...(type === 'dark' && {
        background: {
          default: '#19191A',
          paper: '#1C1C1E',
        },
        text: {
          primary: '#F5F5F7',
          disabled: '#BDB5B5',
        },
        secondary: {
          dark: '#C8B1BB',
          main: '#FFE0B2', // шрифт
        },
        primary: {
          main: '#C8B1BB', // шрифт
        },
      }),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            background: '#19191A',
          },
          body: {
            margin: 0,
            padding: 0,
            minHeight: '100vh',
          },
          snackbar: {
            bottom: '100px !important',
          },
          footer: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 16,
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
