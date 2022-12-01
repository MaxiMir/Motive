import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'

function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.nothing-so-far' })

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%">
      <Typography variant="h6">{title}</Typography>
      <AppFadeIcon name="notification" />
    </Box>
  )
}

export default EmptyList
