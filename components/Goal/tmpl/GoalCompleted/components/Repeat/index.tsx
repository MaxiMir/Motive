import { getToday } from 'helpers/date'
import { useSendCreateMember } from 'views/UserView/hook'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import Action from 'components/Action'
import i18n from './i18n'

interface RepeatProps {
  goalId: number
  locale: Locale
}

export default function Repeat({ goalId, locale }: RepeatProps): JSX.Element {
  const { isLoading, mutate } = useSendCreateMember()
  const { name, nameLoading } = i18n[locale]

  const onClick = () => mutate({ goalId, started: getToday() })

  return (
    <AppBox justifyContent="flex-end">
      <Action
        tmpl="submit"
        isLoading={isLoading}
        name={name}
        nameLoading={nameLoading}
        emoji="join"
        onClick={onClick}
      />
    </AppBox>
  )
}
