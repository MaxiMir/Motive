import dynamic from 'next/dynamic'
import { Characteristic } from 'dto'

const CharacteristicCardGoal = dynamic(() => import('./CharacteristicCardGoal'))
const CharacteristicCardUser = dynamic(() => import('./CharacteristicCardUser'))

interface CharacteristicCardBaseProps {
  value: number
  color: string
}

export interface CharacteristicCardGoalProps extends CharacteristicCardBaseProps {
  type: 'goal'
  characteristic: Characteristic | 'runs for days'
}

export interface CharacteristicCardUserProps {
  type: 'user'
  characteristic: Characteristic
  value: number
  color: string
}

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
