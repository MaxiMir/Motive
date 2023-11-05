import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { StylesProvider } from '@mui/styles'
import { ReactNode, useInsertionEffect, useMemo } from 'react'
import { getDesignTokens } from 'shared/config'
import { usePaletteMode } from 'shared/ui/palette'

interface ThemeProviderProps {
  children: ReactNode | ReactNode[]
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = usePaletteMode((state) => state.mode)
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  useInsertionEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <StylesProvider>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StylesProvider>
  )
}

export default ThemeProvider
