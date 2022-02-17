import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import OwnerDescription from './components/OwnerDescription'

interface AddGoalProps {
  isOwner: boolean
}

export default function EmptyGoals({ isOwner }: AddGoalProps): JSX.Element {
  return (
    <>
      <AppBox flexDirection="column" justifyContent="center" alignItems="center" spacing={1} flex={1}>
        <AppTypography variant="h6" component="p" color="primary">
          {isOwner ? 'You have no goals' : 'No goals yet'}
        </AppTypography>
        <AppFadeIcon name="goal" />
        {isOwner && <OwnerDescription />}
      </AppBox>
    </>
  )
}
