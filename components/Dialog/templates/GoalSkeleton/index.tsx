import { Skeleton } from '@material-ui/lab'
import AppBox from 'components/UI/AppBox'

export interface GoalSkeletonProps {
  type: 'goal-skeleton'
}

export default function GoalSkeleton(_: GoalSkeletonProps): JSX.Element {
  return (
    <AppBox spacing={1}>
      <Skeleton animation="wave" variant="circle" width={40} height={40} />
      <AppBox flexDirection="column" spacing={1} flexGrow={1}>
        <Skeleton animation="wave" width={60} height={16} />
        <Skeleton animation="wave" width="100%" height={32} />
        <AppBox alignSelf="end" spacing={2}>
          <Skeleton animation="wave" width={32} height={16} />
          <Skeleton animation="wave" width={32} height={16} />
        </AppBox>
      </AppBox>
    </AppBox>
  )
}
