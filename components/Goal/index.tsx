import dynamic from 'next/dynamic'
import { GoalCurrentProps } from './tmpl/GoalCurrent'
import { GoalCompletedProps } from './tmpl/GoalCompleted'
import { GoalSearchProps } from './tmpl/GoalSearch'

const GoalCurrent = dynamic(() => import('./tmpl/GoalCurrent'))
const GoalCompleted = dynamic(() => import('./tmpl/GoalCompleted'))
const GoalSearch = dynamic(() => import('./tmpl/GoalSearch'))

export default function Goal(props: GoalCurrentProps | GoalCompletedProps | GoalSearchProps): JSX.Element {
  switch (props.tmpl) {
    case 'current':
      return <GoalCurrent {...props} />
    case 'completed':
      return <GoalCompleted {...props} />
    case 'search':
      return <GoalSearch {...props} />
  }
}
