import { Box, Typography } from '@mui/material'
import { UserPageDto } from '@features/page'
import useFormatDate from '@hooks/useFormatDate'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

interface RowProps {
  icon: string
  name: keyof UserPageDto
  value?: string
}

function Row({ icon, name, value = '-' }: RowProps) {
  const messages = useMessages(name)
  const formatDate = useFormatDate()
  const text = name !== 'registered' ? value : formatDate(value, { month: 'long', year: 'numeric' })
  const shownText = text || <>&mdash;</>

  return (
    <Box display="flex" gap={1}>
      <AppIcon name={icon} />
      <Typography>{messages.title}:</Typography>
      <Typography textAlign="right" sx={{ color: 'zen.silent', marginLeft: 'auto' }}>
        {shownText}
      </Typography>
    </Box>
  )
}

export default Row