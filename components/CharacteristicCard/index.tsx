import dynamic from 'next/dynamic'
import { GoalProps } from './templates/Goal'
import { UserProps } from './templates/User'
import { ReactionProps } from './templates/Reaction'

const Goal = dynamic(() => import('./templates/Goal'))
const User = dynamic(() => import('./templates/User'))
const Reaction = dynamic(() => import('./templates/Reaction'))

export default function CharacteristicCard(props: GoalProps | UserProps | ReactionProps): JSX.Element {
  switch (props.type) {
    case 'goal':
      return <Goal {...props} />
    case 'user':
      return <User {...props} />
    case 'reaction':
      return <Reaction {...props} />
    default:
      return <></>
  }
}
