import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { addDays, startOfDay } from 'date-fns'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useSendEndOfDay } from './lib'

interface EndOfDayProps {
  goalId: number
  nextDayId: number
  forFuture: boolean
  viewerMemberId: number
}

function EndOfDay({ goalId, nextDayId, forFuture, viewerMemberId }: EndOfDayProps) {
  const { isLoading, mutate } = useSendEndOfDay(goalId)
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: !forFuture ? 'common.next' : 'component.available-later' })

  const onClick = () => {
    const updated = startOfDay(addDays(new Date(), 1))

    mutate({ id: viewerMemberId, dayId: nextDayId, updated })
  }

  return (
    <TooltipArrow title={title}>
      <StyledBlueButton size="small" disabled={isLoading} onClick={onClick}>
        <Icon name="arrow_forward" />
      </StyledBlueButton>
    </TooltipArrow>
  )
}

const StyledBlueButton = styled(Button)({
  minWidth: 50,
  height: 30,
  borderRadius: 20,
})

export default EndOfDay
