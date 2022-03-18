import { UserBaseDto } from 'dto'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppTypography from 'components/UI/AppTypography'
import User from 'components/User'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps): JSX.Element {
  const classes = useStyles()

  return (
    <>
      <AppTypography variant="h6" component="p" className={classes.withText}>
        with
      </AppTypography>
      <User tmpl="avatar" user={owner} />
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
