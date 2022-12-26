import dynamic from 'next/dynamic'
import { Button, Tooltip } from '@mui/material'
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const ModalInfo = dynamic(() => import('./components/ModalInfo'))

function Info() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <Tooltip title={messages.learnMoreText}>
        <span>
          <InfoButton
            size="small"
            aria-label={messages.learnMoreText}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={toggle}
          >
            <AppIcon name="info" />
          </InfoButton>
        </span>
      </Tooltip>
      {open && <ModalInfo onClose={toggle} />}
    </>
  )
}

const InfoButton = styled(Button)({
  minWidth: 'initial',
  color: grey[200],
  backgroundColor: grey[800],
  '&:hover': {
    backgroundColor: grey[500],
  },
})

export default Info
