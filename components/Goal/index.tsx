import dynamic from 'next/dynamic'
import { GoalCurrentProps } from './tmpl/GoalCurrent'
import useIncreaseViews from './hook'

const GoalCurrent = dynamic(() => import('./tmpl/GoalCurrent'))

export default function Goal(props: GoalCurrentProps): JSX.Element {
  const { client, goal } = props

  useIncreaseViews(client, goal)

  switch (props.tmpl) {
    case 'current':
      return <GoalCurrent {...props} />
    default:
      return <></>
  }
}
