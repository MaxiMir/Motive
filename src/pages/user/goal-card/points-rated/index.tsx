import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { DayDto } from 'shared/api'
import { useFormatNumber, useToggle } from 'shared/lib/hooks'

const AvatarsGroup = dynamic(() => import('shared/ui/avatars-group'))
const PointsRatedModal = dynamic(() => import('./points-rated-modal'))

interface PointsRatedProps {
  day: DayDto
}

export function PointsRated({ day }: PointsRatedProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const formatNumber = useFormatNumber()
  const countAll = formatNumber(day.pointsRated)
  const likedText = formatMessage({ id: day.pointsRated === 1 ? 'common.like' : 'common.likes' })
  const users = day.lastRated?.slice(0, 3)
  const renderGroup = users && users.length > 0
  const title = `${countAll} ${likedText}`.toLowerCase()

  return (
    <>
      <StyledButton size="small" variant="text" color="inherit" onClick={toggle}>
        <Box display="flex" alignItems="center" gap={0.5}>
          {renderGroup && <AvatarsGroup avatars={users} size={16} />}
          <Typography fontSize={13} color="zen.silent">
            {title}
          </Typography>
        </Box>
      </StyledButton>
      {open && <PointsRatedModal title={title} day={day} onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)({
  paddingLeft: 0,
  ':hover': {
    background: 'none',
  },
})
