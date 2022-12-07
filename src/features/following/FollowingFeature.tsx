import dynamic from 'next/dynamic'
import { UserDto } from '@dto'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'
import useMessages from './hooks/useMessages'

const EmptyList = dynamic(() => import('./components/EmptyList/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingFeatureProps {
  following: UserDto[]
}

function FollowingFeature({ following }: FollowingFeatureProps) {
  const messages = useMessages()

  return (
    <AppContainer>
      <AppHeader name="following" mb={4}>
        {messages.header}
      </AppHeader>
      {!following.length ? <EmptyList /> : <UserList users={following} />}
    </AppContainer>
  )
}

export default FollowingFeature
