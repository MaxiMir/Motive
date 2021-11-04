import dynamic from 'next/dynamic'
import { CurrentProps } from './templates/Current'

const Current = dynamic(() => import('./templates/Current'))

export default function GoalCard(props: CurrentProps): JSX.Element {
  switch (props.type) {
    case 'current':
      return <Current {...props} />
    default:
      return <></>
  }
}
