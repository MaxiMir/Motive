import dynamic from 'next/dynamic'
import { UserDto } from 'dto'
import AppContainer from 'components/UI/AppContainer'
import AppHeader from 'components/UI/AppHeader'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowersProps {
  users: UserDto[]
}

export default function Followers({ users }: FollowersProps): JSX.Element {
  return (
    <AppContainer withFlexColumn>
      <AppHeader name="followers" mb={4}>
        Followers
      </AppHeader>
      {!users.length ? <EmptyList /> : <UserList users={users} />}
    </AppContainer>
  )
}
