import { useIntl } from 'react-intl'
import { Typography } from '@mui/material'

export default function Soon() {
  const { formatMessage } = useIntl()
  const soonText = formatMessage({ id: 'common.soon' })

  return <Typography>{soonText}...</Typography>
}
