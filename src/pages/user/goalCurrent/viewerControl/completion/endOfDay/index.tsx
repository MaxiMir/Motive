import dynamic from 'next/dynamic'
import { MemberDto } from 'shared/api'
import { getTomorrow } from 'shared/lib/utils'
import BlueButton from 'shared/ui/BlueButton'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages, useSendEndOfDay } from './lib'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EndOfDayProps {
  goalId: number
  nextDayId: number
  forTomorrow: boolean
  clientMember: MemberDto
}

function EndOfDay({ goalId, nextDayId, forTomorrow, clientMember }: EndOfDayProps) {
  const messages = useMessages(forTomorrow)
  const { isLoading, mutate } = useSendEndOfDay(goalId)

  const onClick = () => {
    mutate({ id: clientMember.id, dayId: nextDayId, updated: getTomorrow() })
  }

  return (
    <TooltipArrow title={messages.title}>
      <BlueButton
        size="small"
        disabled={forTomorrow || isLoading}
        startIcon={isLoading ? <CircularProgress size={14.5} color="primary" /> : '🌒'}
        onClick={onClick}
      >
        {messages.buttonText}
      </BlueButton>
    </TooltipArrow>
  )
}

export default EndOfDay