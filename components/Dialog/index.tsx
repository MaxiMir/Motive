import dynamic from 'next/dynamic'
import { GoalProps } from './templates/Goal'
import { GoalSkeletonProps } from './templates/GoalSkeleton'

const Goal = dynamic(() => import('./templates/Goal'))
const GoalSkeleton = dynamic(() => import('./templates/GoalSkeleton'))

export default function Dialog(props: GoalProps | GoalSkeletonProps): JSX.Element {
  switch (props.type) {
    case 'goal':
      return <Goal {...props} />
    case 'goal-skeleton':
      return <GoalSkeleton {...props} />
    default:
      return <></>
  }
}
