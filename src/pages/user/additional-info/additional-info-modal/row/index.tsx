import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { UserPageDto } from 'shared/api'
import { useFormatDate } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'

interface RowProps {
  icon: string
  name: keyof UserPageDto
  value?: string
}

export function Row({ icon, name, value = '-' }: RowProps) {
  const { formatMessage } = useIntl()
  const formatDate = useFormatDate()
  const text = name !== 'registered' ? value : formatDate(value, { month: 'long', year: 'numeric' })
  const title = formatMessage({ id: `common.${name}` })

  return (
    <Box display="flex" gap={1}>
      <Icon name={icon} />
      <Typography whiteSpace="nowrap">{title}:</Typography>
      <Typography textAlign="right" color="zen.silent" marginLeft="auto">
        {text || <>&mdash;</>}
      </Typography>
    </Box>
  )
}
