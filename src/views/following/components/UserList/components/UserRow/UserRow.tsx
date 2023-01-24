import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Stack, Typography } from '@mui/material'
import { UserDto, toHref } from '@modules/user'
import { MAIN_CHARACTERISTICS, SecondCharacteristicName } from '@modules/characteristic'
import CharacteristicUser from '@components/Characteristic/CharacteristicUser'
import AvatarStatus from '@components/AvatarStatus'
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
    <Stack direction="row" alignItems="center" spacing={2}>
      <Link href={href} title={name}>
        <AvatarStatus src={avatar} name={name} online={online} size={55} />
      </Link>
      <Stack justifyContent="space-between" flex={1}>
        <Typography variant="subtitle1" component="span">
          <Link href={href}>{name}</Link>
        </Typography>
        {lastSeen && <LastSeen lastSeen={lastSeen} />}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <CharacteristicUser
              name={characteristicName}
              value={characteristic[characteristicName]}
              key={characteristicName}
            />
          ))}
        </Stack>
      </Stack>
      <MenuActions user={user} index={index} />
    </Stack>
  )
}

export default UserRow
