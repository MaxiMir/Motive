import { Box, Button, Typography } from '@mui/material'
import { GoalCharacteristicName, GoalDto } from 'dto'
import CharacteristicGoal from 'components/Characteristic/CharacteristicGoal'
import UserAvatar from 'components/User/UserAvatar'

const CHARACTERISTICS: GoalCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface GoalSearchProps {
  goal: GoalDto
}

export default function GoalSearch({ goal }: GoalSearchProps) {
  const { name, characteristic, owner } = goal

  return (
    <Button
      variant="outlined"
      color="primary"
      href="#"
      sx={{
        width: '100%',
        textTransform: 'none',
        padding: 16,
        borderRadius: 12,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography>{name}</Typography>
        <Box display="flex" justifyContent="flex-start" flex={1}>
          <Typography variant="caption">Completed: +</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <UserAvatar user={owner} />
          <Typography variant="caption">{owner.name}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <CharacteristicGoal
              name={characteristicName}
              value={characteristic[characteristicName]}
              key={characteristicName}
            />
          ))}
          <CharacteristicGoal name="runningDays" value={231} />
        </Box>
      </Box>
    </Button>
  )
}
