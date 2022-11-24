import { ConfirmationDto, UserDetailDto } from '@dto'
import AppList from '@ui/AppList'
import Confirmation from './components/Confirmation'

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
        <Confirmation
          confirmation={confirmation}
          userId={user.id}
          clientMembership={user.clientMembership}
          key={index}
        />
      )}
    />
  )
}
