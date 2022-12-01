import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import { UserBaseDto } from '@dto'

const ModalProfile = dynamic(() => import('./components/ModalProfile'))

interface EditProfileProps {
  user: UserBaseDto
}

function EditProfile({ user }: EditProfileProps) {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const buttonText = formatMessage({ id: 'common.edit' })

  const toggle = () => setOpen(!open)

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
        {buttonText}
      </Button>
      {open && <ModalProfile user={user} onClose={toggle} />}
    </>
  )
}

export default EditProfile
