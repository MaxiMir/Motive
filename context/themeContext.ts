import { createContext } from 'react'
import { PaletteType } from 'theme'

interface ThemeContextType {
  type: PaletteType
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  type: 'dark',
  toggle: () => false,
})
