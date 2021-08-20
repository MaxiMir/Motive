import dynamic from 'next/dynamic'
import { Goal } from 'dto'

const GoalCardCurrent = dynamic(() => import('./GoalCardCurrent'))

export interface GoalCardCurrentProps extends Goal {
  type: 'current'
}

export default function GoalCard(props: GoalCardCurrentProps): JSX.Element {
  switch (props.type) {
    case 'current':
      return <GoalCardCurrent {...props} />
    default:
      return <></>
  }
}
