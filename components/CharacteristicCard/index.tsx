import dynamic from 'next/dynamic'
import { GoalProps } from './templates/Goal'
import { UserProps } from './templates/User'
import { ActionProps } from './templates/Action'

const Goal = dynamic(() => import('./templates/Goal'))
const User = dynamic(() => import('./templates/User'))
const Action = dynamic(() => import('./templates/Action'))

export default function CharacteristicCard(props: GoalProps | UserProps | ActionProps): JSX.Element {
  switch (props.type) {
    case 'goal':
      return <Goal {...props} />
    case 'user':
      return <User {...props} />
    case 'action':
      return <Action {...props} />
    default:
      return <></>
  }
}
