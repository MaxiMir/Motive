import { useIntl } from 'react-intl'
import { Typography } from '@mui/material'
import { MAIN_CHARACTERISTICS } from 'src/common/dto'
import AppDecorEmoji from 'src/common/ui/AppDecorEmoji'
import i18n from './i18n'

export default function OldPittRules() {
  const { locale } = useIntl()
  const { pittHints } = i18n[locale]

  return (
    <Typography color="darkgray">
      {pittHints[0]}.
      <br />
      {pittHints[1]} <AppDecorEmoji name="web" />.
      <br />
      {pittHints[2]} <AppDecorEmoji name="blood" />.
      <br />
      {pittHints[3]}{' '}
      {MAIN_CHARACTERISTICS.map((characteristic) => (
        <AppDecorEmoji name={characteristic} key={characteristic} />
      ))}
      {pittHints[4]}.
    </Typography>
  )
}
