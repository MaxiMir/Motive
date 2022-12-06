import dynamic from 'next/dynamic'
import { UserDto } from '@dto'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'
import useMessages from './hooks/useMessages'

const EmptyList = dynamic(() => import('./components/EmptyList/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingFeatureProps {
  users: UserDto[]
}

function FollowingFeature({ users }: FollowingFeatureProps) {
  const messages = useMessages()

  return (
    <AppContainer>
      <AppHeader name="following" mb={4}>
        {messages.header}
      </AppHeader>
      {!users.length ? <EmptyList /> : <UserList users={users} />}
    </AppContainer>
  )
}

export default FollowingFeature
