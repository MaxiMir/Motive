import { Typography } from '@mui/material'
import { useFormatDistance } from 'shared/lib/hooks'
import { useMessages } from './hooks/useMessages'

interface LastSeenProps {
  lastSeen: string
}

function LastSeen({ lastSeen }: LastSeenProps) {
  const messages = useMessages()
  const formatDistance = useFormatDistance()
  const distance = formatDistance(lastSeen)

  return (
    <Typography
      variant="caption"
      sx={({ palette }) => ({ textTransform: 'lowercase', color: palette.grey[500] })}
    >
      {messages.seenText} {distance}
    </Typography>
  )
}
export default LastSeen
