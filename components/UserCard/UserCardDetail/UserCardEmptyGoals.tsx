import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'
import AppBox from 'components/UI/AppBox'

const UserCardEmptyGoals = () => {
  const classes = useStyles()

  return (
    <AppBox flexDirection="column" alignItems="center" spacing={1} flexGrow={1}>
      <Typography variant="h6" component="p" className={classes.title}>
        You have no goals.
      </Typography>
      <Typography component="p">
        You can create your own or use the search.
      </Typography>
    </AppBox>
  )
}

const useStyles = makeStyles({
  title: {
    color: '#C8B1BB',
  },
})

export default UserCardEmptyGoals
