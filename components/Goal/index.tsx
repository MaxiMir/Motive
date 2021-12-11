import dynamic from 'next/dynamic'
import { GoalCurrentProps } from './tmpl/GoalCurrent'

const GoalCurrent = dynamic(() => import('./tmpl/GoalCurrent'))

export default function Goal(props: GoalCurrentProps): JSX.Element {
  switch (props.tmpl) {
    case 'current':
      return <GoalCurrent {...props} />
    default:
      return <></>
  }
}
