import { UserDto } from 'dto'
import User from 'components/User'
import AppList from 'components/UI/AppList'
import { getUserHref } from 'views/UserView/helper'
import useRemoveFollowing from './hook'
import Menu from './components/Menu'

interface UserListProps {
  users: UserDto[]
  isAuthorized: boolean
  mutateUsers: (user: UserDto[]) => void
}

export default function UserList({ users, isAuthorized, mutateUsers }: UserListProps): JSX.Element {
  const onRemove = useRemoveFollowing(users, isAuthorized, mutateUsers)

  return (
    <AppList
      elements={users}
      spacing={4}
      keyGetter={(user) => user.id}
      render={(user) => (
        <User
          tmpl="characteristic"
          user={user}
          menu={<Menu title={user.name} href={getUserHref(user.nickname)} onRemove={() => onRemove(user.id)} />}
          inView={false}
          onView={() => console.log('IN VIEW')}
        />
      )}
    />
  )
}
