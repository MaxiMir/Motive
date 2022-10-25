import { UserDto } from 'src/common/dto'
import AppList from 'src/common/ui/AppList'
import UserCharacteristic from '@components/User/UserCharacteristic'
import Menu from './components/Menu'

interface UserListProps {
  users: UserDto[]
}

export default function UserList({ users }: UserListProps) {
  const keyGetter = (user: UserDto) => user.id

  return (
    <AppList
      elements={users}
      gap={4}
      keyGetter={keyGetter}
      render={(user, index) => <UserCharacteristic user={user} menu={<Menu user={user} index={index} />} />}
    />
  )
}
