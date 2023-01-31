import dynamic from 'next/dynamic'
import { useOpenSignIn } from 'entities/signin'
import { useClient } from 'entities/user'
import { UserBaseDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import EmojiButton from 'shared/ui/EmojiButton'
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
      <EmojiButton title={messages.title} active={false} startIcon="🙏" onClick={onClick} />
      {open && <SupportModal owner={owner} onClose={toggle} />}
    </>
  )
}

export default ReactionSupport
