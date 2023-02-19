import { PaletteMode } from '@mui/material'
import { createContext, useContext } from 'react'

interface PaletteModeContextType {
  mode: PaletteMode
  setMode: (mode: PaletteMode) => void
}

export const PaletteModeContext = createContext<PaletteModeContextType>({
  mode: 'dark',
  setMode: (_: PaletteMode) => false,
})

export const usePaletteMode = () => useContext(PaletteModeContext)
