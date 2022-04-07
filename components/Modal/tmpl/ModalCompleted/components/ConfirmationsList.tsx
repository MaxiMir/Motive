import { ConfirmationDto } from 'dto'
import AppList from 'components/UI/AppList'
import Goal from 'components/Goal'

interface UserListProps {
  confirmations: ConfirmationDto[]
  userId: number
  checkOnLoadMore: (index: number) => boolean
  onView: () => void
}

export default function ConfirmationsList({
  confirmations,
  userId,
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
          userId={userId}
          inView={checkOnLoadMore(index)}
          onView={onView}
        />
      )}
    />
  )
}
