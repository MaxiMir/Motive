import { Button, Tooltip } from '@mui/material'
import { styled } from '@mui/system'
import { blue, grey } from '@mui/material/colors'
import { useUserContext } from '@modules/user/hooks'
import AppIcon from '@ui/AppIcon'
import { useSetFollowing } from './hooks/useSetFollowing'
import { useMessages } from './hooks/useMessages'

function Following() {
  const { id, following } = useUserContext()
  const messages = useMessages(following)
  const [isLoading, onClick] = useSetFollowing(id, following)
  const operation = following ? 'remove' : 'add'

  return (
    <Tooltip title={messages.followingText}>
      <span>
        <FollowingButton
          size="small"
          aria-label={messages.followingText}
          sx={{ filter: following ? 'grayscale(0.4)' : undefined }}
          disabled={isLoading}
          onClick={onClick}
        >
          <AppIcon name={`person_${operation}`} />
        </FollowingButton>
      </span>
    </Tooltip>
  )
}

const FollowingButton = styled(Button)({
  minWidth: 'initial',
  color: grey[200],
  backgroundColor: blue[800],
  '&:hover': {
    backgroundColor: blue[500],
  },
})

export default Following
