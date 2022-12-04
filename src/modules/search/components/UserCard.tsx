import Link from 'next/link'
import { Box, Typography, Button } from '@mui/material'
import { getUserHref } from '@href'
import { MAIN_CHARACTERISTICS, UserDto } from '@dto'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import CharacteristicUser from '@components/Characteristic/CharacteristicUser'

interface UserCardProps {
  user: UserDto
}

function UserCard({ user }: UserCardProps) {
  const { nickname, avatar, name, characteristic } = user
  const href = getUserHref(nickname)

  return (
    <Button
      variant="outlined"
      href={href}
      sx={{
        width: '100%',
        textTransform: 'none',
        padding: 2,
        borderRadius: '0.75rem',
      }}
      component={Link}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          flexDirection: {
            xs: 'row',
            md: 'column',
          },
        }}
      >
        <AvatarStatus src={avatar} name={name} size={120} />
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
          }}
        >
          <Typography sx={{ color: 'common.white' }}>{name}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {MAIN_CHARACTERISTICS.map((characteristicName) => (
              <CharacteristicUser
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Button>
  )
}

export default UserCard
