import { makeStyles } from '@material-ui/core/styles'
import { createStyles, Typography } from '@material-ui/core/'
import { ROUTE } from 'route'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'

interface UserCardAddGoalProps {
  isOwner: boolean
}

const UserCardEmptyGoals = ({ isOwner }: UserCardAddGoalProps) => {
  const classes = useStyles()

  return (
    <AppBox
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      flexGrow={1}
    >
      <Typography variant="h6" component="p" className={classes.title}>
        {isOwner ? 'You have no goals' : 'No goals'}
      </Typography>
      {isOwner && (
        <Typography component="p">
          You can create <span className={classes.own}>your own</span> or use
          the{' '}
          <AppLink href={ROUTE.SEARCH} className={classes.link}>
            search
          </AppLink>
        </Typography>
      )}
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      color: '#C8B1BB',
    },
    own: {
      color: theme.palette.primary.main,
    },
    link: {
      color: '#F9E5A1',
    },
  }),
)

export default UserCardEmptyGoals
