import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { UserDto } from 'src/common/dto'
import AppHeader from 'src/common/ui/AppHeader'
import AppContainer from 'src/common/ui/AppContainer'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingProps {
  users: UserDto[]
}

export function Following({ users }: FollowingProps) {
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
