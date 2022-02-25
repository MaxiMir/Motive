import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { Providers } from 'dto'
import AppIcon from 'components/UI/AppIcon'

const Modal = dynamic(() => import('components/Modal'))

interface SignInProps {
  providers: Providers
}

export default function SignIn({ providers }: SignInProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Button onClick={toggleModal}>
        <AppIcon name="login" />
      </Button>
      {open && <Modal tmpl="signIn" providers={providers} onClose={toggleModal} />}
    </>
  )
}
