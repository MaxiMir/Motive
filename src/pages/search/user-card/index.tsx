import { Typography, Button, Stack, Box } from '@mui/material'
import Link from 'next/link'
import { UserLevel } from 'entities/user'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserCardProps {
  user: UserDto
}

function UserCard({ user }: UserCardProps) {
  const { nickname, avatar, name, characteristic } = user
  const href = joinToHref(nickname)

  return (
    <Button
      variant="outlined"
      color="inherit"
      href={href}
      sx={{
        width: '100%',
        padding: 2,
        border: '0.5px solid grey',
        borderRadius: '12px',
      }}
      component={Link}
    >
      <Stack alignItems="center" direction={{ xs: 'column', md: 'column' }} gap={1}>
        <Avatar src={avatar} name={name} size={120} />
        <Typography fontSize={14} color="common.white">
          {name}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            color="zen.silent"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            maxWidth={150}
            fontSize={14}
          >
            {nickname}
          </Typography>
          <UserLevel progress={characteristic.progress} />
        </Box>
      </Stack>
    </Button>
  )
}

export default UserCard
