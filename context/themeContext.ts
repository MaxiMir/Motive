import { createContext } from 'react'
import { PaletteMode } from '@mui/material'

interface ThemeContextType {
  mode: PaletteMode
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggle: () => false,
})
