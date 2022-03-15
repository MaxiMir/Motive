import dynamic from 'next/dynamic'
import { GoalDto, MemberDto } from 'dto'

const EndOfDay = dynamic(() => import('./components/EndOfDay'))

interface FinishProps {
  goal: GoalDto
  clientMember: MemberDto
}

export default function Finish({ goal, clientMember }: FinishProps): JSX.Element {
  return <>{true ? <EndOfDay goal={goal} clientMember={clientMember} /> : <></>}</>
}
