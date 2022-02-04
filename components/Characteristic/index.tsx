import dynamic from 'next/dynamic'
import { CharacteristicUserProps } from './tmpl/CharacteristicUser'
import { CharacteristicReactionProps } from './tmpl/CharacteristicReaction'

const CharacteristicUser = dynamic(() => import('./tmpl/CharacteristicUser'))
const CharacteristicReaction = dynamic(() => import('./tmpl/CharacteristicReaction'))

export default function Characteristic(props: CharacteristicUserProps | CharacteristicReactionProps): JSX.Element {
  switch (props.tmpl) {
    case 'user':
      return <CharacteristicUser {...props} />
    case 'reaction':
      return <CharacteristicReaction {...props} />
  }
}
