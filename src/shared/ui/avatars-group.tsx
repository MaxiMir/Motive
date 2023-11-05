import { Box } from '@mui/material'
import { styled } from '@mui/system'
import Avatar from 'shared/ui/avatar'

interface UserGroupProps {
  avatars: Array<{ id: number; name: string; avatar?: string | null }>
  size: number
  chip?: boolean
}

function AvatarsGroup({ avatars, size, chip }: UserGroupProps) {
  const offset = -1.2

  return (
    <div>
      {avatars.map((avatar, index) => (
        <Box
          display="inline"
          sx={{
            position: 'relative',
            marginLeft: !index ? undefined : offset,
            zIndex: avatars.length - index,
          }}
          key={avatar.id}
        >
          <StyledAvatar
            name={avatar.name}
            src={avatar.avatar}
            size={size}
            variant="contained"
            chip={chip}
          />
        </Box>
      ))}
    </div>
  )
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'chip',
})<{ chip?: boolean }>(({ theme: _, chip }) => ({
  backgroundColor: chip ? '#454545' : '#212121',
  boxShadow: 'none',
  ':hover': {
    backgroundColor: chip ? '#454545' : '#212121',
  },
}))

export default AvatarsGroup
