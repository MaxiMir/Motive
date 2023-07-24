import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import { Emoji } from 'src/entities/characteristic/consts'
import { GoalCharacteristicName } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface CharacteristicGoalProps {
  name: GoalCharacteristicName | 'runningDays'
  value: number
}

export function CharacteristicGoal({ name, value }: CharacteristicGoalProps) {
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const formattedValue = formatNumber(value)
  const title = formatMessage({ id: `component.characteristic-goal.${name}` })
  const emoji = Emoji[name]

  return (
    <TooltipArrow title={title}>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={emoji}
        sx={{ minWidth: 'initial', borderColor: 'transparent' }}
        component="span"
      >
        {formattedValue}
      </Button>
    </TooltipArrow>
  )
}
