import { Badge, Box, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { UserLevel } from 'entities/user'
import { DayPoint } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import Icon from 'shared/ui/Icon'
import { SmallAvatar } from 'shared/ui/SmallAvatar'

const InView = dynamic(() => import('react-intersection-observer').then((m) => m.InView))

interface PointCardProps {
  point: DayPoint
  inView: boolean
  onView: () => void
  onClose: () => void
}

function PointCard({ point, inView, onView, onClose }: PointCardProps) {
  const { nickname, name, avatar, characteristic, online } = point.user
  const formatDistance = useFormatDistance()
  const href = joinToHref(nickname)
  const distance = formatDistance(point.date)

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
              <SmallAvatar background={red[800]}>
                <Icon name="favorite" fontSize={13} color="common.white" />
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
            <Typography variant="caption" color="zen.silent" ml={1}>
              {distance}
            </Typography>
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

export default PointCard
