import dynamic from 'next/dynamic'
import { GoalCurrentProps } from './tmpl/GoalCurrent'
import { GoalCompletedProps } from './tmpl/GoalCompleted'

const GoalCurrent = dynamic(() => import('./tmpl/GoalCurrent'))
const GoalCompleted = dynamic(() => import('./tmpl/GoalCompleted'))

export default function Goal(props: GoalCurrentProps | GoalCompletedProps): JSX.Element {
  switch (props.tmpl) {
    case 'current':
      return <GoalCurrent {...props} />
    case 'completed':
      return <GoalCompleted {...props} />
  }
}
