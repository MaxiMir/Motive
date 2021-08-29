import { FC } from 'react'
import clsx from 'clsx'
import { TypographyProps } from '@material-ui/core'
import { toUpperFirstChar } from 'helpers/prepare'

interface AppIconTextProps {
  color?: TypographyProps['color']
  className?: string
}

const AppIconText: FC<AppIconTextProps> = ({ className, color, children }) => {
  const materialColorClass = color && `MuiTypography-color${toUpperFirstChar(color as string)}`

  return <span className={clsx('material-icons', className, materialColorClass)}>{children}</span>
}

export default AppIconText
