import { Typography, Button } from '@mui/material'
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
        size="small"
        variant="outlined"
        color="inherit"
        startIcon={
          <Typography paragraph m={0}>
            {emoji}
          </Typography>
        }
        sx={(theme) => ({
          minWidth: 'initial',
          borderColor: 'transparent',
          backgroundColor: theme.palette.grey[900],
        })}
      >
        {formattedValue}
      </Button>
    </TooltipArrow>
  )
}
