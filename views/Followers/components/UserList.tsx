import { UserDto } from 'dto'
import UserCard from 'components/UserCard'
import AppList from 'components/UI/AppList'

interface UserListProps {
  users: UserDto[]
}

export default function UserList({ users }: UserListProps): JSX.Element {
  return (
    <AppList
      elements={users}
      spacing={4}
      render={(user) => <UserCard tmpl="characteristic" user={user} />}
      keyGetter={(user) => user.id.toString()}
    />
  )
}
