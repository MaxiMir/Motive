import dynamic from 'next/dynamic'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import GreyButton from '@ui/styled/GreyButton'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const ProfileModal = dynamic(() => import('./components/ProfileModal'))

function EditProfile() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.buttonText}>
        <GreyButton
          size="small"
          aria-label={messages.buttonText}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          <AppIcon name="edit" />
        </GreyButton>
      </TooltipArrow>
      {open && <ProfileModal onClose={toggle} />}
    </>
  )
}

export default EditProfile
