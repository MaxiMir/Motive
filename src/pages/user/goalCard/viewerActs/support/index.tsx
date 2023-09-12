import { Button } from '@mui/material'
import { styled } from '@mui/system'
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
  const title = formatMessage({ id: 'common.supporting' })

  const onClick = useViewerAct(toggle)

  return (
    <>
      <TooltipArrow title={title}>
        <StyledButton
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<Icon name="ev_shadow_add" />}
          onClick={onClick}
        />
      </TooltipArrow>
      {open && <SupportModal dayId={dayId} ownerName={ownerName} onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 50,
  height: 30,
  paddingRight: 0,
  color: theme.palette.grey[400],
  borderRadius: 20,
  backgroundColor: '#2b2d31',
  border: 'none',
}))

export default Support
