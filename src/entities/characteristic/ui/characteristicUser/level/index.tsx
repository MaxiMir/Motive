import { Box } from '@mui/material'
import { useIntl } from 'react-intl'

function Level() {
  const { formatMessage } = useIntl()
  const lvlText = formatMessage({ id: 'common.lvl-short' })

  return (
    <Box component="sup" marginLeft="2px" fontSize={10} color="text.disabled">
      {lvlText}
    </Box>
  )
}

export default Level
