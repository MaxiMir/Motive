import { UserDto } from 'dto'
import UserCharacteristic from 'components/User/UserCharacteristic'
import AppList from 'components/UI/AppList'

interface UserListProps {
  users: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  onView: () => void
}

export default function UserList({ users, checkOnLoadMore, onView }: UserListProps): JSX.Element {
  return (
    <AppList
      elements={users}
      gap={2}
      keyGetter={(user) => user.id}
      render={(user, index) => <UserCharacteristic user={user} inView={checkOnLoadMore(index)} onView={onView} />}
    />
  )
}
