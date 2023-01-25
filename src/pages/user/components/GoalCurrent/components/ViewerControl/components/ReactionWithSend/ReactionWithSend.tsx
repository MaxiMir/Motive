import { DayCharacteristicName } from '@app/model/day'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import EmojiButton from '@shared/ui/EmojiButton'
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
  const [isLoading, onClick] = useSetReaction(name, active)

  return (
    <EmojiButton
      name={name}
      title={messages.title}
      count={count}
      isLoading={isLoading}
      active={active}
      onClick={onClick}
    />
  )
}

export default ReactionWithSend
