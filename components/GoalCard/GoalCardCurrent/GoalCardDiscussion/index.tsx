import dynamic from 'next/dynamic'
import { Role } from 'dto'

const GoalCardDiscussionEmpty = dynamic(() => import('./GoalCardDiscussionEmpty'))

interface GoalCardDiscussionProps {
  discussion: number
  role: Role
}

export default function GoalCardDiscussion({ discussion, role }: GoalCardDiscussionProps): JSX.Element {
  return <>{!discussion && role !== 'MEMBER' && <GoalCardDiscussionEmpty />}</>
}
