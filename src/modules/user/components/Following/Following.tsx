import { Button } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import AppIcon from '@ui/AppIcon'
import { useSetFollowing } from './hooks/useSetFollowing'
import { useMessages } from './hooks/useMessages'

function Following() {
  const { id, following } = useUserContext()
  const messages = useMessages(following)
  const setFollowing = useSetFollowing(id, following)
  const operation = following ? 'remove' : 'add'

  return (
    <Button
      variant="outlined"
      color="info"
      size="small"
      startIcon={<AppIcon name={`person_${operation}`} />}
      sx={{
        flex: 1,
        filter: following ? 'grayscale(0.6)' : undefined,
        textTransform: 'none',
      }}
      onClick={setFollowing}
    >
      {messages.buttonText}
    </Button>
  )
}

export default Following
