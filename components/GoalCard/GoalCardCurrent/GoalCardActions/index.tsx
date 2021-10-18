import dynamic from 'next/dynamic'
import { GoalCardActionsMemberProps } from './GoalCardActionsMember'

const GoalCardActionsMember = dynamic(() => import('./GoalCardActionsMember'))

export default function GoalCardActions(props: GoalCardActionsMemberProps): JSX.Element {
  switch (props.role) {
    case 'MEMBER':
      return <GoalCardActionsMember {...props} />
    default:
      return <></>
  }
}