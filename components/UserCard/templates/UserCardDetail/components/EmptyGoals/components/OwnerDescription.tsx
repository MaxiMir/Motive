import { makeStyles } from '@material-ui/core/styles'
import { SEARCH_ROUTE } from 'route'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'

export default function OwnerDescription(): JSX.Element {
  const classes = useStyles()

  return (
    <AppTypography component="p">
      You can create <span className={classes.own}>your own</span> or use the{' '}
      <AppLink href={SEARCH_ROUTE} className={classes.link}>
        search
      </AppLink>
    </AppTypography>
  )
}

const useStyles = makeStyles({
  own: {
    color: '#4DA0EC',
  },
  link: {
    color: '#F9E5A1',
  },
})
