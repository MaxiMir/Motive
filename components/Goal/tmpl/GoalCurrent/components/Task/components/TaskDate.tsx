import { format } from 'date-fns'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppIcon from 'components/UI/AppIcon'
import { createStyles, makeStyles } from '@material-ui/core'

interface TaskDateProps {
  date: string
}

export default function TaskDate({ date }: TaskDateProps): JSX.Element {
  const classes = useStyles()
  const formattedDate = format(new Date(date), 'hh:mm')

  return (
    <AppBox alignItems="center" spacing={1} marginLeft={4} className={classes.root}>
      <AppIcon name="schedule" />
      <AppTypography>{formattedDate}</AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: theme.text.silent,
    },
  }),
)
