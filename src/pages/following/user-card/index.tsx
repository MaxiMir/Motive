import { Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Link from 'next/link'
import { UserLevel } from 'entities/user'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import MenuActs from './menu-acts'

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
      <StyledButton href={href} color="inherit" component={Link}>
        <Stack gap={0.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize={14}>{name}</Typography>
            <UserLevel progress={characteristic.progress} />
          </Box>
          <Typography fontSize={14} color="zen.silent">
            {nickname}
          </Typography>
        </Stack>
      </StyledButton>
      <Box marginLeft="auto">
        <MenuActs user={user} index={index} />
      </Box>
    </Stack>
  )
}

const StyledButton = styled(Button)({
  flex: 1,
  justifyContent: 'flex-start',
}) as typeof Button

export default UserCard
