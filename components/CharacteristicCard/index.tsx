import dynamic from 'next/dynamic'
import { CharacteristicCardGoalProps } from './CharacteristicCardGoal'
import { CharacteristicCardUserProps } from './CharacteristicCardUser'
import { CharacteristicCardActionProps } from './CharacteristicCardAction'

const CharacteristicCardGoal = dynamic(() => import('./CharacteristicCardGoal'))
const CharacteristicCardUser = dynamic(() => import('./CharacteristicCardUser'))
const CharacteristicCardAction = dynamic(() => import('./CharacteristicCardAction'))

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
