import { Emoji } from 'entities/characteristic'
import { useGoalContext } from 'entities/goal'
import { DayCharacteristicName } from 'shared/api'
import EmojiButton from 'shared/ui/EmojiButton'
import { checkOnActive, getCount } from './helper'
import { useMessages } from './hooks/useMessages'
import { useSetReaction } from './hooks/useSetReaction'

interface ReactionWithSendProps {
  name: DayCharacteristicName
}

function ReactionWithSend({ name }: ReactionWithSendProps) {
  const goal = useGoalContext()
  const active = checkOnActive(goal, name)
  const messages = useMessages(name, active)
  const count = getCount(goal, name)
  const [isLoading, onClick] = useSetReaction(name, active)
  const startIcon = Emoji[name]

  return (
    <EmojiButton
      title={messages.title}
      count={count}
      isLoading={isLoading}
      active={active}
      startIcon={startIcon}
      onClick={onClick}
    />
  )
}

export default ReactionWithSend
