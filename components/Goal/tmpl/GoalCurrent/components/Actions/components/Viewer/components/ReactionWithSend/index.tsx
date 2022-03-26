import { DayCharacteristicName, GoalDto } from 'dto'
import Action from 'components/Action'
import useSetReaction from './hook'
import { checkOnActive, getCount } from './helper'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
}

export default function ReactionWithSend({ goal, name }: ReactionWithSendProps): JSX.Element {
  const active = checkOnActive(goal, name)
  const count = getCount(goal, name)
  const title = `${active ? 'Decrease' : 'Increase'} day's ${name} points`
  const onSetReaction = useSetReaction(goal, name, active)

  return <Action tmpl="goal" name={name} title={title} count={count} disabled={active} onClick={onSetReaction} />
}
