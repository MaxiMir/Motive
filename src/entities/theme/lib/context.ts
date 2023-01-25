import { createContext, useContext } from 'react'
import { PaletteMode } from '@mui/material'

interface PaletteModeContextType {
  mode: PaletteMode
  setMode: (mode: PaletteMode) => void
}

export const PaletteModeContext = createContext<PaletteModeContextType>({
  mode: 'dark',
  setMode: (_: PaletteMode) => false,
})

export const usePaletteModeContext = () => useContext(PaletteModeContext)
