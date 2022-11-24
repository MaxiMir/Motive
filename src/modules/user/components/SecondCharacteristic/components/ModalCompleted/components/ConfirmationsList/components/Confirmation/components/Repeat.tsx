import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { getToday } from '@utils/date'
import { useSendCreateMember } from '@modules/user/hook'
import ActionSubmit from '@components/Action/ActionSubmit'

interface RepeatProps {
  goalId: number
}

export default function Repeat({ goalId }: RepeatProps) {
  const { formatMessage } = useIntl()
  const { isLoading, mutate } = useSendCreateMember()
  const buttonText = formatMessage({ id: 'common.repeat' })
  const loadingText = formatMessage({ id: 'common.repeat-loading' })

  const onClick = () => mutate({ goalId, started: getToday() })

  return (
    <Box display="flex" justifyContent="flex-end">
      <ActionSubmit disabled={isLoading} text={buttonText} loadingText={loadingText} emoji="join" onClick={onClick} />
    </Box>
  )
}
