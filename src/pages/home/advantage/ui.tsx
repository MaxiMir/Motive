import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { MainCharacteristicName, SecondCharacteristicName } from '@shared/api/dto'
import Emoji from '@shared/ui/Emoji'
import { useWidth, useMessages } from './lib'

interface AdvantageProps {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

export function Advantage({ name, href }: AdvantageProps) {
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
