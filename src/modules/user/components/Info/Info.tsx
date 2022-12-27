import dynamic from 'next/dynamic'
import { styled } from '@mui/system'
import { IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const InfoModal = dynamic(() => import('./components/InfoModal'))

function Info() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.info}>
        <GreyIconButton
          size="small"
          aria-label={messages.info}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          <AppIcon name="info" />
        </GreyIconButton>
      </TooltipArrow>
      {open && <InfoModal onClose={toggle} />}
    </>
  )
}

const GreyIconButton = styled(IconButton)({
  minWidth: 'initial',
  color: grey[200],
  backgroundColor: grey[800],
  '&:hover': {
    backgroundColor: grey[500],
  },
})

export default Info
