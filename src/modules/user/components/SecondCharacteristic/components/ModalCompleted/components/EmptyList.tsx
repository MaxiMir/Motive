import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import AppSpinIcon from 'src/common/ui/AppSpinIcon'

export default function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.empty' })

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} gap={2}>
      <Typography color="zen.tender" variant="h6">
        {title}
      </Typography>
      <AppSpinIcon name="completed" />
    </Box>
  )
}
