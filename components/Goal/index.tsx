import dynamic from 'next/dynamic'
import { GoalCurrentProps } from './templates/GoalCurrent'

const GoalCurrent = dynamic(() => import('./templates/GoalCurrent'))

export default function Goal(props: GoalCurrentProps): JSX.Element {
  switch (props.type) {
    case 'current':
      return <GoalCurrent {...props} />
    default:
      return <></>
  }
}
