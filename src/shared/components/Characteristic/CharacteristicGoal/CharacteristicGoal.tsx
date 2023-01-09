import { Box, Typography, IconButton } from '@mui/material'
import { GoalCharacteristicName } from '@features/goal'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

interface CharacteristicGoalProps {
  name: GoalCharacteristicName | 'runningDays'
  value: number
}

function CharacteristicGoal({ name, value }: CharacteristicGoalProps) {
  const messages = useMessages(name)
  const formatNumber = useFormatNumber()
  const formattedValue = formatNumber(value)
  const color = name === 'runningDays' ? '#c07d35' : `${name}.main`

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
      <TooltipArrow title={messages.title}>
        <IconButton
          size="small"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <AppEmoji name={name} variant="h5" />
        </IconButton>
      </TooltipArrow>
      <Typography component="p" sx={{ color }}>
        {formattedValue}
      </Typography>
    </Box>
  )
}

export default CharacteristicGoal
