import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { OnlineScoreName } from 'shared/api'
import { Emoji } from 'shared/config'
import { useFormatNumber } from 'shared/lib/hooks'

const Level = dynamic(() => import('./level'))

interface UserCharacteristicProps {
  name: OnlineScoreName
  value: number
}

export function UserCharacteristic({ name, value }: UserCharacteristicProps) {
  const formatNumber = useFormatNumber()
  const formattedValue = formatNumber(value)
  const showLevel = name === 'progress'
  const emoji = Emoji[name]

  return (
    <Stack direction="row" alignItems="baseline" gap={0.5}>
      <Typography variant="subtitle1" paragraph m={0}>
        {emoji}
      </Typography>
      <Box display="flex" minWidth={35}>
        <Typography component="p" sx={{ color: 'white' }}>
          {formattedValue}
          {showLevel && <Level />}
        </Typography>
      </Box>
    </Stack>
  )
}
