import { Box, Typography, Button } from '@mui/material'
import { UserCharacteristicName, UserDto } from 'dto'
import AppAvatar from 'components/UI/AppAvatar'
import { getUserHref } from 'views/UserView/helper'
import Characteristic from 'components/Characteristic'

const CHARACTERISTICS: UserCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface UserSearchProps {
  tmpl: 'search'
  user: UserDto
}

export default function UserSearch({ user }: UserSearchProps): JSX.Element {
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
            {CHARACTERISTICS.map((characteristicName) => (
              <Characteristic
                tmpl="user"
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
