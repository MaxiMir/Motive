import Link from 'next/link'
import { Box, Stack, Typography } from '@mui/material'
import { MainCharacteristicName, SecondCharacteristicName } from '@features/characteristic'
import Emoji from '@ui/Emoji'
import { useMessages } from './hooks/useMessages'
import { useWidth } from './hooks/useWidth'

interface AdvantageProps {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

function Advantage({ name, href }: AdvantageProps) {
  const messages = useMessages(name)
  const width = useWidth()

  return (
    <Box
      display="flex"
      justifyContent="center"
      flex={1}
      sx={({ palette }) => ({
        background: `linear-gradient(90deg, ${palette[name].light} 0%, ${palette[name].dark} 100%)`,
      })}
    >
      <Stack direction="row" alignItems="center" spacing={2} width={width}>
        <Link href={href}>
          <Emoji name={name} variant="h2" />
        </Link>
        <Stack alignItems="space-between">
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
        </Stack>
      </Stack>
    </Box>
  )
}

export default Advantage
