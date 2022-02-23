import dynamic from 'next/dynamic'
import { CharacteristicUserProps } from './tmpl/CharacteristicUser'
import { CharacteristicReactionProps } from './tmpl/CharacteristicReaction'
import { CharacteristicGoalProps } from './tmpl/CharacteristicGoal'

const CharacteristicUser = dynamic(() => import('./tmpl/CharacteristicUser'))
const CharacteristicReaction = dynamic(() => import('./tmpl/CharacteristicReaction'))
const CharacteristicGoal = dynamic(() => import('./tmpl/CharacteristicGoal'))

export default function Characteristic(
  props: CharacteristicUserProps | CharacteristicReactionProps | CharacteristicGoalProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'user':
      return <CharacteristicUser {...props} />
    case 'reaction':
      return <CharacteristicReaction {...props} />
    case 'goal':
      return <CharacteristicGoal {...props} />
  }
}
