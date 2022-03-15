import { DayCharacteristicName, GoalDto } from 'dto'
import Action from 'components/Action'
import useSetReaction from './hook'
import { checkOnActive } from './helper'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
}

export default function ReactionWithSend({ goal, name }: ReactionWithSendProps): JSX.Element {
  const active = checkOnActive(name, goal)
  const title = `${active ? 'Decrease' : 'Increase'} goal's ${name} points`
  const onSetReaction = useSetReaction(goal, name, active)

  return <Action tmpl="goal" name={name} active={active} title={title} onClick={onSetReaction} />
}
