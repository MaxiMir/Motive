import { UserDto } from 'shared/api'
import List from 'shared/ui/List'
import UserRow from './userRow'

interface UserListProps {
  users: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  onView: () => void
  onClose: () => void
}

function UserList({ users, checkOnLoadMore, onView, onClose }: UserListProps) {
  return (
    <List
      elements={users}
      spacing={2}
      keyGetter={(user) => user.id}
      render={(user, index) => (
        <UserRow user={user} inView={checkOnLoadMore(index)} onView={onView} onClose={onClose} />
      )}
    />
  )
}

export default UserList
