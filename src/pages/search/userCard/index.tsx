import { Typography, Button, Stack } from '@mui/material'
import Link from 'next/link'
import { UserCharacteristic, UserLevel } from 'entities/user'
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
      href={href}
      sx={{
        width: '100%',
        padding: 2,
        borderRadius: '12px',
      }}
      component={Link}
    >
      <Stack alignItems="center" direction={{ xs: 'column', md: 'column' }} gap={2}>
        <Avatar src={avatar} name={name} size={120} buttonProps={{ component: 'span' }} />
        <Typography color="common.white" textOverflow="ellipsis" whiteSpace="nowrap">
          {name}
        </Typography>
        <UserLevel level={characteristic.level} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <UserCharacteristic name="completed" value={characteristic.completed} />
          <UserCharacteristic name="abandoned" value={characteristic.abandoned} />
          <UserCharacteristic name="followers" value={characteristic.followers} />
        </Stack>
      </Stack>
    </Button>
  )
}

export default UserCard
