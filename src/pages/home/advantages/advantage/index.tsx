import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { Emoji } from 'entities/characteristic'
import { MainCharacteristicName, SecondCharacteristicName } from 'shared/api'
import { useWidth } from './lib'

interface AdvantageProps {
  name: MainCharacteristicName | SecondCharacteristicName.Completed
  href: string
}

export function Advantage({ name, href }: AdvantageProps) {
  const { formatMessage } = useIntl()
  const width = useWidth()
  const emoji = Emoji[name]
  const title = formatMessage({ id: `page.home.advantage.${name}.title` })
  const subtitle = formatMessage({ id: `page.home.advantage.${name}.subtitle` })

  return (
    <Box
      display="flex"
      justifyContent="center"
      flex={1}
      sx={({ palette }) => ({
        background: `linear-gradient(90deg, ${palette[name].light} 0%, ${palette[name].dark} 100%)`,
      })}
    >
      <Stack direction="row" alignItems="center" gap={2} width={width}>
        <Link href={href}>
          <Typography variant="h2" paragraph m={0}>
            {emoji}
          </Typography>
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
            <Link href={href}>{title}</Link>
          </Typography>
          <Typography sx={{ color: '#f5f5f799' }}>{subtitle}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
