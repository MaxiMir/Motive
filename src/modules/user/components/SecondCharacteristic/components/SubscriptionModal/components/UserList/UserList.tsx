import { UserDto } from '@features/user'
import List from '@ui/List'
import UserRow from './components/UserRow'

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
