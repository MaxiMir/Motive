import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

export function SupportRules() {
  const { formatMessage } = useIntl()
  const goalText = formatMessage({ id: 'component.support-rules-goal' })
  const thereforeText = formatMessage({ id: 'component.support-rules-therefore' })
  const adviceText = formatMessage({ id: 'component.support-rules-advice' })
  const wordsText = formatMessage({ id: 'component.support-rules-words' })

  return (
    <Stack color="zen.silent">
      <Typography>{goalText} 😮‍💨.</Typography>
      <Typography>{thereforeText}:</Typography>
      <Typography>&#9679; {adviceText};</Typography>
      <Typography>&#9679; {wordsText}.</Typography>
    </Stack>
  )
}
