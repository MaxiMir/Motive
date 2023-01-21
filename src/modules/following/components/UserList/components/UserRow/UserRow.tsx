import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { UserDto, toHref } from '@features/user'
import { MAIN_CHARACTERISTICS, SecondCharacteristicName } from '@features/characteristic'
import CharacteristicUser from '@components/Characteristic/CharacteristicUser'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import MenuActions from './components/MenuActions'

const LastSeen = dynamic(() => import('./components/LastSeen'))

const CHARACTERISTICS = [...MAIN_CHARACTERISTICS, SecondCharacteristicName.Completed]

interface UserRowProps {
  user: UserDto
  index: number
}

function UserRow({ user, index }: UserRowProps) {
  const { nickname, name, avatar, characteristic, online, lastSeen } = user
  const href = toHref(nickname)

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Link href={href} title={name}>
        <AvatarStatus src={avatar} name={name} online={online} size={55} />
      </Link>
      <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
        <Typography variant="subtitle1" component="span">
          <Link href={href}>{name}</Link>
        </Typography>
        {lastSeen && <LastSeen lastSeen={lastSeen} />}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <CharacteristicUser
              name={characteristicName}
              value={characteristic[characteristicName]}
              key={characteristicName}
            />
          ))}
        </Box>
      </Box>
      <MenuActions user={user} index={index} />
    </Box>
  )
}

export default UserRow
