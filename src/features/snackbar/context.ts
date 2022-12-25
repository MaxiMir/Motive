import { createContext, ReactNode } from 'react'
import { AppEmojiName } from '@ui/AppEmoji'

export interface SnackbarProps {
  severity: 'success' | 'error' | 'warning'
  message: string
  icon?: AppEmojiName
  action?: ReactNode
}

interface SnackbarContextType {
  props: SnackbarProps | null
  setProps: (props: SnackbarProps | null) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  props: null,
  setProps: (_: SnackbarProps | null) => undefined,
})
