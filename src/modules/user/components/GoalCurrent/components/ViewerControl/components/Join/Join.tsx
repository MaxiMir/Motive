import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import { GoalDto } from '@dto'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import AppEmoji from '@ui/AppEmoji'

const ModalJoin = dynamic(() => import('./components/ModalJoin'))

interface JoinProps {
  goal: GoalDto
}

function Join({ goal }: JoinProps) {
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
      {open && <ModalJoin goal={goal} onClose={toggleModal} />}
    </>
  )
}

export default Join
