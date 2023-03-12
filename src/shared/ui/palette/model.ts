import { PaletteMode } from '@mui/material'
import { create } from 'zustand'

interface PaletteStore {
  mode: PaletteMode
  setMode: (mode: PaletteMode) => void
}

export const usePaletteMode = create<PaletteStore>((set) => ({
  mode: 'dark',
  setMode: (mode) => set({ mode }),
}))
