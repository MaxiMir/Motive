import { useIntl } from 'react-intl'
import { DayCharacteristicName } from '@dto'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import ActionGoal from '@components/Action/ActionGoal'
import { useSetReaction } from './hooks/useSetReaction'
import { checkOnActive, getCount } from './helper'

interface ReactionWithSendProps {
  name: DayCharacteristicName
}

function ReactionWithSend({ name }: ReactionWithSendProps) {
  const goal = useGoalContext()
  const { formatMessage } = useIntl()
  const active = checkOnActive(goal, name)
  const count = getCount(goal, name)
  const nameText = formatMessage({ id: `page.user.topic.${name}` })
  const titleTmpl = formatMessage({ id: active ? 'page.user.topic.title-decrease' : 'page.user.topic.title-increase' })
  const title = titleTmpl.replace('$0', nameText)

  const onSetReaction = useSetReaction(name, active)

  return <ActionGoal name={name} title={title} count={count} disabled={active} onClick={onSetReaction} />
}

export default ReactionWithSend
