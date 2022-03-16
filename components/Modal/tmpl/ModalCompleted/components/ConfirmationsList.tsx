import { ConfirmationDto } from 'dto'
import AppList from 'components/UI/AppList'
import Goal from 'components/Goal'

interface UserListProps {
  confirmations: ConfirmationDto[]
  checkOnLoadMore: (index: number) => boolean
  onView: () => void
}

export default function ConfirmationsList({ confirmations, checkOnLoadMore, onView }: UserListProps): JSX.Element {
  return (
    <AppList
      elements={confirmations}
      flexDirection="column"
      spacing={3}
      keyGetter={(confirmation) => confirmation.id}
      render={(confirmation, index) => (
        <Goal tmpl="completed" confirmation={confirmation} inView={checkOnLoadMore(index)} onView={onView} />
      )}
    />
  )
}
