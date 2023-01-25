import { Box } from '@mui/material'
import { useIntl } from 'react-intl'

export function Level() {
  const { formatMessage } = useIntl()
  const lvlText = formatMessage({ id: 'common.lvl-short' })

  return (
    <Box component="sup" marginLeft="2px" fontSize={10} color="text.disabled">
      {lvlText}
    </Box>
  )
}
