import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { getDayHref } from 'entities/page'
import { useUserContext } from 'entities/user'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const Share = dynamic(() => import('features/share'))

interface ShareDayProps {
  goalId: number
  dayId: number
  title: string
}

export function ShareDay({ goalId, dayId, title }: ShareDayProps) {
  const { nickname } = useUserContext()
  const [sharing, toggleSharing] = useToggle()
  const { formatMessage } = useIntl()
  const href = getDayHref(nickname, goalId, dayId)
  const shareTitle = formatMessage({ id: 'common.share' })

  return (
    <>
      <TooltipArrow title={shareTitle}>
        <StyledButton size="small" variant="contained" color="inherit" onClick={toggleSharing}>
          <Icon name="ios_share" fontSize={18} />
        </StyledButton>
      </TooltipArrow>
      {sharing && <Share href={href} title={title} onClose={toggleSharing} />}
    </>
  )
}

const StyledButton = styled(Button)({
  minWidth: 'initial',
  width: 36,
  height: 36,
  border: '2px solid black',
})
