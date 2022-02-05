import { DayCharacteristicName, GoalDto, UserBaseDto } from 'dto'
import Characteristic from 'components/Characteristic'
import useSetReaction from './hook'
import { checkOnActive } from './helper'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
  client?: UserBaseDto
}

export default function ReactionWithSend({ goal, name, client }: ReactionWithSendProps): JSX.Element {
  const active = checkOnActive(name, goal)
  const title = `${active ? 'Decrease' : 'Increase'} goal's ${name} points`
  const onSetReaction = useSetReaction(goal, name, active, client)

  return <Characteristic tmpl="reaction" name={name} active={active} title={title} onClick={onSetReaction} />
}
