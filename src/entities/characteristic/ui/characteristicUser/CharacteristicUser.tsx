import dynamic from 'next/dynamic'
import { Box, Stack, Typography } from '@mui/material'
import { SECOND_CHARACTERISTICS, SecondCharacteristicName } from '@app/model/characteristic'
import { UserCharacteristicName } from '@entities/user'
import useFormatNumber from '@lib/hooks/useFormatNumber'
import Emoji from '@ui/Emoji'

const Level = dynamic(() => import('./ui/level/Level'))

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
