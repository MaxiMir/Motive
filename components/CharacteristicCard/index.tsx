import dynamic from 'next/dynamic'
import { CharacteristicCardGoalProps } from './views/CharacteristicCardGoal'
import { CharacteristicCardUserProps } from './views/CharacteristicCardUser'
import { CharacteristicCardActionProps } from './views/CharacteristicCardAction'

const CharacteristicCardGoal = dynamic(() => import('./views/CharacteristicCardGoal'))
const CharacteristicCardUser = dynamic(() => import('./views/CharacteristicCardUser'))
const CharacteristicCardAction = dynamic(() => import('./views/CharacteristicCardAction'))

export default function CharacteristicCard(
  props: CharacteristicCardGoalProps | CharacteristicCardUserProps | CharacteristicCardActionProps,
): JSX.Element {
  switch (props.type) {
    case 'goal':
      return <CharacteristicCardGoal {...props} />
    case 'user':
      return <CharacteristicCardUser {...props} />
    case 'action':
      return <CharacteristicCardAction {...props} />
    default:
      return <></>
  }
}
