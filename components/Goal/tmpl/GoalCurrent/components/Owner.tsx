import { createStyles, makeStyles } from '@material-ui/core/styles'
import { UserBaseDto } from 'dto'
import User from 'components/User'
import AppTypography from 'components/UI/AppTypography'

export default function Owner(props: UserBaseDto): JSX.Element {
  const classes = useStyles()

  return (
    <>
      <AppTypography variant="h6" className={classes.withText}>
        with
      </AppTypography>
      <User tmpl="avatar" user={props} size={28} />
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    withText: {
      color: theme.palette.warning.main,
    },
  }),
)
