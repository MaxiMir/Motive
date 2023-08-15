import { ReactNode } from 'react'

export interface AlertProps {
  severity: 'success' | 'info' | 'warning' | 'error'
  icon?: string
  action?: ReactNode
  children: string
}
