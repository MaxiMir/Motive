import { Box, Typography, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'
import { MainCharacteristicName, SecondCharacteristicName } from '@dto'
import AppEmoji from '@ui/AppEmoji'
import AppLink from '@ui/AppLink'

interface AdvantageProps {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

export default function Advantage({ name, href }: AdvantageProps) {
  const theme = useTheme()
  const { formatMessage, locale } = useIntl()
  const title = formatMessage({ id: `page.home.advantage.${name}.title` })
  const subtitle = formatMessage({ id: `page.home.advantage.${name}.subtitle` })
  const { light, dark } = theme.palette[name]

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
          <AppEmoji name={name} variant="h2" />
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
