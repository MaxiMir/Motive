import { Box, Typography } from '@mui/material'
import { UserPageDto } from '@entities/user'
import useFormatDate from '@lib/hooks/useFormatDate'
import Icon from '@ui/Icon'
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
      <Icon name={icon} />
      <Typography sx={{ whiteSpace: 'nowrap' }}>{messages.title}:</Typography>
      <Typography textAlign="right" sx={{ color: 'zen.silent', marginLeft: 'auto' }}>
        {shownText}
      </Typography>
    </Box>
  )
}

export default Row
