import { useIntl } from 'react-intl'
import { Box, Typography, Tooltip } from '@mui/material'
import { UserDetailDto } from '@dto'
import { dateFormatter } from '@helpers/intl'
import AppIcon from '@ui/AppIcon'

interface InfoRowProps {
  icon: string
  name: keyof UserDetailDto
  value: string
}

function InfoRow({ icon, name, value }: InfoRowProps) {
  const { locale, formatMessage } = useIntl()
  const title = formatMessage({ id: `common.${name}` })
  const text = name !== 'registered' ? value : dateFormatter(value, locale, { month: 'long', year: 'numeric' })

  return (
    <Box display="flex" gap={1}>
      <Tooltip title={title}>
        <span>
          <AppIcon name={icon} sx={{ color: 'zen.sand' }} />
        </span>
      </Tooltip>
      <Typography>{text}</Typography>
    </Box>
  )
}

export default InfoRow
