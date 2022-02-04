import { DayCharacteristicName, GoalDto, UserBaseDto } from 'dto'
import Characteristic from 'components/Characteristic'
import useSetReaction from './hook'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
  active: boolean
  client?: UserBaseDto
}

export default function ReactionWithSend({ goal, name, active, client }: ReactionWithSendProps): JSX.Element {
  const title = `${active ? 'Decrease' : 'Increase'} goal's ${name} points`
  const onSetReaction = useSetReaction(goal, name, active, client)

  return <Characteristic tmpl="reaction" name={name} active={active} title={title} onClick={onSetReaction} />
}
