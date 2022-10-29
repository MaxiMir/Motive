import { useIntl } from 'react-intl'
import { DayCharacteristicName, GoalDto } from '@dto'
import ActionGoal from '@components/Action/ActionGoal'
import useSetReaction from './hook'
import { checkOnActive, getCount } from './helper'
import i18n from './i18n'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
}

export default function ReactionWithSend({ goal, name }: ReactionWithSendProps) {
  const { locale, formatMessage } = useIntl()
  const active = checkOnActive(goal, name)
  const count = getCount(goal, name)
  const { getTitle } = i18n[locale]
  const title = getTitle(active, name)
  const onSetReaction = useSetReaction(goal, name, active)

  return <ActionGoal name={name} title={title} count={count} disabled={active} onClick={onSetReaction} />
}
