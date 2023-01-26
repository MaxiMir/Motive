import dynamic from 'next/dynamic'
import { MemberDto } from '@shared/api/member'
import { getTomorrow } from '@shared/lib/utils'
import Emoji from '@shared/ui/Emoji'
import { BlueButton, TooltipArrow } from '@shared/ui/styled'
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
    <TooltipArrow title={messages.title}>
      <BlueButton
        size="small"
        disabled={forTomorrow || isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size={14.5} color="primary" />
          ) : (
            <Emoji name="moon" onlyEmoji />
          )
        }
        onClick={onClick}
      >
        {messages.buttonText}
      </BlueButton>
    </TooltipArrow>
  )
}

export default EndOfDay
