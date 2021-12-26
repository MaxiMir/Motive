import React from 'react'
import dynamic from 'next/dynamic'
import { UserDto, UserBaseDto } from 'dto'
import AppHeader from 'components/UI/AppHeader'
import AppContainer from 'components/UI/AppContainer'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingProps {
  users: UserDto[]
  client: UserBaseDto
  mutate: (user: UserDto[]) => void
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
