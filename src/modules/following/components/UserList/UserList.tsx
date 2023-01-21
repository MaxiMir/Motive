import { UserDto } from '@features/user'
import AppList from '@ui/AppList'
import UserRow from './components/UserRow'

interface UserListProps {
  users: UserDto[]
}

function UserList({ users }: UserListProps) {
  const keyGetter = (user: UserDto) => user.id

  return (
    <AppList
      elements={users}
      gap={4}
      keyGetter={keyGetter}
      render={(user, index) => <UserRow user={user} index={index} />}
    />
  )
}

export default UserList
