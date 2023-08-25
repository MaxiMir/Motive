import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { UserLevel, UserNickname } from 'entities/user'
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
        <Avatar src={avatar} name={name} size={54} badge={online} />
      </Link>
      <Button href={href} color="inherit" component={Link}>
        <Stack gap={0.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <UserNickname nickname={nickname} />
            <UserLevel level={characteristic.level} />
          </Box>
          <Typography fontSize={14} color="zen.silent">
            {name}
          </Typography>
        </Stack>
      </Button>
      <Box marginLeft="auto">
        <MenuActs user={user} index={index} />
      </Box>
    </Stack>
  )
}

export default UserCard