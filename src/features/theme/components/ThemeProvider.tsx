import { ReactNode, useMemo, useState } from 'react'
import { PaletteMode, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createGenerateClassName, StylesProvider } from '@mui/styles'
import { PaletteModeContext } from '@features/theme/context'
import { useRemoveServerStyles } from '@features/theme/hooks'
import { getDesignTokens } from '@features/theme/theme'

const generateClassName = createGenerateClassName({ productionPrefix: 'bb' })

interface ThemeProviderProps {
  children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light')
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const paletteModeValue = useMemo(() => ({ mode, setMode }), [mode])
  useRemoveServerStyles()

  return (
    <PaletteModeContext.Provider value={paletteModeValue}>
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StylesProvider>
    </PaletteModeContext.Provider>
  )
}

export default ThemeProvider
