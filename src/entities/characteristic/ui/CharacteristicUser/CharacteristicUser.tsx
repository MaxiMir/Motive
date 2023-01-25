import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { SECOND_CHARACTERISTICS, SecondCharacteristicName } from '@shared/api/characteristic'
import { UserCharacteristicName } from '@shared/api/user'
import { useFormatNumber } from '@shared/lib/hooks'
import Emoji from '@shared/ui/Emoji'

const Level = dynamic(() => import('./ui').then((m) => m.Level))

interface CharacteristicUserProps {
  name: UserCharacteristicName
  value: number
}

export function CharacteristicUser({ name, value }: CharacteristicUserProps) {
  const formatNumber = useFormatNumber()
  const formattedValue =
    name !== SecondCharacteristicName.Followers ? Math.floor(value) : formatNumber(value)
  const showLevel = !(SECOND_CHARACTERISTICS as ReadonlyArray<string>).includes(name)

  return (
    <Stack direction="row" alignItems="baseline" spacing={0.5}>
      <Emoji name={name} variant="subtitle1" />
      <Box display="flex" minWidth={35}>
        <Typography component="p" color={`${name}.main`}>
          {formattedValue}
          {showLevel && <Level />}
        </Typography>
      </Box>
    </Stack>
  )
}
