import { Client, Discussion, Role, UserBase } from 'dto'
import UserCard from 'components/UserCard'
import AppBox from 'components/UI/AppBox'

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
  const { users, messages } = discussion
  const usersMap = users.reduce<Record<string, UserBase>>((acc, user) => ({ ...acc, [user.id]: user }), {})

  return (
    <AppBox flexDirection="column" spacing={2}>
      {messages.map((message, key) => (
        <UserCard type="message" user={usersMap[message.userId]} message={message} role={role} key={key} />
      ))}
    </AppBox>
  )
}
