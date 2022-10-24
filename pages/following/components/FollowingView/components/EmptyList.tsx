import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'

function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.empty' })
  const hint = formatMessage({ id: 'page.following.list.hint' })

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Typography variant="h5" component="p" color="primary">
          {title}
        </Typography>
        <Typography>{hint}</Typography>
      </Box>
    </Box>
  )
}

export default EmptyList
