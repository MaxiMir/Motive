import dynamic from 'next/dynamic'
import { GoalCardCurrentProps } from './GoalCardCurrent'

const GoalCardCurrent = dynamic(() => import('./GoalCardCurrent'))

export default function GoalCard(props: GoalCardCurrentProps): JSX.Element {
  switch (props.type) {
    case 'current':
      return <GoalCardCurrent {...props} />
    default:
      return <></>
  }
}
