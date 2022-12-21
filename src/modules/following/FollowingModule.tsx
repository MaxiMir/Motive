import dynamic from 'next/dynamic'
import { UserDto } from '@features/user'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'
import { useMessages } from './hooks/useMessages'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingModuleProps {
  following: UserDto[]
}

function FollowingModule({ following }: FollowingModuleProps) {
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

export default FollowingModule
