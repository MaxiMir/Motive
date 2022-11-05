import { useIntl } from 'react-intl'
import { Typography } from '@mui/material'

export default function Nothing() {
  const { formatMessage } = useIntl()
  const nothingText = formatMessage({ id: 'common.nothing' })

  return <Typography>{nothingText}</Typography>
}
