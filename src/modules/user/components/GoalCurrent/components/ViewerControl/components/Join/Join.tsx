import dynamic from 'next/dynamic'
import { useOpenSignIn } from '@features/signin'
import useClient from '@hooks/useClient'
import useToggle from '@hooks/useToggle'
import BlueButton from '@ui/styled/BlueButton'
import { useMessages } from './hooks/useMessages'

const JoinModal = dynamic(() => import('./components/JoinModal'))

function Join() {
  const messages = useMessages()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, toggle] = useToggle()

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    toggle()
  }

  return (
    <>
      <BlueButton size="small" onClick={onClick}>
        {messages.buttonText}
      </BlueButton>
      {open && <JoinModal onClose={toggle} />}
    </>
  )
}

export default Join
