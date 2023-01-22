import dynamic from 'next/dynamic'
import { Typography } from '@mui/material'
import { UserDto } from '@features/user'
import Container from '@ui/Container'
import { useMessages } from './hooks/useMessages'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingModuleProps {
  following: UserDto[]
}

function FollowingModule({ following }: FollowingModuleProps) {
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

export default FollowingModule
