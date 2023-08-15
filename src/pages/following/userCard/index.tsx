import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { UserLevel, UserStatus } from 'entities/user'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import { MenuActions } from './menuActions'

interface UserCardProps {
  user: UserDto
  index: number
}

function UserCard({ user, index }: UserCardProps) {
  const { nickname, name, avatar, characteristic, online, lastSeen, device } = user
  const href = joinToHref(nickname)

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={60} />
      </Link>
      <Stack justifyContent="center" flex={1} minHeight={70}>
        <UserStatus online={online} lastSeen={lastSeen} device={device}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="subtitle1" component="span">
              <Link href={href}>{name}</Link>
            </Typography>
            <UserLevel level={characteristic.level} />
          </Box>
        </UserStatus>
      </Stack>
      <MenuActions user={user} index={index} />
    </Stack>
  )
}

export default UserCard
