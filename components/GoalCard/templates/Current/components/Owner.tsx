import { createStyles, makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import UserCard from 'components/UserCard'
import AppTypography from 'components/UI/AppTypography'

export default function Owner(props: UserBase): JSX.Element {
  const classes = useStyles()

  return (
    <>
      <AppTypography variant="h6" className={classes.withText}>
        with
      </AppTypography>
      <UserCard type="avatar" size={28} {...props} />
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
