import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { DayCharacteristicName } from '@features/day'
import ActionGoal from '@components/Action/ActionGoal'
import { useMessages } from './hooks/useMessages'
import { useSetReaction } from './hooks/useSetReaction'
import { checkOnActive, getCount } from './helper'

interface ReactionWithSendProps {
  name: DayCharacteristicName
}

function ReactionWithSend({ name }: ReactionWithSendProps) {
  const goal = useGoalContext()
  const active = checkOnActive(goal, name)
  const messages = useMessages(name, active)
  const count = getCount(goal, name)

  const onSetReaction = useSetReaction(name, active)

  return <ActionGoal name={name} title={messages.title} count={count} disabled={active} onClick={onSetReaction} />
}

export default ReactionWithSend
