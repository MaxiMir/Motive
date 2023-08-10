import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import { getTomorrow } from 'shared/lib/utils'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useSendEndOfDay } from './lib'

interface EndOfDayProps {
  goalId: number
  nextDayId: number
  forTomorrow: boolean
  viewerMemberId: number
}

function EndOfDay({ goalId, nextDayId, forTomorrow, viewerMemberId }: EndOfDayProps) {
  const { isLoading, mutate } = useSendEndOfDay(goalId)
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: !forTomorrow ? 'common.next' : 'component.tooltip.tomorrow' })

  const onClick = () => {
    mutate({ id: viewerMemberId, dayId: nextDayId, updated: getTomorrow() })
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
