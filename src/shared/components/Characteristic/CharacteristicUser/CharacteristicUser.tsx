import dynamic from 'next/dynamic'
import { Box, Stack, Typography } from '@mui/material'
import { UserCharacteristicName } from '@features/user'
import { SECOND_CHARACTERISTICS, SecondCharacteristicName } from '@features/characteristic'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji from '@ui/AppEmoji'

const Level = dynamic(() => import('./components/Level/Level'))

interface CharacteristicUserProps {
  name: UserCharacteristicName
  value: number
}

function CharacteristicUser({ name, value }: CharacteristicUserProps) {
  const formatNumber = useFormatNumber()
  const formattedValue =
    name !== SecondCharacteristicName.Followers ? Math.floor(value) : formatNumber(value)
  const showLevel = !(SECOND_CHARACTERISTICS as ReadonlyArray<string>).includes(name)

  return (
    <Stack direction="row" alignItems="baseline" spacing={0.5}>
      <AppEmoji name={name} variant="subtitle1" />
      <Box display="flex" minWidth={35}>
        <Typography component="p" color={`${name}.main`}>
          {formattedValue}
          {showLevel && <Level />}
        </Typography>
      </Box>
    </Stack>
  )
}

export default CharacteristicUser
