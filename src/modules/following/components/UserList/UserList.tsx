import { UserDto } from '@features/user'
import AppList from '@ui/AppList'
import UserCharacteristic from '@components/User/UserCharacteristic'
import MenuActions from './components/MenuActions'

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
      render={(user, index) => (
        <UserCharacteristic user={user} menu={<MenuActions user={user} index={index} />} />
      )}
    />
  )
}

export default UserList
