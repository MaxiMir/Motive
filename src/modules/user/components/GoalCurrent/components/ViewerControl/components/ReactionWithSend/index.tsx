import { useIntl } from 'react-intl'
import { DayCharacteristicName, GoalDto } from '@dto'
import ActionGoal from '@components/Action/ActionGoal'
import useSetReaction from './hook'
import { checkOnActive, getCount } from './helper'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
}

export default function ReactionWithSend({ goal, name }: ReactionWithSendProps) {
  const { formatMessage } = useIntl()
  const active = checkOnActive(goal, name)
  const count = getCount(goal, name)
  const nameText = formatMessage({ id: `page.user.topic.${name}` })
  const titleTmpl = formatMessage({ id: active ? 'page.user.topic.title-decrease' : 'page.user.topic.title-increase' })
  const title = titleTmpl.replace('$0', nameText)

  const onSetReaction = useSetReaction(goal, name, active)

  return <ActionGoal name={name} title={title} count={count} disabled={active} onClick={onSetReaction} />
}
