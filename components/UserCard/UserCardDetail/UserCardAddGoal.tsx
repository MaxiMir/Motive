import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'

const UserCardAddGoal = () => {
  const classes = useStyles()

  return (
    <>
      <Button
        startIcon={<AppEmoji name="goal" variant="h6" />}
        variant="outlined"
        size="small"
        color="primary"
        className={classes.button}
      >
        Create a goal
      </Button>
    </>
  )
}

const useStyles = makeStyles({
  button: {
    width: 200,
    textTransform: 'none',
    border: '1px solid #4DA0EC',
    fontSize: '0.875rem',
    borderRadius: 5,
  },
})

export default UserCardAddGoal
