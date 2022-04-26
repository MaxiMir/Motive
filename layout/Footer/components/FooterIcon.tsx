import { SvgIconProps } from '@mui/material'

interface FooterLinkProps {
  Icon: (props: SvgIconProps) => JSX.Element
  selected: boolean
}

export default function FooterIcon({ Icon, selected }: FooterLinkProps) {
  return <Icon sx={{ color: 'common.white', opacity: !selected ? 0.6 : 1 }} />
}
