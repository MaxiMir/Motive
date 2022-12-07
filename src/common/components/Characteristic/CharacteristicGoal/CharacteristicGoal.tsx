import { Box, Typography, Tooltip, IconButton } from '@mui/material'
import { GoalCharacteristicName } from '@dto'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji from '@ui/AppEmoji'
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
    <Box display="flex" flexDirection="column" alignItems="center" gap={1} width={40}>
      <Tooltip arrow title={messages.title}>
        <span>
          <IconButton sx={{ width: 48, height: 48 }}>
            <AppEmoji name={name} variant="h5" />
          </IconButton>
        </span>
      </Tooltip>
      <Box>
        <Typography component="p" sx={{ color }}>
          {formattedValue}
        </Typography>
      </Box>
    </Box>
  )
}

export default CharacteristicGoal
