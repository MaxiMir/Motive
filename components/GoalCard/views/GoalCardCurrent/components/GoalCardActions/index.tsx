import dynamic from 'next/dynamic'
import { GoalCardActionsMemberProps } from './components/GoalCardActionsMember'

const GoalCardActionsMember = dynamic(() => import('./components/GoalCardActionsMember'))

export default function GoalCardActions(props: GoalCardActionsMemberProps): JSX.Element {
  switch (props.role) {
    case 'MEMBER':
      return <GoalCardActionsMember {...props} />
    default:
      return <></>
  }
}
