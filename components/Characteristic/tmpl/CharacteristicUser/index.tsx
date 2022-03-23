import dynamic from 'next/dynamic'
import { numberToShort } from 'helpers/prepare'
import { UserCharacteristicName } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

const Level = dynamic(() => import('./components/Level'))

export interface CharacteristicUserProps {
  tmpl: 'user'
  name: UserCharacteristicName
  value: number
  color: string
}

export default function CharacteristicUser({ name, value, color }: CharacteristicUserProps): JSX.Element {
  const preparedValue = name !== 'followers' ? Math.floor(value) : numberToShort(value)

  return (
    <AppBox alignItems="baseline" spacing={0.5}>
      <AppEmoji name={name} variant="subtitle1" />
      <AppBox width={32}>
        <AppTypography variant="h6" component="p" style={{ color }}>
          {preparedValue}
          {!['completed', 'abandoned', 'followers'].includes(name) && <Level />}
        </AppTypography>
      </AppBox>
    </AppBox>
  )
}
