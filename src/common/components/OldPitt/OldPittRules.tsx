import { useIntl } from 'react-intl'
import { Typography } from '@mui/material'
import AppDecorEmoji from '@ui/AppDecorEmoji'

export default function OldPittRules() {
  const { formatMessage } = useIntl()
  const huntsText = formatMessage({ id: 'component.old-pitt-rules.hunts' })
  const coversMessage = formatMessage({ id: 'component.old-pitt-rules.covers' })
  const eatsMessage = formatMessage({ id: 'component.old-pitt-rules.eats' })
  const burnText = formatMessage({ id: 'component.old-pitt-rules.burn' })
  const coversText = coversMessage.replace('%0', process.env.NEXT_PUBLIC_SHOW_WEB_AFTER_DAYS || '')
  const eatsText = eatsMessage.replace('%0', process.env.NEXT_PUBLIC_EAT_AFTER_DAYS || '')

  return (
    <Typography color="darkgray">
      &#9679; {huntsText}.
      <br />
      &#9679; {coversText} <AppDecorEmoji name="web" />.
      <br />
      &#9679; {eatsText} <AppDecorEmoji name="blood" />.
      <br />
      &#9679; {burnText}.
    </Typography>
  )
}
