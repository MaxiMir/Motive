import { Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { UserCharacteristic, UserStatus } from 'entities/user'
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
  const { nickname, name, avatar, characteristic, online, lastSeen, device } = user
  const href = joinToHref(nickname)

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={55} />
      </Link>
      <Stack justifyContent="space-between" flex={1}>
        <UserStatus online={online} lastSeen={lastSeen} device={device}>
          <Typography variant="subtitle1" component="span">
            <Link href={href}>{name}</Link>
          </Typography>
        </UserStatus>
        {lastSeen && <LastSeen lastSeen={lastSeen} />}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {ONLINE_SKILLS_MAIN.map((characteristicName) => (
            <UserCharacteristic
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
