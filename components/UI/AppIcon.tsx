import { FC } from 'react'
import clsx from 'clsx'
import { TypographyProps } from '@material-ui/core'
import { toUpperFirstChar } from 'helpers/prepare'

interface AppIconProps {
  color?: TypographyProps['color']
  className?: string
}

const AppIcon: FC<AppIconProps> = ({ className, color, children }) => {
  const materialColorClass = color && `MuiTypography-color${toUpperFirstChar(color as string)}`

  return <span className={clsx('material-icons', className, materialColorClass)}>{children}</span>
}

export default AppIcon
