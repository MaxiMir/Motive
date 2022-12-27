import dynamic from 'next/dynamic'
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors'
import { Button } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const ProfileModal = dynamic(() => import('./components/ProfileModal'))

function EditProfile() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <GreyButton
        size="small"
        aria-label={messages.buttonText}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<AppIcon name="edit" />}
        sx={{
          width: {
            xs: 200,
            md: 'initial',
          },
          padding: '4px 8px',
        }}
        onClick={toggle}
      >
        {messages.buttonText}
      </GreyButton>
      {open && <ProfileModal onClose={toggle} />}
    </>
  )
}

const GreyButton = styled(Button)({
  minWidth: 'initial',
  color: grey[200],
  backgroundColor: grey[800],
  '&:hover': {
    backgroundColor: grey[500],
  },
})

export default EditProfile
