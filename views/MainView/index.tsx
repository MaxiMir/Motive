import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import Slogan from './components/Slogan'
import Advantage from './components/Advantage'
import ADVANTAGES from './helper'

export default function MainView(): JSX.Element {
  const colors = useCharacteristicColors()

  return (
    <>
      <Slogan />
      <AppBox flexDirection="column" flex={1}>
        {ADVANTAGES.map((advantage) => (
          <Advantage {...advantage} color={colors[advantage.name]} key={advantage.name} />
        ))}
      </AppBox>
    </>
  )
}
