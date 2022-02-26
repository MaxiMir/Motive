import dynamic from 'next/dynamic'
import { UserDto } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingViewProps {
  users: UserDto[]
}

export default function FollowingView({ users }: FollowingViewProps): JSX.Element {
  return (
    <AppContainer flexColumn>
      <AppTitle name="following" mb={4}>
        Following
      </AppTitle>
      {!users.length ? <EmptyList /> : <UserList users={users} />}
    </AppContainer>
  )
}
