import { useIntl } from 'react-intl'
import { Box } from '@mui/material'

function Level() {
  const { formatMessage } = useIntl()
  const lvlText = formatMessage({ id: 'common.lvl-short' })

  return (
    <Box component="sup" sx={{ marginLeft: '0.125rem', fontSize: '0.625rem', color: 'text.disabled' }}>
      {lvlText}
    </Box>
  )
}

export default Level
