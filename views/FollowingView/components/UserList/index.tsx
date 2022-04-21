import { UserDto } from 'dto'
import AppList from 'components/UI/AppList'
import UserCharacteristic from 'components/User/UserCharacteristic'
import Menu from './components/Menu'

interface UserListProps {
  users: UserDto[]
}

export default function UserList({ users }: UserListProps): JSX.Element {
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
