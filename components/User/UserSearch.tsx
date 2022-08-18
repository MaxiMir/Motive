import { Box, Typography, Button } from '@mui/material'
import { MAIN_CHARACTERISTICS, UserDto } from 'dto'
import AppAvatar from 'components/ui/AppAvatar'
import { getUserUrn } from 'helpers/url'
import CharacteristicUser from 'components/Characteristic/CharacteristicUser'

export interface UserSearchProps {
  user: UserDto
}

export default function UserSearch({ user }: UserSearchProps) {
  const { nickname, avatar, name, characteristic } = user
  const href = getUserUrn(nickname)

  return (
    <Button
      variant="outlined"
      href={href}
      sx={{
        width: '100%',
        textTransform: 'none',
        padding: 2,
        borderRadius: '12px',
      }}
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
        <AppAvatar src={avatar} size={120} />
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
