import { MainCharacteristicName } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

interface TabNameProps {
  name: MainCharacteristicName
}

export default function TabName({ name }: TabNameProps): JSX.Element {
  return (
    <AppBox alignItems="center" spacing={1}>
      <AppEmoji name={name} variant="h6" />
      <AppTypography style={{ textTransform: 'none' }}>{name}</AppTypography>
    </AppBox>
  )
}
