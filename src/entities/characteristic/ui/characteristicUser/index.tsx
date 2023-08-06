import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { OnlineSkillName } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import { Emoji } from 'src/shared/config'

const Level = dynamic(() => import('./level'))

interface CharacteristicUserProps {
  name: OnlineSkillName
  value: number
}

export function CharacteristicUser({ name, value }: CharacteristicUserProps) {
  const formatNumber = useFormatNumber()
  const formattedValue = name !== 'followers' ? Math.floor(value) : formatNumber(value)
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
