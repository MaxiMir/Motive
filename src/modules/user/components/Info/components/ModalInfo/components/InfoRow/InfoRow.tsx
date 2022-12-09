import { Box, Typography, Tooltip } from '@mui/material'
import { UserPageDto } from '@features/page'
import useFormatDate from '@hooks/useFormatDate'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

interface InfoRowProps {
  icon: string
  name: keyof UserPageDto
  value?: string
}

function InfoRow({ icon, name, value = '-' }: InfoRowProps) {
  const messages = useMessages(name)
  const formatDate = useFormatDate()
  const text = name !== 'registered' ? value : formatDate(value, { month: 'long', year: 'numeric' })

  return (
    <Box display="flex" gap={1}>
      <Tooltip title={messages.title}>
        <span>
          <AppIcon name={icon} sx={{ color: 'zen.sand' }} />
        </span>
      </Tooltip>
      <Typography>{text}</Typography>
    </Box>
  )
}

export default InfoRow
