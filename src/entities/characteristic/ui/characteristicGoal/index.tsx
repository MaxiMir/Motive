import { Typography, IconButton, Stack } from '@mui/material'
import { GoalCharacteristicName } from 'shared/api'
import { useFormatNumber, useMessage } from 'shared/lib/hooks'
import Emoji from 'shared/ui/Emoji'
import { TooltipArrow } from 'shared/ui/styled'

interface CharacteristicGoalProps {
  name: GoalCharacteristicName | 'runningDays'
  value: number
}

export function CharacteristicGoal({ name, value }: CharacteristicGoalProps) {
  const title = useMessage(`component.characteristic-goal.${name}`)
  const formatNumber = useFormatNumber()
  const formattedValue = formatNumber(value)
  const color = name === 'runningDays' ? '#c07d35' : `${name}.main`

  return (
    <Stack alignItems="center" spacing={0.5}>
      <TooltipArrow title={title}>
        <IconButton
          size="small"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Emoji name={name} variant="h5" />
        </IconButton>
      </TooltipArrow>
      <Typography component="p" sx={{ color }}>
        {formattedValue}
      </Typography>
    </Stack>
  )
}
