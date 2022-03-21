import { DayCharacteristicName, GoalDto } from 'dto'
import Action from 'components/Action'
import useSetReaction from './hook'
import { checkOnActive, getCount } from './helper'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
}

export default function ReactionWithSend({ goal, name }: ReactionWithSendProps): JSX.Element {
  const active = checkOnActive(name, goal)
  const count = getCount(name, goal)
  const title = `${active ? 'Decrease' : 'Increase'} day's ${name} points`
  const onSetReaction = useSetReaction(goal, name, active)

  return <Action tmpl="goal" name={name} active={active} title={title} count={count} onClick={onSetReaction} />
}
