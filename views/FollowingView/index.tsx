import dynamic from 'next/dynamic'
import { UserDto } from 'dto'
import AppHeader from 'components/UI/AppHeader'
import AppContainer from 'components/UI/AppContainer'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingViewProps {
  users: UserDto[]
  isAuthorized: boolean
  mutateUsers: (user: UserDto[]) => void
}

export default function FollowingView({ users, isAuthorized, mutateUsers }: FollowingViewProps): JSX.Element {
  return (
    <AppContainer flexColumn>
      <AppHeader name="following" mb={4}>
        Following
      </AppHeader>
      {!users.length ? <EmptyList /> : <UserList users={users} isAuthorized={isAuthorized} mutateUsers={mutateUsers} />}
    </AppContainer>
  )
}
