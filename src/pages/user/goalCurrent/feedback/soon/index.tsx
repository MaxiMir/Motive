import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

function Soon() {
  const { formatMessage } = useIntl()
  const soonText = formatMessage({ id: 'common.soon' })

  return <Typography color="zen.silent">{soonText}...</Typography>
}

export default Soon
