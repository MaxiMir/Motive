import dynamic from 'next/dynamic'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { useUserContext } from '@modules/user/hooks'
import AppIcon from '@ui/AppIcon'
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
      variant="outlined"
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
        width: {
          xs: 200,
          md: 'initial',
        },
        filter: following ? 'grayscale(0.5)' : undefined,
      }}
      onClick={onClick}
    >
      {messages.followingText}
    </BlueButton>
  )
}

const BlueButton = styled(Button)({
  minWidth: 'initial',
  color: grey[200],
  backgroundColor: blue[800],
  '&:hover': {
    backgroundColor: blue[500],
  },
})

export default Following
