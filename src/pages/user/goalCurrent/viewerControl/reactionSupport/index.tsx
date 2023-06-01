import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { CharacteristicReaction } from 'entities/characteristic'
import { useSignIn, useClient } from 'entities/viewer'
import { useToggle } from 'shared/lib/hooks'

const SupportModal = dynamic(() => import('features/topic/support-user'))

interface ReactionSupportProps {
  dayId: number
  ownerName: string
}

function ReactionSupport({ dayId, ownerName }: ReactionSupportProps) {
  const client = useClient()
  const { formatMessage } = useIntl()
  const openSignIn = useSignIn((state) => state.openSignIn)
  const supportingText = formatMessage({ id: 'common.supporting' })
  const [open, toggle] = useToggle()
  const title = `${supportingText} ${ownerName}`

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    toggle()
  }

  return (
    <>
      <CharacteristicReaction title={title} active={false} startIcon="🙏" onClick={onClick} />
      {open && <SupportModal dayId={dayId} ownerName={ownerName} onClose={toggle} />}
    </>
  )
}

export default ReactionSupport
