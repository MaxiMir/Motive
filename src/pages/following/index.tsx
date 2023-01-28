import { Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import { useMessages } from './lib'

const EmptyList = dynamic(() => import('./emptyList'))
const UserList = dynamic(() => import('./userList'))

interface FollowingPageProps {
  following: UserDto[]
}

export function FollowingPage({ following }: FollowingPageProps) {
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
