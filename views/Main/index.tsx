import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import ADVANTAGES from './helper'
import Slogan from './components/Slogan'
import Advantage from './components/Advantage'

export default function Main(): JSX.Element {
  const colors = useCharacteristicColors()

  return (
    <>
      <Slogan />
      {ADVANTAGES.map((advantage) => (
        <AppBox style={{ height: 'calc((100vh - 256px ) / 4)' }} key={advantage.name}>
          <Advantage {...advantage} color={colors[advantage.name]} />
        </AppBox>
      ))}
    </>
  )
}
