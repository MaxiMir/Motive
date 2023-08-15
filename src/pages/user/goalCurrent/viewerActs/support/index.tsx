import { Button } from '@mui/material'
import { withStyles } from '@mui/styles'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useViewerAct } from 'entities/viewer'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const SupportModal = dynamic(() => import('features/topic/support-user'))

interface SupportProps {
  dayId: number
  ownerName: string
}

function Support({ dayId, ownerName }: SupportProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const supportingText = formatMessage({ id: 'common.supporting' })
  const title = `${supportingText} ${ownerName}`

  const onClick = useViewerAct(toggle)

  return (
    <>
      <TooltipArrow title={title}>
        <StyledButton
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<Icon name="bolt" />}
          onClick={onClick}
        />
      </TooltipArrow>
      {open && <SupportModal dayId={dayId} ownerName={ownerName} onClose={toggle} />}
    </>
  )
}

const StyledButton = withStyles((theme) => ({
  root: {
    minWidth: 50,
    height: 30,
    color: theme.palette.grey[400],
    borderRadius: 20,
    backgroundColor: '#2b2d31',
    border: 'none',
  },
  startIcon: {
    margin: 0,
  },
}))(Button)

export default Support
