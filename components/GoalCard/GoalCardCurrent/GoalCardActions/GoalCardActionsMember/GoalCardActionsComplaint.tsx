import { Button, makeStyles } from '@material-ui/core/'
import clsx from 'clsx'
import AppEmoji from 'components/UI/AppEmoji'

export default function GoalCardActionsComplaint(): JSX.Element {
  const classes = useStyles()

  return (
    <Button variant="outlined" className={clsx(classes.button, classes.violation)}>
      <AppEmoji name="violation" variant="h6" className={classes.violationText} />
    </Button>
  )
}

const useStyles = makeStyles({
  button: {
    width: 36,
    height: 36,
    minWidth: 'initial',
  },
  violation: {
    borderColor: '#F2185D',
    '&:hover': {
      background: '#f2185c4d',
    },
  },
  violationText: {
    width: 20,
  },
})
