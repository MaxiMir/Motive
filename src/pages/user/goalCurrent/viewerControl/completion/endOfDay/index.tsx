import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { MemberDto } from 'shared/api'
import { getTomorrow } from 'shared/lib/utils'
import BlueButton from 'shared/ui/BlueButton'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useSendEndOfDay } from './lib'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EndOfDayProps {
  goalId: number
  nextDayId: number
  forTomorrow: boolean
  clientMember: MemberDto
}

function EndOfDay({ goalId, nextDayId, forTomorrow, clientMember }: EndOfDayProps) {
  const { isLoading, mutate } = useSendEndOfDay(goalId)
  const { formatMessage } = useIntl()
  const title = !forTomorrow ? '' : formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.next' })

  const onClick = () => {
    mutate({ id: clientMember.id, dayId: nextDayId, updated: getTomorrow() })
  }

  return (
    <TooltipArrow title={title}>
      <BlueButton
        size="small"
        disabled={forTomorrow || isLoading}
        startIcon={isLoading ? <CircularProgress size={14.5} color="primary" /> : '🌒'}
        onClick={onClick}
      >
        {buttonText}
      </BlueButton>
    </TooltipArrow>
  )
}

export default EndOfDay
