import dynamic from 'next/dynamic'
import { GoalCardCurrentProps } from './views/GoalCardCurrent'

const GoalCardCurrent = dynamic(() => import('./views/GoalCardCurrent'))

export default function GoalCard(props: GoalCardCurrentProps): JSX.Element {
  switch (props.type) {
    case 'current':
      return <GoalCardCurrent {...props} />
    default:
      return <></>
  }
}
