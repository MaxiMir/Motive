import { DayCharacteristicName, GoalDto } from 'dto'
import Reaction from '../Reaction'
import useSetReaction from './hook'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
  active: boolean
  clientId: number
}

export default function ReactionWithSend({ goal, name, active, clientId }: ReactionWithSendProps): JSX.Element {
  const title = `${active ? 'Decrease' : 'Increase'} goal's ${name} points`
  const onSetReaction = useSetReaction(goal, name, active, clientId)

  return <Reaction name={name} active={active} title={title} onClick={onSetReaction} />
}
