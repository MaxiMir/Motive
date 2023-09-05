import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { DayDto } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'

const UserGroup = dynamic(() => import('entities/user').then((m) => m.UserGroup))

type RatedProps = Pick<DayDto, 'pointsRated' | 'lastRated'>

export function Rated({ pointsRated, lastRated }: RatedProps) {
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const countAll = formatNumber(pointsRated)
  const likedText = formatMessage({ id: 'common.liked' })
  const users = lastRated?.slice(0, 3)

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      {pointsRated > 0 && <UserGroup users={users} />}
      <Typography fontSize={13} color="zen.silent">
        {countAll} {likedText}
      </Typography>
    </Box>
  )
}
