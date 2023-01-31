import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { Emoji } from 'src/entities/characteristic/consts'
import {
  SECOND_CHARACTERISTICS,
  SecondCharacteristicName,
  UserCharacteristicName,
} from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'

const Level = dynamic(() => import('./level'))

interface CharacteristicUserProps {
  name: UserCharacteristicName
  value: number
}

export function CharacteristicUser({ name, value }: CharacteristicUserProps) {
  const formatNumber = useFormatNumber()
  const formattedValue =
    name !== SecondCharacteristicName.Followers ? Math.floor(value) : formatNumber(value)
  const showLevel = !(SECOND_CHARACTERISTICS as ReadonlyArray<string>).includes(name)
  const emoji = Emoji[name]

  return (
    <Stack direction="row" alignItems="baseline" spacing={0.5}>
      <Typography variant="subtitle1" paragraph m={0}>
        {emoji}
      </Typography>
      <Box display="flex" minWidth={35}>
        <Typography component="p" color={`${name}.main`}>
          {formattedValue}
          {showLevel && <Level />}
        </Typography>
      </Box>
    </Stack>
  )
}
