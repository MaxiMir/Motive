import { Box } from '@mui/material'
import { UserBaseDto } from 'shared/api'
import { UserLink } from './userLink'

interface UserGroupProps {
  users?: UserBaseDto[]
  chip?: boolean
}

export function UserGroup({ users, chip }: UserGroupProps) {
  const shownCount = users?.length || 0
  const offset = -1.2

  return (
    <div>
      {users?.map((user, index) => (
        <Box
          display="inline"
          sx={{
            position: 'relative',
            marginLeft: !index ? undefined : offset,
            zIndex: shownCount - index,
          }}
          key={user.id}
        >
          <UserLink user={user} chip={chip} key={user.nickname} />
        </Box>
      ))}
    </div>
  )
}
