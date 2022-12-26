import dynamic from 'next/dynamic'
import { styled } from '@mui/system'
import { Button, Tooltip } from '@mui/material'
import { grey } from '@mui/material/colors'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const ModalProfile = dynamic(() => import('./components/ModalProfile'))

function EditProfile() {
  const messages = useMessages()
  const [open, toggle] = useToggle()

  return (
    <>
      <Tooltip title={messages.buttonText}>
        <span>
          <EditButton
            size="small"
            aria-label={messages.buttonText}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={toggle}
          >
            <AppIcon name="edit" />
          </EditButton>
        </span>
      </Tooltip>
      {open && <ModalProfile onClose={toggle} />}
    </>
  )
}

const EditButton = styled(Button)({
  minWidth: 'initial',
  color: grey[200],
  backgroundColor: grey[800],
  '&:hover': {
    backgroundColor: grey[500],
  },
})

export default EditProfile
