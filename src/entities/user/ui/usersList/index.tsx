import { Box } from '@mui/material'
import { UserBaseDto } from 'shared/api'
import { AvatarLink } from './avatarLink'

const AVATAR_SIZE = 30
const AVATAR_OFFSET_PX = 8

interface UsersListProps {
  users?: UserBaseDto[]
}

export function UsersList({ users }: UsersListProps) {
  const shownCount = users?.length || 0
  const width = AVATAR_SIZE * shownCount - (shownCount - 1) * AVATAR_OFFSET_PX
  const offset = -(AVATAR_OFFSET_PX / 8)

  return (
    <Box width={width}>
      {users?.map((user, index) => (
        <Box
          display="inline"
          sx={{
            marginLeft: !index ? undefined : offset,
            zIndex: shownCount - index,
          }}
          key={user.id}
        >
          <AvatarLink user={user} key={user.nickname} />
        </Box>
      ))}
    </Box>
  )
}
