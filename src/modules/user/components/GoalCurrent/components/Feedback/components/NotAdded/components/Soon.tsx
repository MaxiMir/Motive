import { useIntl } from 'react-intl'
import { Typography } from '@mui/material'

function Soon() {
  const { formatMessage } = useIntl()
  const soonText = formatMessage({ id: 'common.soon' })

  return <Typography>{soonText}...</Typography>
}

export default Soon
