import { MainCharacteristicName } from 'dto'
import Reaction from '../Reaction'
import useSetReaction from './hook'

export interface ReactionWithSendProps {
  dayId: string
  name: MainCharacteristicName
  active: boolean
  onSet: (characteristic: MainCharacteristicName, increase: boolean) => void
}

export default function ReactionWithSend({ dayId, name, active: initial, onSet }: ReactionWithSendProps): JSX.Element {
  const [active, setActive] = useSetReaction(dayId, name, initial, onSet)
  const title = `${active ? 'Decrease' : 'Increase'} goal's ${name} points`

  return <Reaction name={name} active={active} title={title} onClick={setActive} />
}
