import dynamic from 'next/dynamic'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import GreyButton from '@ui/styled/GreyButton'
import { useMessages } from './hooks/useMessages'

const EditModal = dynamic(() => import('./components/EditModal/EditModal'))

function EditProfile() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <GreyButton
        size="small"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<AppIcon name="edit_note" />}
        sx={{
          minWidth: '96px',
          height: 30,
          paddingX: 1,
        }}
        onClick={toggle}
      >
        {messages.buttonText}
      </GreyButton>
      {open && <EditModal onClose={toggle} />}
    </>
  )
}

export default EditProfile
