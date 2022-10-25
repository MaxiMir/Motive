import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { numberToShort } from 'src/common/helpers/prepare'
import { SECOND_CHARACTERISTICS, SecondCharacteristicName, UserCharacteristicName } from 'src/common/dto'
import AppEmoji from 'src/common/ui/AppEmoji'

const Level = dynamic(() => import('./components/Level'))

export interface CharacteristicUserProps {
  name: UserCharacteristicName
  value: number
}

export default function CharacteristicUser({ name, value }: CharacteristicUserProps) {
  const shortValue = name !== SecondCharacteristicName.Followers ? Math.floor(value) : numberToShort(value)
  const showLevel = !(SECOND_CHARACTERISTICS as ReadonlyArray<string>).includes(name)

  return (
    <Box display="flex" alignItems="baseline" gap={0.5}>
      <AppEmoji name={name} variant="subtitle1" />
      <Box display="flex" width={35}>
        <Typography variant="h6" component="p" sx={{ color: `${name}.main` }}>
          {shortValue}
          {showLevel && <Level />}
        </Typography>
      </Box>
    </Box>
  )
}
