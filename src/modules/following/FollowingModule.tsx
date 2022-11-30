import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { UserDto } from '@dto'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingModuleProps {
  users: UserDto[]
}

function FollowingModule({ users }: FollowingModuleProps) {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.following.header' })

  return (
    <AppContainer>
      <AppHeader name="following" mb={4}>
        {header}
      </AppHeader>
      {!users.length ? <EmptyList /> : <UserList users={users} />}
    </AppContainer>
  )
}

export default FollowingModule
