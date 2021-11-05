import dynamic from 'next/dynamic'
import { MemberProps } from './components/Member'

const ReactionsMember = dynamic(() => import('./components/Member'))

export default function Reactions(props: MemberProps): JSX.Element {
  switch (props.role) {
    case 'MEMBER':
      return <ReactionsMember {...props} />
    default:
      return <></>
  }
}
