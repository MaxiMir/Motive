import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { UserCharacteristic, UserLevel, UserStatus } from 'entities/user'
import { ONLINE_SCORE_MAIN, UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import { MenuActions } from './menuActions'

interface UserCardProps {
  user: UserDto
  index: number
}

export function UserCard({ user, index }: UserCardProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const href = joinToHref(nickname)

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={70} />
      </Link>
      <Stack justifyContent="space-between" flex={1} minHeight={70}>
        <UserStatus online={online}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="subtitle1" component="span">
              <Link href={href}>{name}</Link>
            </Typography>
            <UserLevel level={characteristic.level} />
          </Box>
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
