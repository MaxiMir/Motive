import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import AppFadeIcon from 'components/ui/AppFadeIcon'

export default function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.empty' })

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} gap={2}>
      <Typography variant="h6" color="zen.tender">
        {title}
      </Typography>
      <AppFadeIcon name="followers" />
    </Box>
  )
}
