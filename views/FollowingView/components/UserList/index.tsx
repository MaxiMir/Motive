import { UserDto } from 'dto'
import AppList from 'components/UI/AppList'
import User from 'components/User'
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
      render={(user, index) => <User tmpl="characteristic" user={user} menu={<Menu user={user} index={index} />} />}
    />
  )
}
