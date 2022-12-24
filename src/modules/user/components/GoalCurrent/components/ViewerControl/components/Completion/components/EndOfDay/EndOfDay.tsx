import dynamic from 'next/dynamic'
import { Button, Tooltip } from '@mui/material'
import { MemberDto } from '@features/member'
import { getTomorrow } from '@lib/date'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'
import { useSendEndOfDay } from './hooks/useSendEndOfDay'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EndOfDayProps {
  nextDayId: number
  forTomorrow: boolean
  clientMember: MemberDto
}

function EndOfDay({ nextDayId, forTomorrow, clientMember }: EndOfDayProps) {
  const messages = useMessages(forTomorrow)
  const { isLoading, mutate } = useSendEndOfDay()

  const onClick = () => {
    mutate({ id: clientMember.id, dayId: nextDayId, updated: getTomorrow() })
  }

  return (
    <Tooltip title={messages.title} arrow followCursor>
      <span>
        <Button
          variant="outlined"
          color="primary"
          disabled={forTomorrow || isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size="14.5px" color="primary" />
            ) : (
              <AppEmoji name="moon" onlyEmoji />
            )
          }
          onClick={onClick}
        >
          {messages.buttonText}
        </Button>
      </span>
    </Tooltip>
  )
}

export default EndOfDay
