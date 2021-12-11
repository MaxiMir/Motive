import dynamic from 'next/dynamic'
import { CharacteristicUserProps } from './tmpl/CharacteristicUser'

const CharacteristicUser = dynamic(() => import('./tmpl/CharacteristicUser'))

export default function Characteristic(props: CharacteristicUserProps): JSX.Element {
  switch (props.tmpl) {
    case 'user':
      return <CharacteristicUser {...props} />
    default:
      return <></>
  }
}
