import { ConfirmationDto, UserDetailDto } from '@dto'
import AppList from '@ui/AppList'
import GoalCompleted from '@components/Goal/GoalCompleted'

interface UserListProps {
  confirmations: ConfirmationDto[]
  user: UserDetailDto
}

export default function ConfirmationsList({ confirmations, user }: UserListProps) {
  return (
    <AppList
      elements={confirmations}
      gap={2}
      keyGetter={(confirmation) => confirmation.id}
      render={(confirmation, index) => (
        <GoalCompleted
          confirmation={confirmation}
          userId={user.id}
          clientMembership={user.clientMembership}
          key={index}
        />
      )}
    />
  )
}
