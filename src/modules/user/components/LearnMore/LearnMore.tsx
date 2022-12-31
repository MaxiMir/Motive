import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const ModalLearnMore = dynamic(() => import('./components/ModalLearnMore'))

function LearnMore() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <LearnMoreButton
        size="small"
        variant="text"
        aria-label={messages.info}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<AppIcon name="info" />}
        sx={{ mt: 1 }}
        onClick={toggle}
      >
        {messages.info}
      </LearnMoreButton>
      {open && <ModalLearnMore onClose={toggle} />}
    </>
  )
}

const LearnMoreButton = styled(Button)({
  minWidth: 'initial',
  color: grey[500],
})

export default LearnMore
