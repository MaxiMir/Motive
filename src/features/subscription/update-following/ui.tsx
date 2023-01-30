import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/Icon'
import { useUpdateFollowing } from './lib'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface UpdateFollowingProps {
  userId: number
  following: boolean
}

function UpdateFollowing({ userId, following }: UpdateFollowingProps) {
  const { formatMessage } = useIntl()
  const [isLoading, onClick] = useUpdateFollowing(userId, following)
  const operation = following ? 'remove' : 'add'
  const buttonText = formatMessage({ id: `page.user.following.${operation}` })

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
      {isLoading ? <CircularProgress size={14.5} color="inherit" /> : buttonText}
    </Button>
  )
}

export default UpdateFollowing
