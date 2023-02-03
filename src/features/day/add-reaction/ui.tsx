import { CharacteristicReaction, Emoji } from 'entities/characteristic'
import { DayCharacteristicName } from 'shared/api'
import { useMessages } from './lib'
import { useSetReaction } from './model'

interface AddReactionProps {
  name: DayCharacteristicName
  goalId: number
  dayId: number
  reactions?: number[]
  count?: number
}

function AddReaction({ name, goalId, dayId, reactions, count = 0 }: AddReactionProps) {
  const active = !!reactions?.some((d) => d === dayId)
  const messages = useMessages(name, active)
  const { isLoading, onClick } = useSetReaction(goalId, dayId, name, active)
  const startIcon = Emoji[name]

  return (
    <CharacteristicReaction
      title={messages.title}
      count={count}
      isLoading={isLoading}
      active={active}
      startIcon={startIcon}
      onClick={onClick}
    />
  )
}

export default AddReaction
