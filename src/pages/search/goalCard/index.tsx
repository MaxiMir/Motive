import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { CharacteristicGoal } from 'entities/characteristic'
import { MAIN_CHARACTERISTICS, GoalDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface GoalCardProps {
  goal: GoalDto
}

function GoalCard({ goal }: GoalCardProps) {
  const { name, characteristic, owner } = goal
  const { name: ownerName, nickname, avatar } = owner
  const href = joinToHref(nickname)

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
      <Stack alignItems="center" gap={2}>
        <Typography>{name}</Typography>
        <Box display="flex" justifyContent="flex-start" flex={1}>
          <Typography variant="caption">Completed: +</Typography>
        </Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <Link href={href} title={ownerName}>
            <Avatar src={avatar} name={ownerName} size={26} />
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
