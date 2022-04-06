import { Typography, Button } from '@mui/material'
import { common } from '@mui/material/colors'
import { UserCharacteristicName, UserDto } from 'dto'
import AppAvatar from 'components/UI/AppAvatar'
import AppBox from 'components/UI/AppBox'
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
      <AppBox flexDirection="column" alignItems="center" gap={2}>
        <AppAvatar src={avatar} size={120} />
        <Typography sx={{ color: common.white }}>{name}</Typography>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Characteristic
              tmpl="user"
              name={characteristicName}
              value={characteristic[characteristicName]}
              key={characteristicName}
            />
          ))}
        </AppBox>
      </AppBox>
    </Button>
  )
}
