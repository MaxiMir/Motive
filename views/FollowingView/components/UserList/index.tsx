import { UserDto } from 'dto'
import User from 'components/User'
import AppList from 'components/UI/AppList'
import { getUserHref } from 'views/UserView/helper'
import useRemoveFollowing from './hook'
import Menu from './components/Menu'

interface UserListProps {
  users: UserDto[]
}

export default function UserList({ users }: UserListProps): JSX.Element {
  const onRemove = useRemoveFollowing()

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
