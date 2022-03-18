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
      {ADVANTAGES.map((advantage) => (
        <AppBox style={{ height: 'calc(25vh - 61.25px)' }} key={advantage.name}>
          <Advantage {...advantage} color={colors[advantage.name]} />
        </AppBox>
      ))}
    </>
  )
}
