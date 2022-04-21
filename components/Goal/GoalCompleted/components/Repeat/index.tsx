import { Box } from '@mui/material'
import { getToday } from 'helpers/date'
import { useSendCreateMember } from 'views/UserView/hook'
import { Locale } from 'hooks/useLocale'
import ActionSubmit from 'components/Action/ActionSubmit'
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
    <Box display="flex" justifyContent="flex-end">
      <ActionSubmit isLoading={isLoading} name={name} nameLoading={nameLoading} emoji="join" onClick={onClick} />
    </Box>
  )
}
