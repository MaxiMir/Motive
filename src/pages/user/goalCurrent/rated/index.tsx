import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { UsersList } from 'entities/user'
import { DayDto } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'

type RatedProps = Pick<DayDto, 'pointsRated' | 'lastRated'>

export function Rated({ pointsRated, lastRated }: RatedProps) {
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const countAll = formatNumber(pointsRated)
  const likedText = formatMessage({ id: 'common.liked' })

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <UsersList users={lastRated} />
      <Typography fontSize={13} color="zen.silent">
        {countAll} {likedText}
      </Typography>
    </Box>
  )
}
