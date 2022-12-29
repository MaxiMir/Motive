import dynamic from 'next/dynamic'
import { useUserContext } from '@modules/user/hooks'
import AppIcon from '@ui/AppIcon'
import BlueButton from '@ui/styled/BlueButton'
import { useSetFollowing } from './hooks/useSetFollowing'
import { useMessages } from './hooks/useMessages'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

function Following() {
  const { id, following } = useUserContext()
  const messages = useMessages(following)
  const [isLoading, onClick] = useSetFollowing(id, following)
  const operation = following ? 'remove' : 'add'

  return (
    <BlueButton
      variant="contained"
      size="small"
      startIcon={
        isLoading ? (
          <CircularProgress size="14.5px" color="inherit" />
        ) : (
          <AppIcon name={`person_${operation}`} />
        )
      }
      disabled={isLoading}
      sx={{
        filter: following ? 'grayscale(0.5)' : undefined,
      }}
      onClick={onClick}
    >
      {messages.followingText}
    </BlueButton>
  )
}

export default Following
