import { FC } from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export const MenuIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <line y1="19" x2="24" y2="19" stroke="white" strokeWidth="2" />
    <line y1="10" x2="24" y2="10" stroke="white" strokeWidth="2" />
    <line y1="1" x2="24" y2="1" stroke="white" strokeWidth="2" />
  </SvgIcon>
)
