import { UserDto } from 'dto'
import User from 'components/User'
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
      spacing={2}
      keyGetter={(user) => user.id}
      render={(user, index) => (
        <User tmpl="characteristic" user={user} inView={checkOnLoadMore(index)} onView={onView} />
      )}
    />
  )
}
