import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button, Tooltip } from '@mui/material'
import { GoalDto, MemberDto } from '@dto'
import { getTomorrow } from '@utils/date'
import AppEmoji from '@ui/AppEmoji'
import useSendEndOfDay from './hooks/useSendEndOfDay'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EndOfDayProps {
  goal: GoalDto
  nextDayId: number
  forTomorrow: boolean
  clientMember: MemberDto
}

function EndOfDay({ goal, nextDayId, forTomorrow, clientMember }: EndOfDayProps) {
  const { formatMessage } = useIntl()
  const { isLoading, mutate } = useSendEndOfDay(goal)
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
