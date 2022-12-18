import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const ModalInfo = dynamic(() => import('./components/ModalInfo'))

function Info() {
  const messages = useMessages()
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AppIcon name="info" />}
        sx={{
          flex: 1,
          maxWidth: {
            md: 200,
          },
          textTransform: 'none',
        }}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={toggle}
      >
        {messages.learnMoreText}
      </Button>
      {open && <ModalInfo onClose={toggle} />}
    </>
  )
}

export default Info
