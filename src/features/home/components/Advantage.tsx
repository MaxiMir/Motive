import Link from 'next/link'
import { Box, Typography, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'
import { MainCharacteristicName, SecondCharacteristicName } from '@dto'
import AppEmoji from '@ui/AppEmoji'

interface AdvantageProps {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

function Advantage({ name, href }: AdvantageProps) {
  const theme = useTheme()
  const { locale, formatMessage } = useIntl()
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
        <Link href={href}>
          <AppEmoji name={name} variant="h2" />
        </Link>
        <Box display="flex" flexDirection="column" alignItems="space-between">
          <Typography
            variant="h5"
            component="span"
            sx={{
              color: '#F5F5F7',
              width: locale !== 'en' ? 250 : 210,
              textTransform: 'uppercase',
            }}
          >
            <Link href={href}>{title}</Link>
          </Typography>
          <Typography sx={{ color: '#f5f5f799' }}>{subtitle}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Advantage
