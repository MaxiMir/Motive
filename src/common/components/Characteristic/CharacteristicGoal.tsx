import { useIntl } from 'react-intl'
import { Box, Typography, Tooltip } from '@mui/material'
import { GoalCharacteristicName } from '@dto'
import { numberToShort } from '@helpers/prepare'
import AppEmoji from '@ui/AppEmoji'

export interface CharacteristicGoalProps {
  name: GoalCharacteristicName | 'runningDays'
  value: number
}

export default function CharacteristicGoal({ name, value }: CharacteristicGoalProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: `component.characteristic-goal.${name}` })
  const shortValue = numberToShort(value)
  const color = name === 'runningDays' ? '#c07d35' : `${name}.main`

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1} width={40}>
      <Tooltip arrow title={title}>
        <span>
          <AppEmoji name={name} variant="h5" />
        </span>
      </Tooltip>
      <Box>
        <Typography component="p" sx={{ color }}>
          {shortValue}
        </Typography>
      </Box>
    </Box>
  )
}
