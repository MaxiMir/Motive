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
      keyGetter={(user) => user.id}
      render={(user, index) => (
        <UserRow user={user} inView={checkOnLoadMore(index)} onView={onView} onClose={onClose} />
      )}
      gap={2}
      height="100%"
      sx={{
        '& sup': {
          display: {
            xs: 'none',
            sm: 'inline-block',
          },
        },
      }}
    />
  )
}

export default UserList
