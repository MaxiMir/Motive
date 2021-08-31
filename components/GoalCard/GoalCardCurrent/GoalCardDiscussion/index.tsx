import dynamic from 'next/dynamic'
import { Role } from 'dto'

const AppTypography = dynamic(() => import('components/UI/AppTypography'))

interface GoalCardDiscussionProps {
  discussion: number
  role: Role
}

export default function GoalCardDiscussion({ discussion, role }: GoalCardDiscussionProps): JSX.Element {
  return <>{!discussion && role !== 'MEMBER' && <AppTypography>Nothing so far...</AppTypography>}</>
}
