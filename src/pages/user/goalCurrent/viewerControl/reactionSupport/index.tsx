import dynamic from 'next/dynamic'
import { CharacteristicReaction } from 'entities/characteristic'
import { useOpenSignIn } from 'entities/signin'
import { useClient } from 'entities/user'
import { useToggle } from 'shared/lib/hooks'
import { useMessages } from './lib'

const SupportModal = dynamic(() => import('features/topic/support-user'))

interface ReactionSupportProps {
  dayId: number
  ownerName: string
}

function ReactionSupport({ dayId, ownerName }: ReactionSupportProps) {
  const messages = useMessages(ownerName)
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
      <CharacteristicReaction
        title={messages.title}
        active={false}
        startIcon="🙏"
        onClick={onClick}
      />
      {open && <SupportModal dayId={dayId} ownerName={ownerName} onClose={toggle} />}
    </>
  )
}

export default ReactionSupport
