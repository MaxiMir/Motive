import React from 'react'
import { UserDto } from 'dto'
import UserCard from 'components/UserCard'
import AppList from 'components/UI/AppList'
import { getUserHref } from 'views/User/helper'
import useRemoveFollowing from './hook'
import Menu from './components/Menu'

interface FavoriteListProps {
  users: UserDto[]
  isAuthorized: boolean
  mutate: (user: UserDto[]) => void
}

export default function UserList({ users, isAuthorized, mutate }: FavoriteListProps): JSX.Element {
  const onRemove = useRemoveFollowing(users, isAuthorized, mutate)

  return (
    <AppList
      elements={users}
      spacing={4}
      render={(user) => (
        <UserCard
          tmpl="characteristic"
          user={user}
          menu={<Menu title={user.name} href={getUserHref(user.nickname)} onRemove={() => onRemove(user.id)} />}
        />
      )}
      keyGetter={(user) => user.id.toString()}
    />
  )
}
