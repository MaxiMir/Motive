import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { UserDto } from 'shared/api'
import Container from 'shared/ui/container'

const EmptyList = dynamic(() => import('./empty-list'))
const UserCard = dynamic(() => import('./user-card'))

interface FollowingPageProps {
  following: UserDto[]
}

export function FollowingPage({ following }: FollowingPageProps) {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.following.header' })

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {header}
      </Typography>
      {!following.length ? (
        <EmptyList />
      ) : (
        <Stack flex={1} gap={4}>
          {following.map((user, index) => (
            <UserCard user={user} index={index} key={user.id} />
          ))}
        </Stack>
      )}
    </Container>
  )
}
