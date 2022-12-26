import { useUserContext } from '@modules/user/hooks'
import AppIcon from '@ui/AppIcon'
import BlueButton from '@ui/styled/BlueButton'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useSetFollowing } from './hooks/useSetFollowing'
import { useMessages } from './hooks/useMessages'

function Following() {
  const { id, following } = useUserContext()
  const messages = useMessages(following)
  const [isLoading, onClick] = useSetFollowing(id, following)
  const operation = following ? 'remove' : 'add'

  return (
    <TooltipArrow title={messages.followingText}>
      <BlueButton
        size="small"
        aria-label={messages.followingText}
        sx={{ filter: following ? 'grayscale(0.4)' : undefined }}
        disabled={isLoading}
        onClick={onClick}
      >
        <AppIcon name={`person_${operation}`} />
      </BlueButton>
    </TooltipArrow>
  )
}

export default Following
