import dynamic from 'next/dynamic'
import { Typography } from '@mui/material'
import { numberToShort } from 'helpers/prepare'
import { UserCharacteristicName } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

const Level = dynamic(() => import('./components/Level'))

export interface CharacteristicUserProps {
  tmpl: 'user'
  name: UserCharacteristicName
  value: number
  color: string
}

export default function CharacteristicUser({ name, value, color }: CharacteristicUserProps): JSX.Element {
  const shortValue = name !== 'followers' ? Math.floor(value) : numberToShort(value)

  return (
    <AppBox alignItems="baseline" gap={0.5}>
      <AppEmoji name={name} variant="subtitle1" />
      <AppBox width={32}>
        <Typography variant="h6" component="p" sx={{ color }}>
          {shortValue}
          {!['completed', 'abandoned', 'followers'].includes(name) && <Level />}
        </Typography>
      </AppBox>
    </AppBox>
  )
}
