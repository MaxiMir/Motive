import React from 'react'
import { User } from 'dto'
import UserCard from 'components/UserCard'
import AppList from 'components/UI/AppList'
import useRemoveFavoriteUsers from './hook'

interface FavoriteListProps {
  users: User[]
  mutate: (users: User[]) => void
}

export default function UserList({ users, mutate }: FavoriteListProps): JSX.Element {
  const onRemove = useRemoveFavoriteUsers(users, mutate)

  return (
    <AppList
      elements={users}
      spacing={4}
      render={(user) => <UserCard tmpl="favorite" user={user} onRemove={() => onRemove(user.id)} />}
      keyGetter={(user) => user.id.toString()}
    />
  )
}
