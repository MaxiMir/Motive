import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createGenerateClassName, StylesProvider } from '@mui/styles'
import { ReactNode, useInsertionEffect, useMemo } from 'react'
import { getDesignTokens } from 'shared/config'
import { usePaletteMode } from 'shared/ui/palette'

const generateClassName = createGenerateClassName({ productionPrefix: 'bb' })

interface ThemeProviderProps {
  children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const value = usePaletteMode()
  const theme = useMemo(() => createTheme(getDesignTokens(value.mode)), [value.mode])

  useInsertionEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StylesProvider>
  )
}

export default ThemeProvider
