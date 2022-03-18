import { UserBaseDto } from 'dto'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import User from 'components/User'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox spacing={1}>
      <AppTypography>Completed</AppTypography>
      <AppTypography className={classes.withText}>with</AppTypography>
      <User tmpl="avatar" user={owner} />
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    withText: {
      color: theme.palette.warning.main,
    },
  }),
)
