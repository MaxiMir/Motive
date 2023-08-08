import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { UserCharacteristic, UserStatus } from 'entities/user'
import { ONLINE_SCORE_MAIN, UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import { MenuActions } from './menuActions'

interface UserRowProps {
  user: UserDto
  index: number
}

export function UserRow({ user, index }: UserRowProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const href = joinToHref(nickname)

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={55} />
      </Link>
      <Stack justifyContent="space-between" flex={1}>
        <UserStatus online={online}>
          <Typography variant="subtitle1" component="span">
            <Link href={href}>{name}</Link>
          </Typography>
        </UserStatus>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {ONLINE_SCORE_MAIN.map((characteristicName) => (
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
