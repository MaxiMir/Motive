import { format } from 'date-fns'
import { Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import AppBox from 'components/UI/AppBox'
import AppIcon from 'components/UI/AppIcon'

interface TaskDateProps {
  date: string
}

export default function TaskDate({ date }: TaskDateProps): JSX.Element {
  const classes = useStyles()
  const formattedDate = format(new Date(date), 'hh:mm')

  return (
    <AppBox alignItems="center" gap={1} marginLeft={4} className={classes.root}>
      <AppIcon name="schedule" />
      <Typography>{formattedDate}</Typography>
    </AppBox>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.zen.silent,
    },
  }),
)
