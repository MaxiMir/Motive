import dynamic from 'next/dynamic'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import GreyButton from '@ui/styled/GreyButton'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const InfoModal = dynamic(() => import('./components/InfoModal'))

function Info() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.info}>
        <GreyButton
          size="small"
          aria-label={messages.info}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          <AppIcon name="info" />
        </GreyButton>
      </TooltipArrow>
      {open && <InfoModal onClose={toggle} />}
    </>
  )
}

export default Info
