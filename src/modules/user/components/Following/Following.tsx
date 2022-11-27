import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import useSetFollowing from './hook'

interface FollowingProps {
  id: number
  following: boolean
}

export default function Following({ id, following }: FollowingProps) {
  const { formatMessage } = useIntl()
  const setFollowing = useSetFollowing(id, following)
  const operation = following ? 'remove' : 'add'
  const buttonText = formatMessage({ id: `page.user.following.${operation}` })

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
      {buttonText}
    </Button>
  )
}
