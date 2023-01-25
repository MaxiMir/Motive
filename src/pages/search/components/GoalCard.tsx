import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import AvatarStatus from '@features/avatar-status'
import { CharacteristicGoal } from '@entities/characteristic'
import { toHref } from '@entities/user'
import { MAIN_CHARACTERISTICS } from '@shared/api/characteristic'
import { GoalDto } from '@shared/api/goal'

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
      <Stack alignItems="center" spacing={2}>
        <Typography>{name}</Typography>
        <Box display="flex" justifyContent="flex-start" flex={1}>
          <Typography variant="caption">Completed: +</Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Link href={href} title={ownerName}>
            <AvatarStatus src={avatar} name={ownerName} size={26} />
          </Link>
          <Typography variant="caption">{owner.name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {MAIN_CHARACTERISTICS.map((characteristicName) => (
            <CharacteristicGoal
              name={characteristicName}
              value={characteristic[characteristicName]}
              key={characteristicName}
            />
          ))}
          <CharacteristicGoal name="runningDays" value={231} />
        </Stack>
      </Stack>
    </Button>
  )
}

export default GoalCard
