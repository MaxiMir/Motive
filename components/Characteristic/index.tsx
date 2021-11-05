import dynamic from 'next/dynamic'
import { CharacteristicUserProps } from './templates/CharacteristicUser'

const CharacteristicUser = dynamic(() => import('./templates/CharacteristicUser'))

export default function Characteristic(props: CharacteristicUserProps): JSX.Element {
  switch (props.type) {
    case 'user':
      return <CharacteristicUser {...props} />
    default:
      return <></>
  }
}
