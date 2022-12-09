import { createContext } from 'react'
import { PaletteMode } from '@mui/material'

interface ThemeContextType {
  mode: PaletteMode
  setMode: (mode: PaletteMode) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  setMode: (_: PaletteMode) => false,
})
