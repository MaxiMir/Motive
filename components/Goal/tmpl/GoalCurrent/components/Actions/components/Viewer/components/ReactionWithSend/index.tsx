import { DayCharacteristicName, GoalDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import Action from 'components/Action'
import useSetReaction from './hook'
import { checkOnActive, getCount } from './helper'
import i18n from './i18n'

interface ReactionWithSendProps {
  goal: GoalDto
  name: DayCharacteristicName
  locale: Locale
}

export default function ReactionWithSend({ goal, name, locale }: ReactionWithSendProps): JSX.Element {
  const active = checkOnActive(goal, name)
  const count = getCount(goal, name)
  const { getTitle } = i18n[locale]
  const title = getTitle(active, name)
  const onSetReaction = useSetReaction(goal, name, active)

  return <Action tmpl="goal" name={name} title={title} count={count} disabled={active} onClick={onSetReaction} />
}
