import { Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { CharacteristicUser } from 'entities/characteristic'
import { ONLINE_SKILLS_MAIN, UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import { MenuActions } from './menuActions'

const LastSeen = dynamic(() => import('./lastSeen'))

interface UserRowProps {
  user: UserDto
  index: number
}

export function UserRow({ user, index }: UserRowProps) {
  const { nickname, name, avatar, characteristic, online, lastSeen } = user
  const href = joinToHref(nickname)

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} online={online} size={55} />
      </Link>
      <Stack justifyContent="space-between" flex={1}>
        <Typography variant="subtitle1" component="span">
          <Link href={href}>{name}</Link>
        </Typography>
        {lastSeen && <LastSeen lastSeen={lastSeen} />}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {ONLINE_SKILLS_MAIN.map((characteristicName) => (
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
