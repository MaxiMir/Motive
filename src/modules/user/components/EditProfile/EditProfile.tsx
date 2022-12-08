import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'

const ModalProfile = dynamic(() => import('./components/ModalProfile'))

function EditProfile() {
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
      {open && <ModalProfile onClose={toggle} />}
    </>
  )
}

export default EditProfile
