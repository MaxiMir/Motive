import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MainCharacteristicName, SecondCharacteristicName } from '@features/characteristic'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'
import { useWidth } from './hooks/useWidth'

interface AdvantageProps {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

function Advantage({ name, href }: AdvantageProps) {
  const theme = useTheme()
  const messages = useMessages(name)
  const width = useWidth()
  const { light, dark } = theme.palette[name]

  return (
    <Box
      display="flex"
      justifyContent="center"
      flex={1}
      sx={{ background: `linear-gradient(90deg, ${light} 0%, ${dark} 100%)` }}
    >
      <Box display="flex" alignItems="center" gap={2} width={width}>
        <Link href={href}>
          <AppEmoji name={name} variant="h2" />
        </Link>
        <Box display="flex" flexDirection="column" alignItems="space-between">
          <Typography
            variant="h5"
            component="span"
            sx={{
              color: '#F5F5F7',
              textTransform: 'uppercase',
            }}
          >
            <Link href={href}>{messages.title}</Link>
          </Typography>
          <Typography sx={{ color: '#f5f5f799' }}>{messages.subtitle}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Advantage
