import { UserDto } from '@shared/api/dto'
import List from '@shared/ui/List'
import UserRow from './components/UserRow'

interface UserListProps {
  users: UserDto[]
}

function UserList({ users }: UserListProps) {
  const keyGetter = (user: UserDto) => user.id

  return (
    <List
      elements={users}
      spacing={4}
      keyGetter={keyGetter}
      render={(user, index) => <UserRow user={user} index={index} />}
    />
  )
}

export default UserList
