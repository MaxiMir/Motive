import dynamic from 'next/dynamic'
import { MembershipJoinProps } from './tmpl/MembershipJoin'
import { MembershipLeaveProps } from './tmpl/MembershipLeave'

const MembershipJoin = dynamic(() => import('./tmpl/MembershipJoin'))
const MembershipLeave = dynamic(() => import('./tmpl/MembershipLeave'))

export default function Membership(props: MembershipJoinProps | MembershipLeaveProps): JSX.Element {
  switch (props.tmpl) {
    case 'join':
      return <MembershipJoin {...props} />
    case 'leave':
      return <MembershipLeave {...props} />
  }
}
