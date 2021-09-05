import React, { createContext } from 'react'

export interface ContextSnackbarProps {
  severity: 'success' | 'error' | 'warning'
  message: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

interface SnackbarContextType {
  props: ContextSnackbarProps | null
  setProps: (props: ContextSnackbarProps | null) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  props: null,
  setProps: (_: ContextSnackbarProps | null) => false,
})
