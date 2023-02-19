import { PaletteMode } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createGenerateClassName, StylesProvider } from '@mui/styles'
import { ReactNode, useInsertionEffect, useMemo, useState } from 'react'
import { getDesignTokens } from 'shared/config'
import { PaletteModeContext } from 'shared/lib/hooks'

const generateClassName = createGenerateClassName({ productionPrefix: 'bb' })

interface ThemeProviderProps {
  children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>('dark')
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const paletteModeValue = useMemo(() => ({ mode, setMode }), [mode])

  useInsertionEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <PaletteModeContext.Provider value={paletteModeValue}>
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StylesProvider>
    </PaletteModeContext.Provider>
  )
}

export default ThemeProvider
