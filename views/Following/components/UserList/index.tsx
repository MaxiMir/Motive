import React from 'react'
import { UserDto } from 'dto'
import UserCard from 'components/UserCard'
import AppList from 'components/UI/AppList'
import useRemoveFollowing from './hook'

interface FavoriteListProps {
  users: UserDto[]
  clientId: number
  mutate: (user: UserDto[]) => void
}

export default function UserList({ users, clientId, mutate }: FavoriteListProps): JSX.Element {
  const onRemove = useRemoveFollowing(users, clientId, mutate)

  return (
    <AppList
      elements={users}
      spacing={4}
      render={(user) => <UserCard tmpl="following" user={user} onRemove={() => onRemove(user.id)} />}
      keyGetter={(user) => user.id.toString()}
    />
  )
}
