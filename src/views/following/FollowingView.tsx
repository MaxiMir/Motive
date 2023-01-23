import dynamic from 'next/dynamic'
import { Typography } from '@mui/material'
import { UserDto } from '@features/user'
import Container from '@ui/Container'
import { useMessages } from './hooks/useMessages'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingViewProps {
  following: UserDto[]
}

function FollowingView({ following }: FollowingViewProps) {
  const messages = useMessages()

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {messages.header}
      </Typography>
      {!following.length ? <EmptyList /> : <UserList users={following} />}
    </Container>
  )
}

export default FollowingView
