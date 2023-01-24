import dynamic from 'next/dynamic'
import { Typography } from '@mui/material'
import { UserDto } from '@entities/user'
import Container from '@ui/Container'
import { useMessages } from './hooks/useMessages'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingPageProps {
  following: UserDto[]
}

function FollowingPage({ following }: FollowingPageProps) {
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

export default FollowingPage
