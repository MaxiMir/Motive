import dynamic from 'next/dynamic'
import { CharacteristicUserProps } from './tmpl/CharacteristicUser'
import { CharacteristicGoalProps } from './tmpl/CharacteristicGoal'

const CharacteristicUser = dynamic(() => import('./tmpl/CharacteristicUser'))
const CharacteristicGoal = dynamic(() => import('./tmpl/CharacteristicGoal'))

export default function Characteristic(props: CharacteristicUserProps | CharacteristicGoalProps): JSX.Element {
  switch (props.tmpl) {
    case 'user':
      return <CharacteristicUser {...props} />
    case 'goal':
      return <CharacteristicGoal {...props} />
  }
}
