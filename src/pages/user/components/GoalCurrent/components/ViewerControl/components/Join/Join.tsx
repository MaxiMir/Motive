import dynamic from 'next/dynamic'
import { useOpenSignIn } from '@features/sign-in'
import { useClient } from '@entities/user'
import { useToggle } from '@shared/lib/hooks'
import BlueButton from '@shared/ui/styled/BlueButton'
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
