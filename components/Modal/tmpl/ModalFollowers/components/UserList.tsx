import { UserDto } from 'dto'
import User from 'components/User'
import AppList from 'components/UI/AppList'

interface UserListProps {
  users: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
}

export default function UserList({ users, checkOnLoadMore, onLoadMore }: UserListProps): JSX.Element {
  return (
    <AppList
      elements={users}
      spacing={2}
      keyGetter={(user) => user.id}
      render={(user, index) => (
        <User tmpl="characteristic" user={user} inView={checkOnLoadMore(index)} onView={onLoadMore} />
      )}
    />
  )
}
