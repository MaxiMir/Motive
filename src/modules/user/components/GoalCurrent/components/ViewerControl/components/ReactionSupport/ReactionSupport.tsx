import dynamic from 'next/dynamic'
import { UserBaseDto } from '@features/user'
import { useOpenSignIn } from '@features/signin'
import useClient from '@hooks/useClient'
import useToggle from '@hooks/useToggle'
import EmojiButton from '@ui/EmojiButton'
import { useMessages } from './hooks/useMessages'

const SupportModal = dynamic(() => import('./components/SupportModal'))

interface ReactionSupportProps {
  owner: UserBaseDto
}

function ReactionSupport({ owner }: ReactionSupportProps) {
  const messages = useMessages(owner)
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
      <EmojiButton name="support" title={messages.title} active={false} onClick={onClick} />
      {open && <SupportModal owner={owner} onClose={toggle} />}
    </>
  )
}

export default ReactionSupport
