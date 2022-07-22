import { ConfirmationDto, UserDetailDto } from 'dto'
import AppList from 'components/ui/AppList'
import GoalCompleted from 'components/Goal/GoalCompleted'

interface UserListProps {
  confirmations: ConfirmationDto[]
  checkOnLoadMore: (index: number) => boolean
  user: UserDetailDto
  onView: () => void
}

export default function ConfirmationsList({ confirmations, user, checkOnLoadMore, onView }: UserListProps) {
  return (
    <AppList
      elements={confirmations}
      gap={2}
      keyGetter={(confirmation) => confirmation.id}
      render={(confirmation, index) => (
        <GoalCompleted confirmation={confirmation} user={user} inView={checkOnLoadMore(index)} onView={onView} />
      )}
    />
  )
}
