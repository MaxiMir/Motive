import dynamic from 'next/dynamic'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import BlueButton from '@ui/styled/BlueButton'
import { useMessages } from './hooks/useMessages'

const ProfileModal = dynamic(() => import('./components/ProfileModal'))

function EditProfile() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <BlueButton
        variant="contained"
        size="small"
        aria-label={messages.buttonText}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<AppIcon name="edit" />}
        sx={{
          flex: {
            xs: 1,
            md: 'initial',
          },
          padding: '4px 8px',
        }}
        onClick={toggle}
      >
        {messages.buttonText}
      </BlueButton>
      {open && <ProfileModal onClose={toggle} />}
    </>
  )
}

export default EditProfile
