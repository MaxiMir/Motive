import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'
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
      color="warning"
      startIcon={<AppEmoji name="following" onlyEmoji />}
      className="apple-hide"
      sx={{ alignSelf: 'center', mb: 3, filter: following ? 'grayscale(0.6)' : undefined }}
      onClick={setFollowing}
    >
      {buttonText}
    </Button>
  )
}
