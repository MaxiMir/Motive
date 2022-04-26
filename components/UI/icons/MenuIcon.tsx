import { SvgIcon, SvgIconProps } from '@mui/material'

export default function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <line y1="19" x2="24" y2="19" stroke="white" strokeWidth="2" />
      <line y1="10" x2="24" y2="10" stroke="white" strokeWidth="2" />
      <line y1="1" x2="24" y2="1" stroke="white" strokeWidth="2" />
    </SvgIcon>
  )
}
