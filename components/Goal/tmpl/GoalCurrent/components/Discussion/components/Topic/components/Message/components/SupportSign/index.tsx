import { Box, useTheme } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import AppTooltip from 'components/UI/AppTooltip'
import i18n from './i18n'

interface SupportSignProps {
  name: string
}

export default function SupportSign({ name }: SupportSignProps): JSX.Element {
  const theme = useTheme()
  const { locale } = useLocale()
  const { getTitle } = i18n[locale]
  const title = getTitle(name)

  return (
    <AppTooltip title={title} aria-label={title}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 21,
          height: 21,
          background: theme.palette.support.main,
          borderRadius: '50%',
        }}
      >
        <AppEmoji name="support" onlyEmoji />
      </Box>
    </AppTooltip>
  )
}
