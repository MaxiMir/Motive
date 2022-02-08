import { createContext, ReactNode } from 'react'
import { AppEmojiName } from 'components/UI/AppEmoji'

export interface ContextSnackbarProps {
  severity: 'success' | 'error' | 'warning'
  message?: string
  icon?: AppEmojiName
  action?: ReactNode
}

interface SnackbarContextType {
  props: ContextSnackbarProps | null
  setProps: (props: ContextSnackbarProps | null) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  props: null,
  setProps: (_: ContextSnackbarProps | null) => undefined,
})
