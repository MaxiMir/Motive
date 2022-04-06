import { SvgIconProps } from '@mui/material'

interface FooterLinkProps {
  Icon: (props: SvgIconProps) => JSX.Element
  selected: boolean
}

export default function FooterIcon({ Icon, selected }: FooterLinkProps): JSX.Element {
  return <Icon sx={{ fontSize: '1.9rem', opacity: selected ? 0.6 : 1 }} />
}
