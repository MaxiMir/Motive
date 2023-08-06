import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { DayAct } from 'entities/day'
import { useSignIn, useClient } from 'entities/viewer'
import { useToggle } from 'shared/lib/hooks'

const SupportModal = dynamic(() => import('features/topic/support-user'))

interface SupportProps {
  dayId: number
  ownerName: string
}

function Support({ dayId, ownerName }: SupportProps) {
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
      <DayAct title={title} startIcon="⚡️" onClick={onClick} />
      {open && <SupportModal dayId={dayId} ownerName={ownerName} onClose={toggle} />}
    </>
  )
}

export default Support
