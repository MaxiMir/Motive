import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { GoalDto, MemberDto } from 'dto'
import useLocale from 'hooks/useLocale'
import OptionalTooltip from 'components/OptionalTooltip'
import AppEmoji from 'components/UI/AppEmoji'
import { getToday } from 'helpers/date'
import { useSendEndOfDay } from './hook'
import i18n from './i18n'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EndOfDayProps {
  goal: GoalDto
  nextDayId: number
  forTomorrow: boolean
  clientMember: MemberDto
}

export default function EndOfDay({ goal, nextDayId, forTomorrow, clientMember }: EndOfDayProps): JSX.Element {
  const { locale } = useLocale()
  const { isLoading, mutate } = useSendEndOfDay(goal)
  const { button } = i18n[locale]

  const onClick = () => {
    mutate({ id: clientMember.id, dayId: nextDayId, updated: getToday() })
  }

  return (
    <OptionalTooltip tmpl="tomorrow" wrap={forTomorrow}>
      <Button
        variant="outlined"
        color="primary"
        disabled={forTomorrow || isLoading}
        startIcon={isLoading ? <CircularProgress size="0.9rem" color="primary" /> : <AppEmoji name="moon" onlyEmoji />}
        onClick={onClick}
      >
        {button}
      </Button>
    </OptionalTooltip>
  )
}
