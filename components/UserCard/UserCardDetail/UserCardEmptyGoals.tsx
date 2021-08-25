import { makeStyles } from '@material-ui/core/styles'
import ROUTE from 'route'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'

interface UserCardAddGoalProps {
  owner: boolean
}

const UserCardEmptyGoals = ({ owner }: UserCardAddGoalProps): JSX.Element => {
  const classes = useStyles()

  return (
    <>
      <AppBox flexDirection="column" justifyContent="center" alignItems="center" spacing={1} flexGrow={1}>
        <AppTypography variant="h6" component="p" color="primary">
          {owner ? 'You have no goals...' : 'No goals yet...'}
        </AppTypography>
        {owner && (
          <AppTypography component="p">
            You can create <span className={classes.own}>your own</span> or use the{' '}
            <AppLink href={ROUTE.SEARCH} className={classes.link}>
              search
            </AppLink>
          </AppTypography>
        )}
      </AppBox>
    </>
  )
}

const useStyles = makeStyles({
  own: {
    color: '#4DA0EC',
  },
  link: {
    color: '#F9E5A1',
  },
})

export default UserCardEmptyGoals
