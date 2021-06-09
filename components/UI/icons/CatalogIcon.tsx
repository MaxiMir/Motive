import { FC } from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export const CatalogIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <rect
      x="1"
      y="1"
      width="14.6667"
      height="14.6667"
      rx="4"
      fill="#303030"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="4.6665"
      y="4.66675"
      width="14.6667"
      height="14.6667"
      rx="4"
      fill="#303030"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="8.3335"
      y="8.3335"
      width="14.6667"
      height="14.6667"
      rx="4"
      fill="#303030"
      stroke="white"
      strokeWidth="2"
    />
  </SvgIcon>
)
