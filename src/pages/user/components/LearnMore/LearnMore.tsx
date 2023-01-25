import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import useToggle from '@shared/lib/hooks/useToggle'
import Icon from '@shared/ui/Icon'
import { useMessages } from './hooks/useMessages'

const InfoModal = dynamic(() => import('./components/InfoModal'))

function LearnMore() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <LearnMoreButton
        size="small"
        variant="text"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<Icon name="info" />}
        sx={{ mt: 1 }}
        onClick={toggle}
      >
        {messages.info}
      </LearnMoreButton>
      {open && <InfoModal onClose={toggle} />}
    </>
  )
}

const LearnMoreButton = styled(Button)(({ theme }) => ({
  minWidth: 'initial',
  color: theme.palette.grey[500],
}))

export default LearnMore
