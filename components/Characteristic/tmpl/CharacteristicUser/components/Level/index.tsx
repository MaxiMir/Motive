import { Box } from '@mui/material'
import useLocale from 'hooks/useLocale'
import i18n from './i18n'

export default function Level(): JSX.Element {
  const { locale } = useLocale()
  const { lvl } = i18n[locale]

  return (
    <Box component="sup" sx={{ marginLeft: '2px', fontSize: '0.625rem', color: 'text.disabled' }}>
      {lvl}
    </Box>
  )
}
