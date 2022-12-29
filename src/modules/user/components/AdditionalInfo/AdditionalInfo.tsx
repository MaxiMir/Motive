import dynamic from 'next/dynamic'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import GreyButton from '@ui/styled/GreyButton'
import { useMessages } from './hooks/useMessages'

const ModalAdditionalInfo = dynamic(() => import('./components/ModalAdditionalInfo'))

function AdditionalInfo() {
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
      {open && <ModalAdditionalInfo onClose={toggle} />}
    </>
  )
}

export default AdditionalInfo
