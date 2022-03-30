import { makeStyles } from '@material-ui/core'
import { SEARCH } from 'route'
import AppTypography from 'components/UI/AppTypography'
import AppLink from 'components/UI/AppLink'

export default function OwnerDescription(): JSX.Element {
  const classes = useStyles()

  return (
    <AppTypography>
      You can create <span className={classes.own}>your own</span> or use the{' '}
      <AppLink href={SEARCH} className={classes.link}>
        search
      </AppLink>
    </AppTypography>
  )
}

const useStyles = makeStyles({
  own: {
    textTransform: 'none',
    color: '#4DA0EC',
  },
  link: {
    textTransform: 'none',
    color: '#F9E5A1',
  },
})
