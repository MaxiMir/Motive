import { Box, Typography, useTheme } from '@mui/material'
import { MainCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import AppLink from 'components/UI/AppLink'
import i18n from './i18n'

export interface AdvantageProps {
  id: MainCharacteristicName | 'completed'
  href: string
  locale: Locale
}

export default function Advantage({ id, href, locale }: AdvantageProps) {
  const theme = useTheme()
  const { title, subtitle } = i18n[locale][id]
  const { light, dark } = theme.palette[id]

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      justifySelf="stretch"
      alignSelf="stretch"
      flex={1}
      sx={{ background: `linear-gradient(90deg, ${light} 0%, ${dark} 100%)` }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <AppLink
          href={href}
          sx={{
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          <AppEmoji name={id} variant="h2" />
        </AppLink>
        <Box display="flex" flexDirection="column" alignItems="space-between">
          <AppLink
            href={href}
            variant="h5"
            sx={{
              color: '#F5F5F7',
              width: locale === 'ru' ? 246 : 210,
              textTransform: 'uppercase',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            {title}
          </AppLink>
          <Typography sx={{ color: '#f5f5f799' }}>{subtitle}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
