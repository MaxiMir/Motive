import { Typography, IconButton, Stack } from '@mui/material'
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
  const color = name === 'runningDays' ? '#c07d35' : `${name}.main`
  const emoji = Emoji[name]

  return (
    <Stack alignItems="center" gap={0.5}>
      <TooltipArrow title={title}>
        <IconButton
          size="small"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Typography variant="h5" paragraph m={0}>
            {emoji}
          </Typography>
        </IconButton>
      </TooltipArrow>
      <Typography component="p" sx={{ color }}>
        {formattedValue}
      </Typography>
    </Stack>
  )
}
