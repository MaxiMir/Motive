import Link from 'next/link'
import { Box, Button, Typography } from '@mui/material'
import { toHref } from '@features/user'
import { GoalDto } from '@features/goal'
import { MAIN_CHARACTERISTICS } from '@features/characteristic'
import CharacteristicGoal from '@components/Characteristic/CharacteristicGoal'
import AvatarStatus from '@components/Avatar/AvatarStatus'

interface GoalCardProps {
  goal: GoalDto
}

function GoalCard({ goal }: GoalCardProps) {
  const { name, characteristic, owner } = goal
  const { name: ownerName, nickname, avatar } = owner
  const href = toHref(nickname)

  return (
    <Button
      variant="outlined"
      color="primary"
      href="#"
      sx={{
        width: '100%',
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
          <Link href={href} title={ownerName}>
            <AvatarStatus src={avatar} name={ownerName} size={26} />
          </Link>
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

export default GoalCard
