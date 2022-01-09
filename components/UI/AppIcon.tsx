import clsx from 'clsx'
import { TypographyProps } from '@material-ui/core'
import { toUpperFirstChar } from 'helpers/prepare'

interface AppIconProps {
  name: string
  color?: TypographyProps['color']
  className?: string
}

export default function AppIcon({ className, color, name }: AppIconProps): JSX.Element {
  const materialColorClass = color && `MuiTypography-color${toUpperFirstChar(color)}`

  return <span className={clsx('material-icons', className, materialColorClass)}>{name}</span>
}
