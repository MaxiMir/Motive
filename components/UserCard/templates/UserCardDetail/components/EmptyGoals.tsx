import { makeStyles } from '@material-ui/core/styles'
import { SEARCH_ROUTE } from 'route'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'

interface AddGoalProps {
  isOwner: boolean
}

export default function EmptyGoals({ isOwner }: AddGoalProps): JSX.Element {
  const classes = useStyles()

  return (
    <>
      <AppBox flexDirection="column" justifyContent="center" alignItems="center" spacing={1} flexGrow={1}>
        <AppTypography variant="h6" component="p" color="primary">
          {isOwner ? 'You have no goals...' : 'No goals yet...'}
        </AppTypography>
        {isOwner && (
          <AppTypography component="p">
            You can create <span className={classes.own}>your own</span> or use the{' '}
            <AppLink href={SEARCH_ROUTE} className={classes.link}>
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
