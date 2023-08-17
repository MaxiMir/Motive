import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { UserLevel, UserStatus } from 'entities/user'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

const InView = dynamic(() => import('react-intersection-observer').then((m) => m.InView))

interface UserCardProps {
  user: UserDto
  inView: boolean
  onView: () => void
  onClose: () => void
}

function UserCard({ user, inView, onView, onClose }: UserCardProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const href = joinToHref(nickname)

  const onChange = (visible: boolean) => {
    if (!visible) return

    onView()
  }

  return (
    <>
      <Stack direction="row" alignItems="center" gap={2}>
        <Link href={href} title={name} onClick={onClose}>
          <Avatar src={avatar} name={name} size={60} />
        </Link>
        <Stack flex={1} gap={0.5}>
          <UserStatus online={online}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontSize={14} maxWidth={200} noWrap textOverflow="ellipsis">
                <Link href={href} onClick={onClose}>
                  {nickname}
                </Link>
              </Typography>
              <UserLevel level={characteristic.level} />
            </Box>
          </UserStatus>
          <Typography fontSize={14} color="zen.silent">
            {name}
          </Typography>
        </Stack>
      </Stack>
      {inView && <InView onChange={onChange} />}
    </>
  )
}

export default UserCard
