export interface AlertProps {
  severity: 'success' | 'info' | 'warning' | 'error'
  icon?: string
  action?: JSX.Element
  children: string
}
