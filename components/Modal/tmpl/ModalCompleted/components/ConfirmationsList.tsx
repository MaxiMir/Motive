import { ConfirmationDto, UserDetailDto } from 'dto'
import AppList from 'components/UI/AppList'
import Goal from 'components/Goal'

interface UserListProps {
  confirmations: ConfirmationDto[]
  checkOnLoadMore: (index: number) => boolean
  user: UserDetailDto
  onView: () => void
}

export default function ConfirmationsList({
  confirmations,
  user,
  checkOnLoadMore,
  onView,
}: UserListProps): JSX.Element {
  return (
    <AppList
      elements={confirmations}
      gap={2}
      keyGetter={(confirmation) => confirmation.id}
      render={(confirmation, index) => (
        <Goal
          tmpl="completed"
          confirmation={confirmation}
          user={user}
          inView={checkOnLoadMore(index)}
          onView={onView}
        />
      )}
    />
  )
}
