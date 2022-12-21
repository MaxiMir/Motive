import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const ModalProfile = dynamic(() => import('./components/ModalProfile'))

function EditProfile() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AppIcon name="edit" />}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        sx={{
          flex: 1,
          textTransform: 'none',
        }}
        onClick={toggle}
      >
        {messages.buttonText}
      </Button>
      {open && <ModalProfile onClose={toggle} />}
    </>
  )
}

export default EditProfile
