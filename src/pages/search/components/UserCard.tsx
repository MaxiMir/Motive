import Link from 'next/link'
import { Typography, Button, Stack } from '@mui/material'
import AvatarStatus from '@features/avatar-status'
import { toHref } from '@entities/user'
import { CharacteristicUser } from '@entities/characteristic'
import { UserDto } from '@shared/api/user'
import { MAIN_CHARACTERISTICS } from '@shared/api/characteristic'

interface UserCardProps {
  user: UserDto
}

function UserCard({ user }: UserCardProps) {
  const { nickname, avatar, name, characteristic } = user
  const href = toHref(nickname)

  return (
    <Button
      variant="outlined"
      href={href}
      sx={{
        width: '100%',
        padding: 2,
        borderRadius: '12px',
      }}
      component={Link}
    >
      <Stack alignItems="center" direction={{ xs: 'row', md: 'column' }} spacing={2}>
        <AvatarStatus src={avatar} name={name} size={120} />
        <Stack
          alignItems={{
            xs: 'flex-start',
            md: 'center',
          }}
          spacing={2}
        >
          <Typography sx={{ color: 'common.white' }}>{name}</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {MAIN_CHARACTERISTICS.map((characteristicName) => (
              <CharacteristicUser
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Button>
  )
}

export default UserCard
