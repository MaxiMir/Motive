import { UserDto } from 'dto'
import User from 'components/User'
import AppList from 'components/UI/AppList'
import { getUserHref } from 'views/UserView/helper'
import useRemoveFollowing from './hook'
import Menu from './components/Menu'

interface UserListProps {
  users: UserDto[]
  isAuthorized: boolean
}

export default function UserList({ users, isAuthorized }: UserListProps): JSX.Element {
  const onRemove = useRemoveFollowing(isAuthorized)

  return (
    <AppList
      elements={users}
      spacing={4}
      keyGetter={(user) => user.id}
      render={(user, index) => (
        <User
          tmpl="characteristic"
          user={user}
          menu={<Menu title={user.name} href={getUserHref(user.nickname)} onRemove={() => onRemove(user, index)} />}
        />
      )}
    />
  )
}
