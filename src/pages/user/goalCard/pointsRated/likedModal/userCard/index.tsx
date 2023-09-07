import { Avatar as MuiAvatar, Badge, Box, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { UserLevel } from 'entities/user'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import Icon from 'shared/ui/Icon'

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
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <SmallAvatar>
                <Icon name="favorite" fontSize={13} />
              </SmallAvatar>
            }
          >
            <Avatar src={avatar} name={name} size={60} badge={online} />
          </Badge>
        </Link>
        <Stack flex={1} gap={0.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize={14} maxWidth={200} noWrap textOverflow="ellipsis">
              <Link href={href} onClick={onClose}>
                {nickname}
              </Link>
            </Typography>
            <UserLevel progress={characteristic.progress} />
          </Box>
          <Typography fontSize={14} color="zen.silent">
            {name}
          </Typography>
        </Stack>
      </Stack>
      {inView && <InView triggerOnce onChange={onChange} />}
    </>
  )
}

const SmallAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
  background: red[800],
  color: 'white',
}))

export default UserCard
