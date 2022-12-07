import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button, Tooltip } from '@mui/material'
import { MemberDto } from '@dto'
import { getTomorrow } from '@lib/date'
import AppEmoji from '@ui/AppEmoji'
import { useSendEndOfDay } from './hooks/useSendEndOfDay'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EndOfDayProps {
  nextDayId: number
  forTomorrow: boolean
  clientMember: MemberDto
}

function EndOfDay({ nextDayId, forTomorrow, clientMember }: EndOfDayProps) {
  const { formatMessage } = useIntl()
  const { isLoading, mutate } = useSendEndOfDay()
  const title = forTomorrow && formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.next' })

  const onClick = () => {
    mutate({ id: clientMember.id, dayId: nextDayId, updated: getTomorrow() })
  }

  return (
    <Tooltip title={title} arrow followCursor>
      <span>
        <Button
          variant="outlined"
          color="primary"
          disabled={forTomorrow || isLoading}
          startIcon={
            isLoading ? <CircularProgress size="0.9rem" color="primary" /> : <AppEmoji name="moon" onlyEmoji />
          }
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </span>
    </Tooltip>
  )
}

export default EndOfDay
