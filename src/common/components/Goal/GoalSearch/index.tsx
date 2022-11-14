import { Box, Button, Typography } from '@mui/material'
import { MAIN_CHARACTERISTICS, GoalDto } from '@dto'
import { getUserHref } from '@href'
import CharacteristicGoal from '@components/Characteristic/CharacteristicGoal'
import UserAvatar from '@components/User/UserAvatar'

interface GoalSearchProps {
  goal: GoalDto
}

export default function GoalSearch({ goal }: GoalSearchProps) {
  const { name, characteristic, owner } = goal
  const { name: ownerName, nickname, avatar } = owner
  const href = getUserHref(nickname)

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
          <UserAvatar name={ownerName} avatar={avatar} href={href} />
          <Typography variant="caption">{owner.name}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {MAIN_CHARACTERISTICS.map((characteristicName) => (
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
