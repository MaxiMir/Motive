import clsx from 'clsx'
import { makeStyles, SvgIconProps } from '@material-ui/core'

interface FooterLinkProps {
  Icon: (props: SvgIconProps) => JSX.Element
  selected: boolean
}

export default function FooterIcon({ Icon, selected }: FooterLinkProps): JSX.Element {
  const classes = useStyles()

  return <Icon className={clsx([classes.icon, selected && classes.iconSelected])} />
}

const useStyles = makeStyles({
  icon: {
    fontSize: '1.9rem',
  },
  iconSelected: {
    opacity: 0.6,
  },
})
