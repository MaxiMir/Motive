import { Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { UserDto } from '@shared/api/dto'
import Container from '@shared/ui/Container'
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
