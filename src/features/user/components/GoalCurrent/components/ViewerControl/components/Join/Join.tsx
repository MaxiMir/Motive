import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import AppEmoji from '@ui/AppEmoji'

const ModalJoin = dynamic(() => import('./components/ModalJoin'))

function Join() {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, setOpen] = useState(false)
  const buttonText = formatMessage({ id: 'common.join' })

  const toggleModal = () => setOpen(!open)

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    toggleModal()
  }

  return (
    <>
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="join" onlyEmoji />} onClick={onClick}>
        {buttonText}
      </Button>
      {open && <ModalJoin onClose={toggleModal} />}
    </>
  )
}

export default Join
