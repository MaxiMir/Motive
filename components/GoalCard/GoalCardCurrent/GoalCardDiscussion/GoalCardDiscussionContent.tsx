import { Client, Discussion, Role } from 'dto'

interface GoalCardDiscussionContentProps {
  dayId: string
  client: Client
  role: Role
  discussion: Discussion
}

export default function GoalCardDiscussionContent({
  dayId,
  client,
  role,
  discussion,
}: GoalCardDiscussionContentProps): JSX.Element {
  console.log(dayId, client, role, discussion)
  return <></>
}
