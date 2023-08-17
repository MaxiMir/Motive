import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { UserLevel } from 'entities/user'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import MenuActs from './menuActs'

interface UserCardProps {
  user: UserDto
  index: number
}

function UserCard({ user, index }: UserCardProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const href = joinToHref(nickname)

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={60} badge={online} />
      </Link>
      <Stack justifyContent="center" flex={1} minHeight={70}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="subtitle1" component="span">
            <Link href={href}>{nickname}</Link>
          </Typography>
          <UserLevel level={characteristic.level} />
        </Box>
        <Typography fontSize={14} color="zen.silent">
          {name}
        </Typography>
      </Stack>
      <MenuActs user={user} index={index} />
    </Stack>
  )
}

export default UserCard
