import React from 'react'
import dynamic from 'next/dynamic'
import { User, UserBase } from 'dto'
import AppHeader from 'components/UI/AppHeader'
import AppContainer from 'components/UI/AppContainer'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingProps {
  users: User[]
  client: UserBase
  mutate: (user: User[]) => void
}

export default function Following({ users, client, mutate }: FollowingProps): JSX.Element {
  return (
    <AppContainer withFlexColumn>
      <AppHeader name="following" mb={4}>
        Following
      </AppHeader>
      {!users.length ? <EmptyList /> : <UserList users={users} clientId={client.id} mutate={mutate} />}
    </AppContainer>
  )
}
