import { UserDto } from 'shared/api'
import List from 'shared/ui/List'
import { UserCard } from './userCard'

interface UserListProps {
  users: UserDto[]
}

function UserList({ users }: UserListProps) {
  const keyGetter = (user: UserDto) => user.id

  return (
    <List
      elements={users}
      keyGetter={keyGetter}
      render={(user, index) => <UserCard user={user} index={index} />}
      gap={4}
    />
  )
}

export default UserList
