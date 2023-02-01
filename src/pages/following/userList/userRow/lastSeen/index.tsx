import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useFormatDistance } from 'shared/lib/hooks'

interface LastSeenProps {
  lastSeen: string
}

function LastSeen({ lastSeen }: LastSeenProps) {
  const { formatMessage } = useIntl()
  const seenText = formatMessage({ id: 'common.seen' })
  const formatDistance = useFormatDistance()
  const distance = formatDistance(lastSeen)

  return (
    <Typography
      variant="caption"
      sx={({ palette }) => ({ textTransform: 'lowercase', color: palette.grey[500] })}
    >
      {seenText} {distance}
    </Typography>
  )
}
export default LastSeen
