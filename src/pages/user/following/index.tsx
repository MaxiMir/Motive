import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import dynamic from 'next/dynamic'
import { useUpdateFollowing } from 'features/subscription/update-following'
import { useUserContext } from 'entities/user'
import Icon from 'shared/ui/Icon'
import { useMessages } from './lib'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

function Following() {
  const { id, following } = useUserContext()
  const messages = useMessages(following)
  const [isLoading, onClick] = useUpdateFollowing(id, following)
  const operation = following ? 'remove' : 'add'

  return (
    <Button
      size="small"
      disabled={isLoading}
      startIcon={isLoading ? undefined : <Icon name={`person_${operation}`} />}
      sx={({ palette }) => ({
        minWidth: '96px',
        height: 30,
        paddingX: 1,
        color: palette.grey[200],
        borderColor: following ? palette.grey[800] : blue[800],
        backgroundColor: following ? palette.grey[800] : blue[800],
        ':hover': {
          backgroundColor: following ? palette.grey[900] : blue[400],
        },
      })}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress size={14.5} color="inherit" /> : messages.buttonText}
    </Button>
  )
}

export default Following
