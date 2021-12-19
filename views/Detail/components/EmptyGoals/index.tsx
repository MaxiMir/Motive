import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import OwnerDescription from './components/OwnerDescription'

interface AddGoalProps {
  isOwner: boolean
}

export default function EmptyGoals({ isOwner }: AddGoalProps): JSX.Element {
  return (
    <>
      <AppBox flexDirection="column" justifyContent="center" alignItems="center" spacing={1} flex={1}>
        <AppTypography variant="h6" component="p" color="primary">
          {isOwner ? 'You have no goals...' : 'No goals yet...'}
        </AppTypography>
        {isOwner && <OwnerDescription />}
      </AppBox>
    </>
  )
}
