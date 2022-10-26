import { UserDto } from '@dto'
import UserCharacteristic from '@components/User/UserCharacteristic'
import AppList from '@ui/AppList'

interface UserListProps {
  users: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  onView: () => void
  onClose: () => void
}

export default function UserList({ users, checkOnLoadMore, onView, onClose }: UserListProps) {
  return (
    <AppList
      elements={users}
      gap={2}
      keyGetter={(user) => user.id}
      render={(user, index) => (
        <UserCharacteristic user={user} inView={checkOnLoadMore(index)} onView={onView} onClose={onClose} />
      )}
    />
  )
}
