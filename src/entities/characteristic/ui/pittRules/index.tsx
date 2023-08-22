import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

export function PittRules() {
  const { formatMessage } = useIntl()
  const huntsText = formatMessage({ id: 'component.old-pitt-rules.hunts' })
  const burnText = formatMessage({ id: 'component.old-pitt-rules.burn' })
  const coversText = formatMessage(
    { id: 'component.old-pitt-rules.covers', defaultMessage: '' },
    { day: process.env.NEXT_PUBLIC_SHOW_WEB_AFTER_DAYS },
  )
  const eatsText = formatMessage(
    { id: 'component.old-pitt-rules.eats', defaultMessage: '' },
    { day: process.env.NEXT_PUBLIC_EAT_AFTER_DAYS },
  )

  return (
    <Stack>
      <Typography>{huntsText} 🕷</Typography>
      <Typography>{coversText} 🕸.</Typography>
      <Typography>{eatsText} 🩸.</Typography>
      <Typography>{burnText}.</Typography>
    </Stack>
  )
}
