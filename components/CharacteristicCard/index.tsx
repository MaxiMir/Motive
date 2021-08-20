import dynamic from 'next/dynamic'
import { CharacteristicCardGoalProps } from './CharacteristicCardGoal'
import { CharacteristicCardUserProps } from './CharacteristicCardUser'

const CharacteristicCardGoal = dynamic(() => import('./CharacteristicCardGoal'))
const CharacteristicCardUser = dynamic(() => import('./CharacteristicCardUser'))

export default function CharacteristicCard(
  props: CharacteristicCardGoalProps | CharacteristicCardUserProps,
): JSX.Element {
  switch (props.type) {
    case 'goal':
      return <CharacteristicCardGoal {...props} />
    case 'user':
      return <CharacteristicCardUser {...props} />
    default:
      return <></>
  }
}
